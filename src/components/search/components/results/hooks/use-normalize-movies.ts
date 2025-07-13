import { MovieCardDataType } from '@/components/movie-card';
import { SearchContextType } from '@/components/search/context';
import { useBaseContext } from '@/app/context';

export const useNormalizeMovies = (): (movies: SearchContextType['movies']['results']) => MovieCardDataType[] => {
	const {genres} = useBaseContext();
	return (movies) => {
		return movies.map((movie) => ({
			id: movie.id,
			imageSrc: movie.poster_path ? process.env.NEXT_PUBLIC_IMAGE_URL + movie.poster_path : undefined,
			genres: genres.reduce<string[]>((acc, current) => {
				if (movie.genre_ids.includes(current.id)) {
					acc.push(current.name)
				}
				return acc
			}, []),
			year: movie.release_date ? new Date(movie.release_date).getFullYear() : undefined,
			title: movie.title,
			rating: movie.vote_average.toFixed(1),
			description: movie.overview
		}))
	}
}