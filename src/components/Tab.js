import React from 'react';
import styled from 'styled-components';

const TabContainer = styled.div`
  background-color: ${({ active, theme }) => (active ? theme.tabActiveBg : theme.tabBg)};
  border: 1px solid ${({ theme }) => theme.border};
  border-bottom: none;
  border-radius: 4px 4px 0 0;
  padding: 8px 12px;
  display: inline-flex;
  align-items: center;
  margin-right: 4px;
  cursor: pointer;
  transition: background 0.2s;
`;

const CloseButton = styled.button`
  margin-left: 8px;
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
`;

export default function Tab({ title, active = false, onClose }) {
  return (
    <TabContainer active={active}>
      {title}
      <CloseButton onClick={onClose}>×</CloseButton>
    </TabContainer>
  );
}