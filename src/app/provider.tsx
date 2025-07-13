'use client';
import { ReactElement, ReactNode } from 'react';
import { BaseContext, BaseContextType } from './context';

export interface ProvidersProps {
	children: ReactNode;
	data: BaseContextType
}

export function BaseProvider({
	children,
	data
}: ProvidersProps): ReactElement {
	return (
		<BaseContext.Provider value={{
			...data
		}}>{children}</BaseContext.Provider>
	);
}
