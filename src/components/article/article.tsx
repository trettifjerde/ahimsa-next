import { PortableText } from '@portabletext/react';
import { makePics } from '@/utils/serverHelpers';
import Main from '../layout/main';
import MainBlock from '../layout/main-bl';
import GalleryViewer from '../gallery/gallery-viewer';
import GalleryGrid from '../gallery/gallery-grid';
import BackButton from './back-button';
import styles from './a.module.css';
import leafStyles from '@/styles/leaf.module.css';
import { ArticleType } from '@/utils/types';
import CustomImage from '../ui/image/customImage';

const sizes = '(max-width: 40rem) 100vw, (max-width: 64rem) 50rem, 70rem';

export default function Article({
    article, backBtnText, backUrl
}: {
    article: ArticleType, 
    backBtnText: string,
    backUrl: string
}) {

    const date = new Date(article.date).toLocaleString('hr', { dateStyle: 'full', timeStyle: 'short' });

    return <Main>
        <MainBlock>
            <div className={styles.back}>
                <BackButton text={backBtnText} url={backUrl} />
            </div>
            <article>
                <div className={`${leafStyles.lf} ${styles.h}`}>
                    <h1>{article.title}</h1>
                    <div className={styles.date}>{date}</div>
                </div>

                <div className={styles.ic}>
                    <CustomImage source={article.image} full sizes={sizes} />
                </div>

                <div className={`${leafStyles.lf} ${styles.t}`}>
                    <PortableText value={article.description} />
                </div>

                {article.gallery && <GalleryGrid className={styles.gg}>
                    <GalleryViewer pics={makePics(article.gallery)} />
                </GalleryGrid>}
            </article>
        </MainBlock>
    </Main>
}