import { DialogProps } from '@headlessui/react';

export interface MovieDialogDataType {
	imageSrc?: string;
	rating: string;
	title: string;
	year?: number;
	description: string;
	genres: string[];
	adult: boolean;
}

export type MovieDialogProps = Omit<DialogProps, 'children' | 'open' | 'onClose'>;
