import { SearchContextType } from '../../../context';
import { useBaseContext } from '@/app/context';
import { SearchInputOption } from '../types';

export const useNormalizeAutocompleteOptions = (): (movies: SearchContextType['movies']['results']) => SearchInputOption[] => {
	const {genres} = useBaseContext();
	return (movies) => {
		return movies.map((movie) => ({
			id: movie.id,
			imageSrc: movie.poster_path ? process.env.NEXT_PUBLIC_IMAGE_SMALL_URL + movie.poster_path : undefined,
			genres: genres.reduce<string[]>((acc, current) => {
				if (movie.genre_ids.includes(current.id)) {
					acc.push(current.name)
				}
				return acc
			}, []),
			year: movie.release_date ? new Date(movie.release_date).getFullYear() : undefined,
			title: movie.title,
		}))
	}
}