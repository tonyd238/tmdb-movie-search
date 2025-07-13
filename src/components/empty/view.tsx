import { UiTypography } from '@/ui';
import { FC } from 'react';
import { EmptyProps } from './types';

export const Empty: FC<EmptyProps> = ({className}) => {
	return <div className={className}>
		<UiTypography variant="h2" className="font-bold text-gray-400 text-center mb-4">No movies
			found</UiTypography>
		<UiTypography variant="body2" className="text-gray-200 text-center">Try searching with different
			keywords or check your spelling.</UiTypography>
	</div>
}