import styled from "@emotion/styled";
import { FaFilter, FaSearch } from "react-icons/fa";
import { MultiSelect } from "./common/MultiSelect";
import { Filters } from "../types/news";
import { useState } from "react";

const FilterContainer = styled.div`
  background: #fff;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const SearchContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  flex: 1;
  min-width: 200px;
  transition: border-color 0.3s;
  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background 0.3s;
  &:hover {
    background: #0056b3;
  }
`;

interface SearchFilterProps {
  onSearch: (filters: Filters) => void;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  filters: Filters;
  clearFilters: () => void;
}

export const SearchFilter: React.FC<SearchFilterProps> = ({
  onSearch,
  setFilters,
  filters,
  clearFilters,
}) => {
  const [openFilters, setOpenFilters] = useState<boolean>(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(filters);
  };
  const handleCategoryChange = (selected: string[]) => {
    setFilters({ ...filters, category: selected.join(",") });
  };
  const handleSourceChange = (selected: string[]) => {
    setFilters({ ...filters, source: selected.join(",") });
  };
  const handleFilter = () => setOpenFilters((state) => !state);

  const categories = ["General", "Business", "Sports", "Technology"];
  const source = ["NEWSAPI", "NEW YORK TIMES", "THE Guardians"];

  return (
    <FilterContainer>
      <SearchContainer as="form" onSubmit={handleSubmit}>
        <Input
          type="text"
          value={filters.keyword || ""}
          onChange={(e) => setFilters({ ...filters, keyword: e.target.value })}
          placeholder="Search articles..."
        />
        <Button type="submit">
          <FaSearch /> Search
        </Button>
        <Button type="button" onClick={handleFilter}>
          <FaFilter />
        </Button>
      </SearchContainer>
      {openFilters ? (
        <SearchContainer as="form" onSubmit={handleSubmit}>
          <Input
            type="date"
            value={filters.dateFrom || ""}
            onChange={(e) =>
              setFilters({ ...filters, dateFrom: e.target.value })
            }
            placeholder="Start Date"
          />
          <Input
            type="date"
            value={filters.dateTo || ""}
            onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })}
            placeholder="End Date"
          />
          <MultiSelect
            options={categories}
            selected={filters.category?.split(",").filter(Boolean) || []}
            onChange={handleCategoryChange}
            placeholder="All Categories"
          />
          <MultiSelect
            options={source}
            selected={filters.source?.split(",").filter(Boolean) || []}
            onChange={handleSourceChange}
            placeholder="All Categories"
          />
          <Button type="submit">Apply</Button>
          <Button type="button" onClick={clearFilters}>
            Clear
          </Button>
        </SearchContainer>
      ) : (
        ""
      )}
    </FilterContainer>
  );
};
