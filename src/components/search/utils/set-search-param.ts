import { FilterParamKey } from '@/app/api/get-movies';

export const setSearchParam = (
	key: FilterParamKey,
	value: string,
	pushToHistory: boolean = true
): void => {
	const url = new URL(window.location.href);
	const params = url.searchParams;
	if (value === '') {
		params.delete(key);
	} else {
		params.set(key, value);
	}

	if (pushToHistory) {
		window.history.pushState({}, '', `${url.pathname}?${params.toString()}`);
	}
}