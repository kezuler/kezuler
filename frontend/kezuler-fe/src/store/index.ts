import { configureStore } from '@reduxjs/toolkit';

import rootReducer from 'src/reducers';

export const store = configureStore({
  reducer: rootReducer,
});

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;