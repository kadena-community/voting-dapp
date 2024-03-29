import { FC, ReactNode } from 'react';
import 'react-responsive-modal/styles.css';
import { Modal as ReactResponsiveModal } from 'react-responsive-modal';

interface IModalProps {
  title: string;
  onClose: () => void;
  children?: ReactNode;
  open?: boolean;
}

const Modal: FC<IModalProps> = ({ title, onClose, children, open = false }) => {
  return (
    <ReactResponsiveModal onClose={onClose} closeOnEsc={false} center open={open}>
      <h2>{title}</h2>
      {children}
    </ReactResponsiveModal>
  );
};

export default Modal;
