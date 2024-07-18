import './style.css';

type PageLinkProps = {
  page: number;
  isActive: boolean;
};

export const PageLink = ({ page, isActive }: PageLinkProps) => {
  return (
    <div className={`page-number ${isActive ? 'active' : ''}`}>{page}</div>
  );
};
