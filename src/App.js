
import React, { useState, useEffect, useRef } from 'react';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './styles/theme';
import { GlobalStyles } from './styles/GlobalStyles';

import Toolbar from './components/Toolbar';
import Tab from './components/Tab';
import AddressBar from './components/AddressBar';
import NewTab from './pages/NewTab';
import BookmarkManager from './components/BookmarkManager';
import Privacy from './pages/Privacy';
import Settings from './pages/Settings';

import TabService from './services/TabService';
import { normalizeURL, isValidURL } from './utils/helpers';

export default function App() {
  // Theme
  const [isDarkMode, setIsDarkMode] = useState(true);
  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  // Page state
  const [currentPage, setCurrentPage] = useState('newtab'); // 'newtab', 'privacy', 'settings', 'bookmarks'

  // Tabs
  const [tabs, setTabs] = useState(TabService.getTabs());
  const [activeTabIndex, setActiveTabIndex] = useState(TabService.activeIndex);
  const [activeTabTitle, setActiveTabTitle] = useState('New Tab');

  // Ref to active WebView
  const webviewRef = useRef(null);

  useEffect(() => {
    // Initialize with one tab
    if (tabs.length === 0) {
      TabService.addTab('https://www.google.com', 'New Tab');
      setTabs([...TabService.getTabs()]);
      setActiveTabIndex(TabService.activeIndex);
      setActiveTabTitle('New Tab');
    }
  }, []);

  // Tab management
  const addTab = (url) => {
    TabService.addTab(url || 'about:blank', 'New Tab');
    setTabs([...TabService.getTabs()]);
    setActiveTabIndex(TabService.activeIndex);
    setActiveTabTitle('New Tab');
    setCurrentPage('newtab');
  };

  const closeTab = (index) => {
    TabService.closeTab(index);
    setTabs([...TabService.getTabs()]);
    setActiveTabIndex(TabService.activeIndex);
    const tab = TabService.getActiveTab();
    setActiveTabTitle(tab?.title || 'New Tab');
    setCurrentPage('newtab');
  };

  const switchTab = (index) => {
    TabService.switchTab(index);
    setActiveTabIndex(TabService.activeIndex);
    const tab = TabService.getActiveTab();
    setActiveTabTitle(tab?.title || 'New Tab');
    setCurrentPage('newtab');
  };

  // Navigation
  const navigateTo = (url) => {
    if (!isValidURL(url)) url = normalizeURL(url);
    const tab = tabs[activeTabIndex];
    tab.url = url;
    tab.title = url;
    TabService.tabs[activeTabIndex] = tab;
    setTabs([...TabService.getTabs()]);
    setActiveTabTitle(url);
    setCurrentPage('newtab');
  };

  const handleTitleChange = (title) => {
    const tab = tabs[activeTabIndex];
    tab.title = title;
    TabService.tabs[activeTabIndex] = tab;
    setTabs([...TabService.getTabs()]);
    setActiveTabTitle(title);
  };

  // Render current page
  const renderPage = () => {
    const activeTab = tabs[activeTabIndex];
    switch (currentPage) {
      case 'newtab':
        return <NewTab url={activeTab?.url} onTitleChange={handleTitleChange} ref={webviewRef} />;
      case 'privacy':
        return <Privacy />;
      case 'settings':
        return <Settings toggleTheme={toggleTheme} isDarkMode={isDarkMode} />;
      case 'bookmarks':
        return <BookmarkManager onNavigate={navigateTo} />;
      default:
        return <NewTab url={activeTab?.url} onTitleChange={handleTitleChange} ref={webviewRef} />;
    }
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <GlobalStyles />

      {/* Toolbar */}
      <Toolbar
        toggleTheme={toggleTheme}
        webviewRef={webviewRef}
        activeTabTitle={activeTabTitle}
      />

      {/* Tabs */}
      <div style={{ display: 'flex', padding: '4px 16px', background: isDarkMode ? '#2c2c2c' : '#e0e0e0' }}>
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            title={tab.title}
            active={index === activeTabIndex}
            onClose={() => closeTab(index)}
            onClick={() => switchTab(index)}
          />
        ))}
        <button
          style={{ marginLeft: 'auto', padding: '4px 12px', borderRadius: '4px', cursor: 'pointer' }}
          onClick={() => addTab('about:blank')}
        >
          + New Tab
        </button>
      </div>

      {/* Address Bar */}
      <AddressBar onNavigate={navigateTo} />

      {/* Page Content */}
      <div style={{ flex: 1 }}>{renderPage()}</div>

      {/* Bottom Navigation */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          padding: '8px',
          borderTop: `1px solid ${isDarkMode ? '#444' : '#ccc'}`,
          background: isDarkMode ? '#1e1e1e' : '#f5f5f5',
        }}
      >
        <button onClick={() => setCurrentPage('newtab')}>Home</button>
        <button onClick={() => setCurrentPage('bookmarks')}>Bookmarks</button>
        <button onClick={() => setCurrentPage('privacy')}>Privacy</button>
        <button onClick={() => setCurrentPage('settings')}>Settings</button>
      </div>
    </ThemeProvider>
  );
}
