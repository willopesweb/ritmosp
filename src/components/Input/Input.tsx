import React from "react";
import "./Input.scss";

export interface InputInterface extends React.ComponentProps<"input"> {
  name: string;
  label: string;
  tooltip?: string;
  unit?: string;
  options?: OptionsInterface[];
}

export interface OptionsInterface {
  label: string;
  value: string | number;
}

interface InputProps extends InputInterface {
  value: any;
  callback: React.Dispatch<React.SetStateAction<any>>;
}

export const Input = ({
  name,
  label,
  value,
  callback,
  tooltip,
  type,
  options,
  placeholder,
  ...inputProps
}: InputProps) => {
  const renderInput = () => {
    switch (type) {
      case "text":
      case "number":
      case "email":
      case "range":
        return (
          <input
            type={type}
            value={value}
            placeholder={placeholder}
            onChange={(e) => callback(e.target.value)}
            {...inputProps}
          />
        );
      case "checkbox":
        return (
          <input
            type="checkbox"
            checked={value}
            onChange={(e) => callback(e.target.checked)}
            {...inputProps}
          />
        );
      case "select":
        return (
          <select
            name={name}
            value={value}
            onChange={(e) => callback(e.target.value)}
          >
            {options &&
              options.map((option) => {
                return (
                  <option key={option.label} value={option.value}>
                    {option.label}
                  </option>
                );
              })}
          </select>
        );
      case "textarea":
        return (
          <textarea
            name={name}
            value={value}
            onChange={(e) => callback(e.target.value)}
            rows={5}
            cols={33}
          />
        );
      default:
        return (
          <input
            type="text"
            value={value}
            onChange={(e) => callback(e.target.value)}
            {...inputProps}
          />
        );
    }
  };

  return (
    <label id={name} className="c-input">
      <span className="c-input__title">
        {label}
        {tooltip ? (
          <span className="c-input__tooltip" data-tooltip={tooltip}>
            *
          </span>
        ) : (
          ""
        )}
      </span>

      {renderInput()}
    </label>
  );
};
