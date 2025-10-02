// ? Library Imports
import { ChangeEventHandler, TextareaHTMLAttributes } from "react";

// ? Props
type TTextFieldProps = {
    value: TextareaHTMLAttributes<HTMLTextAreaElement>["value"];
    onChange: ChangeEventHandler<HTMLTextAreaElement>;
};

export const TextField = (props: TTextFieldProps) => {
    // * Props
    const { value, onChange } = props;

    // ? Render
    return <textarea onChange={onChange} value={value} />;
};
