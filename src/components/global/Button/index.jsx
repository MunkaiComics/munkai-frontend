import Spinner from "../Spinner";
import "./button.scss";

function Button({
  isDisabled,
  isLoading,
  children,
  className = "",
  iconButton,
  variant = "solid",
  leftIcon,
  rightIcon,
  ...rest
}) {
  return (
    <button
      className={`button ${className} ${"button--" + variant} ${
        iconButton ? "button--icon" : ""
      } ${isLoading ? "button--loading" : ""}`}
      disabled={isDisabled || isLoading}
      {...rest}
    >
      {leftIcon ? <span className="button__left-icon">{leftIcon}</span> : null}

      <>{isLoading ? <Spinner size="24px" color="#ffffff" /> : children}</>

      {rightIcon ? (
        <span className="button__right-icon">{rightIcon}</span>
      ) : null}
    </button>
  );
}

export default Button;
