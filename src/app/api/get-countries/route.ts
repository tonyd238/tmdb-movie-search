import { NextResponse } from 'next/server';
import { ResponseSchema } from './schema';

export async function GET(): Promise<Response> {
	const API_KEY = process.env.API_KEY;
	try {
		const res = await fetch(`${process.env.TMDB_BASE_URL}/configuration/countries?api_key=${API_KEY}`, {
			headers: {
				'Access-Control-Allow-Origin': '*',
			}
		});
		const jsonData = await res.json();

		const parsed = ResponseSchema.safeParse(jsonData);
		if (!parsed.success) {
			return NextResponse.json({ error: 'Invalid data format from TMDB' }, { status: 502 });
		}

		return NextResponse.json(parsed.data.map((item) => {
			return {
				label: item.english_name,
				value: item.iso_3166_1
			}
		}), { status: 200 });
	} catch (error) {
		return NextResponse.json({ error: String(error) }, { status: 500 });
	}
}
