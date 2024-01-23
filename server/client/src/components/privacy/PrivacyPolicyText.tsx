import { ReactElement } from "react";

const PrivacyPolicyText = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: React.HTMLAttributes<HTMLDivElement>["className"];
}): ReactElement => {
  return <div className={className}>{children}</div>;
};

export default PrivacyPolicyText;
