import { NextApiRequest, NextApiResponse } from 'next';
import { OMDB_API_KEY } from '../../utils/constants';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).end();

  const { title, year } = req.query;
  const url = `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&plot=full${year ? `&y=${year}` : ''}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    res.status(200).json(data);
  } catch (e) {
    res.status(404).send('Not found');
  }
}
