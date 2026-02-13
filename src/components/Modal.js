import React from 'react';
import styled from 'styled-components';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(30, 30, 30, 0.6);
  display: ${({ visible }) => (visible ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  padding: 24px;
  border-radius: 12px;
  width: 400px;
  max-width: 90%;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
`;

const ModalHeader = styled.h3`
  margin-bottom: 16px;
`;

const ModalBody = styled.div`
  margin-bottom: 16px;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

const Button = styled.button`
  padding: 8px 16px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  background-color: ${({ primary, theme }) => (primary ? theme.accent : theme.tabBg)};
  color: ${({ primary }) => (primary ? '#fff' : 'inherit')};

  &:hover {
    opacity: 0.9;
  }
`;

export default function Modal({ visible, title, children, onClose, onConfirm }) {
  return (
    <Overlay visible={visible}>
      <ModalContainer>
        <ModalHeader>{title}</ModalHeader>
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Cancel</Button>
          {onConfirm && <Button primary onClick={onConfirm}>Confirm</Button>}
        </ModalFooter>
      </ModalContainer>
    </Overlay>
  );
}