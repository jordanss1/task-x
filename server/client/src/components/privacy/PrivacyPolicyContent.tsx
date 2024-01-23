import { ReactElement } from "react";

const PrivacyPolicyContent = ({ img }: { img: string }): ReactElement => {
  return (
    <div className="w-full">
      <img src={img} />
    </div>
  );
};

export default PrivacyPolicyContent;
