import { Variants, motion, useCycle } from "framer-motion";
import { ReactElement, useEffect, useRef, useState } from "react";
import Button from "../Button";
import Clipboard from "../svg/Clipboard";
import Github from "../svg/Github";
import Google from "../svg/Google";
import Social from "../svg/Social";
import { SidebarHeadingsType, sidebarItems, stateInterval } from "./content";

const sidebarVariants: Variants = {
  initial: {},
};

const backDrop1: Variants = {
  move1: {
    x: 0,
    y: 0,
    background: "radial-gradient(circle at 10% 20%, #991fff 30%, black)",
    transition: {
      ease: "backInOut",
    },
  },
  move2: {
    x: 180,
    background: "radial-gradient(circle at 110% 20%, #991fff 70%, black)",
    transition: {
      ease: "backInOut",
    },
  },
  move3: {
    y: 170,
    x: 190,
    background: "radial-gradient(circle at 10% 20%, #991fff 30%, black)",
    transition: {
      ease: "backInOut",
    },
  },
};

const backDrop2: Variants = {
  move1: {
    x: 0,
    y: 0,
    background: "radial-gradient(circle at -10% 90%, #991fff 50%, black)",
    transition: {
      ease: "backInOut",
    },
  },
  move2: {
    x: -190,
    background: "radial-gradient(circle at 110% 90%, #991fff 50%, black)",
    transition: {
      ease: "backInOut",
    },
  },
  move3: {
    x: -170,
    y: -190,
    background: "radial-gradient(circle at -10% 90%, #991fff 50%, black)",
    transition: {
      ease: "backInOut",
    },
  },
};

const LandingHero = (): ReactElement => {
  const [hero, setHero] = useState<SidebarHeadingsType>("Welcome");
  const [speed, setSpeed] = useState<"fast" | "slow">("slow");
  const [backDrop, cycleBackDrop] = useCycle("move1", "move2", "move3");

  const timer = useRef<NodeJS.Timeout | number>(0);

  useEffect(() => {
    if (hero === "Welcome") {
      cycleBackDrop(0);
    }
    if (hero === "Prioritize") {
      cycleBackDrop(1);
    }
    if (hero === "Popular") {
      cycleBackDrop(2);
    }
  }, [hero]);

  useEffect(() => {
    timer.current = stateInterval(setHero);

    return () => clearInterval(timer.current);
  }, []);

  const handleClick = (heading: typeof hero) => {
    clearInterval(timer.current);

    setHero(heading);

    timer.current = stateInterval(setHero);
  };

  const renderSidebar = sidebarItems.map(({ heading, body }) => (
    <div onClick={() => handleClick(heading)} key={heading}>
      <h3>{heading}</h3>
      <span>{body}</span>
    </div>
  ));

  const renderContent = () => {
    switch (hero) {
      case "Popular":
        return (
          <div className="hero_content">
            <h2>Todo famous?</h2>
            <div>
              <p>
                Submit your todos to the Wall of Todos and have your peers vote
                on your everyday tasks.
              </p>
            </div>
          </div>
        );
      case "Prioritize":
        return (
          <div className="hero_content">
            <h2>Order your todos</h2>
            <div>
              <p>You'll be so efficient Zues himself cannot stop you.</p>
            </div>
          </div>
        );
      case "Welcome":
        return (
          <div className="hero_content">
            <h2>Login with Google</h2>
            <div>
              <p>
                We take the minimum amount of data to run the service. View our
                privacy policy.
              </p>
              <Button label="Login" />
            </div>
          </div>
        );
    }
  };

  const renderImage = () => {
    switch (hero) {
      case "Popular":
        return (
          <div className="hero_center_image_div">
            <Social size={300} />
          </div>
        );
      case "Prioritize":
        return (
          <div className="hero_center_image_div">
            <Clipboard size={300} />
          </div>
        );
      case "Welcome":
        return (
          <div className="hero_center_image_div">
            <Google size={300} />
          </div>
        );
    }
  };

  return (
    <div className="hero">
      <div className="hero_left w-100 d-flex align-items-center">
        {renderContent()}
      </div>
      <div className="hero_center">
        {renderImage()}
        <div className="hero_center_backdrop_container flex-column">
          <motion.div
            variants={backDrop1}
            animate={backDrop}
            className="hero_center_backdrop_1"
          />
          <motion.div
            variants={backDrop2}
            animate={backDrop}
            className="hero_center_backdrop_2"
          />
        </div>
      </div>
      <div className="hero_right d-flex justify-content-evenly flex-column">
        {renderSidebar}
      </div>
    </div>
  );
};

export default LandingHero;
