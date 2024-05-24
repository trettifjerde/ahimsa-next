import { getTeam } from "@/sanity/lib/fetches";
import TeamGrid from "@/components/team/team-grid";
import TeamItem from "@/components/team/team-item";
import VolunteerForm from "@/components/team/volunteer-form";
import MainBlock from "@/components/layout/main-bl";
import { Metadata } from "next";
import Main from "@/components/layout/main";

export const metadata: Metadata = {
    title: 'Naš tim',
    description: 'Upoznajte se sa članovima Udruge'
}


export default async function Team() {
    const members = await getTeam();

    return <Main>
        <MainBlock>
            <h1>Naš tim</h1>
            <TeamGrid>
                {members.map(member => <TeamItem key={member.name} member={member} />)}
            </TeamGrid>
        </MainBlock>
        <VolunteerForm />
    </Main>
}