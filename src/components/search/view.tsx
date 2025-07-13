'use client';
import { UiCard } from '@/ui';
import { SearchFilters } from './components/filters';
import { SearchInput } from './components/input';
import { SearchResults } from './components/results';
import { ModalProvider } from './modal/provider';
import { MovieDialog } from '../movie-dialog';

export const Search = () => {
	return <>
		<ModalProvider>
			<UiCard className="mb-8 relative z-10">
				<div className="flex justify-center">
					<div className="w-full max-w-[600px]">
						<SearchInput/>
					</div>
				</div>
				<SearchFilters/>
			</UiCard>
			<SearchResults/>
			<MovieDialog/>
		</ModalProvider>
	</>;
};