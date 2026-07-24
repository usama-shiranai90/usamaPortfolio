import clsx from 'clsx'

export function LaTeXResumeRenderer({ latex }) {
    if (!latex) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-theme-muted gap-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-accent"></div>
                <p className="text-sm">Compiling LaTeX Document...</p>
            </div>
        );
    }

    let parsed;
    try {
        parsed = parseLaTeXDocument(latex);
    } catch (err) {
        return (
            <div className="bg-red-500/10 text-red-400 p-6 rounded-xl border border-red-500/20 text-sm text-left">
                <h4 className="font-bold mb-2">Compilation Error</h4>
                <p>Failed to parse the LaTeX syntax. Please check for unclosed brackets or invalid tags.</p>
                <pre className="mt-3 p-3 bg-black/30 rounded font-mono text-xs overflow-x-auto">{err.message}</pre>
            </div>
        );
    }

    if (parsed.error) {
        return (
            <div className="bg-amber-500/10 text-amber-400 p-6 rounded-xl border border-amber-500/20 text-sm text-left">
                <h4 className="font-bold mb-2">Parser Warning</h4>
                <p>{parsed.error}</p>
            </div>
        );
    }

    const { headerText, sections } = splitBody(parsed.body);

    return (
        <div className="bg-white text-zinc-900 shadow-xl border border-zinc-200/50 rounded-2xl p-6 sm:p-10 w-full max-w-[210mm] mx-auto print:shadow-none print:border-none print:p-0 print:m-0 print:max-w-none print:rounded-none min-h-[297mm] font-serif text-left antialiased">
            {/* Render header */}
            {renderHeader(headerText)}

            {/* Render sections */}
            <div className="space-y-5">
                {sections.map((sec, i) => {
                    if (!sec.content.trim()) return null;
                    return (
                        <div key={i} className="group">
                            <h2 className="text-xs sm:text-sm font-bold tracking-wider uppercase text-zinc-900 border-b border-zinc-300 pb-0.5 mb-2 font-sans">
                                {sec.title}
                            </h2>
                            {renderSectionContent(sec.content)}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

function findMatchingBrace(str, openBraceIdx) {
    let depth = 1;
    for (let i = openBraceIdx + 1; i < str.length; i++) {
        if (str[i] === '{') {
            depth++;
        } else if (str[i] === '}') {
            depth--;
            if (depth === 0) {
                return i;
            }
        }
    }
    return -1;
}

function parseLaTeXDocument(latex) {
    // 1. Strip comments
    let clean = latex.replace(/^[ \t]*%.*$/gm, '');
    clean = clean.replace(/([^\\])%.*$/gm, '$1');

    // 2. Extract newcommands
    const newcommands = {};
    let pos = 0;

    while (true) {
        const index = clean.indexOf('\\newcommand', pos);
        if (index === -1) break;

        const firstBraceIdx = clean.indexOf('{', index);
        if (firstBraceIdx === -1) {
            pos = index + 11;
            continue;
        }

        const cmdNameCloseIdx = findMatchingBrace(clean, firstBraceIdx);
        if (cmdNameCloseIdx === -1) {
            pos = firstBraceIdx + 1;
            continue;
        }

        const cmdNameWithSlash = clean.substring(firstBraceIdx + 1, cmdNameCloseIdx).trim();
        const cmdName = cmdNameWithSlash.startsWith('\\') ? cmdNameWithSlash.substring(1) : cmdNameWithSlash;

        const defBraceIdx = clean.indexOf('{', cmdNameCloseIdx + 1);
        if (defBraceIdx === -1) {
            pos = cmdNameCloseIdx + 1;
            continue;
        }

        const defCloseIdx = findMatchingBrace(clean, defBraceIdx);
        if (defCloseIdx === -1) {
            pos = defBraceIdx + 1;
            continue;
        }

        const definition = clean.substring(defBraceIdx + 1, defCloseIdx);
        newcommands[cmdName] = definition;

        pos = defCloseIdx + 1;
    }

    // 3. Extract and resolve body
    const docStart = clean.indexOf('\\begin{document}');
    const docEnd = clean.indexOf('\\end{document}');
    if (docStart === -1 || docEnd === -1) {
        return { error: 'Invalid LaTeX document: Could not find \\begin{document} and \\end{document}.' };
    }

    let body = clean.substring(docStart + '\\begin{document}'.length, docEnd).trim();

    for (let pass = 0; pass < 3; pass++) {
        Object.keys(newcommands).forEach(cmd => {
            const def = newcommands[cmd];
            const regex1 = new RegExp('\\{\\\\' + cmd + '\\}', 'g');
            const regex2 = new RegExp('\\\\' + cmd + '\\b', 'g');
            body = body.replace(regex1, def).replace(regex2, def);
        });
    }

    return { body, newcommands };
}

function splitBody(body) {
    const sectionRegex = /\\section\*?\{([^\}]+)\}/g;
    const sections = [];
    let lastIndex = 0;
    let match;
    let headerText = '';

    while ((match = sectionRegex.exec(body)) !== null) {
        const title = match[1];
        const contentStart = sectionRegex.lastIndex;

        if (sections.length === 0) {
            headerText = body.substring(0, match.index).trim();
        } else {
            sections[sections.length - 1].content = body.substring(lastIndex, match.index).trim();
        }

        sections.push({ title, content: '' });
        lastIndex = contentStart;
    }

    if (sections.length > 0) {
        sections[sections.length - 1].content = body.substring(lastIndex).trim();
    } else {
        headerText = body;
    }

    return { headerText, sections };
}

function renderHeader(headerText) {
    let cleanHeader = headerText
        .replace(/\\begin\{center\}/g, '')
        .replace(/\\end\{center\}/g, '');

    const lineBreakRegex = /\\\\(?:\[\d+pt\]|\[\d+mm\])?/g;
    const lines = cleanHeader.split(lineBreakRegex);

    return (
        <div className="flex flex-col items-center text-center space-y-1 mb-4 border-b border-zinc-200 pb-3">
            {lines.map((line, i) => {
                const trimmed = line.trim();
                if (!trimmed) return null;

                const isName = trimmed.includes('Syed Usama Bukhari') || i === 0;

                return (
                    <div
                        key={i}
                        className={clsx(
                            "w-full text-zinc-800",
                            isName ? "text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 font-sans" : "text-xs sm:text-sm font-medium opacity-90"
                        )}
                        dangerouslySetInnerHTML={{ __html: parseInlineLaTeX(trimmed) }}
                    />
                );
            })}
        </div>
    );
}

function renderSectionContent(content) {
    const listPlaceholders = [];
    let processedText = content.replace(/\\begin\{itemize\}[\s\S]*?\\end\{itemize\}/g, (match) => {
        const id = `__LIST_PLACEHOLDER_${listPlaceholders.length}__`;
        listPlaceholders.push(match);
        return id;
    });

    const blocks = processedText.split(/\r?\n\r?\n/);

    return (
        <div className="space-y-2 font-serif text-left">
            {blocks.map((block, index) => {
                let trimmedBlock = block.trim();
                if (!trimmedBlock) return null;

                listPlaceholders.forEach((listHtml, i) => {
                    const placeholder = `__LIST_PLACEHOLDER_${i}__`;
                    if (trimmedBlock.includes(placeholder)) {
                        trimmedBlock = trimmedBlock.replace(placeholder, listHtml);
                    }
                });

                if (trimmedBlock.startsWith('\\begin{itemize}') || trimmedBlock.includes('\\begin{itemize}')) {
                    return (
                        <div
                            key={index}
                            dangerouslySetInnerHTML={{ __html: parseLists(trimmedBlock) }}
                        />
                    );
                }

                const lines = trimmedBlock.split(/\\\\(?:\[\d+pt\])?/);

                return (
                    <div key={index} className="w-full text-zinc-800 text-xs sm:text-sm leading-relaxed">
                        {lines.map((line, lineIdx) => {
                            const trimmedLine = line.trim();
                            if (!trimmedLine) return null;

                            if (trimmedLine.includes('\\hfill')) {
                                const parts = trimmedLine.split('\\hfill');
                                const left = parts[0].trim();
                                const right = parts[1].trim();

                                return (
                                    <div key={lineIdx} className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline w-full gap-1 mt-1 font-serif">
                                        <span className="font-bold text-zinc-900" dangerouslySetInnerHTML={{ __html: parseInlineLaTeX(left) }} />
                                        <span className="text-xs text-zinc-600 font-semibold" dangerouslySetInnerHTML={{ __html: parseInlineLaTeX(right) }} />
                                    </div>
                                );
                            }

                            return (
                                <p
                                    key={lineIdx}
                                    className="mt-0.5"
                                    dangerouslySetInnerHTML={{ __html: parseInlineLaTeX(trimmedLine) }}
                                />
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
}

function parseLists(text) {
    const itemizeRegex = /\\begin\{itemize\}(?:\[[^\]]*\])?([\s\S]*?)\\end\{itemize\}/g;
    return text.replace(itemizeRegex, (match, listContent) => {
        const items = listContent.split(/\\item/);
        const listItemsHtml = items
            .map(item => item.trim())
            .filter(item => item.length > 0)
            .map(item => `<li class="mt-0.5 text-xs sm:text-sm leading-relaxed text-zinc-700 relative pl-4 before:content-['•'] before:absolute before:left-0 before:text-zinc-500">${parseInlineLaTeX(item)}</li>`)
            .join('\n');
        return `<ul class="list-none my-0.5 space-y-0.5">${listItemsHtml}</ul>`;
    });
}

function parseInlineLaTeX(text) {
    let html = text;

    html = html
        .replace(/\\&/g, '&')
        .replace(/\\_/g, '_')
        .replace(/\\#/g, '#')
        .replace(/\\%/g, '%')
        .replace(/--/g, '–');

    html = html.replace(/\\href\{([^\}]+)\}\{([^\}]+)\}/g, (match, url, linkText) => {
        return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-cyan-700 hover:text-cyan-800 hover:underline font-medium inline-flex items-center gap-0.5">${linkText}</a>`;
    });

    html = html.replace(/\\textbf\{([^\}]+)\}/g, '<strong>$1</strong>');
    html = html.replace(/\\textit\{([^\}]+)\}/g, '<em>$1</em>');
    html = html.replace(/\\emph\{([^\}]+)\}/g, '<em class="text-zinc-700 font-medium">$1</em>');
    html = html.replace(/\\texttt\{([^\}]+)\}/g, '<code class="bg-zinc-100 text-zinc-800 border border-zinc-200 px-1 py-0.5 rounded text-[11px] font-mono font-semibold">$1</code>');

    html = html.replace(/\\(huge|Large|large|small|normalsize)\b/g, '');

    html = html.replace(/\\faEnvelope\b/g, `<svg class="w-3 h-3 inline-block mr-1 align-middle text-zinc-600" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`);
    html = html.replace(/\\faPhone\b/g, `<svg class="w-3 h-3 inline-block mr-1 align-middle text-zinc-600" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`);
    html = html.replace(/\\faLinkedin\b/g, `<svg class="w-3.5 h-3.5 inline-block mr-0.5 align-middle text-zinc-600" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>`);
    html = html.replace(/\\faGithub\b/g, `<svg class="w-3.5 h-3.5 inline-block mr-0.5 align-middle text-zinc-600" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/></svg>`);
    html = html.replace(/\\faBriefcase\b/g, `<svg class="w-3.5 h-3.5 inline-block mr-0.5 align-middle text-zinc-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`);

    html = html.replace(/\\hspace\{[^\}]+\}/g, '<span class="inline-block w-4"></span>');
    html = html.replace(/~/g, '&nbsp;');

    return html;
}
