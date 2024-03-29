import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from 'src/reducers';
import { getFixedEventsThunk } from 'src/reducers/mainFixed';
import { AppDispatch } from 'src/store';

const useMainFixed = () => {
  const { events, isFetched } = useSelector(
    (state: RootState) => state.mainFixed
  );
  const dispatch = useDispatch<AppDispatch>();

  const getFixedEvents = useCallback(
    (page: number, onFinally?: () => void) => {
      //TODO index 설정
      return dispatch(
        getFixedEventsThunk({
          onFinally,
          page,
        })
      );
    },
    [dispatch]
  );

  return { getFixedEvents, events, isFetched };
};

export default useMainFixed;
