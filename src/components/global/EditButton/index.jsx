import { useRef } from "react";
import "./EditButton.scss";

export const EditButton = ({
  onClick,
  className,
  parentClassName,
  onChange,
  isInput,
  inputType,
  accept,
}) => {
  const ref = useRef();
  const style = (
    <style>{`
  .edit-button {
    --button-size: 1.2rem;
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    cursor: pointer;
    padding: 0;
    z-index: 100;
    height: 0;
    width: 0;
    overflow: hidden;
    transition: 300ms;
    box-sizing: content-box;
    background-color: white;
    border-radius: 50%;
    color: #000;
  }
  .edit-button i {
    display: block;
    font-size: var(--button-size);
    line-height: var(--button-size);
  }

  .${parentClassName}:hover .edit-button {
      height: var(--button-size);
      width: var(--button-size);
      padding: calc(var(--button-size) / 2);
    }
`}</style>
  );
  return (
    <div
      className={"edit-button " + (className || "")}
      onClick={
        isInput
          ? () => {
              return ref.current.click();
            }
          : onClick
      }>
      {isInput && (
        <input
          type={inputType || "file"}
          accept={accept || "image/*"}
          alt=''
          ref={ref}
          onChange={onChange}
          style={{ display: "none" }}
        />
      )}
      <i className='fas fa-pencil-alt' />
      {style}
    </div>
  );
};
