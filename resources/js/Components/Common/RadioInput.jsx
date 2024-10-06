import React from "react";
import InputError from "./InputError";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

const RadioInput = ({
    label,
    errorMessage,
    category,
    name,
    onChange,
    checked,
    value,
    ...props
}) => {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-sm font-bold" htmlFor={name}>
                {label}
            </label>
            <RadioGroup className="flex items-center gap-5">
                {category.map((category, index) => {
                    return (
                        <div
                            className="flex items-center space-x-2"
                            key={index}
                        >
                            <RadioGroupItem
                                name={name}
                                value={category.key}
                                onChange={onChange}
                                checked={value === category.key}
                            />
                            <Label htmlFor={category.key}>
                                {category.name}
                            </Label>
                        </div>
                    );
                })}
            </RadioGroup>
            <InputError message={errorMessage} className="mt-2" />
        </div>
    );
};

export default RadioInput;
