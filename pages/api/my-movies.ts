import { NextApiRequest, NextApiResponse } from 'next';
import { isEmail } from '../../utils/isEmail';
import { getMyMovies } from '../../services/movie.service';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'GET') return res.status(405).end();

    const email = req.query.email as string;

    if (!isEmail(email)) {
      return res.status(422).json({ error: 'Please provide a valid email address' });
    }

    const myMovies = await getMyMovies(email);

    res.status(200).json(myMovies);
  } catch (error) {
    res.status(409).send(error.message);
  }
}
