export interface MovieCardDataType {
	id: number;
	imageSrc?: string;
	rating: string;
	title: string;
	year?: number;
	description: string;
	genres: string[];
}

export interface MovieCardProps {
	data: MovieCardDataType
	onClick(id: number): Promise<void>;
}