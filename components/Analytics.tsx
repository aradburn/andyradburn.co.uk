import { OpenPanelComponent } from "@openpanel/nextjs";

const OPENPANEL_CLIENT_ID = "e981de6c-6332-47eb-938f-0dd32b6c1915";
const OPENPANEL_API_URL = "https://opapi.musigree.com";

export default function Analytics() {
    return (
        <OpenPanelComponent
            clientId={OPENPANEL_CLIENT_ID}
            apiUrl={OPENPANEL_API_URL}
            trackScreenViews={true}
        />
    );
}
