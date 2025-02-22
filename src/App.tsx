import { useEffect, useState } from "react";
import { Global } from "@emotion/react";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";

import { SearchFilter } from "./components/SearchFilter";
import { ArticleList } from "./components/ArticleList";
import { globalStyles } from "./styles/GlobalStyles";
import { Filters, RootState } from "./types/news";
import { fetchFilteredNews } from "./thunks/articleThunk";
import Navbar from "./components/Navbar";
import { initFilterState } from "./utils/constants";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Loading = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: #666;
`;

function App() {
  const [filters, setFilters] = useState<Filters>(initFilterState);
  const { articles, isLoading } = useSelector(
    (state: RootState) => state.articles
  );
  const dispatch = useDispatch();

  const searchArticles = () => dispatch(fetchFilteredNews(filters) as any);

  const clearFilters = () => setFilters(initFilterState);

  useEffect(() => {
    dispatch(fetchFilteredNews(filters) as any);
  }, [dispatch]);

  return (
    <>
      <Global styles={globalStyles} />
      <Navbar />
      <Container>
        <SearchFilter
          filters={filters}
          setFilters={setFilters}
          onSearch={searchArticles}
          clearFilters={clearFilters}
        />
        {/* <Preferences onSave={getPersonalizedFeed} /> */}
        {isLoading ? (
          <Loading>Loading...</Loading>
        ) : (
          <ArticleList articles={articles} />
        )}
      </Container>
    </>
  );
}

export default App;
