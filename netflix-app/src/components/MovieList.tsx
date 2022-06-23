import classes from "./MovieList.module.css";

interface Props {
  children: React.ReactNode;
}

export const MovieList: React.FC<Props> = ({ children }) => {
  return (
    <div className={classes.mainSection}>
      <div className={classes.movieContainer}>{children}</div>
      </div>
  );
};
