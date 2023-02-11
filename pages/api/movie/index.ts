import { NextApiRequest, NextApiResponse } from 'next';
import { OMDB_API_KEY } from '../../../utils/constants';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).end();

  const { title, year, id } = req.query;

  const baseUrl = `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&plot=full`;
  const query = id ? `${baseUrl}&i=${id}` : `${baseUrl}&s=${title}${year ? `&y=${year}` : ''}`;

  try {
    const response = await fetch(baseUrl + query);
    const data = await response.json();

    res.status(200).json(data);
  } catch (e) {
    res.status(404).send('Not found');
  }
}
