import * as zod from 'zod';

export const ResponseSchema = zod.object({
	adult: zod.boolean(),
	backdrop_path: zod.string().nullable(),
	belongs_to_collection: zod
		.object({
			id: zod.number(),
			name: zod.string(),
			poster_path: zod.string().nullable(),
			backdrop_path: zod.string().nullable(),
		})
		.nullable(),
	budget: zod.number(),
	genres: zod.array(
		zod.object({
			id: zod.number(),
			name: zod.string(),
		})
	),
	homepage: zod.string().nullable(),
	id: zod.number(),
	imdb_id: zod.string().nullable(),
	origin_country: zod.array(zod.string()),
	original_language: zod.string(),
	original_title: zod.string(),
	overview: zod.string(),
	popularity: zod.number(),
	poster_path: zod.string().nullable(),
	production_companies: zod.array(
		zod.object({
			id: zod.number(),
			logo_path: zod.string().nullable(),
			name: zod.string(),
			origin_country: zod.string(),
		})
	),
	production_countries: zod.array(
		zod.object({
			iso_3166_1: zod.string(),
			name: zod.string(),
		})
	),
	release_date: zod.string(),
	revenue: zod.number(),
	runtime: zod.number().nullable(),
	spoken_languages: zod.array(
		zod.object({
			english_name: zod.string(),
			iso_639_1: zod.string(),
			name: zod.string(),
		})
	),
	status: zod.string(),
	tagline: zod.string().nullable(),
	title: zod.string(),
	video: zod.boolean(),
	vote_average: zod.number(),
	vote_count: zod.number(),
});

export const ArgsSchema = zod.object({
	movieId: zod.number(),
}).required();