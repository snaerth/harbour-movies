import { NextApiRequest, NextApiResponse } from 'next';
import { deleteMovie, getMovieById, insertMovie, searchMovies } from '../../services/movie.service';
import { z } from 'zod';
import { isImdbId } from '../../utils/isImdbId';
import { Movie } from '../../types/movie';

const queryParamsGet = z.object({
  search: z.string(),
  year: z.string().optional(),
});

const postValidate = z.object({
  id: z.string(),
  email: z.string().email(),
});

const deleteValidate = z.object({
  id: z.string(),
  email: z.string().email(),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      const { search, year } = req.query;

      try {
        await queryParamsGet.parseAsync({ search, year });
        const searchStr = search as string;
        const yearStr = year as string;
        const movies = isImdbId(searchStr) ? await getMovieById(searchStr) : await searchMovies(searchStr, yearStr);

        return res.status(200).json(movies.Search ? movies.Search : [movies as Movie]);
      } catch (error) {}
    } else {
      const { id, email } = req.body;

      if (req.method === 'POST') {
        await postValidate.parseAsync({ id, email });

        const movie = await getMovieById(id);

        await insertMovie(email, id, movie);
      } else if (req.method === 'DELETE') {
        await deleteValidate.parseAsync({ id, email });

        await deleteMovie(email, id);
      }

      return res.status(200).json({ status: 'success' });
    }
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
