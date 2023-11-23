import { ReactElement, useState } from "react";
import { colors } from "../../../../constants";
import Button from "../../../Button";
import SmallIcon from "../../../SmallIcon";

const TaskWallTaskInput = (): ReactElement => {
  const [value, setValue] = useState("");

  return (
    <div className="bg-white rounded-2xl h-full w-full flex items-center gap-2">
      <input
        value={value}
        onChange={({ target }) => setValue(target.value)}
        className="rounded-2xl ps-2 outline-none w-full h-full"
      />
      <Button
        style={{ alignItems: "center", borderRadius: "0px 16px 16px 0" }}
        disabled={!value}
        className="rounded-2xl justify-center disabled:bg-slate-300 bg-green-700 h-full w-10"
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
