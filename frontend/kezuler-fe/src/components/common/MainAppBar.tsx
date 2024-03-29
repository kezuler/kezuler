import * as React from 'react';
import { useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';

// import classNames from 'classnames';
import PathName from 'src/constants/PathName';
import getCurrentUserInfo from 'src/utils/getCurrentUserInfo';

import CommonAppBar from 'src/components/common/CommonAppBar';

// import { ReactComponent as BellIcon } from 'src/assets/icn_bell.svg';
import { ReactComponent as KezulerLogo } from 'src/assets/logo_kezuler.svg';

function MainAppBar() {
  // const hasNew = true;
  const currentUser = useMemo(() => getCurrentUserInfo(), []);

  return (
    <CommonAppBar>
      <div className={'main-app-bar'}>
        <NavLink to={PathName.mainFixed}>
          <KezulerLogo />
        </NavLink>
        <div className={'main-app-bar-btn'}>
          {/* <NavLink
            className={classNames({
              new: hasNew,
            })}
            to={PathName.notification}
          >
            <BellIcon />
          </NavLink> */}
          <NavLink to={PathName.myPage}>
            <Avatar
              alt={currentUser?.userName}
              src={currentUser?.userProfileImage}
            />
          </NavLink>
        </div>
      </div>
    </CommonAppBar>
  );
}

export default MainAppBar;
