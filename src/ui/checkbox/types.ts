import { CheckboxProps } from '@headlessui/react';
import { UiFilterLabelProps } from '@/ui/filter-label';

export interface UiCheckboxProps extends Omit<CheckboxProps, 'children'>, Pick<UiFilterLabelProps, 'label'> {
	content?: string;
}