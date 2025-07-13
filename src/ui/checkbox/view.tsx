import { FC } from 'react';
import { UiCheckboxProps } from './types';
import { Checkbox, Field, Label } from '@headlessui/react';
import { UiFilterLabel } from '@/ui/filter-label';

export const UiCheckbox: FC<UiCheckboxProps> = ({ label, content, ...props }) => {
	return (
		<UiFilterLabel label={label}>
			<Field className="flex items-center mt-2 cursor-pointer">
				<Checkbox
					{...props}
					className="group block size-4 rounded-[2px] border bg-white data-checked:bg-blue-500"
				>
					<svg className="stroke-white opacity-0 group-data-checked:opacity-100" viewBox="0 0 14 14"
						 fill="none">
						<path d="M3 8L6 11L11 3.5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
					</svg>
				</Checkbox>
				<Label className="select-none cursor-pointer pl-3">{content}</Label>
			</Field>
		</UiFilterLabel>
	)
}