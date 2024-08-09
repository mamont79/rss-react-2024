import { Link, useLocation } from 'react-router-dom';
import './style.css';

const linksData = [
  { linkTo: '/', text: 'Main Page', key: 'main' },
  { linkTo: '/react-form', text: 'React form', key: 'react' },
  { linkTo: '/uncontrolled', text: 'Uncontrolled form', key: 'uncontrolled' },
];

export const Header = () => {
  const location = useLocation();

  const data = linksData.filter((elem) => elem.linkTo !== location.pathname);

  return (
    <header className="header">
      {data.map(({ linkTo, text, key }) => (
        <Link key={key} to={linkTo} className="link">
          <div className="header-link">{text}</div>
        </Link>
      ))}
    </header>
  );
};
