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
    source: string;
    category?: string;
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
export interface GuardianArticleResponseType {
  id: string;
  type: string;
  sectionId: string;
  sectionName: string;
  webPublicationDate: string;
  webTitle: string;
  webUrl: string;
  apiUrl: string;
  isHosted: boolean;
  pillarId: string;
  pillarName: string;
}
interface Multimedia {
  rank: number;
  subtype: string;
  caption: string | null;
  credit: string | null;
  type: string;
  url: string;
  height: number;
  width: number;
  legacy: {
    xlarge: string;
    xlargewidth: number;
    xlargeheight: number;
  };
  subType: string;
  crop_name: string;
}

export interface NYTArticleResponseType {
  abstract: string;
  web_url: string;
  snippet: string;
  lead_paragraph: string;
  print_section: string;
  print_page: number;
  source: string;
  multimedia: Multimedia[];
}
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch