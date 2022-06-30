import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { CURRENT_USER_INFO_KEY } from 'src/constants/Auth';
import { TError } from 'src/types/axios';
import { User } from 'src/types/user';

import { getUser } from 'src/api/user';

export const getUserInfoThunk = createAsyncThunk(
  'getUserInfo',
  async ({ onFinally }: { onFinally?: () => void }, { rejectWithValue }) => {
    try {
      const response = await getUser();
      localStorage.setItem(
        CURRENT_USER_INFO_KEY,
        JSON.stringify(response.data)
      );
      onFinally?.();
      return response.data;
    } catch (error) {
      const err = error as TError;
      onFinally?.();
      return rejectWithValue(err?.response?.data?.error);
    }
  }
);

interface UserInfoState extends User {
  loading: boolean;
  errorMessage: string;
}

const initialState: UserInfoState = {
  loading: false,
  errorMessage: '',
  userId: '',
  userName: '',
  userProfileImage: '',
};

export const userInfoSlice = createSlice({
  name: 'c',
  initialState,
  reducers: {
    destroy: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserInfoThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserInfoThunk.fulfilled, (state, action) => {
        state.loading = false;
        const { userId, userName, userProfileImage } = action.payload;
        state.userId = userId;
        state.userName = userName;
        state.userProfileImage = userProfileImage;
      })
      .addCase(getUserInfoThunk.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = (action.payload as { message: string }).message;
      });
  },
});

// Action creators are generated for each case reducer function
export const hostInfoActions = userInfoSlice.actions;

export default userInfoSlice.reducer;