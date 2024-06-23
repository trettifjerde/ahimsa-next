import { getLanding } from "@/sanity/lib/fetches";
import HighlightBlock from "../ui/highlight/highlight";

export default function LandingSummary() {
  const textPromise = getLanding()
    .then(res => res?.text || null)

  return <HighlightBlock textPromise={textPromise} />
}