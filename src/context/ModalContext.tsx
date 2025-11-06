import React, { createContext, useState, useContext, useCallback } from 'react';
import CustomModal, { ModalType } from '../components/CustomModal';

interface ModalOptions {
  title: string;
  message: string;
  type?: ModalType;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
  showCancel?: boolean;
}

interface ModalContextType {
  showModal: (options: ModalOptions) => void;
  hideModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalOptions, setModalOptions] = useState<ModalOptions>({
    title: '',
    message: '',
    type: 'info',
  });

  const showModal = useCallback((options: ModalOptions) => {
    setModalOptions(options);
    setModalVisible(true);
  }, []);

  const hideModal = useCallback(() => {
    setModalVisible(false);
  }, []);

  return (
    <ModalContext.Provider value={{ showModal, hideModal }}>
      {children}
      <CustomModal
        visible={modalVisible}
        title={modalOptions.title}
        message={modalOptions.message}
        type={modalOptions.type}
        onClose={hideModal}
        onConfirm={modalOptions.onConfirm}
        confirmText={modalOptions.confirmText}
        cancelText={modalOptions.cancelText}
        showCancel={modalOptions.showCancel}
      />
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

