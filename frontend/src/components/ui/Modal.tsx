// File: frontend/src/components/ui/Modal.tsx

import { forwardRef, memo, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

type ConfirmationModalProps = {
  onConfirm: () => void | Promise<void>;
  children: React.ReactNode;
  closable?: boolean;
};

type SimpleModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

type ModalProps = ConfirmationModalProps | SimpleModalProps;

function isSimpleModal(props: ModalProps): props is SimpleModalProps {
  return 'isOpen' in props && 'onClose' in props;
}

export const Modal = memo(
  forwardRef<HTMLDialogElement, ModalProps>((props, ref) => {
    const [isLoading, setIsLoading] = useState(false);
    const { t } = useTranslation();

    if (isSimpleModal(props)) {
      const { isOpen, onClose, children } = props;
      
      if (!isOpen) return null;
      
      return (
        <div className="modal modal-open" data-testid="modal">
          <div className="modal-box">
            {children}
          </div>
          <div className="modal-backdrop" onClick={onClose}></div>
        </div>
      );
    }

    const { children, onConfirm, closable } = props;

    const closeModal = useCallback(() => {
      setIsLoading(false);
      const dialog = ref && "current" in ref ? ref.current : null;
      if (dialog) {
        dialog.close();
      }
    }, [ref]);

    const handleConfirm = useCallback(async () => {
      try {
        setIsLoading(true);
        await Promise.resolve(onConfirm());
        closeModal();
      } catch (_e) {
        setIsLoading(false);
      }
    }, [onConfirm, closeModal]);

    return (
      <dialog ref={ref} className="modal" data-testid="modal">
        <div className="modal-box">
          {children}
          {closable && (
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              type="button"
              onClick={closeModal}
              data-testid="modal-close-button"
            >
              X
            </button>
          )}
          <div className="modal-action flex gap-2">
            <button
              type="button"
              className="btn btn-outline"
              data-testid="modal-cancel-button"
              onClick={closeModal}
            >
              {t("Cancel")}
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleConfirm}
              disabled={isLoading}
              data-testid="modal-confirm-button"
            >
              {isLoading ? (
                <span className="loading loading-spinner" />
              ) : null}
              {t("Confirm")}
            </button>
          </div>
        </div>
      </dialog>
    );
  }),
);