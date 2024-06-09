import Main from "@/components/layout/main";
import MainBlock from "@/components/layout/main-bl";

export default function NotFound() {
    return <Main>
        <MainBlock>
            <h1>Joj!</h1>
            <h4 style={{paddingBlock: '10vh', textAlign: 'center'}}>Stranica nije nađena</h4>
        </MainBlock>
    </Main>
}