import './style.css';

type PageLinkProps = {
  page: number;
  isActive: boolean;
};

export const PageLink = ({ page, isActive }: PageLinkProps) => {
  console.log(isActive);
  return (
    <div className={`page-number ${isActive ? 'active' : ''}`}>{page}</div>
  );
};
