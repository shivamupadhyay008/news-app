import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const globalStyles = css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Arial", sans-serif;
  }
  body {
    background: #f4f7fa;
    color: #333;
    line-height: 1.6;
  }
`;

export const Button = styled.button`
  padding: 0.75rem 1.5rem;
  position: relative;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background 0.3s;
  margin-bottom: 0.5rem;
  &:hover {
    background: #0056b3;
  }
`;

export const SidebarContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 300px;
  height: 100%;
  background: #fff;
  padding: 1.5rem;
  box-shadow: -2px 0 12px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  z-index: 1000;
`;

export const GreenButton = styled.button`
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
export const RedButton = styled(GreenButton)`
  background: #dc3545;
  &:hover {
    background: #c82333;
  }
`;

export const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
  border-bottom: 1px solid black;
  align-items: center;
`;
export const CancelButton = styled.div`
  background-color: blue;
  border-radius: 2rem;
  padding: 0.5rem;
  justify-content: center;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const Loading = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: #666;
`;
