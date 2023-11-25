import { ReactElement, useState } from "react";
import {  fonts } from "../../../../constants";
import Button from "../../../Button";
import SmallIcon from "../../../SmallIcon";

const TaskWallTaskInput = (): ReactElement => {
  const [value, setValue] = useState("");

  return (
    <div className="bg-white rounded-2xl h-9 w-full flex items-center gap-2">
      <input
        value={value}
        style={{ fontFamily: fonts.jura }}
        onChange={({ target }) => setValue(target.value)}
        className="rounded-2xl ps-2 text-sm outline-none w-full h-full"
      />
      <Button
        style={{ alignItems: "center", borderRadius: "0px 16px 16px 0" }}
        disabled={!value}
        className="rounded-2xl justify-center outline outline-1 outline-slate-100 disabled:bg-slate-300 bg-[#991ff1] h-full w-10"
        icon={
          <SmallIcon
            style={{
              color: value ? "white" : "grey",
            }}
            size={14}
            icon="fa-solid fa-comments"
          />
        }
      />
    </div>
  );
};

export default TaskWallTaskInput;
