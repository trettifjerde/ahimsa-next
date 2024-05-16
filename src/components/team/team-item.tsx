import { UdrugaMember } from "@/sanity/lib/types";
import { getImageUrl } from "@/utils/image-helpers";
import Image from "next/image";
import styles from './item.module.css';
import leafStyles from '@/styles/leaf.module.css';

export default function TeamItem({ member }: { member: UdrugaMember }) {
    return <div className={`${leafStyles.lf} ${styles.c}`}>

        <div className={styles.d}>{member.description}</div>
        
        <div className={styles.ic}>
            <Image src={getImageUrl(member.image)} alt={member.name} fill />
        </div>
        <div className={`${leafStyles.lf} ${styles.h}`}>
            <h5>{member.name}</h5>
            <h5>{member.surname}</h5>
        </div>
    </div>
}