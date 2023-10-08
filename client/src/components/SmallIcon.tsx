import { ReactElement } from "react";

type SmallIconPropsType = { icon: string; className: string; size?: number };

const SmallIcon = ({
  icon,
  className,
  size,
}: SmallIconPropsType): ReactElement => {
  className = `${icon} text-${size ?? 4} ${className}`;

  return <i className={className} />;
};

export default SmallIcon;
