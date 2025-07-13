import { UiContainerProps } from './types';
import { FC } from 'react';
import { cn } from 'clsx-for-tailwind';

export const UiContainer: FC<UiContainerProps> = ({ variant = 'md', className, children }) => {
	return <div className={cn('p-4 md:p-8 mx-auto my-0', className, {
		['max-w-[1200px]']: variant === 'md',
	})}>{children}</div>;
};