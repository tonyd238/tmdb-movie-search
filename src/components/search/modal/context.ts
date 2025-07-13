'use client';
import { createContext, Dispatch, SetStateAction, useContext } from 'react';
import * as zod from 'zod';
import { ApiGetMovieByIdSchema } from '@/app/api/get-movie-by-id';

export interface ModalContextType {
	data: zod.infer<typeof ApiGetMovieByIdSchema> | null;
	updateContext: Dispatch<SetStateAction<Pick<ModalContextType, 'data'>>>,
	setModalOpen: Dispatch<SetStateAction<boolean>>
	open: boolean;
}
export const ModalContext = createContext<ModalContextType>({
	data: null,
	updateContext: () => undefined,
	setModalOpen: () => undefined,
	open: false
});

export function useModalContext() {
	const context = useContext(ModalContext);

	if (!context) {
		throw new Error('useModalContext must be used within a ModalContext.Provider');
	}

	return context;
}