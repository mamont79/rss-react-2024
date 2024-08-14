import { Link, useLocation } from 'react-router-dom';
import './style.css';

const linksData = [
  { linkTo: '/', text: 'Main Page', key: 'main' },
  { linkTo: '/uncontrolled', text: 'Uncontrolled form', key: 'uncontrolled' },
  { linkTo: '/react-form', text: 'React form', key: 'react' },
];

export const Header = () => {
  const location = useLocation();

  return (
    <header className="header">
      {linksData.map(({ linkTo, text, key }) => (
        <Link key={key} to={linkTo} className="link">
          <div
            className={
              location.pathname !== linkTo
                ? 'header-link'
                : 'header-link-disabled'
            }
          >
            {text}
          </div>
        </Link>
      ))}
    </header>
  );
};
