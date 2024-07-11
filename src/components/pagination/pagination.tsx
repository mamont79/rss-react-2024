import { makeArray } from './arrayMaker';
import { PageLink } from './pageLink';
import './style.css';

type PaginationProps = {
  currentPage?: number;
  changePage: (page: number) => void;
};

export const Pagination = ({
  currentPage = 1,
  changePage,
}: PaginationProps) => {
  const pagesArray: number[] = makeArray(currentPage);

  return (
    <div className="pagination-wrapper">
      {pagesArray.map((page: number) => (
        <div key={page} onClick={() => changePage(page)}>
          <PageLink page={page} isActive={page === currentPage} />
        </div>
      ))}
    </div>
  );
};
