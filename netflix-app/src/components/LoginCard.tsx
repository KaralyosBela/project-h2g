import classes from "./LoginCard.module.css";

export const LoginCard: React.FC = () => {
  return (
    <div className={classes.logincard}>
      <div className={classes.card}>
        <h1>LOG IN</h1>
        <form className={classes.inputs}>

            <label htmlFor="username">USER ID*</label>
            <input type="text" id="username"></input>

            <label htmlFor="password">PASSWORD*</label>
            <input type="password" id="passwrod"></input>

          <div className={classes.action}>
            <button className={classes.resetBtn}>RESET</button>
            <button className={classes.loginBtn}>LOG IN</button>
          </div>

            <p>*Mandatory</p>
        </form>
      </div>
    </div>
  );
};
