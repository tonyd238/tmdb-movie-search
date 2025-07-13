import * as zod from 'zod';

export const ResponseSchema = zod.array(zod.string());
export const ReturnSchema = zod.array(zod.object({
	label: zod.string(),
	value: zod.string()
}));