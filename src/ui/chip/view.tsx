import { FC } from 'react';
import { UiChipProps } from './types';
import { UiTypography } from '@/ui/typography';

export const UiChip: FC<UiChipProps> = ({label}) => {
	return <div className="bg-[rgba(118,75,162,0.1)] text-accent-purple px-3 py-1 rounded-[20px] font-medium">
		<UiTypography variant="tag">{label}</UiTypography>
	</div>
};