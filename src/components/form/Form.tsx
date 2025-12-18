import {
    type FieldValues,
    type Path,
    type SubmitHandler,
    useForm,
    UseFormRegister,
    UseFormSetValue
} from "react-hook-form";
import {BasicInput} from "./input/basic/BasicInput";
import React, {PropsWithChildren} from "react";
import {Button} from "../button";
import {ComponentSize} from "../provider";
import styles from "./form.module.css"
import {TextArea} from "./input/textarea/TextArea";
import {Dropdown} from "./input/dropdown/Dropdown";
import {PhoneNumberInput} from "./input/phone/PhoneNumberInput";
import {CalendarInput} from "./input/calendar/Calendar";

interface InputConfig {
    size?: ComponentSize
    // Textarea
    textArea?: TextAreaConfig
    // Dropdown
    dropDown?: DropDownConfig
    // Phone
    phone?: PhoneConfig
    // Calendar
    calendar?: CalendarConfig
    // general
    autocomplete?: "name" | "given-name" | "family-name" | "email" | "tel" | "address-line1" | "address-line2" | "address-level2" | "address-level1" | "postal-code" | "country-name" | "new-password" | "current-password" | "organization"
}

interface TextAreaConfig {
    rows?: number
    max?: number
}

interface DropDownConfig {
    selection?: SelectionNode[]
    placeholder?: string
    dropdownHeight?: string
}

interface PhoneConfig {
    countryWhiteList?: string[]
}

interface CalendarConfig {
    yearsToSelect?: number[]
}

interface FieldConfig<T extends FieldValues> {
    name: keyof T
    label: string
    type: "text" | "number" | "password" | "email" | "textarea" | "dropdown" | "phone" | "calendar"
    required: boolean | string
    validationFn: (value: any) => boolean | string
    inputConfig?: InputConfig
}

interface FormProps<T extends FieldValues> extends PropsWithChildren, React.FormHTMLAttributes<HTMLFormElement> {
    fields: FieldConfig<T>[],
    onSubmitFn: SubmitHandler<T>
    submitLabel?: string
    componentSize?: ComponentSize
}

interface SelectionNode {
    label: string
    value: any
    option?: React.ReactNode,
    placeholderOption?: React.ReactNode
}

interface InputProps<T extends FieldValues> extends React.InputHTMLAttributes<HTMLInputElement> {
    field: FieldConfig<T>
    errorMsg: null | string
    registerFn: UseFormRegister<T>
    currentValue: any
    setValueFn: UseFormSetValue<T>
}

const Form = <T extends FieldValues,>({fields, onSubmitFn, submitLabel, componentSize = 'sm', children, className}: FormProps<T>) => {
    const {
        handleSubmit,
        register,
        formState: { isSubmitting, errors },
        watch,
        setValue
    } = useForm<T>()

    const finalClass = [className, styles.form].join(' ')

    function getInput(field: FieldConfig<T>) {
        const errorMsg = (errors[field.name]?.message as string) ?? null
        switch (field.type) {
            case "number":
            case "text":
            case "password":
            case "email":
                return (
                    <BasicInput
                        field={field}
                        errorMsg={errorMsg}
                        registerFn={register}
                        currentValue={watch(field.name as Path<T>)}
                        setValueFn={setValue}
                    />
                )
            case "textarea":
                return <TextArea
                    field={field}
                    registerFn={register}
                    errorMsg={errorMsg}
                    currentValue={watch(field.name as Path<T>)}
                    setValueFn={setValue}
                />
            case "dropdown":
                return <Dropdown
                    field={field}
                    errorMsg={errorMsg}
                    registerFn={register}
                    currentValue={watch(field.name as Path<T>)}
                    setValueFn={setValue}
                />
            case "phone":
                return <PhoneNumberInput
                    field={field}
                    errorMsg={errorMsg}
                    registerFn={register}
                    currentValue={watch(field.name as Path<T>)}
                    setValueFn={setValue}
                />
            case "calendar":
                return <CalendarInput
                    field={field}
                    errorMsg={errorMsg}
                    registerFn={register}
                    currentValue={watch(field.name as Path<T>)}
                    setValueFn={setValue}
                />
        }
    }

    return (
        <form className={finalClass} onSubmit={handleSubmit(onSubmitFn)}>
            {
                fields.map((field) => (
                    <div key={field.label}>
                        {getInput(field)}
                    </div>
                ))
            }
            {children ? children : <Button disabled={isSubmitting} label={submitLabel ?? "Submit"} type="submit" size={componentSize}/>}
        </form>
    )
}

export { Form, type FieldConfig, type FormProps, type SelectionNode, type InputProps }