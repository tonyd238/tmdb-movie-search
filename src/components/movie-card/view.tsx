'use client';
import { FC } from 'react';
import { MovieCardProps } from './types';
import NextImage from 'next/image';
import { UiTypography } from '@/ui/typography';
import { UiChip } from '@/ui';

export const MovieCard: FC<MovieCardProps> = ({data, onClick}) => {
	return <div onClick={async () => {
		await onClick(data.id);
	}} className="cursor-pointer relative rounded-[15px] bg-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.1)] hover:drop-shadow-[0_8px_30px_rgba(118,75,162,0.2)] overflow-hidden flex h-full flex-col transition-all duration-300 hover:translate-y-[-5px]">
		<div className="relative">
			<div
				className="absolute z-20 min-w-[35px] min-h-[35px] top-2.5 right-2.5 p-2 rounded-[10px] text-center bg-[rgba(118,75,162,0.9)]">
				<UiTypography variant="caption"
							  className="font-semibold text-white leading-[1.3]">{data.rating}</UiTypography>
			</div>
			{data.imageSrc ?
				<NextImage loading="lazy" src={data.imageSrc} width={300} height={450}
						   className={'w-full h-[400px] object-cover select-none'} alt=""/> :
				<div
					className="w-full h-[400px] z-10 bg-[linear-gradient(135deg,#e1e5e9,#f0f0f0)] overflow-hidden relative before:content-['🎬'] text-[64px] before:opacity-30 pointer-events-none before:absolute before:top-1/2 before:left-1/2 before:-translate-1/2">

				</div>
			}
		</div>
		<div className="p-6">
			<UiTypography variant="h3" className="text-gray-400 mb-2 font-semibold line-clamp-2">{data.title}</UiTypography>
			<UiTypography variant="label" className="text-accent-purple font-medium mb-4">{data.year}</UiTypography>
			<UiTypography variant="body1" className="text-gray-200 line-clamp-3 mb-4">{data.description}</UiTypography>
			<div className="flex flex-wrap gap-2">{data.genres.map((genre) => <UiChip label={genre} key={genre}/>)}</div>
		</div>
	</div>
};