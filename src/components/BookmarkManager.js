import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from './Modal';

const Container = styled.div`
  padding: 16px;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
`;

const BookmarkList = styled.ul`
  list-style: none;
  margin-top: 16px;
`;

const BookmarkItem = styled.li`
  padding: 8px 12px;
  background-color: ${({ theme }) => theme.tabBg};
  border-radius: 6px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const Button = styled.button`
  padding: 6px 12px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  background-color: ${({ theme }) => theme.accent};
  color: #fff;
`;

export default function BookmarkManager({ onNavigate }) {
  const [bookmarks, setBookmarks] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newBookmark, setNewBookmark] = useState('');

  const addBookmark = () => {
    if (newBookmark.trim()) {
      setBookmarks([...bookmarks, newBookmark.trim()]);
      setNewBookmark('');
      setModalVisible(false);
    }
  };

  const removeBookmark = (index) => {
    setBookmarks(bookmarks.filter((_, i) => i !== index));
  };

  // When a bookmark is clicked
  const handleClick = (bookmark) => {
    if (onNavigate) onNavigate(bookmark);
  };

  return (
    <Container>
      <h2>Bookmarks</h2>
      <Button onClick={() => setModalVisible(true)}>Add Bookmark</Button>

      <BookmarkList>
        {bookmarks.map((bookmark, index) => (
          <BookmarkItem key={index}>
            <span
              onClick={() => handleClick(bookmark)}
              style={{ cursor: 'pointer' }}
            >
              {bookmark}
            </span>
            <Button onClick={() => removeBookmark(index)}>Delete</Button>
          </BookmarkItem>
        ))}
      </BookmarkList>

      <Modal
        visible={modalVisible}
        title="Add Bookmark"
        onClose={() => setModalVisible(false)}
        onConfirm={addBookmark}
      >
        <input
          type="text"
          value={newBookmark}
          onChange={(e) => setNewBookmark(e.target.value)}
          placeholder="Enter bookmark name or URL"
          style={{
            width: '100%',
            padding: '8px',
            borderRadius: '6px',
            border: '1px solid #ccc',
          }}
        />
      </Modal>
    </Container>
  );
}
