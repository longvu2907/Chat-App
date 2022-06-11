import "./index.scss";

export default function Input({
  name,
  icon,
  error,
  onIconClick,
  register,
  className,
  ...props
}) {
  return (
    <div className={`input-wrapper ${error ? "invalid" : ""}`}>
      <label>
        <input
          className={`input ${className ? className : ""}`}
          {...(register && register(name))}
          {...props}
        />
        {icon && (
          <i
            className={`icon ${onIconClick ? "clickable" : ""}`}
            onClick={onIconClick}
          >
            {icon}
          </i>
        )}
      </label>
      <p className='error-msg'>{error?.message}</p>
    </div>
  );
}
