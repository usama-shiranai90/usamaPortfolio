
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const root = process.cwd();
const contentPath = path.join(root, 'src', 'content', 'research');

export async function getFiles() {
    return fs.readdirSync(contentPath);
}

export async function getFileBySlug(slug) {
    const source = fs.readFileSync(path.join(contentPath, `${slug}.mdx`), 'utf8');
    const { data, content } = matter(source);

    return {
        content,
        frontMatter: {
            slug,
            ...data,
        },
    };
}

export async function getAllFilesFrontMatter() {
    const files = fs.readdirSync(contentPath);

    return files.reduce((allPosts, postSlug) => {
        const source = fs.readFileSync(path.join(contentPath, postSlug), 'utf8');
        const { data } = matter(source);

        return [
            {
                ...data,
                slug: postSlug.replace('.mdx', ''),
            },
            ...allPosts,
        ];
    }, []);
}
