import { UdrugaMember } from "@/sanity/lib/types";
import styles from './item.module.css';
import leafStyles from '@/styles/leaf.module.css';
import CustomImage from "../ui/image/customImage";

const sizes = '14rem';

export default function TeamItem({ member }: { member: UdrugaMember }) {
    return <div className={`${leafStyles.lf} ${styles.c}`}>

        <div className={styles.d}>{member.description}</div>
        
        <div className={styles.ic}>
            <CustomImage source={member.image} square sizes={sizes}/>
        </div>
        <div className={`${leafStyles.lf} ${styles.h}`}>
            <h5>{member.name}</h5>
            <h5>{member.surname}</h5>
        </div>
    </div>
}