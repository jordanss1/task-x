import { Variants } from "framer-motion";
import { ReactElement, useState } from "react";
import { clipboard, github, google, wallOfTodos } from "../../assets";
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
          <div>
            <h2>Your todo-list could make you famous!</h2>
            <p>
              Submit your todos to the Wall of Todos and have your peers vote on
              your everyday tasks.
            </p>
          </div>
        );
      case "Prioritize":
        return (
          <div>
            <h2>Order your todos for maximum day to day efficiency</h2>
            <p>No one can stop you not even Zues himself.</p>
          </div>
        );
      case "Welcome":
        return (
          <div>
            <h2>Login with Google!</h2>
            <p>
              View our privacy policy; we only take what is necessary for you to
              use the service.
            </p>
          </div>
        );
    }
  };

  const renderImage = () => {
    switch (hero) {
      case "Popular!":
        return wallOfTodos;
      case "Prioritize":
        return clipboard;
      case "Welcome":
        return google;
    }
  };

  return (
    <div className="hero">
      <div className="hero_left">{renderContent()}</div>
      <div className="hero_right">{renderSidebar}</div>
      <div className="hero_centered_image" />
    </div>
  );
};

export default LandingHero;
