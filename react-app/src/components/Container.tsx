import classes from "../styles/Container.module.css";

type Props = {
  children: React.ReactNode;
};

const Container: React.FC<Props> = ({ children }) => {
  return <div className={classes.container}>{children}</div>;
};

export default Container;
