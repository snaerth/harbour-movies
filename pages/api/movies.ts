import { NextApiRequest, NextApiResponse } from 'next';

import { getMovieById } from '../../services/movie.service';
import { Movie } from '../../types/movie';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { ids } = req.body;

  if (!ids || Array.isArray(ids)) {
    return res.status(422).json({ error: 'Please provide an array of ids' });
  }

  try {
    const movies = await Promise.all(ids.map((id) => getMovieById(id)));

    res.status(200).json(movies as Movie[]);
  } catch (e) {
    res.status(500).send('Internal server error');
  }
}
