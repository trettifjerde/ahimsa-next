import NewsGrid from "./news-grid";

export default function YearNews({ year }: { year?: number}) {

    return <>
        <h1>Novosti</h1>
        <NewsGrid year={year} withFetcher />
    </>
}