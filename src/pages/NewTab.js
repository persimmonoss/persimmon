import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  height: calc(100vh - 150px);
`;

export default function NewTab({ url, onTitleChange }) {
  const webviewRef = useRef(null);

  useEffect(() => {
    const webview = webviewRef.current;
    if (!webview) return;

    const handleTitleUpdated = (event) => {
      onTitleChange && onTitleChange(event.title);
    };

    webview.addEventListener('page-title-updated', handleTitleUpdated);

    return () => {
      webview.removeEventListener('page-title-updated', handleTitleUpdated);
    };
  }, [onTitleChange]);

  return (
    <Container>
      <webview
        ref={webviewRef}
        src={url || 'https://www.google.com'}
        style={{ width: '100%', height: '100%' }}
        partition="persist:persimmon"
        allowpopups="true"
        webpreferences="nativeWindowOpen=yes, contextIsolation=yes"
      />
    </Container>
  );
}