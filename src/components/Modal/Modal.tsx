import React, { PropsWithChildren, useEffect, useRef } from "react";
import { ReactSVG } from "react-svg";
import "./Modal.scss";
import iconCloseModal from "./close-modal.svg";

interface ModalProps {
  title: string;
  closeModal?: () => void;
}
const Modal = ({
  title,
  closeModal,
  children,
}: ModalProps & PropsWithChildren) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node) && closeModal
      ) {
        closeModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeModal]);

  return (
    <div className="c-modal is-open">
      <section ref={modalRef} className="c-modal__card">
        <header className="c-modal__header">
          <h2 className="c-modal__title">{title}</h2>
          {closeModal && (<button
            onClick={() => closeModal()}
            className="c-modal__close"
            type="button"
          >
            <ReactSVG src={iconCloseModal} />
          </button>)}
        </header>
        <div className="c-modal__content">{children}</div>
      </section>
    </div>
  );
};

export default Modal;
