import imdbTop250 from '../../data/imdb_top_250.json'


import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if(req.method !== 'GET') return res.status(405).end()

  res.status(200).json(imdbTop250)
}