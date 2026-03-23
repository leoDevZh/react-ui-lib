import {Dispatch, HTMLAttributes, SetStateAction} from "react";
import styles from './dialog.module.css'
import {ComponentSize} from "../provider";
import {DialogCTO, renderDialogCTO} from "./utils/DialogCTOs";
import {Button} from "../button";

interface DialogProps extends HTMLAttributes<HTMLDivElement> {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
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
                    open,
                    setOpen,
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

    const finalClasses = [styles.container, className, styles[size || 'md'], open ? styles.open : ''].filter(Boolean).join(' ')

    function renderBody() {
        if (title || text) {
            return (
                <div className={styles.body}>
                    {title ? <h3 className={styles.title}>{text}</h3> : <></>}
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
                    <Button label={acceptText} onClick={() => {
                        if (onAccept) {
                            onAccept()
                        }
                        setOpen(false)
                    }}/>

                    {onReject ? (
                            <Button label={rejectText} onClick={() => {
                                if (onReject) {
                                    onReject()
                                }
                                setOpen(false)
                            }}/>
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