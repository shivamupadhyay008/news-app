import { Filters, UserPreferences } from "../types/news";

export const getFiltersCount: (filters: Filters) => number = (
  filters: Filters
) => {
  const requiredKeys = ["dateFrom", "dateTo", "category", "source"];
  return requiredKeys.filter((key) =>
    Object.prototype.hasOwnProperty.call(filters, key)
  ).length;
};

export const setPreferencesToStorage = (preferences: UserPreferences) => {
  localStorage.setItem("preferences", JSON.stringify(preferences));
};

export const resetPreferencesFromStorage = () => {
  localStorage.removeItem("preferences");
};
export const getPreferencesFromStorage = (): UserPreferences | null => {
  const preferences = localStorage.getItem("preferences");
  return preferences ? JSON.parse(preferences) : null;
};
