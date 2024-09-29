import React from "react";
import InputError from "./InputError";
import { Dropdown } from "primereact/dropdown";

const SelectInput = ({
    name,
    value,
    onChange,
    label,
    errorMessage,
    options,
    optionLabel,
    optionValue,
    ...props
}) => {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-sm font-bold" htmlFor={name}>
                {label}
            </label>
            <Dropdown
                name={name}
                value={value}
                onChange={onChange}
                options={options}
                optionLabel={optionLabel}
                optionValue={optionValue}
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

export default SelectInput;
