import { ReactNode } from 'react';
import MainBlock from '../../layout/main-bl';
import leafStyles from '@/styles/leaf.module.css';
import styles from './s.module.css';

export default function ShadowedSection({reverse, children, className}: {reverse?: boolean, children: ReactNode, className?: string}) {
    return <MainBlock className={`${leafStyles.lf} ${styles.s} ${reverse ? styles.r : ''} ${className || ''}`}>
        <section>
            {children}
        </section>
    </MainBlock>
}