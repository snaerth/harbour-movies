import { NextApiRequest, NextApiResponse } from 'next';
import { getMovieListItems } from '../../services/movie.service';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'GET') return res.status(405).end();

    const listId = req.query.listId as string;

    if (!listId) {
      return res.status(422).json({ error: 'Please provide a valid movie list id' });
    }

    const myMovies = await getMovieListItems(parseInt(listId, 10));

    res.status(200).json(myMovies);
  } catch (error) {
    res.status(409).send(error.message);
  }
}
