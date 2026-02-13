import React, { useState } from 'react';
import styled from 'styled-components';

const BarContainer = styled.div`
  display: flex;
  padding: 8px 16px;
  background-color: ${({ theme }) => theme.toolbarBg};
  border-bottom: 1px solid ${({ theme }) => theme.border};
`;

const Input = styled.input`
  flex: 1;
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.border};
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
`;

const GoButton = styled.button`
  margin-left: 8px;
  padding: 8px 12px;
  background-color: ${({ theme }) => theme.accent};
  color: #fff;
  border-radius: 6px;
  border: none;
  cursor: pointer;
`;

export default function AddressBar({ onNavigate }) {
  const [url, setUrl] = useState('');

  const handleGo = () => {
    if (onNavigate) onNavigate(url);
  };

  return (
    <BarContainer>
      <Input
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter URL..."
        onKeyDown={(e) => e.key === 'Enter' && handleGo()}
      />
      <GoButton onClick={handleGo}>Go</GoButton>
    </BarContainer>
  );
}