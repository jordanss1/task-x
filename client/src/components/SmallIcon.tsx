import { ReactElement } from "react";

type SmallIconPropsType = { icon: string; className?: string; size?: number };

const SmallIcon = ({
  icon,
  className,
  size,
}: SmallIconPropsType): ReactElement => {
  className = `${icon} ${className ?? ""}`;

  return <i style={{ fontSize: size ?? 12 }} className={className} />;
};

export default SmallIcon;
