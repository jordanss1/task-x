import { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { boolean } from 'yup';
import { authSelector } from '../../features/auth/authSlice';
import { useMediaQuery } from '../../hooks/MediaQueryHooks';
import '../../styles/header.css';
import LightBulb from '../svg/LightBulb';
import HeaderAuth from './HeaderAuth';
import HeaderLogo from './HeaderLogo';

type HeaderPropsType = {
  link: string;
  containerClass?: string;
  nav?: React.ReactNode;
  profile?: boolean;
};

const Header = ({
  link,
  containerClass,
  nav,
  profile,
}: HeaderPropsType): ReactElement => {
  const { user } = useSelector(authSelector);

  const mobile = useMediaQuery(640);

  const renderContent = () => {
    if (nav) {
      return nav;
    }

    return <HeaderAuth user={user} />;
  };

  containerClass = containerClass ? containerClass : '';

  return (
    <header className={`${containerClass} flex justify-center items-center`}>
      <div className="header_logo cursor-pointer mr-auto flex justify-center items-center">
        {(!nav || mobile || profile) && <HeaderLogo link={link} />}
      </div>
      {renderContent()}
    </header>
  );
};

export default Header;
