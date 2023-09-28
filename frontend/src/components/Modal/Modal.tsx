import React, { ReactNode } from 'react';
import 'react-responsive-modal/styles.css';
import { Modal as ReactResponsiveModal } from 'react-responsive-modal';

interface IModalProps {
  title: string;
  onClose: () => void;
  children?: ReactNode;
  open?: boolean;
}

export const Modal: React.FC<IModalProps> = ({ title, onClose, children, open = false }): JSX.Element => {
  return (
    <ReactResponsiveModal onClose={onClose} closeOnEsc={false} center open={open}>
      <h2>{title}</h2>
      {children}
    </ReactResponsiveModal>
  );
};
