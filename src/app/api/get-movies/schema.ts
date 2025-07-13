import * as zod from 'zod';


export const ResponseSchema = zod.object({
	page: zod.number(),
	total_pages: zod.number(),
	total_results: zod.number(),
	results: zod.array(zod.object({
		adult: zod.boolean(),
		backdrop_path: zod.string().nullable().optional(),
		genre_ids: zod.array(zod.number()).optional().default([]),
		id: zod.number(),
		original_language: zod.string(),
		original_title: zod.string(),
		overview: zod.string().optional().default(''),
		popularity: zod.number().optional().default(0),
		poster_path: zod.string().nullable().optional(),
		release_date: zod.string().optional().default(''),
		title: zod.string(),
		video: zod.boolean().optional().default(false),
		vote_average: zod.number().optional().default(0),
		vote_count: zod.number().optional().default(0),
	}))
});

export const FiltersSchema = zod.object({
	query: zod.string(),
	include_adult: zod.boolean().optional(),
	language: zod.string().optional(),
	region: zod.string().optional(),
	primary_release_year: zod.string().optional(),
	year: zod.string().optional(),
	page: zod.number().optional(),
})

export type FilterParamKey = keyof zod.infer<typeof FiltersSchema>;