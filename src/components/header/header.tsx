import { Link, useLocation } from 'react-router-dom';
import './style.css';

const linksData = [
  { linkTo: '/', text: 'Main Page' },
  { linkTo: '/react-form', text: 'React form' },
  { linkTo: '/uncontrolled', text: 'Uncontrolled form' },
];

export const Header = () => {
  const location = useLocation();

  const data = linksData.filter((elem) => elem.linkTo !== location.pathname);

  return (
    <header className="header">
      {data.map(({ linkTo, text }) => (
        <Link to={linkTo} className="link">
          <div key={linkTo} className="header-link">
            {text}
          </div>
        </Link>
      ))}
    </header>
  );
};
