import { SelectProps } from '@headlessui/react';
import { UiFilterLabelProps } from '@/ui/filter-label';

interface Option {
	value: string;
	label: string;
}

export interface UiSelectProps extends Omit<SelectProps, 'children'>, Pick<UiFilterLabelProps, 'label'> {
	options: Option[];
}