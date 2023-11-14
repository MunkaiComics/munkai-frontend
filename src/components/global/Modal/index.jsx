import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import styles from "./modal.module.scss";

const Modal = ({
  isOpen,
  onClickOutside,
  containerClass = "",
  className = "",
  children,
}) => {
  const modalsContainer = document.getElementById("modals-container");
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        (ref?.current && !ref?.current.contains(event.target)) ||
        ref?.current?.isEqualNode(event.target)
      ) {
        onClickOutside();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, onClickOutside]);

  if (!modalsContainer || !isOpen) return null;

  return createPortal(
    <div ref={ref} className={`${styles["modal"]} ${containerClass}`}>
      <div className={className}>{children}</div>
    </div>,
    modalsContainer
  );
};

export default Modal;
