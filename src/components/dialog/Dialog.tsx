import {HTMLAttributes, useEffect, useId, useRef} from "react";
import gsap from "gsap";
import {useGSAP} from "@gsap/react";
import styles from './dialog.module.css'
import {ComponentSize, useTheme} from "../provider";
import {DialogCTO, renderDialogCTO} from "./utils/DialogCTOs";
import {LightButton} from "../button";

interface DialogProps extends HTMLAttributes<HTMLDivElement> {
    closeDialog: () => void
    title?: string
    text?: string
    ariaLabel?: string
    dto?: DialogCTO
    acceptText?: string
    rejectText?: string
    onAccept?: () => void
    onReject?: () => void
    size?: ComponentSize
}

const FOCUSABLE = 'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])'

const Dialog = ({
                    closeDialog,
                    className,
                    children,
                    size,
                    title,
                    text,
                    ariaLabel,
                    dto,
                    acceptText,
                    rejectText,
                    onAccept,
                    onReject
                }: DialogProps) => {

    const dialogRef = useRef<HTMLDivElement>(null)
    const titleId = useId()
    const descId = useId()
    const {theme} = useTheme()

    useGSAP(() => {
        gsap.fromTo(
            dialogRef.current,
            {opacity: 0, scale: 0.92, y: -8},
            {opacity: 1, scale: 1, y: 0, duration: 0.2, ease: 'power2.out'}
        )
    }, {scope: dialogRef, dependencies: []})

    useEffect(() => {
        const previouslyFocused = document.activeElement as HTMLElement | null
        const firstFocusable = dialogRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE)[0]
        firstFocusable?.focus()

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                closeDialog()
                return
            }
            if (e.key !== 'Tab') return

            const focusable = Array.from(dialogRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? [])
            if (focusable.length === 0) return

            const first = focusable[0]
            const last = focusable[focusable.length - 1]

            if (e.shiftKey) {
                if (document.activeElement === first) {
                    e.preventDefault()
                    last?.focus()
                }
            } else {
                if (document.activeElement === last) {
                    e.preventDefault()
                    first?.focus()
                }
            }
        }

        document.addEventListener('keydown', handleKeyDown)
        return () => {
            document.removeEventListener('keydown', handleKeyDown)
            previouslyFocused?.focus()
        }
    }, [closeDialog])

    const isMorphism = theme.style === 'morphism'
    const sizeClass = styles[size || 'md']

    const containerClasses = [styles.container, className, sizeClass].filter(Boolean).join(' ')
    const dialogClasses = [styles.dialog, isMorphism ? styles.morphism : styles.classic].filter(Boolean).join(' ')

    function renderBody() {
        if (title || text) {
            return (
                <div className={styles.body}>
                    {title ? <h3 id={titleId} className={styles.title}>{title}</h3> : <></>}
                    {text ? <p id={descId} className={styles.text}>{text}</p> : <></>}
                </div>
            )
        } else {
            return children
        }
    }

    function renderCTO() {
        if (dto) {
            return renderDialogCTO(dto)
        } else {
            return (
                <>
                    {acceptText && (
                        <LightButton label={acceptText} onClick={() => {
                            if (onAccept) onAccept()
                            closeDialog()
                        }}/>
                    )}
                    {rejectText && (
                        <LightButton
                            label={rejectText}
                            onClick={() => {
                                if (onReject) onReject()
                                closeDialog()
                            }}
                            accentColor='var(--colors-action-inverse)'
                        />
                    )}
                </>
            )
        }
    }

    return (
        <div className={containerClasses}>
            <div className={styles.backdrop} onClick={closeDialog} aria-hidden="true"></div>
            <div
                ref={dialogRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby={title ? titleId : undefined}
                aria-describedby={text ? descId : undefined}
                aria-label={!title ? (ariaLabel ?? 'Dialog') : undefined}
                className={dialogClasses}
            >
                <button className={styles.close} onClick={closeDialog} aria-label="Close dialog">
                    ×
                </button>
                <div className={styles.wrapper}>
                    {renderBody()}
                    <div className={styles.cto}>
                        {renderCTO()}
                    </div>
                </div>
            </div>
        </div>
    )
}

export {Dialog, type DialogProps}
