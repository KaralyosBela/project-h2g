import classes from "../styles/Container.module.css";

type Props = {
  children: React.ReactNode;
};

export const Container: React.FC<Props> = ({ children }) => {
  return <div className={classes.container}>{children}</div>;
};
