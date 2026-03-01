import {FieldValues, Path, UseFormRegister} from "react-hook-form";
import {FieldConfig} from "../../Form";
import styles from './plaininput.module.css'
import React from "react";

interface PlainInputProps<T extends FieldValues> extends React.InputHTMLAttributes<HTMLInputElement> {
    field: FieldConfig<T>
    registerFn: UseFormRegister<T>
}

const PlainInput = <T extends FieldValues, >({field, registerFn, placeholder, className}: PlainInputProps<T>) => {

    const finalClasses = [className, styles.input].filter(Boolean).join(' ')

    return (
        <input
            className={finalClasses}
            type={field.type}
            autoComplete={field.inputConfig?.autocomplete}
            placeholder={placeholder}
            {...registerFn(field.name as Path<T>,
                {
                    required: field.required,
                    validate: field.validationFn
                }
            )}
        />
    )
}

export {PlainInput, type PlainInputProps}