import React from "react";
import InputError from "./InputError";
import { InputTextarea } from "primereact/inputtextarea";

const TextArea = ({
    name,
    type,
    id,
    value,
    onChange,
    label,
    errorMessage,
    ...props
}) => {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-sm font-bold" htmlFor={name}>
                {label}
            </label>
            <InputTextarea
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                rows={5}
                cols={30}
                className={`p-inputtext-sm ${
                    errorMessage ? "border-red-500" : "border-primary/60"
                }`}
                {...props}
            />
            <InputError message={errorMessage} className="mt-2" />
            {/* <small id="username-help">
                Enter your username to reset your password.
            </small> */}
        </div>
    );
};

export default TextArea;
