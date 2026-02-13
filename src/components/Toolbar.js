
import React from 'react';
import styled from 'styled-components';

const ToolbarContainer = styled.div`
  background-color: ${({ theme }) => theme.toolbarBg};
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  border-bottom: 1px solid ${({ theme }) => theme.border};
  justify-content: space-between;
`;

const LeftGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Button = styled.button`
  background: ${({ theme, primary }) => (primary ? theme.accent : theme.tabBg)};
  color: ${({ primary }) => (primary ? '#fff' : 'inherit')};
  border: none;
  border-radius: 4px;
  padding: 6px 12px;
  cursor: pointer;

  &:hover {
    opacity: 0.85;
  }
`;

const Title = styled.h1`
  font-size: 16px;
  font-weight: bold;
  margin-left: 8px;
`;

export default function Toolbar({ toggleTheme, webviewRef, activeTabTitle }) {
  const goBack = () => webviewRef?.current?.goBack();
  const goForward = () => webviewRef?.current?.goForward();

  return (
    <ToolbarContainer>
      <LeftGroup>
        <Button onClick={goBack}>&larr;</Button>
        <Button onClick={goForward}>&rarr;</Button>
        <Title>{activeTabTitle || 'Persimmon Browser'}</Title>
      </LeftGroup>

      <Button primary onClick={toggleTheme}>
        Toggle Theme
      </Button>
    </ToolbarContainer>
  );
}
