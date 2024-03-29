import React from 'react';
import classNames from 'classnames';

interface Props {
  isAttendant: boolean;
  isFixed: boolean;
  setIsAttendant: React.Dispatch<React.SetStateAction<boolean>>;
  attendantsNum: number;
  absentsNum: number;
}

// TODO: number 0 일 때 처리
function ParticipantTab({
  isAttendant,
  isFixed,
  setIsAttendant,
  attendantsNum,
  absentsNum,
}: Props) {
  const handleAttendantClick = () => {
    setIsAttendant(true);
  };

  const handleAbsentClick = () => {
    setIsAttendant(false);
  };

  return (
    <div className={'common-tab'}>
      <button
        className={classNames('common-tab-button', 'left', {
          selected: isAttendant,
          // disabled: attendantsNum === 0,
        })}
        onClick={handleAttendantClick}
      >
        참여
        <span className={'participants-popup-tab-num'}>{attendantsNum}</span>
      </button>
      <button
        className={classNames('common-tab-button', 'right', {
          selected: !isAttendant,
          // disabled: absentsNum === 0,
        })}
        onClick={handleAbsentClick}
      >
        {isFixed ? '불참' : '미정'}
        <span className={'participants-popup-tab-num'}>{absentsNum}</span>
      </button>
    </div>
  );
}

export default ParticipantTab;
