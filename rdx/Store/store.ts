import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "../Features/movie";
import idReducer from "../Features/id";

export const store = configureStore({
  reducer: {
    movie: movieReducer,
    id: idReducer,
  },
});

console.log(typeof store.getState);

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
