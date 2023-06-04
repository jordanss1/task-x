import { JSXElementConstructor, ReactElement, ReactNode } from "react";
import { render } from "@testing-library/react";

//These are HOCs that provide a mix of Context/useNavigate or Context/Link components
//Dynamically provide the required store

export const Store = ({
  children,
  store,
}: {
  children: ReactNode;
  store: JSXElementConstructor<{ children: ReactNode }>;
}): ReactElement => {
  const StoreComponent = store;

  return <StoreComponent>{children}</StoreComponent>;
};

//Creates customer component with a wrapper component

export const customRender = (
  wrapper: JSXElementConstructor<{ children: ReactNode | ReactNode[] }>,
  components: ReactElement
) => render(components, { wrapper: wrapper });
