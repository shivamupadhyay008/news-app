import { store } from "../store";

export interface Article {
    id: string;
    title: string;
    description: string;
    url: string;
    image:string;
    publishedAt: string;
    source: { id: string; name: string };
    category?: string;
    author?: string;
  }
  
  export interface Filters {
    keyword: string;
    dateFrom?: string;
    dateTo?: string;
    category?: string;
    source?: string;
  }
  
  export interface UserPreferences {
    sources: string[];
    categories: string[];
    authors: string[];
  }

export interface ArticleStateType {
    isLoading: boolean;
    articles: Article[];
    error: string | null;
}
interface Source {
  id: string | null;
  name: string;
}

export interface NewsArticleResponseType {
  source: Source;
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch