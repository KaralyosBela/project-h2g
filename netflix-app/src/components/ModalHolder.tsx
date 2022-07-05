import classes from "./ModalHolder.module.css";

interface Props {
    hide: ()=>void,
    show: boolean,
    children: React.ReactNode
};

const clicz = () => {
    console.log("hehe");
}

export const ModalHolder:React.FC<Props> = ({children, hide}) => {
    return <div className={classes.blurredBg} onClick={clicz}>
        {children}
    </div>
}