import { HTMLAttributes, JSX, ReactNode } from 'react';

export type UiTypographyVariant =
	| 'h1'
	| 'h2'
	| 'h3'
	| 'h4'
	| 'body1'
	| 'body2'
	| 'caption'
	| 'label'
	| 'subtitle'
	| 'tag';

export interface UiTypographyProps extends HTMLAttributes<HTMLDivElement>{
	variant?: UiTypographyVariant;
	children: ReactNode;
	className?: string;
	as?: keyof JSX.IntrinsicElements; // Позволяет изменить тег
}
