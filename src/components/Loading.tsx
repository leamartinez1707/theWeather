import styles from './Loading.module.css'

export const Loading = () => {
    return (
        <div className={styles.spinner}>
            <div className={styles.dot1}></div>
            <div className={styles.dot2}></div>
        </div>
    )
}
