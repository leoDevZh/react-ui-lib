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
import {Spinner} from "../utils/spinner/Spinner";

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
                        (<Spinner/>) : (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                      fill="currentColor">
                            <path
                                d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z"></path>
                            </svg>
                        )}
                </button>
            </form>
        )
    }
)
export {SearchForm, type SearchValue, type SearchFormProps, type SearchFormRef}