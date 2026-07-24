import { projects as staticProjects } from '@/utils/data';

const GITHUB_USER = 'usama-shiranai90';
const REPOS_URL = `https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=100`;

const TAG_IGNORE_LIST = ['css', 'html', 'jupyter notebook', 'dockerfile', 'shell', 'makefile', 'scss'];

function normalizeTags(repo) {
    const rawTags = [...(repo.topics || [])];
    if (repo.language) rawTags.push(repo.language.toLowerCase());

    return Array.from(new Set(rawTags))
        .filter(t => !TAG_IGNORE_LIST.includes(t.toLowerCase()))
        .map(t => {
            const lower = t.toLowerCase();
            if (lower === 'javascript') return 'JavaScript';
            if (lower === 'typescript') return 'TypeScript';
            if (lower === 'reactjs' || lower === 'react') return 'React';
            if (lower === 'nodejs' || lower === 'node') return 'Node.js';
            if (lower === 'nextjs' || lower === 'next') return 'Next.js';
            return t.charAt(0).toUpperCase() + t.slice(1);
        });
}

// Static projects always render, even when the GitHub API is unavailable.
// Mapped to match the GitHub API schema (id, name, description, html_url,
// homepage, tags, stargazers_count?, forks_count?, language?, image?).
function getStaticProjects() {
    return staticProjects.map(p => ({
        id: p.title,
        name: p.title,
        description: p.description,
        html_url: p.github === '#' ? `https://github.com/${GITHUB_USER}` : p.github,
        homepage: p.demo === '#' ? null : p.demo,
        tags: p.tags && p.tags.length > 0 ? p.tags : [p.category],
        stargazers_count: undefined,
        forks_count: undefined,
        image: p.image,
    }));
}

export async function getGithubProjects() {
    const mappedStaticProjects = getStaticProjects();

    try {
        const headers = {
            'Accept': 'application/vnd.github.v3+json',
        };
        if (process.env.GITHUB_TOKEN) {
            headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`;
        }

        const response = await fetch(REPOS_URL, {
            headers,
            next: { revalidate: 86400 }
        });

        if (!response.ok) {
            console.error('Failed to fetch github projects', response.status);
            return mappedStaticProjects;
        }

        const repos = await response.json();

        const filteredRepos = repos
            .filter(repo => !repo.fork)
            .sort((a, b) => {
                if (b.stargazers_count !== a.stargazers_count) {
                    return b.stargazers_count - a.stargazers_count;
                }
                return new Date(b.updated_at) - new Date(a.updated_at);
            })
            .map(repo => ({
                ...repo,
                tags: normalizeTags(repo)
            }));

        return [...mappedStaticProjects, ...filteredRepos];
    } catch (error) {
        console.error('Error fetching github projects:', error);
        return mappedStaticProjects;
    }
}
