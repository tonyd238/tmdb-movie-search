export interface UiPaginationProps {
	total: number;
	perPage: number;
	currentPage: number;
	onPageChange: (page: number) => void;
}