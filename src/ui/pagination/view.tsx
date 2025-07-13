import { FC } from 'react';
import { UiPaginationProps } from './types';
import { cn } from 'clsx-for-tailwind';

export const UiPagination: FC<UiPaginationProps> = ({onPageChange, perPage, currentPage, total}) => {
	const pageCount = Math.ceil(total / perPage);

	if (pageCount <= 1) return null;

	const createPageRange = (): (number | 'dots')[] => {
		const pages: (number | 'dots')[] = [];

		const leftSibling = Math.max(currentPage - 1, 1);
		const rightSibling = Math.min(currentPage + 1, pageCount);

		if (leftSibling > 1) {
			pages.push(1, 'dots');
		} else {
			for (let i = 1; i < leftSibling; i++) pages.push(i);
		}

		for (let i = leftSibling; i <= rightSibling; i++) {
			pages.push(i);
		}

		if (rightSibling < pageCount - 1) {
			pages.push('dots', pageCount);
		} else {
			for (let i = rightSibling + 1; i <= pageCount; i++) pages.push(i);
		}

		return pages;
	};

	const pages = createPageRange();

	return (
		<div className="flex items-center justify-center gap-2 mt-4 flex-wrap">
			<button
				className={cn("px-3 py-1 rounded border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-50",{
					['cursor-pointer hover:bg-blue-100']: currentPage > 1
				})}
				onClick={() => onPageChange(currentPage - 1)}
				disabled={currentPage === 1}
			>
				«
			</button>

			{pages.map((item, index) =>
				item === 'dots' ? (
					<span key={`dots-${index}`} className="px-2 text-gray-400 select-none">
						...
					</span>
				) : (
					<button
						key={item}
						className={cn('px-3 py-1 rounded border transition-all duration-150', {
							['bg-blue-600 text-white border-blue-600']: item === currentPage,
							['border-gray-300 text-gray-600 cursor-pointer hover:bg-blue-100']: item !== currentPage
						})}
						onClick={() => onPageChange(item)}
					>
						{item}
					</button>
				)
			)}

			<button
				className={cn("px-3 py-1 rounded border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-50",{
					['cursor-pointer hover:bg-blue-100']: currentPage > 1
				})}
				onClick={() => onPageChange(currentPage + 1)}
				disabled={currentPage === pageCount}
			>
				»
			</button>
		</div>
	);
}