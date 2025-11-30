import {FieldValues, Path} from "react-hook-form";
import {FieldConfig, InputProps} from "../../Form";
import styles from "./calendar.module.css";
import stylesInput from "./calendarInput.module.css";
import {DateTime, Info, Interval} from "luxon"
import React, {useEffect, useLayoutEffect, useRef, useState} from "react";
import style from "../dropdown/dropdown.module.css";


const CalendarInput = <T extends FieldValues,>({className, field, registerFn, setValueFn, errorMsg}: InputProps<T>) => {
    const [showCalendar, setShowCalendar] = useState(false)
    const [selectedDate, setSelectedDate] = useState<undefined | DateTime>(undefined)

    const divRef = useRef<HTMLDivElement>(null)

    const finalClasses = [className, stylesInput.container, showCalendar ? stylesInput.show : '', errorMsg ? stylesInput.error : ''].filter(Boolean).join(' ')
    const wrapperClasses = [stylesInput.wrapper, (showCalendar || selectedDate) ? stylesInput.selected : ''].filter(Boolean).join(' ')

    useLayoutEffect(() => {
        if (divRef?.current) {
            const computedStyle = window.getComputedStyle(divRef.current)
            divRef.current.style.setProperty('--calc-font-size', computedStyle.fontSize)
        }
    }, []);

    useEffect(() => {
        function handleClickOutside(event: Event) {
            if (divRef.current && !divRef.current.contains(event.target as Node)) {
                setShowCalendar(false);
            }
        }
        if (showCalendar) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('touchstart', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        };
    }, [showCalendar]);

    useEffect(() => {
        setShowCalendar(false)
        if (selectedDate) {
            setValueFn(field.name as Path<T>, selectedDate?.toISO({format: 'basic'}) as any, {shouldValidate: true})
        }
    }, [selectedDate]);

    return (
        <div
            ref={divRef}
            className={finalClasses}
            onClick={() => setShowCalendar(true)}>
            <label className={stylesInput.label}>{field.label}</label>
            <div
                className={wrapperClasses}
                {...registerFn(field.name as Path<T>,
                    {
                        required: field.required,
                        validate: field.validationFn
                    }
                )}
            >
                <svg className={stylesInput.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M9 1V3H15V1H17V3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H7V1H9ZM20 11H4V19H20V11ZM8 13V15H6V13H8ZM13 13V15H11V13H13ZM18 13V15H16V13H18ZM7 5H4V9H20V5H17V7H15V5H9V7H7V5Z"></path></svg>
                <span className={stylesInput.selectedDate}>{selectedDate?.setLocale('de').toLocaleString({day: '2-digit', month: '2-digit', year: 'numeric'})}</span>
            </div>
            <div className={stylesInput.calendar}>
                <Calendar field={field} setSelectedDate={setSelectedDate}/>
            </div>
            <span className={style.errorSpan}>{errorMsg}</span>
        </div>
    )
}

const Calendar = <T extends FieldValues,>({field, setSelectedDate}: {field: FieldConfig<T>, setSelectedDate:  React.Dispatch<React.SetStateAction<DateTime<boolean> | undefined>>}) => {
    const weekdays = Info.weekdays('short', {locale: 'de'})
    const [currentMonth, setCurrentMonth] = useState(DateTime.now())
    const [openYears, setOpenYears] = useState(false)

    const finalClasses = [styles.container, styles[field?.inputConfig?.size ?? 'md']].filter(Boolean).join(' ')
    const calendarClasses = [styles.calendar].filter(Boolean).join(' ')
    const yearsClasses = [styles.years, openYears ? styles.show : ''].filter(Boolean).join(' ')

    const monthAsString = currentMonth.setLocale('de').toLocaleString({month: 'short', year: 'numeric'})

    const daysOfMonth = Interval.fromDateTimes(
        currentMonth.startOf('month').startOf('week'),
        currentMonth.endOf('month').endOf('week')
    )
        .splitBy({day: 1})
        .map(d => d.start)
        .filter(d => d !== null)

    const yearsToSelect = field.inputConfig?.yearsToSelect ?? years()

    const divRef = useRef<HTMLDivElement>(null)

    useLayoutEffect(() => {
        if (divRef?.current) {
            const computedStyle = window.getComputedStyle(divRef.current)
            divRef.current.style.setProperty('--calc-font-size', computedStyle.fontSize)
        }
    }, []);

    function forwardMonth() {
        setCurrentMonth(currentMonth.plus({month: 1}))
    }
    function backwardMonth() {
        setCurrentMonth(currentMonth.minus({month: 1}))
    }

    return (
        <div ref={divRef} className={finalClasses}>
            <div className={styles.navigator}>
                <div onClick={() => backwardMonth()} className={styles.iconContainer}>
                    <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M8 12L14 6V18L8 12Z"></path></svg>
                </div>
                <div onClick={() => setOpenYears(!openYears)} className={styles.yearSelectContainer}>
                    <span>{monthAsString}</span>
                    <svg className={styles.icon} style={{rotate: openYears ? '180deg': 'none'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 16L6 10H18L12 16Z"></path></svg>
                </div>
                <div onClick={() => forwardMonth()} className={styles.iconContainer}>
                    <svg className={styles.icon}  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16 12L10 18V6L16 12Z"></path></svg>
                </div>
            </div>
            <div className={styles.content}>
                <div className={calendarClasses}>
                    <div className={styles.weekdays}>
                        {weekdays.map(wd => <span key={wd}>{wd}</span>)}
                    </div>
                    <div className={styles.days}>
                        {daysOfMonth.map(day => {
                            return (
                                <span
                                    key={day?.toFormat("MM:dd")}
                                    onClick={() => setSelectedDate(day)}
                                    style={{
                                        color: day?.month !== currentMonth.month
                                            ? 'var(--colors-font-secondaryColor)'
                                            : 'var(--colors-font-primaryColor)',
                                    }}
                                >
                                {day?.toLocaleString({day:"2-digit"})}
                                </span>
                            )
                        })}
                    </div>
                </div>
                <div className={yearsClasses}>
                    {yearsToSelect.map(year => <span key={year} onClick={() => {
                        setCurrentMonth(currentMonth.set({year: year}))
                        setOpenYears(false)
                    }} >{year}</span>)}
                </div>
            </div>
        </div>
    )

    function years() {
        const yearsToSelect = []
        for (let i = -20; i < 20; i++) {
            yearsToSelect.push(DateTime.now().year + i)
        }
        return yearsToSelect
    }
}

export { CalendarInput }