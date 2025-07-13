'use client';
import { UiTypography } from '@/ui/typography';
import { MovieCard, MovieCardSkeleton } from '@/components/movie-card';
import { UiCard, UiPagination } from '@/ui';
import { useNormalizeMovies } from './hooks/use-normalize-movies';
import { useSearchContext } from '../../context';
import { useSearchParams } from 'next/navigation';
import { usePerformSearch } from '../../utils/perform-search';
import { apiFetch } from '@/utils/api-fetch';
import { ApiGetMovieByIdBodySchema, ApiGetMovieByIdSchema, routeApiGetMovieById } from '@/app/api/get-movie-by-id';
import { useModalContext } from '../../modal/context';
import { Empty } from '@/components/empty';
import { Spinner } from '@/components/spinner';
import { UiProgress } from '@/ui/progress/view';

export const SearchResults = () => {
	const { movies, updateContext, setLoading, loading } = useSearchContext();
	const normalizeMovies = useNormalizeMovies();
	const {updateContext: updateModalContext, setModalOpen} = useModalContext()
	const searchParams = useSearchParams();
	const performSearch = usePerformSearch();
	const showMovies = movies.results.length > 0 && !loading;
	const showSpinner = movies.results.length === 0 && loading;
	const showSkeleton = movies.results.length > 0 && loading;

	return <UiCard className="z-[1]">
		{loading && <UiProgress/>}
		<div className="flex justify-between items-center mb-8">
			<UiTypography variant="h2" className="font-semibold text-gray-400">Search Results</UiTypography>
			<UiTypography variant="label"
						  className="text-accent-purple font-medium">{movies.total_results > 1 ? `${movies.total_results} movies` : `${movies.total_results} movie`} found</UiTypography>
		</div>
		<div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
			{showMovies && normalizeMovies(movies.results).map((movie, index) => (
				<MovieCard onClick={async (id) => {
					const body = ApiGetMovieByIdBodySchema.safeParse({
						movieId: id,
					});
					setModalOpen(true);
					if (body.success) {
						const data = await apiFetch(routeApiGetMovieById, ApiGetMovieByIdSchema, {
							method: 'POST',
							body: JSON.stringify(body.data),
						});
						updateModalContext({
							data
						});
					}

				}} data={movie} key={[movie.title, index].join('::')}/>))}
			{showSpinner && <Spinner className="col-span-3"/>}
			{showSkeleton && Array.from({length: 20}).map((_, index) => <MovieCardSkeleton key={index}/>)}
			{movies.results.length === 0 && !loading && (
				<Empty className="col-span-3"/>
			)}

		</div>
		<UiPagination total={movies.total_results} perPage={20}
					  currentPage={searchParams.get('page') ? parseInt(searchParams.get('page') || '') : 1}
					  onPageChange={async (page) => {
						  setLoading(true);
						  await performSearch({
							  updateContext,
							  newParam: {
								  key: 'page',
								  value: page.toString(),
							  },
						  });
						  setLoading(false)
					  }}/>
	</UiCard>;
};