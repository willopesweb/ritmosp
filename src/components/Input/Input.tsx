import React from "react";
import "./Input.scss";

const MASKS = {
  cpf: (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})$/);
    if (match) {
      return !match[2]
        ? match[1]
        : `${match[1]}.${match[2]}${match[3] ? `.${match[3]}` : ""}${match[4] ? `-${match[4]}` : ""
        }`;
    }
    return value;
  },
  cnpj: (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    const match = cleaned.match(/^(\d{0,2})(\d{0,3})(\d{0,3})(\d{0,4})(\d{0,2})$/);
    if (match) {
      return !match[2]
        ? match[1]
        : `${match[1]}.${match[2]}${match[3] ? `.${match[3]}` : ""}${match[4] ? `/${match[4]}` : ""
        }${match[5] ? `-${match[5]}` : ""}`;
    }
    return value;
  },
  phone: (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    const match = cleaned.match(/^(\d{0,2})(\d{0,5})(\d{0,4})$/);
    if (match) {
      return !match[2]
        ? match[1]
        : `(${match[1]}) ${match[2]}${match[3] ? `-${match[3]}` : ""}`;
    }
    return value;
  }
};

export interface InputInterface extends React.ComponentProps<"input"> {
  name: string;
  label: string;
  tooltip?: string;
  unit?: string;
  options?: OptionsInterface[];
  mask?: keyof typeof MASKS; // Propriedade opcional para máscara
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
  mask, // Adicionando a propriedade mask às props
  placeholder,
  ...inputProps
}: InputProps) => {
  // Função para aplicar a máscara ao valor do input
  const applyMask = (value: string): string => {
    if (mask && typeof MASKS[mask] === "function") {
      return MASKS[mask](value);
    }
    return value;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    // Aplica a máscara ao valor antes de chamar o callback
    const maskedValue = applyMask(e.target.value);
    callback(maskedValue);
  };

  // Função para renderizar o input baseado no tipo
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
            onChange={handleChange}
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
            onChange={handleChange}
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
            placeholder={placeholder}
            onChange={handleChange}
            rows={5}
            cols={33}
          />
        );
      default:
        return (
          <input
            type="text"
            value={value}
            onChange={handleChange}
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
