'use client';
import { createContext, useContext } from 'react';
import * as zod from 'zod';
import { ApiGetLanguagesSchema } from '@/app/api/get-languages';
import { ApiGetCountriesSchema } from '@/app/api/get-countries';
import { ApiGetGenresSchema } from '@/app/api/get-genres';

export interface BaseContextType {
	languages: zod.infer<typeof ApiGetLanguagesSchema>;
	countries: zod.infer<typeof ApiGetCountriesSchema>;
	genres: zod.infer<typeof ApiGetGenresSchema>;
}
export const BaseContext = createContext<BaseContextType>({
	languages: [],
	countries: [],
	genres: []
});

export function useBaseContext() {
	const context = useContext(BaseContext);

	if (!context) {
		throw new Error('useBaseContext must be used within a BaseContext.Provider');
	}

	return context;
}