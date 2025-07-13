import { NextResponse } from 'next/server';
import { ResponseSchema } from './schema';

export async function GET(): Promise<Response> {
	const TOKEN = process.env.JWT_TOKEN;
	try {
		const res = await fetch(`${process.env.TMDB_BASE_URL}/genre/movie/list`, {
			headers: {
				'Access-Control-Allow-Origin': '*',
				accept: 'application/json',
				Authorization: `Bearer ${TOKEN}`
			}

		});
		const jsonData = await res.json();
		const parsed = ResponseSchema.safeParse(jsonData);
		if (!parsed.success) {
			return NextResponse.json({ error: 'Invalid data format from TMDB' }, { status: 502 });
		}

		return NextResponse.json(parsed.data.genres, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error: String(error) }, { status: 500 });
	}
}
