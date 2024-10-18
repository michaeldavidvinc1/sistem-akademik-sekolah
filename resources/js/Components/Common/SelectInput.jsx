import React from "react";
import InputError from "./InputError";
import { Select } from "../ui/select";

const SelectInput = ({
    name,
    value,
    onChange,
    label,
    errorMessage,
    children,
    ...props
}) => {
    return (
        <div className="space-y-2">
            <label className="text-sm font-bold" htmlFor={name}>
                {label}
            </label>
            <Select
                name={name}
                value={value}
                onValueChange={onChange}
                className={`text-sm ${
                    errorMessage ? "border-red-500" : "border-primary/60"
                }`}
                {...props}
            >
                {children}
            </Select>
            <InputError message={errorMessage} className="mt-2" />
            {/* <small id="username-help">
                Enter your username to reset your password.
            </small> */}
        </div>
    );
};

export default SelectInput;
