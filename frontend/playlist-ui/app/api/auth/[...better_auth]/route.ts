import { toNextJsHandler } from 'better-auth/next-js';
import { auth } from '@/lib/providers/spotify';

export const { GET, POST } = toNextJsHandler(auth);
