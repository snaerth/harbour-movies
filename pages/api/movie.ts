import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { removeMovie, getMovieById, addMovie, searchMovies } from '../../services/movie.service';
import { isImdbId } from '../../utils/isImdbId';
import { Movie } from '../../types/movie';

const queryParamsGet = z.object({
  search: z.string(),
  year: z.string().optional(),
});

const postValidate = z.object({
  listId: z.number(),
  imdbId: z.string(),
});

const deleteValidate = z.object({
  id: z.number(),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      const { search, year } = req.query;

      await queryParamsGet.parseAsync({ search, year });
      const searchStr = search as string;
      const yearStr = year as string;
      const movies = isImdbId(searchStr) ? await getMovieById(searchStr) : await searchMovies(searchStr, yearStr);

      return res.status(200).json(movies.Search ? movies.Search : [movies as Movie]);
    } else if (req.method === 'POST') {
      const { imdbId, email, listId } = req.body;
      await postValidate.parseAsync({ imdbId, email, listId });
      const movie = await getMovieById(imdbId);

      await addMovie({
        imdbId,
        movie,
        listId,
      });
    } else if (req.method === 'DELETE') {
      const id = req.body.id as number;
      await deleteValidate.parseAsync({ id });

      await removeMovie(id);
    }

    return res.status(200).json({ status: 'success' });
  } catch (error) {
    if (error instanceof z.ZodError) {
      error = error.issues.map((e) => ({ path: e.path[0], message: e.message }));
    }

    return res.status(409).json(error);
  }
}
