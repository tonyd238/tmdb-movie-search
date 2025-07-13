import { FC } from 'react';
import { SpinnerProps } from './types';
import { cn } from 'clsx-for-tailwind';

export const Spinner: FC<SpinnerProps> = ({className}) => {
	return <div className={cn("text-center py-12 text-gray-500", className)}>
		<div className="w-10 h-10 border-4 border-gray-200 border-t-accent-purple rounded-full animate-spin mx-auto mb-4"/>
		<p>Searching for movies...</p>
	</div>
}