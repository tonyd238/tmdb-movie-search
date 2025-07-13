import { NextRequest, NextResponse } from 'next/server';
import { ArgsSchema, ResponseSchema } from './schema';

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

		return NextResponse.json(parsed.data, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error: String(error) }, { status: 500 });
	}
}
