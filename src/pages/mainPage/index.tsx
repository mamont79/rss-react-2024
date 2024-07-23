import React, { CSSProperties, useCallback, useEffect, useState } from 'react';
import { Header } from '../../components/header';
import { DisplayCards } from '../../components/display';
import './style.css';
import { useLocalStorage } from '../../customHooks/useLocalStorage';
import { LS_ITEM, MAX_PAGE, THEME } from '../../constants/constants';
import { Pagination } from '../../components/pagination/pagination';
import {
  Outlet,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { OutOfAmount } from '../outOfAmount/outOfAmount';
import { useTheme } from '../../context/context';
import { ThemeType } from '../../context/contextTypes';
import { useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { useDispatch } from 'react-redux';
import { getPokemonsAsync } from '../../store/pokemons/pokemonSlice';

export const MainPage: React.FC = () => {
  const pokemons = useSelector((state: RootState) => state.pokemons);
  const dispatch = useDispatch<AppDispatch>();

  const { theme, setCurrentTheme } = useTheme();
  const params = useParams<Record<string, string>>();
  const { page, details } = params;
  const navigate = useNavigate();
  const pageFromParams = page ? parseInt(page, 10) : 1;
  const [searchParams, setSearchParams] = useSearchParams();
  const [, setInputValue] = useLocalStorage(LS_ITEM);
  const [lsTheme] = useLocalStorage(THEME);
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

  const fetchPokemons = useCallback(
    async (page: number) => {
      await dispatch(getPokemonsAsync(page));
    },
    [dispatch]
  );

  useEffect(() => {
    if (page) fetchPokemons(Number(page));
    else fetchPokemons(1);
  }, [fetchPokemons, page]);

  useEffect(() => {
    const check = lsTheme as ThemeType;
    if (check === 'golden') setCurrentTheme(check);
  }, [lsTheme, setCurrentTheme]);

  useEffect(() => {
    if (!page) navigate(`/page/1`);
    console.log(searchParams);
  }, [navigate, page, pokemons, searchParams]);

  return (
    <div className="wrapper" style={{ ...(theme as CSSProperties) }}>
      <Header changeInput={handleInput} />
      <Pagination currentPage={currentPage} changePage={handleCurrentPage} />
      <main className="main-wrapper">
        <div className="sub-wrapper" onClick={handleMainSectionClick}>
          {Number(page) <= MAX_PAGE ? <Outlet /> : <OutOfAmount />}
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
