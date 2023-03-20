import { SearchResults } from '../components/SearchResults';
import { OpenAI } from '../components/OpenAI';

export default async function MoviesPage() {
  return (
    <div>
      <OpenAI />
      <SearchResults />
    </div>
  );
}
