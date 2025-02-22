import { fetchNewsArticle } from "../services/newsService";
import {
  fetchArticleStart,
  fetchArticleFailure,
  fetchArticleSuccess,
} from "../slices/articleSlice";
import { AppDispatch, Filters } from "../types/news";

export const fetchFilteredNews =
  (filters: Filters) => async (dispatch: AppDispatch) => {
    dispatch(fetchArticleStart());

    try {
      const response = await fetchNewsArticle(filters);
      dispatch(fetchArticleSuccess(response));
    } catch (error: unknown) {
      if (error instanceof Error) {
        dispatch(fetchArticleFailure(error.message));
      } else {
        dispatch(fetchArticleFailure("An unknown error occurred"));
      }
    }
  };
