import { FooterContactQueryResult } from "../../../sanity.types";
import FooterInfo from "./footer-info";
import MainBlock from "./main-bl";

export default function Footer({ info }: { info: FooterContactQueryResult }) {
    if (info) {
        const {facebook, instagram} = info;

        return <footer>
            <MainBlock>
                <div className="links">
                    {facebook && <a href={facebook} target="_blank">
                        <i className="icon-facebook" />
                    </a>}
                    {instagram && <a href={instagram} target="_blank">
                        <i className="icon-instagram" />
                    </a>}
                </div>
                <FooterInfo info={info} />
            </MainBlock>
        </footer>
    }
    else
        return <footer></footer>
}