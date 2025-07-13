'use server';
import { UiContainer } from '@/ui';
import { UiTypography } from '@/ui/typography';
import { Search } from '../components/search';
import { SearchProvider } from '../components/search/provider';
import { apiFetch } from '@/utils/api-fetch';
import { ApiGetMoviesSchema, routeApiGetMovies } from '@/app/api/get-movies';

export default async function Home({
                                       searchParams,
                                   }: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const params = await searchParams;
    const defaultSearch = await apiFetch(`${routeApiGetMovies}${params.query ? `?query=${params.query}` : ''}`, ApiGetMoviesSchema);
    return (
    <UiContainer>
        <section className="mb-12">
            <UiTypography variant="h1" className="text-center mb-2 text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)]">TMDB Movie Search</UiTypography>
            <UiTypography variant="subtitle" className="text-center mb-2 text-white/90">Find your favorite movies with powerful search and autocomplete</UiTypography>
        </section>
        <SearchProvider data={{
            movies: defaultSearch
        }}>
            <Search/>
        </SearchProvider>
    </UiContainer>
  );
}
