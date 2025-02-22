import { useState } from 'react';
import { UserPreferences } from '../types/news';
import styled from '@emotion/styled';
import { FaSave } from 'react-icons/fa';

const PrefContainer = styled.div`
  background: #fff;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 1rem;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-top: 0.5rem;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  background: #28a745;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background 0.3s;
  &:hover {
    background: #218838;
  }
`;

interface PreferencesProps {
  onSave: (prefs: UserPreferences) => void;
}

export const Preferences: React.FC<PreferencesProps> = ({ onSave }) => {
  const [prefs, setPrefs] = useState<UserPreferences>({
    sources: [],
    categories: [],
    authors: [],
  });

  const handleSave = () => onSave(prefs);

  return (
    <PrefContainer>
      <h3>Customize Your Feed</h3>
      <Label>
        Sources (comma-separated):
        <Input
          type="text"
          onChange={(e) => setPrefs({ ...prefs, sources: e.target.value.split(',') })}
        />
      </Label>
      <Label>
        Categories (comma-separated):
        <Input
          type="text"
          onChange={(e) => setPrefs({ ...prefs, categories: e.target.value.split(',') })}
        />
      </Label>
      <Button onClick={handleSave}>
        <FaSave /> Save Preferences
      </Button>
    </PrefContainer>
  );
};