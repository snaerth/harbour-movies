import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { createList, deleteMovieList, getMovieList } from '../../services/movie.service';

const postParams = z.object({
  name: z.string(),
  email: z.string().email(),
});

const getQueryString = z.object({
  id: z.string(),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'POST') {
      const { name, email } = req.body;

      await postParams.parseAsync({ name, email });

      const list = await createList(name, email);

      return res.status(200).json(list);
    } else if (req.method === 'GET') {
      const id = req.query.id as string;
      await getQueryString.parseAsync({ id });

      const list = await getMovieList(id);

      return res.status(200).json(list);
    } else if (req.method === 'DELETE') {
      const id = req.query.id as string;
      await getQueryString.parseAsync({ id });

      const list = await deleteMovieList(id);

      return res.status(200).json(list);
    }

    return res.status(405).end();
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
