import React from "react";
import InputError from "./InputError";
import { Textarea } from "../ui/textarea";

const TextArea = ({
    name,
    type,
    id,
    value,
    onChange,
    label,
    errorMessage,
    notEmpty,
    ...props
}) => {
    return (
        <div className="space-y-2">
            <label className="text-sm font-bold" htmlFor={name}>
                {label} {notEmpty ? <span className="text-red-500">*</span> : ""}
            </label>
            <Textarea
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                rows={5}
                cols={30}
                className={`p-inputtext-sm ${
                    errorMessage ? "border-red-500" : ""
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
