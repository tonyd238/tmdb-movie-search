import { FC } from 'react';
import { UiProgressProps } from './types';
import { cn } from 'clsx-for-tailwind';

export const UiProgress: FC<UiProgressProps> = ({className}) => {
	return <div className={cn("w-full h-1 bg-white/30 rounded overflow-hidden mb-4", className)}>
		<div className="h-full rounded bg-gradient-to-r from-indigo-400 to-purple-600 animate-progress"/>
	</div>
}
