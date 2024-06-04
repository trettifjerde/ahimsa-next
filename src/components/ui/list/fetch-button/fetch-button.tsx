import { MouseEventHandler } from "react";
import { SpinnerButton } from "../../buttons";
import styles from './btn.module.css';

export default function FetchButton({loading, fetchMore}: {loading: boolean, fetchMore: MouseEventHandler}) {
    return <div className={styles.spb}>
        <SpinnerButton loading={loading} onClick={fetchMore}>Load more</SpinnerButton>
    </div>
}