import { getSearchParams } from '@/components/search/utils/get-search-params';
import { apiFetch } from '@/utils/api-fetch';
import { ApiGetMoviesSchema, FilterParamKey, routeApiGetMovies } from '@/app/api/get-movies';
import { Dispatch, SetStateAction } from 'react';
import { SearchContextType, useSearchContext } from '@/components/search/context';
import { setSearchParam } from '@/components/search/utils/set-search-param';

interface Props {
	newParam: {
		key: FilterParamKey,
		value: string
	},
	updateContext: Dispatch<SetStateAction<Pick<SearchContextType, 'movies'>>>;
	resetPage?: boolean;
}

export const usePerformSearch = (): ({newParam, resetPage, updateContext}: Props) => Promise<void> => {
	const {setLoading} = useSearchContext()
	return async ({newParam, resetPage, updateContext}) => {
		setSearchParam(newParam.key, newParam.value);
		if (resetPage) {
			setSearchParam('page', '')
		}
		const params = getSearchParams();
		setLoading(true)
		const data = await apiFetch(`${routeApiGetMovies}?${params}`, ApiGetMoviesSchema);
		updateContext({
			movies: data
		});
		setLoading(false)
	}
}