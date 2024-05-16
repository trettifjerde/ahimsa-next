import FooterInfo from "./footer-info";
import MainBlock from "./main-bl";

export default function Footer() {

    return <footer>
        <MainBlock>
            <div className="links">
                <a href={process.env.NEXT_PUBLIC_INSTAGRAM || ''} target="_blank">
                    <i className="icon-facebook" />
                </a>
                <a href={process.env.NEXT_PUBLIC_FACEBOOK || ''} target="_blank">
                    <i className="icon-instagram" />
                </a>
            </div>
            <FooterInfo />
        </MainBlock>
    </footer>
}