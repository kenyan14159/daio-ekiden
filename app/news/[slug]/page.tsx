import fs from 'fs';
import path from 'path';
import NewsArticleView from './NewsArticleView';

interface NewsArticle {
    id: string;
    slug: string;
    date: string;
    category: string;
    title: string;
    excerpt: string;
    content: string;
}

interface NewsData {
    year: number;
    articles: NewsArticle[];
}

async function getNewsData(): Promise<NewsData> {
    const filePath = path.join(process.cwd(), 'public', 'data', 'news', 'news-2025.json');
    const fileContents = await fs.promises.readFile(filePath, 'utf8');
    return JSON.parse(fileContents);
}

export async function generateStaticParams() {
    const data = await getNewsData();
    return data.articles.map((article) => ({
        slug: article.slug,
    }));
}

// Next.js 15/16 uses Promise for params in dynamic routes
type Props = {
    params: Promise<{ slug: string }>;
}

export default async function NewsDetailPage(props: Props) {
    const params = await props.params;
    const { slug } = params;

    const data = await getNewsData();
    const article = data.articles.find((a) => a.slug === slug) || null;

    return <NewsArticleView article={article} />;
}
