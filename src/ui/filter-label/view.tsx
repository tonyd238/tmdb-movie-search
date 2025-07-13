import { FC } from 'react';
import { UiFilterLabelProps } from './types';

export const UiFilterLabel: FC<UiFilterLabelProps> = ({ label, children }) => {
	return (
		<div className="flex flex-col gap-2">
			<div className="text-gray-400 font-semibold text-[0.9rem]">{label}</div>
			{children}
		</div>
	)
}