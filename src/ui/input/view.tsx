import { FC } from 'react';
import { UiInputProps } from './types';
import { Input } from '@headlessui/react';
import { UiFilterLabel } from '@/ui/filter-label';

export const UiInput: FC<UiInputProps> = ({ label, ...props }) => {
	return (
		<UiFilterLabel label={label}>
			<Input
				className="text-ellipsis p-3 border-2 border-[#e1e5e9] rounded-[10px] text-[0.95rem] bg-white transition-colors duration-300 ease-in-out focus:outline-0 focus:border-accent-purple"
				{...props}/>
		</UiFilterLabel>
	);
};