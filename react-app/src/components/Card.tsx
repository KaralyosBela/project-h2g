import classes from "../styles/Card.module.css";

type Props = {
  day: String;
  children: React.ReactNode;
};

const Card: React.FC<Props> = ({ day, children }) => {
  return (
    <div className={classes.card}>
      <h1>{day}</h1>
      {children}
    </div>
  );
};

export default Card;
