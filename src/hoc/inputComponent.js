import React, { Component } from 'react';
export default function InputComponent(props) {
    const {
        onChange, values, errors,  // props from validationHoc
        name, title, value, label, placeholder, type, // props from html tag <input>
        inputClassName, errorClassName, // props from classname customed by this function caller
        textareaOption // options for textarea instead of input
    } = props;

    return (
        <div>
            {title && <label htmlFor={title}>{title}</label>}

            {!textareaOption
                ?
                <input
                    onChange={type !== "radio" && onChange}
                    onClick={type === "radio" && onChange}
                    value={type === "radio" ? value : (values[name] || '')}
                    className={`${inputClassName} ${errors[name] && "input-area--invalid"}`}
                    placeholder={placeholder}
                    name={name}
                    id={label || title}
                    type={type}
                    autoComplete="off"
                />
                :
                <textarea
                    onChange={onChange}
                    value={values[name] || ''}
                    className={`${inputClassName} ${errors[name] && "input-area--invalid"}`}
                    placeholder={placeholder}
                    name={name}
                    id={label || title}
                    type={type}
                    rows="5"
                />
            }

            <div className={errorClassName || "error-message"}>{errors[name]}</div>
        </div>
    )
}


