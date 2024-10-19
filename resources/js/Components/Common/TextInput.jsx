import React from "react";
import InputError from "./InputError";
import { Input } from "../ui/input";

const TextInput = ({
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
            <Input
                id={id}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
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

export default TextInput;
