import { InputProps } from '@headlessui/react';
import { UiFilterLabelProps } from '@/ui/filter-label';

export interface UiInputProps extends Omit<InputProps, 'children'>, Pick<UiFilterLabelProps, 'label'> {}