//import classes from "./Container.module.css";

type Props = {
  children: React.ReactNode;
};

const Container: React.FC<Props> = ({ children }) => {
  return <div>{children}</div>;
};

export default Container;
