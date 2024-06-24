import React from "react";
import iconSet from "../assets/icons/selection.json";
import IcomoonReact from "icomoon-react";

const Icon: React.FC<{
  size: string | number,
  icon: string,
  className?: string
}> = props => {
  const { size = "100%", icon, className = "" } = props;
  return (
    <IcomoonReact
      className={className}
      iconSet={iconSet}
      size={size}
      icon={icon}
    />
  );
};

export default Icon;