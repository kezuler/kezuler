import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Comment, MoreHoriz } from '@mui/icons-material';
import classNames from 'classnames';

import KezulerStorageInstance from 'src/constants/api-storage';
import PathName from 'src/constants/PathName';
import useDialog from 'src/hooks/useDialog';
import { RootState } from 'src/reducers';
import { alertAction } from 'src/reducers/alert';
import { createStorageActions } from 'src/reducers/CreateStorage';
import { AppDispatch } from 'src/store';

import TextAppBar from 'src/components/common/TextAppBar';

import 'src/styles/Storage.scss';

function StoragePage() {
  const dispatch = useDispatch<AppDispatch>();
  const { destroy } = createStorageActions;
  const { eventId, id } = useParams();
  const { openDialog } = useDialog();
  const navigate = useNavigate();
  const location = useLocation();
  const menuRef = useRef<any>(null);
  const commentRef = useRef<any>(null);
  const bottomSheetRef = useRef<any>(null);

  const [open, setOpen] = useState(false);
  const [data, setData] = useState<any>(null);
  const [currentUrl, setCurrentUrl] = useState('');
  const [isClickedMenu, setIsClickedMenu] = useState(false);
  const [commentOrDots, setCommentOrDots] = useState<'comment' | 'dots' | null>(
    null
  );
  const [testAppBarTitle, setTextAppBarTitle] = useState('');
  const typeFromPath = location.pathname.split('/')[3];

  const { storageType, storageMemoContent } = useSelector(
    (state: RootState) => state.createStorage
  );
  const { prevUrl, eventTitle } = useSelector(
    (state: RootState) => state.historyStorage
  );

  useEffect(() => {
    setIsClickedMenu(false);
    setCurrentUrl(location.pathname);
    switch (location.pathname) {
      case `${PathName.storage}/${eventId}`: {
        setCommentOrDots('comment');
        setTextAppBarTitle(eventTitle);
        break;
      }
      case `${PathName.storage}/${eventId}/memo/${id}`: {
        setCommentOrDots('dots');
        break;
      }
      case `${PathName.storage}/${eventId}/link/${id}`: {
        setCommentOrDots('dots');
        break;
      }
      default:
        setCommentOrDots(null);
    }
  }, [location]);

  useEffect(() => {
    switch (location.pathname) {
      case `${PathName.storage}/${eventId}/memo`: {
        if (!storageType) {
          navigate(`${PathName.storage}/${eventId}/type`);
        }
        break;
      }
      case `${PathName.storage}/${eventId}/memo/title`: {
        if (storageMemoContent === '') {
          navigate(`${PathName.storage}/${eventId}/type`);
        }
        break;
      }
    }
    return () => {
      dispatch(destroy());
    };
  }, []);

  const handleDeleteClick = () => {
    openDialog({
      title: '삭제후, 복구는 불가능합니다.\n삭제하시겠습니까?',
      onConfirm: () => {
        KezulerStorageInstance.delete(`/${typeFromPath}/${id}`).then(() => {
          navigate(`${PathName.storage}/${eventId}`);
        });
      },
    });
  };

  const handleEditClick = () => {
    console.log(location.pathname);
    navigate(`${PathName.storage}/${eventId}/${typeFromPath}/${id}/edit`);
  };

  const handlePrevClick = () => {
    if (currentUrl === `${PathName.storage}/${eventId}`) {
      if (!prevUrl) navigate(`${PathName.mainFixed}`);
      else navigate(prevUrl);
    } else navigate(-1);
  };

  window.onpopstate = function () {
    //뒤로가기를 한 페이지가 미팅일정선택완료 페이지면 메인페이지(fixed)로 이동.
    if (currentUrl === `${PathName.storage}/${eventId}`) {
      if (!prevUrl) navigate(`${PathName.mainFixed}`);
      else navigate(prevUrl);
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', clickMenuOutside);
    document.addEventListener('mousedown', clickCommetsOutside);

    return () => {
      document.removeEventListener('mousedown', clickMenuOutside);
      document.removeEventListener('mousedown', clickCommetsOutside);
    };
  });

  const clickMenuOutside = (e: MouseEvent) => {
    if (
      isClickedMenu &&
      menuRef.current &&
      !menuRef.current.contains(e.target)
    ) {
      setIsClickedMenu(false);
    }
  };

  const clickCommetsOutside = (e: MouseEvent) => {
    if (
      open &&
      commentRef.current &&
      !commentRef.current.contains(e.target) &&
      !bottomSheetRef.current.contains(e.target)
    ) {
      setOpen(false);
    }
  };

  return (
    <div>
      <div>
        <TextAppBar
          onClick={handlePrevClick}
          text={testAppBarTitle}
          mainColored={true}
        />
        <div className="comment-icon">
          {commentOrDots === 'comment' && (
            <>
              {data?.storage?.comments.length !== 0 && (
                <div>{data?.storage?.comments.length}</div>
              )}
              <Comment
                ref={commentRef}
                onClick={() => setOpen((prev) => !prev)}
              />
            </>
          )}
          {commentOrDots === 'dots' && (
            <div className="dots-wrapper">
              <MoreHoriz onClick={() => setIsClickedMenu((prev) => !prev)} />
              {isClickedMenu && (
                <div className="dots-menu">
                  {typeFromPath === 'memo' && (
                    <div
                      onClick={handleEditClick}
                      className="dots-menu-content"
                    >
                      편집하기
                    </div>
                  )}
                  {typeFromPath === 'memo' && (
                    <div
                      onClick={handleDeleteClick}
                      className={classNames('dots-menu-content', 'border-top')}
                    >
                      삭제하기
                    </div>
                  )}
                  {typeFromPath !== 'memo' && (
                    <div
                      onClick={handleDeleteClick}
                      className={classNames('dots-menu-content')}
                    >
                      삭제하기
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
        <Outlet
          context={{ setTextAppBarTitle, setData, data, open, bottomSheetRef }}
        />
      </div>
    </div>
  );
}

export default StoragePage;
