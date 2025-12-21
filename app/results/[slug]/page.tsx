import fs from 'fs';
import path from 'path';
import ResultDetailView from './ResultDetailView';

interface Result {
    event: string;
    name: string;
    time: string;
    rank: string;
    note?: string;
}

interface TeamResult {
    rank: string;
    totalTime: string;
}

interface ResultEvent {
    id: string;
    slug: string;
    date: string;
    title: string;
    venue: string;
    results: Result[];
    teamResult?: TeamResult;
}

interface ResultsData {
    year: number;
    events: ResultEvent[];
}

async function getResultsData(): Promise<ResultsData> {
    const filePath = path.join(process.cwd(), 'public', 'data', 'results', 'results-2025.json');
    const fileContents = await fs.promises.readFile(filePath, 'utf8');
    return JSON.parse(fileContents);
}

export async function generateStaticParams() {
    const data = await getResultsData();
    return data.events.map((event) => ({
        slug: event.slug,
    }));
}

// Next.js 15/16 uses Promise for params in dynamic routes
type Props = {
    params: Promise<{ slug: string }>;
}

export default async function ResultDetailPage(props: Props) {
    const params = await props.params;
    const { slug } = params;

    const data = await getResultsData();
    const event = data.events.find((e) => e.slug === slug) || null;

    return <ResultDetailView event={event} />;
}
