export const getSearchParams = (): string => {
	const url = new URL(window.location.href);
	const params = url.searchParams;
	return params.toString()
}