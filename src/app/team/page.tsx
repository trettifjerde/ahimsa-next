import { client } from "@/sanity/lib/client"
import { teamQuery } from "@/sanity/lib/queries"
import { TeamQueryResult } from "../../../sanity.types";
import TeamGrid from "@/components/team/team-grid";
import TeamItem from "@/components/team/team-item";

export default async function Team() {
    const members = await client.fetch<TeamQueryResult>(teamQuery);

    return <>
        <h1>Naš tim</h1>
        <TeamGrid>
            {members.map(member => <TeamItem key={member.name} member={member} />)}
        </TeamGrid>
    </>
}