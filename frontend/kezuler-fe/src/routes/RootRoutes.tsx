import React, { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import PathName from 'src/constants/PathName';
import useGetUserInfo from 'src/hooks/useGetUserInfo';
import useIsLoggedIn from 'src/hooks/useIsLoggedIn';

import AcceptMeeting from 'src/views/accept-meeting';
import AcceptanceCompletion from 'src/views/accept-meeting/AcceptanceCompletion';
import AcceptFixedCompletion from 'src/views/accept-meeting/AcceptFixedCompletion';
import AcceptIndex from 'src/views/accept-meeting/AcceptIndex';
import Invitation from 'src/views/accept-meeting/Invitation';
import SelectionModifier from 'src/views/accept-meeting/SelectionModifier';
import TimeListSelector from 'src/views/accept-meeting/TimeListSelector';
import AddTime from 'src/views/add-time';
import CalendarTimeSelectorAddTime from 'src/views/add-time/CalendarTimeSelectorAddTime';
import SelectedOptionsAddTime from 'src/views/add-time/SelectedOptionsAddTime';
import CreateMeeting from 'src/views/create-meeting';
import CalendarTimeSelector from 'src/views/create-meeting/CalendarTimeSelector';
import MeetingInfoForm from 'src/views/create-meeting/MeetingInfoForm';
import MeetingShare from 'src/views/create-meeting/MeetingShare';
import OnOffSelector from 'src/views/create-meeting/OnOffSelector';
import SelectedOptions from 'src/views/create-meeting/SelectedOptions';
import InAppNotiPage from 'src/views/InAppNotiPage';
import KakaoRedirect from 'src/views/KakaoRedirect';
import LandingPage from 'src/views/LandingPage';
import Login from 'src/views/Login';
import MainPage from 'src/views/MainPage';
import MyPage from 'src/views/MyPage';
import NotFound from 'src/views/NotFound';
import TimeConfirmator from 'src/views/pending-event/TimeConfirmator';
import RedirectView from 'src/views/RedirectView';
import StoragePage from 'src/views/storage';
import StorageIndex from 'src/views/storage/StorageIndex';
import StorageLink from 'src/views/storage/StorageLink';
import StorageLinkWrite from 'src/views/storage/StorageLinkWrite';
import StorageMemo from 'src/views/storage/StorageMemo';
import StorageMemoWrite from 'src/views/storage/StorageMemoWrite';
import StorageTitle from 'src/views/storage/StorageTitle';
import StorageTypeSelect from 'src/views/storage/StorageTypeSelect';
import MainFixedEvents from 'src/components/main-page/main-fixed-events';
import MainPendingEvents from 'src/components/main-page/main-pending-events';
import OverviewModal from 'src/components/main-page/overview-modal';
import PrivacyPolicy from 'src/components/my-page/PrivacyPolicy';
import TermsOfService from 'src/components/my-page/TermsOfService';
import ParticipantsPopup from 'src/components/participants-popup';

// TODO kakao redirect 가 isLoggedIn true 일 때도 있어야하는데, 순서가 맞게 되어있는지 확인 필요
function RootRoutes() {
  const isLoggedIn = useIsLoggedIn();
  const location = useLocation();

  // TODO 리덕스 필요한지 확인 필요
  const { getUserInfo } = useGetUserInfo();
  useEffect(() => {
    if (isLoggedIn) {
      getUserInfo();
    }
  }, [isLoggedIn]);

  // 경로에 맞게 HTML Meta Title 수정
  useEffect(() => {
    let title = '케줄러 - 일잘러들을 위한 스마트 스케줄러';
    const mainRegex = /^\/main\/.+\/.+\/info/;
    const pathname = location.pathname;
    if (pathname.startsWith('/mypage')) {
      title = '마이페이지 - 케줄러';
    } else if (pathname.startsWith('/create')) {
      title = '미팅 생성 - 케줄러';
    } else if (pathname.startsWith('/invite')) {
      title = '미팅 시간 투표 - 케줄러';
    } else if (pathname.match(mainRegex)) {
      title = '미팅 정보 - 케줄러';
    }

    const htmlTitle = document.querySelector('title');
    if (htmlTitle) {
      htmlTitle.innerHTML = title;
    }
  }, [location.pathname]);

  return (
    <>
      {isLoggedIn ? (
        <main>
          <Routes>
            <Route
              index
              element={<Navigate replace to={PathName.mainFixed} />}
            />
            <Route
              path={PathName.mainFixedIdInfoParticipants}
              element={<ParticipantsPopup />}
            />
            <Route
              path={PathName.mainPendingIdParticipants}
              element={<ParticipantsPopup />}
            />
            <Route path={PathName.main} element={<MainPage />}>
              <Route
                index
                element={<Navigate replace to={PathName.mainFixed} />}
              />
              <Route path={PathName.mainFixed} element={<MainFixedEvents />}>
                <Route
                  path={PathName.mainFixedIdInfo}
                  element={<OverviewModal />}
                />
                <Route
                  path={PathName.mainFixedIdInfoEdit}
                  element={<OverviewModal />}
                />
              </Route>

              <Route
                path={PathName.mainPending}
                element={<MainPendingEvents />}
              >
                <Route
                  path={PathName.mainPendingIdInfo}
                  element={<OverviewModal />}
                />
                <Route
                  path={PathName.mainPendingIdInfoEdit}
                  element={<OverviewModal />}
                />
              </Route>

              <Route
                path="*"
                element={<Navigate replace to={PathName.mainFixed} />}
              />
            </Route>
            {/* <Route path={PathName.notification} element={<NotiPage />} /> */}
            <Route path={PathName.myPage} element={<MyPage />} />
            <Route path={PathName.privacyPolicy} element={<PrivacyPolicy />} />
            <Route path={PathName.serviceTerm} element={<TermsOfService />} />
            <Route path={PathName.create} element={<CreateMeeting />}>
              <Route
                index
                element={<Navigate replace to={PathName.createInfo} />}
              />
              <Route path={PathName.createInfo} element={<MeetingInfoForm />} />
              <Route
                path={PathName.createTime}
                element={<CalendarTimeSelector />}
              />
              <Route
                path={PathName.createCheck}
                element={<SelectedOptions />}
              />
              <Route path={PathName.createPlace} element={<OnOffSelector />} />
              <Route
                path={PathName.createComplete}
                element={<MeetingShare />}
              />
              <Route
                path="*"
                element={<Navigate replace to={PathName.createInfo} />}
              />
            </Route>
            <Route path={PathName.modify} element={<SelectionModifier />} />
            <Route
              path={PathName.modifyParticipants}
              element={<ParticipantsPopup />}
            />
            <Route
              path={`${PathName.confirm}/:eventConfirmId`}
              element={<TimeConfirmator />}
            />
            <Route
              path={`${PathName.confirm}/:eventConfirmId/participants`}
              element={<ParticipantsPopup />}
            />
            <Route path={`/:type/:eventConfirmId/time`} element={<AddTime />}>
              <Route index element={<CalendarTimeSelectorAddTime />} />
              <Route
                path={`/:type/:eventConfirmId/time/check`}
                element={<SelectedOptionsAddTime />}
              />
            </Route>
            <Route
              path={`${PathName.invite}/:eventId`}
              element={<AcceptMeeting />}
            >
              <Route index element={<AcceptIndex />} />
              <Route
                path={PathName.inviteInvitation}
                element={<Invitation />}
              />
              <Route
                path={PathName.inviteSelect}
                element={<TimeListSelector />}
              />

              <Route
                path={PathName.inviteSelectParticipants}
                element={<ParticipantsPopup />}
              />
              <Route
                path={PathName.inviteComplete}
                element={<AcceptanceCompletion />}
              />
              <Route
                path={PathName.inviteCompleteFixed}
                element={<AcceptFixedCompletion />}
              />
              <Route path="*" element={<AcceptIndex />} />
            </Route>
            <Route
              path={`${PathName.storage}/:eventId`}
              element={<StoragePage />}
            >
              <Route index element={<StorageIndex />} />
              <Route
                path={`${PathName.storageTypeSelect}`}
                element={<StorageTypeSelect />}
              />
              <Route
                path={`${PathName.storageMemoWrite}`}
                element={<StorageMemoWrite />}
              />
              <Route
                path={`${PathName.storageMemoEdit}`}
                element={<StorageMemoWrite />}
              />
              <Route
                path={`${PathName.storageLinkWrite}`}
                element={<StorageLinkWrite />}
              />
              <Route
                path={`${PathName.storageTitle}`}
                element={<StorageTitle />}
              />
              <Route
                path={`${PathName.storageMemo}`}
                element={<StorageMemo />}
              />
              <Route
                path={`${PathName.storageLink}`}
                element={<StorageLink />}
              />
            </Route>
            <Route path={PathName.kakaoRedirect} element={<KakaoRedirect />} />
            <Route path={PathName.landing} element={<LandingPage />} />
            <Route path={PathName.notFound} element={<NotFound />} />
            <Route path={PathName.InAppNoti} element={<InAppNotiPage />} />
            <Route
              path="*"
              element={<Navigate replace to={PathName.notFound} />}
            />
          </Routes>
        </main>
      ) : (
        <main>
          <Routes>
            <Route index element={<Navigate replace to={PathName.login} />} />
            <Route path={PathName.landing} element={<LandingPage />} />
            <Route path={PathName.create} element={<CreateMeeting />}>
              <Route
                index
                element={<Navigate replace to={PathName.createInfo} />}
              />
              <Route path={PathName.createInfo} element={<MeetingInfoForm />} />
              <Route
                path={PathName.createTime}
                element={<CalendarTimeSelector />}
              />
              <Route
                path={PathName.createCheck}
                element={<SelectedOptions />}
              />
              <Route path={PathName.createPlace} element={<OnOffSelector />} />
              <Route
                path={PathName.createComplete}
                element={<MeetingShare />}
              />
              <Route
                path="*"
                element={<Navigate replace to={PathName.createInfo} />}
              />
            </Route>
            <Route
              path={`${PathName.invite}/:eventId`}
              element={<AcceptMeeting />}
            >
              <Route index element={<AcceptIndex />} />
              <Route
                path={PathName.inviteInvitation}
                element={<Invitation />}
              />
              <Route path="*" element={<AcceptIndex />} />
            </Route>
            {/* <Route path={PathName.create} element={<CreateMeeting />}>
              <Route
                index
                element={<Navigate replace to={PathName.createInfo} />}
              />
              <Route path={PathName.createInfo} element={<MeetingInfoForm />} />
              <Route
                path={PathName.createTime}
                element={<CalendarTimeSelector />}
              />
              <Route
                path={PathName.createCheck}
                element={<SelectedOptions />}
              />
              <Route path={PathName.createPlace} element={<OnOffSelector />} />
              <Route
                path={PathName.createComplete}
                element={<MeetingShare />}
              />
              <Route
                path="*"
                element={<Navigate replace to={PathName.createInfo} />}
              />
            </Route> */}
            {/* <Route path={PathName.myPage} element={<MyPage />} /> */}
            <Route path={PathName.privacyPolicy} element={<PrivacyPolicy />} />
            <Route path={PathName.serviceTerm} element={<TermsOfService />} />
            <Route path={PathName.login} element={<Login />}>
              <Route path="*" element={<Login />} />
            </Route>
            <Route path={PathName.kakaoRedirect} element={<KakaoRedirect />} />
            <Route path={PathName.notFound} element={<NotFound />} />
            <Route path="*" element={<RedirectView />} />
          </Routes>
        </main>
      )}
    </>
  );
}

export default RootRoutes;
