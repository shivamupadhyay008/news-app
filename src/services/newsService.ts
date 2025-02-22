import axios from "axios";
import {
  Article,
  Filters,
  GuardianArticleResponseType,
  NewsArticleResponseType,
  NYTArticleResponseType,
} from "../types/news";

const NEWS_API_KEY = "8b21072d8f75456fb1d0466f4f13651a"; // Replace with your key
const GUARDIAN_API_KEY = "b434a87f-6383-4119-97e5-4e4505f9e567";
const NYT_API_KEY = "UZ5Chz8AObE9LfDATeQGQJ7jV9QhUYiI";

const NEWS_API_URL = "https://newsapi.org/v2/everything";
const GUARDIAN_API_URL = "https://content.guardianapis.com/search";
const NYT_API_URL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";

/**
 *    fetchNewsArticle
 *    https://newsapi.org/docs/endpoints/everything
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
    pageSize: 10,
    q: `${filters.keyword} ${
      filters.category
        ? "AND " + filters.category?.split(",")?.join(" AND ")
        : ""
    }`,
  };

  if (filters.dateFrom) {
    params.from = filters.dateFrom;
  }

  if (filters.dateTo) {
    params.to = filters.dateTo;
  }
  const response = await axios.get(NEWS_API_URL, {
    params,
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

export const fetchGuardianArticle = async (
  filters: Filters
): Promise<Article[]> => {
  const params: {
    "api-key": string;
    q?: string;
    "from-date"?: string;
    "to-date"?: string;
    "page-size"?: number;
  } = {
    "api-key": GUARDIAN_API_KEY,
    "page-size": 10,
    q: `${filters.keyword} ${
      filters.category
        ? "AND " + filters.category?.split(",")?.join(" AND ")
        : ""
    }`,
  };
  if (filters.dateFrom) {
    params["from-date"] = filters.dateFrom;
  }

  if (filters.dateTo) {
    params["to-date"] = filters.dateTo;
  }

  const response = await axios.get(GUARDIAN_API_URL, {
    params,
  });

  return response.data?.response?.results?.map(
    (item: GuardianArticleResponseType) => ({
      id: item?.id,
      title: item?.webTitle,
      description: item?.webTitle,
      url: item?.webUrl,
      image: item?.apiUrl,
      publishedAt: item?.webPublicationDate,
      source: "The Guardian",
      category: item?.sectionName,
      author: "The Guardian",
    })
  );
};

export const fetchNYTArticle = async (filters: Filters): Promise<Article[]> => {
  const params: {
    "api-key": string;
    q?: string;
    begin_date?: string;
    end_date?: string;
    "page-size"?: number;
  } = {
    "api-key": NYT_API_KEY,
    "page-size": 10,
    q: `${filters.keyword} ${
      filters.category
        ? "AND " + filters.category?.split(",")?.join(" AND ")
        : ""
    }`,
  };
  if (filters.dateFrom) {
    params["begin_date"] = filters.dateFrom;
  }

  if (filters.dateTo) {
    params["end_date"] = filters.dateTo;
  }

  const response = await axios.get(NYT_API_URL, {
    params,
  });
 
  // NYC dont provide published date in response
  return response?.data?.response?.docs?.map(
    (item: NYTArticleResponseType) => ({
      id: item?.print_section,
      title: item?.abstract,
      description: item?.lead_paragraph,
      url: item?.web_url,
      image: "https://www.nytimes.com/" + item?.multimedia?.[0]?.url,
      publishedAt: "",
      source: "NEW YORK TIMES",
      category: item?.print_section,
      author: "NEW YORK TIMES",
    })
  );
};
