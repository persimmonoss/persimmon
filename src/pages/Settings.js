import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 24px;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  height: calc(100vh - 100px);
`;

const Section = styled.div`
  margin-bottom: 24px;
`;

const Label = styled.label`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background-color: ${({ theme }) => theme.tabBg};
  border-radius: 8px;
  margin-bottom: 12px;
`;

const Toggle = styled.input.attrs({ type: 'checkbox' })`
  width: 20px;
  height: 20px;
`;

export default function Settings({ toggleTheme, isDarkMode }) {
  const [notifications, setNotifications] = useState(true);
  const [autoUpdate, setAutoUpdate] = useState(true);

  return (
    <Container>
      <h2>Browser Settings</h2>

      <Section>
        <Label>
          Dark Mode
          <Toggle checked={isDarkMode} onChange={toggleTheme} />
        </Label>

        <Label>
          Enable Notifications
          <Toggle checked={notifications} onChange={() => setNotifications(!notifications)} />
        </Label>

        <Label>
          Auto-Update Browser
          <Toggle checked={autoUpdate} onChange={() => setAutoUpdate(!autoUpdate)} />
        </Label>
      </Section>

      <Section>
        <p>
          Manage your browser preferences here. These settings are saved locally.
        </p>
      </Section>
    </Container>
  );
}