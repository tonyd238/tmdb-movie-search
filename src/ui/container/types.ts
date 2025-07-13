import { ReactNode } from 'react';

export interface UiContainerProps {
	variant?: 'md' | 'sm' | 'lg';
	className?: string;
	children: ReactNode;
}