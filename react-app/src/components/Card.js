import classes from "./Card.module.css";

function Card(props) {
    return <div className={classes.card}>
        <h1>{props.day}</h1>
        {props.children}
    </div>;
}

export default Card;
