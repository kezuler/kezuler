import React, { useCallback, useMemo } from 'react';
import { Avatar, AvatarGroup } from '@mui/material';
import classNames from 'classnames';

import { FIXED_TODAY_ID } from 'src/constants/Main';
import useModal from 'src/hooks/useModal';
import { BFixedEvent } from 'src/types/fixedEvent';
import {
  dateToDailyTime,
  dateToMMdd,
  getDDay,
  getKorDay,
  isSameDate,
} from 'src/utils/dateParser';
import getCurrentUserInfo from 'src/utils/getCurrentUserInfo';
import getTimezoneDate from 'src/utils/getTimezoneDate';

import { ReactComponent as HostIcon } from 'src/assets/icn_host.svg';
import { ReactComponent as LocIcon } from 'src/assets/icn_location_y.svg';
import { ReactComponent as PCIcon } from 'src/assets/icn_pc_y.svg';

interface Props {
  event: BFixedEvent;
  hasTodayId: boolean;
}

function FixedEventCard({ event, hasTodayId }: Props) {
  const { openModal } = useModal();

  const {
    eventId,
    eventTimeStartsAt,
    eventPlace,
    participants,
    eventZoomAddress,
    eventHost: { userId: hostId },
    isDisabled: isCanceled,
  } = event;

  const date = useMemo(
    () => getTimezoneDate(new Date(eventTimeStartsAt).getTime()),
    [event]
  );

  const isHost = useMemo(
    () => hostId === getCurrentUserInfo()?.userId,
    [hostId]
  );

  const tense: 'today' | 'past' | 'future' = useMemo(() => {
    const now = getTimezoneDate(new Date().getTime());
    if (isSameDate(now, date)) {
      return 'today';
    }
    if (now.getTime() > date.getTime()) {
      return 'past';
    }
    return 'future';
  }, [hostId]);

  const handleOverviewClick = () => {
    openModal('Overview', {
      eventId,
      isFixed: true,
      isCanceled,
      isPassed: tense === 'past',
    });
  };

  const MMdd = useMemo(() => dateToMMdd(date), [date]);
  const dailyTime = useMemo(() => dateToDailyTime(date), [date]);
  const dDay = useMemo(() => {
    if (isCanceled) {
      return '취소된 미팅';
    }
    switch (tense) {
      case 'past':
        return '지나간 미팅';
      case 'today':
        return 'Today';
      default:
        return getDDay(date);
    }
  }, [date]);

  const EventLocation = useCallback(() => {
    if (eventPlace) {
      return (
        <div className={'fixed-event-card-place'}>
          <LocIcon />
          {eventPlace}
        </div>
      );
    }
    return (
      <div className={'fixed-event-card-place'}>
        <PCIcon />
        온라인
      </div>
    );
  }, [eventPlace, eventZoomAddress]);

  return (
    <button
      id={hasTodayId ? FIXED_TODAY_ID : undefined}
      onClick={handleOverviewClick}
      className={classNames('fixed-event-card', {
        canceled: isCanceled,
        'is-guest': !isHost,
        passed: tense === 'past',
        today: tense === 'today',
      })}
    >
      {isHost && <HostIcon className={'fixed-event-card-host-badge'} />}
      <div className={'fixed-event-card-date'}>
        <span>{MMdd}</span> {getKorDay(date)}
      </div>
      <div
        className={classNames('fixed-event-card-info', {
          isCanceled: isCanceled,
        })}
      >
        <div>
          <span className={'fixed-event-card-time'}>{dailyTime}</span>
          {dDay}
        </div>
        <div>{event.eventTitle}</div>
        {!isCanceled && (
          <div>
            <AvatarGroup
              max={4}
              classes={{ avatar: 'fixed-event-card-avatar-num' }}
            >
              {participants?.map((p) => (
                <Avatar
                  className={'fixed-event-card-avatar'}
                  key={p.userId}
                  alt={p.userName}
                  src={p.userProfileImage}
                />
              ))}
            </AvatarGroup>
            <EventLocation />
          </div>
        )}
      </div>
    </button>
  );
}

export default FixedEventCard;