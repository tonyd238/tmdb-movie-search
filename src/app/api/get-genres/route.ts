import { NextResponse } from 'next/server';
import * as zod from 'zod';

export const ResponseSchema = zod.object({
	genres: zod.array(zod.object({
		id: zod.number(),
		name: zod.string(),
	}))
});

export const ReturnSchema = zod.array(zod.object({
	id: zod.number(),
	name: zod.string(),
}))


export async function GET(): Promise<NextResponse> {
	const TOKEN = process.env.JWT_TOKEN;
	try {
		const res = await fetch(`${process.env.TMDB_BASE_URL}/genre/movie/list`, {
			headers: {
				accept: 'application/json',
				Authorization: `Bearer ${TOKEN}`
			}

		});
		const jsonData = await res.json();
		const parsed = ResponseSchema.safeParse(jsonData);
		if (!parsed.success) {
			// Валидация не прошла
			return NextResponse.json({ error: 'Invalid data format from TMDB' }, { status: 502 });
		}

		return NextResponse.json(parsed.data.genres, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error: String(error) }, { status: 500 });
	}
}
