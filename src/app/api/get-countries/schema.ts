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