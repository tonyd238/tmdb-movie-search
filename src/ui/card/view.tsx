import { FC } from 'react';
import { UiCardProps } from './types';
import { cn } from 'clsx-for-tailwind';

export const UiCard: FC<UiCardProps> = ({className, children}) => {
	return <section className={cn("bg-white/95 p-6 md:p-8 rounded-[20px] drop-shadow-[0_8px_32px_rgba(31,38,135,0.37)]", className)}>
		{children}
	</section>
};