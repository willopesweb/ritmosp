import React from "react";
import "./Button.scss";

interface ButtonProps extends React.ComponentProps<"a"> {
  link: boolean;
  label: string;
  onClick?: () => void
}

const Button = (props: ButtonProps) => {
  const { link, label, onClick, ...rest } = props;

  if (link) {
    return (
      <a className="c-button" title={props.label} {...rest} >
        {props.children}
        {label}
      </a>
    );
  } else {
    return (
      <button className="c-button" onClick={() => onClick && onClick()}>
        {label}
      </button>
    );
  }
};

export default Button;
