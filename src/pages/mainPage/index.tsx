import React, { useEffect, useState } from 'react';
import { Header } from '../../components/header';
import { DisplayCards } from '../../components/display';
import './style.css';
import { useLocalStorage } from '../../customHooks/useLocalStorage';
import { lsItem, maxPage } from '../../constants/constants';
import { Pagination } from '../../components/pagination/pagination';
import {
  Outlet,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { OutOfAmount } from '../outOfAmount/outOfAmount';

export const MainPage: React.FC = () => {
  const params = useParams<Record<string, string>>();
  const { page, details } = params;
  const navigate = useNavigate();
  const pageFromParams = page ? parseInt(page, 10) : 1;
  const [searchParams, setSearchParams] = useSearchParams();
  const [, setInputValue] = useLocalStorage(lsItem);
  const [currentPage, setCurrentPage] = useState(pageFromParams);

  const handleInput = (input: string) => {
    setInputValue(input);
    if (input) setSearchParams({ search: input });
  };

  const handleCurrentPage = (page: number) => {
    setCurrentPage(page);
    navigate(`/page/${page}`);
  };

  const handleMainSectionClick = () => {
    if (details) navigate(`/page/${page}/`);
  };

  useEffect(() => {
    if (!page) navigate(`/page/1`);
    console.log(searchParams);
  }, [navigate, page, searchParams]);

  return (
    <div className="wrapper">
      <Header changeInput={handleInput} />
      <Pagination currentPage={currentPage} changePage={handleCurrentPage} />
      <main className="main-wrapper">
        <div className="sub-wrapper" onClick={handleMainSectionClick}>
          {Number(page) <= maxPage ? <Outlet /> : <OutOfAmount />}
        </div>
      </main>
    </div>
  );
};

export const PageWrapper: React.FC = () => {
  const params = useParams<Record<string, string>>();
  const { details } = params;

  return (
    <div className="sub-wrapper">
      <DisplayCards />
      {details && <Outlet />}
    </div>
  );
};
