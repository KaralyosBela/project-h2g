import classes from "./Footer.module.css";

export const Footer: React.FC = () => {
  return (
    <div data-testid ="footer" className={classes.footer}>
      <h4 data-testid ="header">
        <span data-testid ="span">netflix</span>roulette
      </h4>
    </div>
  );
};
