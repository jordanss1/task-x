import { ReactElement } from "react";
import { colors, fonts } from "../../../constants";
import SmallIcon from "../../__reusable/SmallIcon";
import NeonClipboard from "../../svg/NeonClipboard";

const TaskListPlaceholder = (): ReactElement => {
  return (
    <div
      style={{
        background:
          "linear-gradient(to bottom, #f4f0ed 0%, #e0dcd9 30%, #f4f0ed 100%)",
        boxShadow:
          "-1px -1px 10px rgb(100,100,100), 0px 0px 0px purple, inset 0px 0px 20px rgb(100,100,100), inset -1px -1px 10px rgb(100,100,100)",
        outline: "2px solid rgb(0,0,0)",
      }}
      className="flex sm:ps-8 flex-col items-center justify-center py-10 p-4 h-3/4 sm:w-4/5 sm:max-w-[366px] rounded-3xl"
    >
      <div className="flex max-w-[300px] w-full sm:max-w-none gap-1 sm:gap-6 justify-center h-full items-center">
        <NeonClipboard style={{ minWidth: "200px" }} size={200} />
        <div
          style={{ fontFamily: fonts.orbitron }}
          className="h-full flex items-center py-6"
        >
          <span className="text-lg sm:text-2xl font-medium w-3/4">No tasks yet</span>
        </div>
      </div>
      <div className="flex h-full w-full max-w-[300px]">
        <div className="flex sm:justify-normal items-center justify-center sm:gap-2 gap-1">
          <p
            style={{ fontFamily: fonts.orbitron }}
            className="text:sm sm:text-lg ps-1 max-w-[60%] sm:max-w-[70%] w-full font-medium"
          >
            Press button to add tasks
          </p>
          <div className="flex max-h-12 justify-center items-center rounded-lg outline-2 relative top-1 p-4 outline-dashed">
            <SmallIcon icon="fa-plus fa-solid" size={20} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskListPlaceholder;
