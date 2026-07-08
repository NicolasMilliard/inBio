import { z } from 'zod';

export const normalizeProfilePath = (value: string) =>
  value
    .trim()
    .replace(/^(?:https?:\/\/)?(?:www\.)?3bio\.social\/?/i, '')
    .replace(/^\/+/, '')
    .replace(/\/+$/, '');

export const profileCheckingFormSchema = z.object({
  link: z
    .string()
    .trim()
    .transform(normalizeProfilePath)
    .refine((value) => value.length > 0, {
      message: 'Enter your Lens handle.',
    })
    .refine((value) => /^[a-zA-Z0-9._-]+$/.test(normalizeProfilePath(value)), {
      message: 'Use only letters, numbers, dots, underscores, or hyphens.',
    }),
});

export type ProfileCheckingFormValues = z.infer<
  typeof profileCheckingFormSchema
>;
