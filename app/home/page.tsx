import { permanentRedirect } from "next/navigation";
import { HOME_PATH, retiredHomeRedirectMetadata } from "@/lib/site";

export const metadata = retiredHomeRedirectMetadata;

export default function RetiredHomePage() {
    permanentRedirect(HOME_PATH);
}
