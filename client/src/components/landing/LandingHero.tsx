import { Variants } from "framer-motion";
import { ReactElement, useState } from "react";
import Button from "../Button";
import Clipboard from "../svg/Clipboard";
import Github from "../svg/Github";
import Google from "../svg/Google";
import Social from "../svg/Social";
import { SidebarHeadingsType, sidebarItems } from "./content";

const sidebarVariants: Variants = {
  initial: {},
};

const LandingHero = (): ReactElement => {
  const [hero, setHero] = useState<SidebarHeadingsType>("Welcome");

  const renderSidebar = sidebarItems.map(({ heading, body }) => (
    <div onClick={() => setHero(heading)} key={heading}>
      <h3>{heading}</h3>
      <span>{body}</span>
    </div>
  ));

  const renderContent = () => {
    switch (hero) {
      case "Popular!":
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
                View our privacy policy; we only take what is necessary for you
                to use the service.
              </p>
              <Button label="Login" />
            </div>
          </div>
        );
    }
  };

  const renderImage = () => {
    switch (hero) {
      case "Popular!":
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
          <div className="hero_center_backdrop_1" />
          <div className="hero_center_backdrop_2" />
        </div>
      </div>
      <div className="hero_right d-flex justify-content-evenly flex-column">
        {renderSidebar}
      </div>
    </div>
  );
};

export default LandingHero;
