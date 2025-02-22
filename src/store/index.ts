import { configureStore } from '@reduxjs/toolkit'
import articlesReducers from '../slices/articleSlice'

export const store = configureStore({
  reducer: {
    articles: articlesReducers,
  },
})

