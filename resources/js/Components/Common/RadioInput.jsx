import React from "react";
import InputError from "./InputError";
import { Dropdown } from "primereact/dropdown";
import { RadioButton } from "primereact/radiobutton";

const RadioInput = ({
    label,
    errorMessage,
    category,
    name,
    onChange,
    checked,
    ...props
}) => {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-sm font-bold" htmlFor={name}>
                {label}
            </label>
            <div className="flex gap-5 items-center">
                {category.map((category) => {
                    return (
                        <div key={category.key} className="flex gap-1 items-center">
                            <RadioButton
                                inputId={category.key}
                                name={name}
                                value={category}
                                onChange={onChange}
                                checked={checked}
                            />
                            <label htmlFor={category.key} className="ml-2">
                                {category.name}
                            </label>
                        </div>
                    );
                })}
            </div>
            <InputError message={errorMessage} className="mt-2" />
        </div>
    );
};

export default RadioInput;
