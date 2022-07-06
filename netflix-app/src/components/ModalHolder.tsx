import classes from "./ModalHolder.module.css";

interface Props {
    children: React.ReactNode
};

export const ModalHolder:React.FC<Props> = ({children}) => {
    return <div className={classes.blurredBg}>
        {children}
    </div>
}