import { UiTypographyProps, UiTypographyVariant } from './types';
import { FC } from 'react';
import { cn } from 'clsx-for-tailwind';

const variantClassMap: Record<UiTypographyVariant, string> = {
	h1: 'font-bold text-[2rem] md:text-[3rem] leading-16',
	h2: 'text-[1.5rem]',
	h3: 'text-[1.2rem] leading-[1.3]',
	h4: 'text-lg',
	body1: 'text-[0.95rem] leading-[1.5]',
	body2: 'text-[1.1rem]',
	caption: 'text-[0.9rem]',
	label: 'text-[1rem] leading-[1.35]',
	subtitle: 'text-[1.2rem] leading-[1.4]',
	tag: 'text-[0.85rem] font-medium',
};

export const UiTypography: FC<UiTypographyProps> = ({
		variant = 'body1',
		children,
		className,
		...props
	}: UiTypographyProps) => {

	const classes = `${variantClassMap[variant]}`.trim();

	return <div {...props} className={cn(classes, className)}>{children}</div>;
};