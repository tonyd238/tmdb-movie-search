'use client';
import { useState } from 'react';
import { cn } from 'clsx-for-tailwind';
import { UiCheckbox, UiInput, UiSelect, UiTypography } from '@/ui';
import { useGetSearchParam } from '../../hooks/use-get-search-param';
import { usePerformSearch } from '../../utils/perform-search';
import { useSearchContext } from '../../context';
import { useBaseContext } from '@/app/context';
import { useDebouncedCallback } from 'use-debounce';
import { FilterParamKey } from '@/app/api/get-movies';

export const SearchFilters = () => {
	const [opened, setOpened] = useState<boolean>(false);
	const {updateContext} = useSearchContext();
	const {languages, countries} = useBaseContext()
	const getSearchParam = useGetSearchParam()
	const performSearch = usePerformSearch();
	const textContent = opened ? '🔼 Hide Advanced Options' : '🔽 Advanced Search Options';
	const [inputValues, setInputValues] = useState<{year: string; primary_release_year: string;}>({
		primary_release_year: getSearchParam('primary_release_year') || '',
		year: getSearchParam('year') || ''
	})
	const onInputChange = useDebouncedCallback<{
		(key: FilterParamKey, value: string): void;
	}>(async (key, value) => {
		await performSearch({
			newParam: {
				key,
				value
			},
			updateContext,
			resetPage: true
		})

	}, 300);
	return <div className="mt-8 border-t-1 border-[#e1e5e9] pt-8">
		<UiTypography variant="label" className="font-semibold text-accent-purple select-none cursor-pointer transition-colors duration-300 hover:text-[#5a3a7a]" onClick={() => {
			setOpened((prev) => !prev)
		}}>{textContent}</UiTypography>
		<div className={cn("grid grid-cols-1 md:grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] gap-4 pt-4", {
			['hidden']: !opened
		})}>
			<UiSelect options={languages} value={getSearchParam('language') || ''} onChange={async (event) => {
				await performSearch({
					newParam: {
						key: 'language',
						value: event.target.value
					},
					updateContext,
					resetPage: true
				})
			}} label="Language"/>
			<UiInput type='number' min="1900" max="2030" value={inputValues.year || ''} onChange={async (event) => {
				setInputValues((prev) => ({
					...prev,
					year: event.target.value
				}))
				await onInputChange('year', event.target.value);
			}} label="Year"/>
			<UiInput type='number' min="1900" max="2030" value={inputValues.primary_release_year || ''} onChange={async (event) => {
				setInputValues((prev) => ({
					...prev,
					primary_release_year: event.target.value
				}))
				await onInputChange('primary_release_year', event.target.value);
			}} label="Release year"/>
			<UiSelect options={countries}
					  value={getSearchParam('region') || ''}
					  onChange={async (event) => {
						  await performSearch({
							  newParam: {
								  key: 'region',
								  value: event.target.value
							  },
							  updateContext,
							  resetPage: true
						  })
					  }}
					  label="Region"/>
			<UiCheckbox checked={getSearchParam('include_adult') === 'true'} onChange={async (checked) => {
				await performSearch({
					newParam: {
						key: 'include_adult',
						value: checked ? checked.toString() : ''
					},
					updateContext,
					resetPage: true
				})
			}} label="Content filter" content="Include adult content"/>
		</div>
	</div>;
};