import { createSlice } from '@reduxjs/toolkit'
import {  ArticleStateType } from '../types/news'

// Initialize state with Article 
const initialState: ArticleStateType = {
    isLoading: false,
    articles: [],
    error: null,
}

const articlesSlice = createSlice({
  name: 'articles',
  initialState ,
    reducers: {
        fetchArticleStart: (state) => {
            state.isLoading = true;
            state.error = null;
          },
          fetchArticleSuccess: (state, action) => {
            state.isLoading = false;
            state.error = null;            
            state.articles=action.payload; // Store each API response
          },
          fetchArticleFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
          },
        
    },
})

export const { fetchArticleStart, fetchArticleFailure, fetchArticleSuccess } = articlesSlice.actions
export default articlesSlice.reducer