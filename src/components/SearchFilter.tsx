import styled from "@emotion/styled";
import { FaFilter, FaSearch } from "react-icons/fa";
import { MultiSelect } from "./common/MultiSelect";
import { Filters } from "../types/news";
import { useState } from "react";
import { getFiltersCount } from "../utils";
import { categories, source } from "../utils/constants";
import { Button } from "../styles/GlobalStyles";

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
  flex-wrap: wrap;
  margin-top: 1rem;
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

const Badge = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  background: #f00;
  color: white;
  border-radius: 50%;
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  transform: translate(50%, -50%);
`;

const Label = styled.label`
  font-weight: bold;
  display: block;
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
  const [filterData, setFiltersData] = useState<number>(
    getFiltersCount(filters)
  );
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(filters);
    setFiltersData(getFiltersCount(filters));
  };

  const handleCategoryChange = (selected: string[]) => {
    setFilters({ ...filters, category: selected.join(",") });
  };
  const handleSourceChange = (selected: string[]) => {
    setFilters({ ...filters, source: selected.join(",") });
  };
  const handleFilter = () => setOpenFilters((state) => !state);

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
          {filterData ? <Badge>{filterData}</Badge> : ""}
        </Button>
      </SearchContainer>
      {openFilters ? (
        <SearchContainer as="form" onSubmit={handleSubmit}>
          <Label htmlFor='startDate'>Start date</Label>
          <Input
            type="date"
            id="startDate"
            value={filters.dateFrom || ""}
            onChange={(e) =>
              setFilters({ ...filters, dateFrom: e.target.value })
            }
            aria-label="Start Date"
            placeholder="Start Date"
          />
          <Label htmlFor='endDate'>End date</Label>
          <Input
            type="date"
            id="endDate"
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
          <Button
            type="button"
            onClick={() => {
              clearFilters();
              setFiltersData(1);
            }}
          >
            Clear
          </Button>
        </SearchContainer>
      ) : (
        ""
      )}
    </FilterContainer>
  );
};
