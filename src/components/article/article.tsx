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
import { CSSProperties } from 'react';

const sizes = '(max-width: 40rem) 95vw, (max-width: 64rem) 48rem, 70rem';

export default function Article({
    article, backBtnText, backUrl
}: {
    article: ArticleType, 
    backBtnText: string,
    backUrl: string
}) {

    const date = new Date(article.date).toLocaleString('hr', { dateStyle: 'full', timeStyle: 'short' });
    const imgContStyles = getImgContStyleProps(article);

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

                <div className={styles.ic} style={imgContStyles}>
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

function getImgContStyleProps(art: ArticleType) {
    const props: CSSProperties = {aspectRatio: 1};

    if (art.image) {
        const {width, aspectRatio} = art.image;
        console.log(width, aspectRatio);

        if (aspectRatio) {
            props.aspectRatio = aspectRatio;

            if (width) {
                if (aspectRatio >= 1) {
                    props.maxWidth = `${width}px`;
                }
                else {
                    props.width = `${width}px`;
                    props.maxWidth = '100%';
                    props.maxHeight = '85vh';
                }
            }
        }
    }

    return props;

}