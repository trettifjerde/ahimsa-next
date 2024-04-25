import styles from './loading.module.css';
import Logo from '@/components/layout/logo';

export default function NewsLoadingSpinner() {
    return <div className={styles.l}>
        <Logo />
    </div>
}