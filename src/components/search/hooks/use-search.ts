'use client';
import { useSearchContext } from '../context';
import { useDebouncedCallback } from 'use-debounce';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { usePerformSearch } from '../utils/perform-search';

interface HookRes {
	onChange(value: string): Promise<void>;
	value: string;
}

export const useSearch =  (): HookRes => {
	const {updateContext} = useSearchContext();
	const searchParams = useSearchParams();
	const [value, setValue] = useState<string>(() => {
		return searchParams.get('query') ?? '';
	});
	const performSearch = usePerformSearch();
	const onChange = useDebouncedCallback<{
		(value: string): void;
	}>(async (value) => {
		await performSearch({
			newParam: {
				key: 'query',
				value
			},
			updateContext,
			resetPage: true
		})

	}, 300);
	return {
		onChange: async (value) => {
			setValue(value)
			onChange(value);
		},
		value,
	}
}