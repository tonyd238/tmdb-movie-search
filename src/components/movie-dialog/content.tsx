import React, { FC } from 'react';
import { MovieDialogDataType } from './types';
import { Button, DialogTitle } from '@headlessui/react';
import NextImage from 'next/image';
import { UiChip, UiTypography } from '@/ui';

export const ModalContent: FC<{ data: MovieDialogDataType, handleClose():void }> = ({ data, handleClose }) => {
	return (
		<>
			<DialogTitle as="h2" className="font-semibold text-[20px]">
				<div className="flex flex-row w-full items-center justify-between">
					{data.title}
					<Button
						className="rounded-full flex-shrink-0 cursor-pointer p-2 font-semibold text-white data-hover:bg-gray-600/25 transition-colors duration-150"
						onClick={handleClose}
					>
						<svg viewBox="0 0 24 24" width={24} height={24} fill="none" className="text-black" xmlns="http://www.w3.org/2000/svg">
							<path fillRule="evenodd" clipRule="evenodd"
								  d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z"
								  fill="currentColor"/>
						</svg>
					</Button>
				</div>

			</DialogTitle>
			<div className="flex gap-2 md:gap-4 md:items-start mt-3 flex-col md:flex-row">
				{data.imageSrc ?
					<NextImage loading="lazy" src={data.imageSrc} width={300} height={450}
							   className="aspect-[4/3] max-md:w-full rounded-[10px] md:max-w-[250px] md:aspect-[3/4.5] object-cover flex-shrink-0"
							   alt="Modal cover"/> :
					<div
						className="aspect-[4/3] w-full rounded-[10px] md:max-w-[250px] md:aspect-[3/4.5] object-cover flex-shrink-0 z-10 bg-[linear-gradient(135deg,#e1e5e9,#f0f0f0)] overflow-hidden relative before:content-['🎬'] text-[64px] before:opacity-30 pointer-events-none before:absolute before:top-1/2 before:left-1/2 before:-translate-1/2"/>
				}
				<div>
					{data.adult && <div className="mb-2 max-w-max"><UiChip label="For adults only"/></div>}
					{data.genres.length > 0 &&
						<div className="flex flex-wrap gap-2 mb-4">{data.genres.map((genre) => <UiChip
							label={genre} key={genre}/>)}</div>
					}
					<div className="flex gap-2 md:mb-2 md:flex-col">
						<UiTypography variant="caption" className="font-semibold">Rating: <span
							className="font-bold">{data.rating}</span></UiTypography>
						<UiTypography variant="caption" className="font-semibold">Year: <span
							className="font-bold">{data.year || 'N/A'}</span></UiTypography>
					</div>
					<UiTypography variant="caption" className="text-gray-400"><span
						className="font-semibold text-black">Description: </span>{data.description || 'N/A'}</UiTypography>
				</div>
			</div>
		</>
	);
};