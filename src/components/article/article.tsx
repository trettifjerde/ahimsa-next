import { CSSProperties } from 'react';
import { PortableText } from '@portabletext/react';
import { ImageFullInfo } from '@/sanity/lib/types';
import { makePics } from '@/utils/serverHelpers';
import { ArticleType } from '@/utils/types';
import GalleryViewer from '../gallery/gallery-viewer';
import GalleryGrid from '../gallery/gallery-grid';
import StoryCategoriesGrid from '../stories/story-cats';
import CustomImage from '../ui/image/customImage';
import styles from './a.module.css';
import leafStyles from '@/styles/leaf.module.css';

const sizes = '(max-width: 40rem) 95vw, (max-width: 64rem) 48rem, 70rem';

export default function Article({article}: {article: ArticleType}) {

    const date = new Date(article.date).toLocaleString('hr', { dateStyle: 'full', timeStyle: 'short' });
    const imgContStyles = getImgContStyleProps(article.image);

    return <article className={styles.a}>
        <div className={`${leafStyles.lf} ${styles.h}`}>
            <h1>{article.title}</h1>
            <div className={styles.date}>{date}</div>
            {article.categories && <StoryCategoriesGrid categoryIds={article.categories} className={styles.cats} />}
        </div>

        <div className={styles.ic} style={imgContStyles}>
            <CustomImage source={article.image} full sizes={sizes} />
        </div>

        <div className={`${leafStyles.lf} ${styles.t}`}>
            <PortableText value={article.description} />
        </div>

        {article.gallery && <GalleryGrid>
            <GalleryViewer pics={makePics(article.gallery)} />
        </GalleryGrid>}
    </article>
}

export function Article404({text}: {text: string}) {

    return <article className={styles.a}>
        <div className={`${leafStyles.lf} ${styles.h}`}>
            <h1>{text}</h1>
            <div className={styles.date}>Pogreška 404</div>
        </div>
    </article>
}

function getImgContStyleProps(img: ImageFullInfo) {

    if (img) {

        const { width, height } = img;

        if (width && height) {

            const props: CSSProperties = {};
            props.aspectRatio = width / height;
            props.maxWidth = `${width}px`;          

            return props;
        }
    }

    return { aspectRatio: 1, maxWidth: '85%', maxHeight: '45vh' } as CSSProperties;

}