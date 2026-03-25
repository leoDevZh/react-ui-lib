import {useEffect, useLayoutEffect, useRef, useState} from "react";
import styles from './photoinput.module.css'
import {InputProps} from "../../Form";
import {FieldValues, Path} from "react-hook-form";
import style from "../dropdown/dropdown.module.css";

const PhotoInput = <T extends FieldValues, >({
                                                 field,
                                                 registerFn,
                                                 setValueFn,
                                                 errorMsg,
                                                 className
                                             }: InputProps<T>) => {

    const [preview, setPreview] = useState<string | undefined>(field.inputConfig?.photo?.initialImg)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const finalClass = [className, styles.container, errorMsg ? style.error : ''].filter(Boolean).join(' ')
    const divRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (field.inputConfig?.photo?.initialImg) {
            setPreview(field.inputConfig?.photo?.initialImg)
        }
    }, [field.inputConfig?.photo?.initialImg]);

    useLayoutEffect(() => {
        if (divRef?.current) {
            const computedStyle = window.getComputedStyle(divRef.current)
            divRef.current.style.setProperty('--calc-font-size', computedStyle.fontSize)
        }
    }, []);

    function handleFileChange(e: any) {
        const file = e.target.files?.[0]
        if (file) {
            setValueFn(field.name as Path<T>, file)
            const reader = new FileReader()
            reader.onloadend = () => {
                setPreview(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    function renderAction() {
        if (field.inputConfig?.photo?.onDelete && preview) {
            return (
                <div className={`${styles.cta} ${styles.rm}`} onClick={() => {
                    setPreview(undefined)
                    setValueFn(field.name as Path<T>, undefined as any)
                    field.inputConfig!.photo!.onDelete!()
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path
                            d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 11H11V17H9V11ZM13 11H15V17H13V11ZM9 4V6H15V4H9Z"></path>
                    </svg>
                </div>
            )
        } else {
            return (
                <div className={styles.cta} onClick={() => fileInputRef.current?.click()}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path
                            d="M14.4336 3C15.136 3 15.7869 3.36852 16.1484 3.9707L16.9209 5.25684C17.0113 5.40744 17.174 5.5 17.3496 5.5H19C20.6569 5.5 22 6.84315 22 8.5V18C22 19.6569 20.6569 21 19 21H5C3.34315 21 2 19.6569 2 18V8.5C2 6.84315 3.34315 5.5 5 5.5H6.65039C6.82602 5.5 6.98874 5.40744 7.0791 5.25684L7.85156 3.9707C8.21306 3.36852 8.86403 3 9.56641 3H14.4336ZM8.79492 6.28613C8.34311 7.03915 7.52855 7.5 6.65039 7.5H5C4.44772 7.5 4 7.94772 4 8.5V18C4 18.5523 4.44772 19 5 19H19C19.5523 19 20 18.5523 20 18V8.5C20 7.94772 19.5523 7.5 19 7.5H17.3496C16.4715 7.5 15.6569 7.03915 15.2051 6.28613L14.4336 5H9.56641L8.79492 6.28613ZM12 8.5C14.4853 8.5 16.5 10.5147 16.5 13C16.5 15.4853 14.4853 17.5 12 17.5C9.51472 17.5 7.5 15.4853 7.5 13C7.5 10.5147 9.51472 8.5 12 8.5ZM12 10.5C10.6193 10.5 9.5 11.6193 9.5 13C9.5 14.3807 10.6193 15.5 12 15.5C13.3807 15.5 14.5 14.3807 14.5 13C14.5 11.6193 13.3807 10.5 12 10.5Z"></path>
                    </svg>
                </div>
            )
        }
    }

    function renderImg() {

        if (preview) {
            return <img src={preview} alt=''/>
        } else if (field.inputConfig?.photo?.initialImg && !field.inputConfig?.photo?.onDelete) {
            return <img src={field.inputConfig?.photo?.initialImg} alt=''/>
        }
        return <></>
    }

    return (
        <div ref={divRef} className={finalClass}>
            <div className={styles.preview}>
                {renderImg()}
            </div>
            {renderAction()}
            <input
                type='file'
                accept='image/*'
                className={styles.hidden}
                {...registerFn(field.name as Path<T>,
                    {
                        required: field.required,
                        validate: field.validationFn
                    }
                )}
                onChange={handleFileChange}
                ref={fileInputRef}
            />
            <span className={style.errorSpan}>{errorMsg}</span>
        </div>
    )
}

export {PhotoInput}