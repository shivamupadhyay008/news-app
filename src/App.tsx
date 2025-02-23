import { useEffect, useState } from "react";
import { Global } from "@emotion/react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";

import { SearchFilter } from "./components/SearchFilter";
import { ArticleList } from "./components/ArticleList";
import { Container, globalStyles, Loading } from "./styles/GlobalStyles";
import { Filters, RootState, UserPreferences } from "./types/news";
import { fetchFilteredNews } from "./thunks/articleThunk";
import Navbar from "./components/Navbar";
import { initFilterState } from "./utils/constants";
import { Preferences } from "./components/Preferences";
import { getPreferencesFromStorage, setPreferencesToStorage } from "./utils";
import { UnknownAction } from "@reduxjs/toolkit";

function App() {
  const [filters, setFilters] = useState<Filters>(initFilterState);
  const [prefDrawer, setPrefDrawer] = useState<boolean>(false);
  const [prefs, setPrefs] = useState<UserPreferences>({
    source: "NEW YORK TIMES",
  });
  const { articles, isLoading } = useSelector(
    (state: RootState) => state.articles
  );
  const dispatch = useDispatch();

  const searchArticles = () =>
    dispatch(fetchFilteredNews(filters) as unknown as UnknownAction);

  const clearFilters = () => {
    setFilters(initFilterState);
    dispatch(
      fetchFilteredNews({
        ...filters,
        ...prefs,
      }) as unknown as UnknownAction
    );
  };
  const handlePreferences = (preferences: UserPreferences) => {
    setPreferencesToStorage(preferences);
    dispatch(
      fetchFilteredNews({
        ...filters,
        ...preferences,
      }) as unknown as UnknownAction
    );
  };

  useEffect(() => {
    const prefs = getPreferencesFromStorage();
    if (prefs) {
      setFilters((state) => ({ ...state, ...prefs }));
      setPrefs(prefs);
    }
    dispatch(
      fetchFilteredNews({ ...filters, ...prefs }) as unknown as UnknownAction
    );
  }, []);

  return (
    <>
      <ToastContainer />
      <Global styles={globalStyles} />
      <Navbar setPrefDrawer={setPrefDrawer} />
      <Container>
        <div>
          <SearchFilter
            filters={filters}
            setFilters={setFilters}
            onSearch={searchArticles}
            clearFilters={clearFilters}
          />

          {isLoading ? (
            <Loading>Loading...</Loading>
          ) : (
            <ArticleList articles={articles} />
          )}
        </div>
        {prefDrawer ? (
          <Preferences
            prefs={prefs}
            setPrefs={setPrefs}
            setPrefDrawer={setPrefDrawer}
            onSave={handlePreferences}
          />
        ) : (
          ""
        )}
      </Container>
    </>
  );
}

export default App;
