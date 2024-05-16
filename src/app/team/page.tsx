import { getTeam } from "@/sanity/lib/fetches";
import TeamGrid from "@/components/team/team-grid";
import TeamItem from "@/components/team/team-item";
import VolunteerForm from "@/components/team/volunteer";
import MainBlock from "@/components/layout/main-bl";

export default async function Team() {
    const members = await getTeam();

    return <>
        <MainBlock>
            <h1>Naš tim</h1>
            <TeamGrid>
                {members.map(member => <TeamItem key={member.name} member={member} />)}
            </TeamGrid>
        </MainBlock>
            <VolunteerForm />
    </>
}