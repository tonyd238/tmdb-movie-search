'use client';
import { FilterParamKey } from '@/app/api/get-movies';
import { useSearchParams } from 'next/navigation';

export const useGetSearchParam = (): (key: FilterParamKey) => string | null => {
	const searchParams = useSearchParams();
	return (key: FilterParamKey) => searchParams.get(key);
}