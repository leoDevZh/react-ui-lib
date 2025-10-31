import {type FieldValues, type Path, type SubmitHandler, useForm} from "react-hook-form";
import {BasicInput} from "./input/basic/BasicInput";
import React, {PropsWithChildren} from "react";
import {Button} from "../button";
import {ComponentSize} from "../provider";
import styles from "./form.module.css"

interface FieldConfig<T extends FieldValues> {
    name: keyof T
    label: string
    type: "text" | "number"
    required: boolean | string
    validationFn: (value: any) => boolean | string
}

interface FormProps<T extends FieldValues> extends PropsWithChildren, React.FormHTMLAttributes<HTMLFormElement> {
    fields: FieldConfig<T>[],
    onSubmitFn: SubmitHandler<T>
    submitLabel?: string
    componentSize?: ComponentSize
}


const Form = <T extends FieldValues,>({fields, onSubmitFn, submitLabel, componentSize = 'sm', children, className}: FormProps<T>) => {
    const {
        handleSubmit,
        register,
        formState: { isSubmitting, errors },
        watch
    } = useForm<T>()

    const finalClass = [className, styles.form].join(' ')

    function getInput(field: FieldConfig<T>) {
        const errorMsg = (errors[field.name]?.message as string) ?? null
        switch (field.type) {
            case "number":
                return (
                    <BasicInput field={field} errorMsg={errorMsg} register={register} currentValue={watch(field.name as Path<T>)}/>
                )
            case "text":
                return (
                    <BasicInput field={field} errorMsg={errorMsg} register={register} currentValue={watch(field.name as Path<T>)}/>
                )
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

export { Form, type FieldConfig, type FormProps }