import { ReactNode } from "react"
import styles from './alert.module.css'

export const Alert = ({ children }: { children: ReactNode }) => {
    return (
        <div id="alert" className={styles.alert}>{children}</div>
    )
}
