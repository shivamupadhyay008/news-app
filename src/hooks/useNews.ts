import { useState } from 'react';
import { fetchNewsArticle, fetchPersonalizedFeed } from '../services/newsService';
import { Article, Filters, UserPreferences } from '../types/news';

export const useNews = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);

  const searchArticles = async (filters: Filters) => {
    // setLoading(true);
    return;
    try {
      const results = await fetchNewsArticle(filters);
      setArticles(results);
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const getPersonalizedFeed = async (prefs: UserPreferences) => {
    setLoading(true);
    try {
      const results = await fetchPersonalizedFeed(prefs);
      setArticles(results);
    } catch (error) {
      console.error('Error fetching feed:', error);
    } finally {
      setLoading(false);
    }
  };

  return { articles, loading, searchArticles, getPersonalizedFeed };
};