import { NextRequest, NextResponse } from 'next/server';
import { FiltersSchema, ResponseSchema } from './schema';

export async function GET(request: NextRequest): Promise<Response> {
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
