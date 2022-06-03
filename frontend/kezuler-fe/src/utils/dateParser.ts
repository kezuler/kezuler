// date to MM/dd
import DAY_OF_WEEK from '../constants/DayofWeek';

const dateToMMdd = (date: Date) => `${date.getMonth() + 1}/${date.getDate()}`;

// date to daily time (오전 11:30)
const dateToDailyTime = (date: Date) => {
  const hours = date.getHours();
  const tempHour = hours > 12 ? hours - 12 : hours;
  const minutes = date.getMinutes();

  const hourText = `${tempHour < 10 ? '0' : ''}${tempHour}`;
  const minuteText = `${minutes < 10 ? '0' : ''}${minutes}`;
  return `${hours >= 12 ? '오후' : '오전'} ${hourText}:${minuteText}`;
};

const getDDay = (date: Date) => {
  const now = new Date();
  const interval = date.getTime() - now.getTime();
  const dDay = Math.ceil(interval / (1000 * 60 * 60 * 24));
  return dDay === 0 ? 'Today' : `D-${dDay}`;
};

const getMonthFromDateString = (dateString?: string) => {
  if (!dateString) {
    return new Date().getMonth() + 1;
  }
  return new Date(dateString).getMonth() + 1;
};

// 한국 요일 반환
const getKorDay = (date: Date) => DAY_OF_WEEK[date.getDay()];

export {
  dateToMMdd,
  dateToDailyTime,
  getDDay,
  getMonthFromDateString,
  getKorDay,
};