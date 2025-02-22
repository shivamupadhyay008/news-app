import axios from "axios";
import { Article, Filters, NewsArticleResponseType, UserPreferences } from "../types/news";

const NEWS_API_KEY = "8b21072d8f75456fb1d0466f4f13651a"; // Replace with your key
const NEWS_API_URL = "https://newsapi.org/v2/everything";
// https://api.nytimes.com/svc/search/v2/articlesearch.json?q=new+york+times&page=2&sort=oldest&api-key=UZ5Chz8AObE9LfDATeQGQJ7jV9QhUYiI
// https://content.guardianapis.com/search?api-key=b434a87f-6383-4119-97e5-4e4505f9e567


/**
 *     fetchNewsArticle
 *     https://newsapi.org/docs/endpoints/everything
 *    limitations news api don't provides category filter so we combining it with query itself as per documentation
 * 
**/

export const fetchNewsArticle = async (
  filters: Filters
): Promise<Article[]> => {
  const params: {
    apiKey: string;
    q?: string;
    from?: string;
    to?: string;
    pageSize?: number;
  } = {
    apiKey: NEWS_API_KEY,
    pageSize:10,
    q : `${filters.keyword} AND ${filters?.category?.split(',')?.join(' AND ')}`, 
  };


  if (filters.dateFrom) {
    params.from = filters.dateFrom;
  }

  if (filters.dateTo) {
    params.to = filters.dateTo;
  }
  const response = await axios.get(NEWS_API_URL, {
    params
  });
  return response.data?.articles?.map((item: NewsArticleResponseType) => ({
    id: item?.title,
    title: item?.title,
    description: item?.description,
    url: item?.url,
    image: item?.urlToImage,
    publishedAt: item?.publishedAt,
    source: item?.source,
    category: filters.category,
    author: item?.author,
  }));
};

export const fetchPersonalizedFeed = async (
  prefs: UserPreferences
): Promise<Article[]> => {
  const response = await axios.get(NEWS_API_URL, {
    params: {
      sources: prefs.sources.join(","),
      q: prefs.categories.join(" "),
      apiKey: NEWS_API_KEY,
    },
  });
  return response.data.articles;
};
