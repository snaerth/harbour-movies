import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { getMovieLists } from '../../services/movie.service';

const postParams = z.object({
  email: z.string().email(),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'POST') return res.status(405).end();

    const { email } = req.body;

    await postParams.parseAsync({ email });

    const lists = await getMovieLists(email);

    return res.status(200).json(lists);
  } catch (error) {
    if (error instanceof z.ZodError) {
      error = error.issues.map((e) => ({ path: e.path[0], message: e.message }));
    }

    return res.status(409).json({
      status: 'failed',
      message: error.message,
    });
  }
}
