import { NextRequest, NextResponse } from 'next/server';
import * as zod from 'zod';

export const ResponseSchema = zod.object({
	page: zod.number(),
	total_pages: zod.number(),
	total_results: zod.number(),
	results: zod.array(zod.object({
		adult: zod.boolean(),
		backdrop_path: zod.string().nullable(),
		genre_ids: zod.array(zod.number()),
		id: zod.number(),
		original_language: zod.string(),
		original_title: zod.string(),
		overview: zod.string(),
		popularity: zod.number(),
		poster_path: zod.string().nullable(),
		release_date: zod.string(),
		title: zod.string(),
		video: zod.boolean(),
		vote_average: zod.number(),
		vote_count: zod.number(),
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

export async function GET(request: NextRequest): Promise<NextResponse> {
	const TOKEN = process.env.JWT_TOKEN;
	const searchParams = request.nextUrl.searchParams;
	const filters = FiltersSchema.parse({
		query: searchParams.get('query') ?? '',
		include_adult: searchParams.get('include_adult') === 'true',
		language: searchParams.get('language') ?? 'en-US',
		primary_release_year: searchParams.get('primary_release_year') ?? '',
		region: searchParams.get('region') ?? '',
		year: searchParams.get('year') ?? '',
		page: searchParams.get('page') ? !isNaN(Number(searchParams.get('page'))) ? Number(searchParams.get('page')) : 1 : 1,
	})

	const queryParams = Object.entries(filters).map(([key, value]) => {
		return `${key}=${value}`;
	}).join('&');
	try {
		const res = await fetch(`${process.env.TMDB_BASE_URL}/search/movie?${queryParams}`, {
			headers: {
				accept: 'application/json',
				Authorization: `Bearer ${TOKEN}`
			}
		});
		const jsonData = await res.json();

		const parsed = ResponseSchema.safeParse(jsonData);
		if (!parsed.success) {
			return NextResponse.json({ error: 'Invalid data format from TMDB' }, { status: 502 });
		}

		return NextResponse.json(parsed.data, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error: String(error) }, { status: 500 });
	}
}
