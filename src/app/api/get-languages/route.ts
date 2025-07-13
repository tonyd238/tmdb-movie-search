import { NextResponse } from 'next/server';
import * as zod from 'zod';

export const ResponseSchema = zod.array(zod.string());
export const ReturnSchema = zod.array(zod.object({
	label: zod.string(),
	value: zod.string()
}));

export async function GET(): Promise<NextResponse> {
	const API_KEY = process.env.API_KEY;
	try {
		const res = await fetch(`${process.env.TMDB_BASE_URL}/configuration/primary_translations?api_key=${API_KEY}`);
		const jsonData = await res.json();

		const parsed = ResponseSchema.safeParse(jsonData);
		if (!parsed.success) {
			// Валидация не прошла
			return NextResponse.json({ error: 'Invalid data format from TMDB' }, { status: 502 });
		}

		return NextResponse.json(parsed.data.map((lang) => {
			const languageName = new Intl.DisplayNames(['en'], { type: 'language' }).of(lang.split('-')[0]);
			const regionName = new Intl.DisplayNames(['en'], { type: 'region' }).of(lang.split('-')[1]);
			return {
				label: `${languageName} (${regionName})`,
				value: lang
			}
		}), { status: 200 });
	} catch (error) {
		return NextResponse.json({ error: String(error) }, { status: 500 });
	}
}
