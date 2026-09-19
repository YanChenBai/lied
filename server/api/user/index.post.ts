import { defineRouteMeta } from 'nitro';
import { defineTypedHandler } from 'pathstrider';
import { z } from 'zod';

const bodySchema = z.object({
  id: z.string().min(1),
});

defineRouteMeta({
  openAPI: {
    tags: ['greeting'],
    description: 'Returns a greeting message',
    responses: {
      200: { description: 'Successful greeting' },
    },
  },
});

const responseSchema = z.object({
  id: z.string(),
  success: z.literal(true),
});

export default defineTypedHandler(
  ({ query }) => {
    return {
      id: query.id,
      success: true,
    };
  },
  {
    query: bodySchema,
    response: responseSchema,
  },
);
