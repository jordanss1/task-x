import { Variants, motion } from "framer-motion";
import { ReactElement } from "react";
import Button from "../Button";
import MenuButton from "../MenuButton";
import { headerList } from "./content";

const listItemVariants: Variants = {
  hover: {
    backgroundColor: "rgba(0,0,0,.3)",
  },
};

const DashboardNav = (): ReactElement => {
  const renderList = headerList.map((item) => (
    <motion.li
      variants={listItemVariants}
      whileHover="hover"
      className="d-sm-flex"
    >
      <Button
        children={item}
        className="dashboard_nav_button p-2 fs-6 fw-bold"
      />
    </motion.li>
  ));

  return (
    <nav>
      <MenuButton />
      <ul className="dashboard_nav p-0 m-0">{renderList}</ul>
    </nav>
  );
};

export default DashboardNav;
