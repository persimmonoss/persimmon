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

export default function Privacy() {
  const [adBlock, setAdBlock] = useState(true);
  const [trackingProtection, setTrackingProtection] = useState(true);
  const [cookieControl, setCookieControl] = useState(false);

  return (
    <Container>
      <h2>Privacy Settings</h2>

      <Section>
        <Label>
          Block Ads
          <Toggle checked={adBlock} onChange={() => setAdBlock(!adBlock)} />
        </Label>

        <Label>
          Tracking Protection
          <Toggle checked={trackingProtection} onChange={() => setTrackingProtection(!trackingProtection)} />
        </Label>

        <Label>
          Block Third-Party Cookies
          <Toggle checked={cookieControl} onChange={() => setCookieControl(!cookieControl)} />
        </Label>
      </Section>

      <Section>
        <p>
          These settings help make your browsing experience private and secure.
        </p>
      </Section>
    </Container>
  );
}