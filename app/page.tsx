import { permanentRedirect } from "next/navigation";
import { HOME_PATH, rootRedirectMetadata } from "@/lib/site";

export const metadata = rootRedirectMetadata;

export default function RootPage() {
    permanentRedirect(HOME_PATH);
}
