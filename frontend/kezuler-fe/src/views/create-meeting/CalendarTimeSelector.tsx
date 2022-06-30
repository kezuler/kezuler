import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Stack from '@mui/material/Stack';
import classNames from 'classnames';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

import TimeOptions from '../../constants/TimeOptions';
import { MEETING_LENGTH_LIST } from 'src/constants/CreateMeeting';
import { CREATE_CALENDAR_POPUP_DISABLE_KEY } from 'src/constants/Popup';
import { RootState } from '../../reducers';
import { createMeetingActions } from '../../reducers/CreateMeeting';
import { dialogAction } from 'src/reducers/dialog';
import { AppDispatch } from '../../store';
import getTimezoneDate, { getUTCDate } from 'src/utils/getTimezoneDate';

import BottomButton from '../../components/common/BottomButton';
import CalendarView from '../../components/create-meeting/CalendarView';
import KezulerDropdown from 'src/components/common/KezulerDropdown';
import CalendarPopup from 'src/components/create-meeting/CalendarPopup';
import ScheduleList from 'src/components/create-meeting/ScheduleList';

import { ReactComponent as CalendarIcon } from 'src/assets/calendar_icon.svg';
import { ReactComponent as ClockIcon } from 'src/assets/clock_icon.svg';
import { ReactComponent as ClockOrangeIcon } from 'src/assets/icn_clock_o20.svg';
import { ReactComponent as ArrowDownIcon } from 'src/assets/icn_dn_outline.svg';

function CalendarTimeSelector() {
  const dispatch = useDispatch<AppDispatch>();
  const { eventTimeList } = useSelector(
    (state: RootState) => state.createMeeting
  );
  const { increaseStep, addTimeList, deleteTimeList, seteventTimeDuration } =
    createMeetingActions;

  const [startDate, setStartDate] = useState<Date | null>(
    getTimezoneDate(new Date().getTime())
  );
  const { show } = dialogAction;

  const dateStr = useMemo(
    () =>
      startDate ? (
        <div>
          <b>{format(startDate, 'M월 d일 ', { locale: ko })}</b>
          {format(startDate, 'EEE', { locale: ko })}
        </div>
      ) : (
        <div>{''}</div>
      ),
    [startDate]
  );

  const eventTimeListDateToHighlight = useMemo(
    () =>
      eventTimeList.map((timeStamp) =>
        getTimezoneDate(new Date(timeStamp).getTime())
      ),
    [eventTimeList]
  );

  const createDate = (timeOption: string) => {
    if (startDate) {
      return getUTCDate(
        new Date(
          startDate.getFullYear(),
          startDate.getMonth(),
          startDate.getDate(),
          Number(timeOption.split(':')[0]),
          Number(timeOption.split(':')[1])
        )
      ).getTime();
    } else {
      console.log('Warning: date is null!');
      return getTimezoneDate(new Date().getTime()).getTime();
    }
  };

  const handleChipClick = (timeOption: string) => {
    if (startDate) {
      const dateToAdd = createDate(timeOption);
      if (eventTimeList.includes(dateToAdd)) {
        dispatch(deleteTimeList(dateToAdd));
        // console.log('Deleted Date !', dateToAdd);
      } else {
        if (eventTimeList.length === 5) {
          dispatch(
            show({
              title: '5개 옵션까지만 선택이 가능합니다.',
            })
          );
        } else {
          dispatch(addTimeList(dateToAdd));
          // console.log('Added Date !', dateToAdd);
        }
      }
    } else {
      console.log('Warning: date is null!');
    }
  };

  const handleNextClick = () => {
    dispatch(increaseStep());
  };

  // 캘린더 연동 팝업 관련
  const [scheduleConnected, setScheduleConnected] = useState(false);
  const [popupDisable, setPopupDisable] = useState(
    localStorage.getItem(CREATE_CALENDAR_POPUP_DISABLE_KEY) === 'true'
  );

  const handleCalendarPopupNo = () => {
    localStorage.setItem(CREATE_CALENDAR_POPUP_DISABLE_KEY, 'true');
    setPopupDisable(true);
    console.log('no');
  };

  const handleCalendarPopupYes = () => {
    setScheduleConnected(true);
    console.log('yes');
    //TODO
    //캘린더 연동
  };

  const mockSceduleData = [
    { title: '철수 저녁', time: '오전 7:00 ~ 오전 11:00' },
    { title: '동아리 모임', time: '오전 7:00 ~ 오전 11:00' },
    { title: '휴가', time: '하루종일' },
    { title: '휴가2', time: '하루종일' },
  ];

  // eventTimeDuration Index: 30, 60, 120
  const [selectedLengthIdx, setSelectedLengthIdx] = useState(1);
  // eventTimeDuration state 설정
  useMemo(() => {
    dispatch(
      seteventTimeDuration(MEETING_LENGTH_LIST[selectedLengthIdx].minutes)
    );
  }, [MEETING_LENGTH_LIST[selectedLengthIdx].minutes]);

  // Time Option Chip Focus 설정
  const setChipFocus = () => {
    const focusChip = document.getElementById('08:00');

    focusChip?.scrollIntoView({
      behavior: 'auto',
      block: 'nearest',
      inline: 'start',
    });
  };

  useEffect(() => {
    setChipFocus();
  }, [startDate]);

  const getChips = useMemo(
    () =>
      startDate &&
      TimeOptions(startDate).map((timeOption) => {
        const included = eventTimeList.includes(createDate(timeOption));
        return (
          <div
            key={startDate?.getTime() + timeOption}
            id={timeOption}
            className={classNames('time-chips', {
              filled: included,
              blank: !included,
            })}
            onClick={() => handleChipClick(timeOption)}
          >
            <div className={'text'}>{timeOption}</div>
          </div>
        );
      }),
    [startDate, eventTimeList]
  );

  return (
    <div className={'padding-wrapper'}>
      <div className={'duration-selector-margin'} />
      <div className={'duration-selector'}>
        <ClockOrangeIcon className={'icn-clock-o20'} />
        <div className={'duration-text'}>미팅 길이</div>
        <KezulerDropdown
          buttonClassName={'duration-dropdown'}
          menuData={MEETING_LENGTH_LIST}
          displayKey={'display'}
          selectedIdx={selectedLengthIdx}
          setSelectedIdx={setSelectedLengthIdx}
          endIcon={<ArrowDownIcon />}
        />
      </div>
      <div className={'calendar'}>
        <CalendarView
          startDate={startDate}
          setStartDate={setStartDate}
          highlightDates={eventTimeListDateToHighlight}
        />
      </div>
      <div className={'date-string'}>
        <CalendarIcon className={'calendar-icon'} />
        <div className={'date-string-text'}>{dateStr}</div>
      </div>
      {scheduleConnected && <ScheduleList schedules={mockSceduleData} />}
      <div className={'time-chip-text'}>
        <ClockIcon className={'icn-clock-b20'} />
        <b>{'미팅시작 시각'}</b>
        {'을 선택하세요'}
      </div>
      <Stack direction="row" spacing={'6px'} className={'time-chips-stack'}>
        {getChips}
      </Stack>
      {!popupDisable && (
        <CalendarPopup
          onYesClick={handleCalendarPopupYes}
          onNoClick={handleCalendarPopupNo}
        />
      )}
      <BottomButton
        onClick={handleNextClick}
        subtext={
          eventTimeList.length !== 0
            ? `${eventTimeList.length}개 시간 선택중(최대 5개)`
            : undefined
        }
        text="다음"
        disabled={eventTimeList.length === 0}
      />
    </div>
  );
}

export default CalendarTimeSelector;
