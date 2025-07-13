import { ModalContextType } from '@/components/search/modal/context';
import { MovieDialogDataType } from '@/components/movie-dialog';

export const normalizeMovie = (movie: NonNullable<ModalContextType['data']>): MovieDialogDataType => {
	return{
		adult: movie.adult,
		imageSrc: movie.poster_path ? process.env.NEXT_PUBLIC_IMAGE_URL + movie.poster_path : undefined,
		genres: movie.genres.map((genre) => genre.name),
		year: movie.release_date ? new Date(movie.release_date).getFullYear() : undefined,
		title: movie.title,
		rating: movie.vote_average.toFixed(1),
		description: movie.overview
	}
}