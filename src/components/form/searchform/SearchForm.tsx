import styles from "./searchform.module.css";
import React, {
    Dispatch,
    forwardRef,
    PropsWithChildren,
    SetStateAction,
    useEffect,
    useImperativeHandle,
    useLayoutEffect,
    useMemo,
    useRef,
    useState
} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {ComponentSize} from "../../provider";

interface SearchValue {
    search: string
}

interface SearchFormProps extends PropsWithChildren, React.FormHTMLAttributes<HTMLFormElement> {
    placeholder?: string
    required: boolean | string
    validationFn: (value: any) => boolean | string
    onSubmitFn: SubmitHandler<SearchValue>
    componentSize?: ComponentSize,
    errorMsg?: string,
    setErrorMsg?: Dispatch<SetStateAction<string | undefined>>
    onValuesChange?: (values: SearchValue) => void
    defaultValues?: Partial<SearchValue>
    submitting?: boolean
}

interface SearchFormRef {
    resetForm: () => void
}

const SearchForm = forwardRef<SearchFormRef, SearchFormProps>(({
                                                                   placeholder,
                                                                   required,
                                                                   validationFn,
                                                                   onSubmitFn,
                                                                   componentSize = 'md',
                                                                   className,
                                                                   errorMsg,
                                                                   setErrorMsg,
                                                                   onValuesChange,
                                                                   defaultValues,
                                                                   submitting
                                                               }: SearchFormProps, ref) => {
        const {
            handleSubmit,
            register,
            formState: {isSubmitting, errors},
            watch,
            reset,
            getValues
        } = useForm<SearchValue>()
        const formRef = useRef<HTMLFormElement>(null)

        useLayoutEffect(() => {
            if (formRef.current) {
                const computedStyles = window.getComputedStyle(formRef.current)
                formRef.current.style.setProperty('--calc-font-size', computedStyles.fontSize)
            }
        }, []);

        const [isFocused, setIsFocused] = useState(false)

        const finalClass = [className, styles.form, styles[componentSize ?? 'md'], isFocused ? styles.focused : ''].filter(Boolean).join(' ')

        const values = watch()
        const stableValues = useMemo(() => values, [JSON.stringify(values)])

        useEffect(() => {
            if (setErrorMsg) {
                setErrorMsg(undefined)
            }
            if (onValuesChange) {
                onValuesChange(stableValues)
            }
        }, [stableValues])

        useEffect(() => {
            if (defaultValues) {
                reset({
                    ...getValues(),
                    ...defaultValues
                })
            }
        }, [defaultValues])

        useEffect(() => {
            // TODO
        }, [errors['search']?.message as string]);

        useImperativeHandle(ref, () => ({
            resetForm() {
                reset()
            }
        }))

        return (
            <form className={finalClass} onSubmit={handleSubmit(onSubmitFn)} ref={formRef}>
                <input type='text'
                       placeholder={placeholder}
                       onFocus={() => setIsFocused(true)}
                       {...register('search',
                           {
                               required: required,
                               validate: validationFn
                           }
                       )}
                       onBlur={() => setIsFocused(false)}
                />
                {errorMsg ? <div className={styles.error}>{errorMsg}</div> : ''}
                <button disabled={isSubmitting}>
                    {(isSubmitting || submitting) ?
                        <svg className={styles.rotate} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                             fill="currentColor">
                            <path
                                d="M11.9995 2C12.5518 2 12.9995 2.44772 12.9995 3V6C12.9995 6.55228 12.5518 7 11.9995 7C11.4472 7 10.9995 6.55228 10.9995 6V3C10.9995 2.44772 11.4472 2 11.9995 2ZM11.9995 17C12.5518 17 12.9995 17.4477 12.9995 18V21C12.9995 21.5523 12.5518 22 11.9995 22C11.4472 22 10.9995 21.5523 10.9995 21V18C10.9995 17.4477 11.4472 17 11.9995 17ZM20.6597 7C20.9359 7.47829 20.772 8.08988 20.2937 8.36602L17.6956 9.86602C17.2173 10.1422 16.6057 9.97829 16.3296 9.5C16.0535 9.02171 16.2173 8.41012 16.6956 8.13398L19.2937 6.63397C19.772 6.35783 20.3836 6.52171 20.6597 7ZM7.66935 14.5C7.94549 14.9783 7.78161 15.5899 7.30332 15.866L4.70525 17.366C4.22695 17.6422 3.61536 17.4783 3.33922 17C3.06308 16.5217 3.22695 15.9101 3.70525 15.634L6.30332 14.134C6.78161 13.8578 7.3932 14.0217 7.66935 14.5ZM20.6597 17C20.3836 17.4783 19.772 17.6422 19.2937 17.366L16.6956 15.866C16.2173 15.5899 16.0535 14.9783 16.3296 14.5C16.6057 14.0217 17.2173 13.8578 17.6956 14.134L20.2937 15.634C20.772 15.9101 20.9359 16.5217 20.6597 17ZM7.66935 9.5C7.3932 9.97829 6.78161 10.1422 6.30332 9.86602L3.70525 8.36602C3.22695 8.08988 3.06308 7.47829 3.33922 7C3.61536 6.52171 4.22695 6.35783 4.70525 6.63397L7.30332 8.13398C7.78161 8.41012 7.94549 9.02171 7.66935 9.5Z"></path>
                        </svg> : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                      fill="currentColor">
                            <path
                                d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z"></path>
                        </svg>}
                </button>
            </form>
        )
    }
)
export {SearchForm, type SearchValue, type SearchFormProps, type SearchFormRef}