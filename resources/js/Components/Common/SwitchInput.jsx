import React from "react";
import InputError from "./InputError";
import { Dropdown } from "primereact/dropdown";
import { RadioButton } from "primereact/radiobutton";
import { InputSwitch } from "primereact/inputswitch";

const SwitchInput = ({
    label,
    errorMessage,
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
            <InputSwitch name={name} checked={checked} onChange={onChange} />
            <InputError message={errorMessage} className="mt-2" />
        </div>
    );
};

export default SwitchInput;
