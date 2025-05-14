import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import FloatingLabel from "@components/common/FloatingLabel";

export default function DatePickerInput({ id, name, label, ...attributes }) {
    return (
        <DatePicker
            {...attributes}
            // Structure
            dateFormat="dd/MM/yyyy"
            isClearable={true}
            showPopperArrow={false}
            shouldCloseOnSelect={true}
            // Input
            id={id}
            name={name}
            placeholderText=" "
            customInput={
                <FloatingLabel label={label} icon="fa-regular fa-calendar" />
            }
        />
    );
}


