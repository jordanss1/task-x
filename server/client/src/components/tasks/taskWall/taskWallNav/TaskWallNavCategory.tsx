import { ReactElement } from "react";
import Button from "../../../__reusable/Button";
import SmallIcon from "../../../__reusable/SmallIcon";
import Social from "../../../svg/Social";

const TaskWallNavCategory = (): ReactElement => {
  return (
    <div className="flex max-h-[28px]">
      <Button
        className="min-w-[43px] py-4  border-r-0 justify-center"
        style={{
          alignItems: "center",
          border: "1px solid black",
          borderRight: "none",
          borderRadius: "200px 0px 0px 200px",
        }}
        icon={<Social size={30} />}
      />
      <Button
        className="min-w-[43px] py-4 overflow-hidden border-l-0 justify-center"
        style={{
          alignItems: "center",
          border: "1px solid black",
          borderRadius: "0px 200px 200px 0px",
        }}
        icon={<SmallIcon size={20} icon="fa-regular fa-user" />}
      />
    </div>
  );
};

export default TaskWallNavCategory;
