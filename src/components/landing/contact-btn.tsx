import Link from "next/link";
import styles from './s.module.css';
import leafStyles from '@/styles/leaf.module.css';

export default function LandingContactButton() {
    return <Link href="/contact">
        <div className={`${leafStyles.lfa} ${styles.join}`}>
          <h2>Slobodno nam se javi!</h2>
        </div>
      </Link>
}