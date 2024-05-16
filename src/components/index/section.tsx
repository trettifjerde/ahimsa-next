import { ReactNode } from 'react';
import leafStyles from '@/styles/leaf.module.css';
import styles from './s.module.css';
import MainBlock from '../layout/main-bl';

export default function IndexSection({children}: {children: ReactNode}) {
    return <MainBlock className={`${leafStyles.lf} ${styles.s}`}>
        <section>
            {children}
        </section>
    </MainBlock>
}