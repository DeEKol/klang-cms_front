// ? Library Imports
import { MouseEventHandler, ReactNode } from "react";

// ? Types
type TButtonProps = {
    children: ReactNode;
    onClick: MouseEventHandler<HTMLButtonElement>;
};
export function Button(props: TButtonProps): JSX.Element {
    // * Props
    const { children, onClick } = props;

    // ? Render
    return <button onClick={onClick}>{children}</button>;
}
