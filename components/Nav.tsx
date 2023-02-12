import Link from 'next/link';

import { Search } from './Search';

export const Nav = () => {
  return (
    <div className="navbar bg-primary text-primary-content">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost normal-case text-xl">
          Harbour movies
        </Link>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control">
          <Search />
        </div>
      </div>
    </div>
  );
};
