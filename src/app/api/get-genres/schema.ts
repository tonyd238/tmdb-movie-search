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