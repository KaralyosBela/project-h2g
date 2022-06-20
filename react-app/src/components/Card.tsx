//import classes from "./Card.module.css";

type Props = {
  day: String;
  children: React.ReactNode;
};

const Card: React.FC<Props> = ({ day, children }) => {
  return (
    <div>
      <h1>{day}</h1>
      {children}
    </div>
  );
};

export default Card;
