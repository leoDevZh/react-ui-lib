import {HTMLAttributes} from "react";
import styles from './dialog.module.css'
import {ComponentSize} from "../provider";
import {DialogCTO, renderDialogCTO} from "./utils/DialogCTOs";
import {LightButton} from "../button";

interface DialogProps extends HTMLAttributes<HTMLDivElement> {
    closeDialog: () => void
    title?: string
    text?: string
    dto?: DialogCTO
    acceptText?: string
    rejectText?: string
    onAccept?: () => void
    onReject?: () => void
    size?: ComponentSize
}

const Dialog = ({
                    closeDialog,
                    className,
                    children,
                    size,
                    title,
                    text,
                    dto,
                    acceptText,
                    rejectText,
                    onAccept,
                    onReject
                }: DialogProps) => {

    const finalClasses = [styles.container, className, styles[size || 'md']].filter(Boolean).join(' ')

    function renderBody() {
        if (title || text) {
            return (
                <div className={styles.body}>
                    {title ? <h3 className={styles.title}>{title}</h3> : <></>}
                    {text ? <p className={styles.text}>{text}</p> : <></>}
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
                    <LightButton label={acceptText} onClick={() => {
                        if (onAccept) {
                            onAccept()
                        }
                        closeDialog()
                    }}/>

                    {rejectText ? (
                            <LightButton
                                label={rejectText}
                                onClick={() => {
                                if (onReject) {
                                    onReject()
                                }
                                    closeDialog()
                                }}
                                accentColor='var(--colors-action-inverse)'
                            />
                        )
                        : <></>
                    }
                </>
            )
        }
    }

    return (
        <div className={finalClasses}>
            <div className={styles.backdrop}></div>
            <div className={styles.dialog}>
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