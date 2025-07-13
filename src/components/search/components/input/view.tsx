'use client';
import { FC } from 'react';
import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react';
import { useSearch } from '../../hooks/use-search';
import { useSearchContext } from '../../context';
import { useNormalizeAutocompleteOptions } from './hooks/use-normalize-options';
import Image from 'next/image';
import { UiTypography } from '@/ui';
import { useModalContext } from '@/components/search/modal/context';
import { ApiGetMovieByIdBodySchema, ApiGetMovieByIdSchema, routeApiGetMovieById } from '@/app/api/get-movie-by-id';
import { apiFetch } from '@/utils/api-fetch';

export const SearchInput: FC = () => {
	const { onChange, value } = useSearch();
	const { movies, setLoading } = useSearchContext();
	const {setModalOpen, updateContext: updateModalContext} = useModalContext();
	const normalizeOptions = useNormalizeAutocompleteOptions();
	return <Combobox<number | null> immediate onChange={async (value) => {
		if (value) {
			const body = ApiGetMovieByIdBodySchema.safeParse({
				movieId: value,
			});
			setModalOpen(true);
			if (body.success) {
				setLoading(true);
				const data = await apiFetch(routeApiGetMovieById, ApiGetMovieByIdSchema, {
					method: 'POST',
					body: JSON.stringify(body.data),
				});
				console.log('data =>', data);
				setLoading(false);
				updateModalContext({
					data
				});
			}
		}
	}}>
		<div className="relative w-full">
			<ComboboxInput
				value={value}
				autoComplete="off"
				aria-label="Search"
				onChange={async (event) => {
					await onChange(event.target.value);
				}}
				placeholder="Search for movies..."
				className="w-full px-6 py-4 text-[1.1rem] border-2 border-[#e1e5e9] rounded-[15px] outline-none transition-all duration-300 ease-in-out bg-white relative z-[10001]"
			/>
					<ComboboxOptions portal={false}
									 transition
									 className="origin-top transition duration-200 ease-out empty:invisible data-closed:scale-95 data-closed:opacity-0 z-20 absolute w-full bg-white rounded-[15px] shadow-[0_8px_25px_rgba(0,0,0,0.15)] max-h-[300px] overflow-y-auto mt-2 border border-[rgba(118,75,162,0.2)] empty:hidden">
						{normalizeOptions(movies.results).map((option, index) => {
							const infoString = [option.year, ...(option.genres.length > 0 ? [option.genres.join(', ')] : [])].join(' • ')
							return (
								<ComboboxOption key={[option.title, index].join('::')} value={option.id}
												className="z-10 px-6 py-4 last:border-b-0 hover:bg-[#f8f9fe] border-b border-[#f0f0f0] cursor-pointer transition-colors duration-200 ease-in-out flex items-center gap-4 ">
									<div className="flex items-center gap-4">
										{option.imageSrc ?
											<Image src={option.imageSrc} width={40} height={60} loading="lazy" className="w-10 h-[60px] rounded-[5px] flex-shrink-0" alt={option.title + ' poster'}/>
											: <div className="w-10 h-[60px] rounded-[5px] flex-shrink-0 bg-[#e1e5e9]"/>}
										<div>
											<UiTypography variant="label" className="font-bold mb-1">{option.title}</UiTypography>
											<UiTypography variant="caption" className="text-gray-200">{infoString}</UiTypography>
										</div>
									</div>
								</ComboboxOption>
							)
						})}
					</ComboboxOptions>


		</div>
	</Combobox>;
};