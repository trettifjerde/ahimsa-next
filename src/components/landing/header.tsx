import MainBlock from "../layout/main-bl";
import styles from './s.module.css';

export default function LandingHeader() {
    return <MainBlock>
      <div className={styles.hb}>
        <header className={styles.h}>
          <h1>Ahimsa</h1>
          <h5><span>* </span><b>sanskrt</b>: nenasilje, ljubav, suosjećanje</h5>
          <h3>Udruga mladih</h3>
        </header>
      </div>
    </MainBlock>
}