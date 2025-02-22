import { UserPreferences } from "../types/news";
import { FaSave, FaTimes } from "react-icons/fa";
import { categories, prefInit, source } from "../utils/constants";
import { MultiSelect } from "./common/MultiSelect";
import {
  CancelButton,
  GreenButton,
  Header,
  RedButton,
  SidebarContainer,
} from "../styles/GlobalStyles";
import { resetPreferencesFromStorage } from "../utils";

interface PreferencesProps {
  onSave: (prefs: UserPreferences) => void;
  setPrefDrawer: React.Dispatch<React.SetStateAction<boolean>>;
  prefs: UserPreferences;
  setPrefs: React.Dispatch<React.SetStateAction<UserPreferences>>;
}

export const Preferences: React.FC<PreferencesProps> = ({
  onSave,
  setPrefDrawer,
  prefs,
  setPrefs,
}) => {
  const handleCategoryChange = (selected: string[]) => {
    setPrefs({ ...prefs, category: selected.join(",") });
  };
  const handleSourceChange = (selected: string[]) => {
    setPrefs({ ...prefs, source: selected.join(",") });
  };

  const handleSave = () => onSave(prefs);
  const handleClearPreferences = () => {
    setPrefs(prefInit);
    resetPreferencesFromStorage();
    onSave(prefInit)
  };

  return (
    <SidebarContainer>
      <Header>
        <h4>Customize Your Feed</h4>
        <CancelButton onClick={() => setPrefDrawer(false)}>
          <FaTimes />
        </CancelButton>
      </Header>
      <MultiSelect
        options={categories}
        selected={prefs.category?.split(",").filter(Boolean) || []}
        onChange={handleCategoryChange}
        placeholder="All Categories"
      />
      <br />
      <MultiSelect
        options={source}
        selected={prefs.source?.split(",").filter(Boolean) || []}
        onChange={handleSourceChange}
        placeholder="All Categories"
      />
      <br />
      <GreenButton onClick={handleSave}>
        <FaSave /> Save Preferences
      </GreenButton>
      <br />
      <RedButton onClick={handleClearPreferences}>Clear Preferences</RedButton>
    </SidebarContainer>
  );
};
