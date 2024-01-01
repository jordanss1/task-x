import { motion } from "framer-motion";
import { ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fonts } from "../../../../constants";
import {
  changeSort,
  taskWallSelector,
} from "../../../../features/taskWall/taskWallSlice";
import ButtonPopout from "../../../__reusable/ButtonPopout";

const TaskWallNavSort = (): ReactElement => {
  const dispatch = useDispatch();
  const { sort } = useSelector(taskWallSelector);

  const options = [
    { option: "recent", label: "Most recent" },
    { option: "popular", label: "Popular" },
  ];

  const renderOptions = options.map(({ option, label }) => (
    <div
      key={label}
      className="text-right w-full gap-2 items-center p-2 ps-2 hover:bg-[#991ff1] text-slate-700 hover:text-white rounded-sm text-xs relative flex cursor-pointer"
      onClick={() => dispatch(changeSort(option))}
    >
      {label}
    </div>
  ));

  const label = sort === "popular" ? "Popular" : "Most recent";

  return (
    <ButtonPopout
      style={{ fontFamily: fonts.jura }}
      className="gap-1 p-1 ml-auto"
      fontSize={15}
      iconSize={10}
      label={label}
      action="click"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1, transition: { ease: "easeIn" } }}
        exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.1 } }}
        className="absolute origin-top z-10 overflow-hidden rounded-xl border border-1 border-slate-400 bg-[#f4f0ed] right-0 top-8 w-28 "
      >
        {renderOptions}
      </motion.div>
    </ButtonPopout>
  );
};

export default TaskWallNavSort;
