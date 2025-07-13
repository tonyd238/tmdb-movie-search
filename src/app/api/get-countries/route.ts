import { NextResponse } from 'next/server';
import * as zod from 'zod';

export const ResponseSchema = zod.array(zod.object({
	iso_3166_1: zod.string(),
	english_name: zod.string(),
	native_name: zod.string(),
}));

export const ReturnSchema = zod.array(zod.object({
	label: zod.string(),
	value: zod.string()
}));


export async function GET(): Promise<NextResponse> {
	const API_KEY = process.env.API_KEY;
	try {
		const res = await fetch(`${process.env.TMDB_BASE_URL}/configuration/countries?api_key=${API_KEY}`);
		const jsonData = await res.json();

		const parsed = ResponseSchema.safeParse(jsonData);
		if (!parsed.success) {
			// Валидация не прошла
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
