import { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';

const MultiSelectContainer = styled.div`
  position: relative;
  min-width: 150px;
`;

const MultiSelectButton = styled.button`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: white;
  width: 100%;
  text-align: left;
  cursor: pointer;
  transition: border-color 0.3s;
  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const MultiSelectDropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 0.5rem;
  z-index: 10;
  max-height: 200px;
  overflow-y: auto;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  padding: 0.5rem;
  cursor: pointer;
`;
const InputCheckBox = styled.input`
  margin-right: 0.5rem;
`;




interface MultiSelectProps {
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder: string;
}

export const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  selected,
  onChange,
  placeholder,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  
  const handleToggle = (option: string) => {
    const newSelected = selected.includes(option)
    ? selected.filter((item) => item !== option)
    : [...selected, option];
    console.log(newSelected);
    
    onChange(newSelected);
  };
  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <MultiSelectContainer ref={containerRef}>
      <MultiSelectButton type="button" onClick={() => setIsOpen(!isOpen)}>
        {selected.length > 0 ? selected?.join(',') : placeholder}
      </MultiSelectButton>
      {isOpen && (
        <MultiSelectDropdown>
          {options.map((option) => (
            <CheckboxLabel key={option}>
              <InputCheckBox
                type="checkbox"
                checked={selected?.includes(option)}
                onChange={() => handleToggle(option)}
              />
              {option}
            </CheckboxLabel>
          ))}
        </MultiSelectDropdown>
      )}
    </MultiSelectContainer>
  );
};