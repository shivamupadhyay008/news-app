import {
  fetchGuardianArticle,
  fetchNewsArticle,
  fetchNYTArticle,
} from "../services/newsService";
import {
  fetchArticleStart,
  fetchArticleFailure,
  fetchArticleSuccess,
} from "../slices/articleSlice";
import { AppDispatch, Article, Filters } from "../types/news";

export const fetchFilteredNews =
  (filters: Filters) => async (dispatch: AppDispatch) => {
    dispatch(fetchArticleStart());
    try {
      let response: Article[] | [] = [];
      const promises: Promise<Article[] | []>[] = [];

      if (filters.source?.split(",").includes("NEWSAPI")) {
        promises.push(fetchNewsArticle(filters));
      }
      if (filters.source?.split(",").includes("NEW YORK TIMES")) {
        promises.push(fetchNYTArticle(filters));
      }
      if (filters.source?.split(",").includes("THE Guardians")) {
        promises.push(fetchGuardianArticle(filters));
      }

      const results = await Promise.all(promises);
      results.forEach((data) => {
        response = [...response, ...(data || [])];
      });

      dispatch(fetchArticleSuccess(response));
    } catch (error: unknown) {
      if (error instanceof Error) {
        dispatch(fetchArticleFailure(error.message));
      } else {
        dispatch(fetchArticleFailure("An unknown error occurred"));
      }
    }
  };
