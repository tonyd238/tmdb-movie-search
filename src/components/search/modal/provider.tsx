'use client';
import { ReactElement, ReactNode, useState } from 'react';
import { ModalContext, ModalContextType } from './context';

export interface ProvidersProps {
	children: ReactNode;
}

export function ModalProvider({
	children,
}: ProvidersProps): ReactElement {

	const [data, setData] = useState<Pick<ModalContextType, 'data'>>({
		data: null
	});
	const [modalOpen, setModalOpen] = useState<boolean>(false);

	return (
		<ModalContext.Provider value={{
			data: data.data,
			updateContext: setData,
			setModalOpen: setModalOpen,
			open: modalOpen
		}}>{children}</ModalContext.Provider>
	);
}
