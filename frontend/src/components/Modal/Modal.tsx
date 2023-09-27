import React, { ReactNode } from 'react';
import 'react-responsive-modal/styles.css';
import { Modal as ReactResponsiveModal } from 'react-responsive-modal';

interface IProps {
  title: string;
  onClose: () => void;
  children?: ReactNode;
  open?: boolean;
}

export const Modal: React.FC<IProps> = ({ title, onClose, children, open = false }): JSX.Element => {
  return (
    <div>
      <ReactResponsiveModal onClose={onClose} closeOnEsc={false} center open={open}>
        <h2>{title}</h2>
        {children}
      </ReactResponsiveModal>
    </div>
  );
};
