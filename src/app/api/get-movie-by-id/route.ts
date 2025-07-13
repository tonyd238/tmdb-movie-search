import { NextRequest, NextResponse } from 'next/server';
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
	homepage: zod.string().nullable(), // может быть null
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
	release_date: zod.string(), // можно добавить .refine(...) для валидации даты
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

export async function POST(request: NextRequest): Promise<NextResponse> {
	const TOKEN = process.env.JWT_TOKEN;
	try {
		const body = await request.json();
		const bodyParsed = ArgsSchema.safeParse(body);
		if (!bodyParsed.success) {
			return NextResponse.json({ error: 'Invalid arguments for request' }, { status: 502 })
		}
		const res = await fetch(`${process.env.TMDB_BASE_URL}/movie/${bodyParsed.data.movieId}`, {
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
