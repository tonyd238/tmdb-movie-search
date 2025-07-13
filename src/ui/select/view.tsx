import { FC } from 'react';
import { UiSelectProps } from './types';
import { Select } from '@headlessui/react';
import { UiFilterLabel } from '@/ui/filter-label';

export const UiSelect: FC<UiSelectProps> = ({ options, label, ...props }) => {

	return (
		<UiFilterLabel label={label}>
			<Select
				className="text-ellipsis p-3 border-2 border-[#e1e5e9] rounded-[10px] text-[0.95rem] bg-white transition-colors duration-300 ease-in-out focus:outline-0 focus:border-accent-purple"
				{...props}>
				<option value="">Choose option</option>
				{options.map((option, index) => (
					<option key={index} value={option.value}>{option.label}</option>
				))}
			</Select>
		</UiFilterLabel>
	);
};