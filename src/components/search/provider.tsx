'use client';
import { ReactElement, ReactNode, useState } from 'react';
import { SearchContext, SearchContextType } from './context';

export interface ProvidersProps {
	children: ReactNode;
	data: Pick<SearchContextType, 'movies'>;
}

export function SearchProvider({
	children,
	data
}: ProvidersProps): ReactElement {

	const [searchData, setSearchData] = useState<Pick<SearchContextType, 'movies'>>(data)
	const [loading, setLoading] = useState<boolean>(false)
	return (
		<SearchContext.Provider value={{
			...searchData,
			loading,
			setLoading,
			updateContext: setSearchData
		}}>{children}</SearchContext.Provider>
	);
}
