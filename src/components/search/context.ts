'use client';
import { createContext, Dispatch, SetStateAction, useContext } from 'react';
import * as zod from 'zod';
import { ApiGetMoviesSchema } from '@/app/api/get-movies';

export interface SearchContextType {
	movies: zod.infer<typeof ApiGetMoviesSchema>;
	updateContext: Dispatch<SetStateAction<Pick<SearchContextType, 'movies'>>>
	loading: boolean;
	setLoading: Dispatch<SetStateAction<boolean>>;
}
export const SearchContext = createContext<SearchContextType>({
	movies: {
		page: 1,
		results: [],
		total_pages: 1,
		total_results: 0
	},
	loading: false,
	setLoading: () => undefined,
	updateContext: () => undefined
});

export function useSearchContext() {
	const context = useContext(SearchContext);

	if (!context) {
		throw new Error('useSearchContext must be used within a SearchContext.Provider');
	}

	return context;
}