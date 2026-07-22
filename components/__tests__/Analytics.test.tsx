import { describe, it, expect, vi, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import type { ComponentProps } from "react";
import { OpenPanelComponent } from "@openpanel/nextjs";
import Analytics from "../Analytics";

type OpenPanelComponentProps = ComponentProps<typeof OpenPanelComponent>;

const mockOpenPanelComponent = vi.hoisted(() =>
    vi.fn<(props: OpenPanelComponentProps) => null>(() => null),
);

vi.mock("@openpanel/nextjs", () => ({
    OpenPanelComponent: (props: OpenPanelComponentProps) =>
        mockOpenPanelComponent(props),
}));

describe("Analytics", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("renders OpenPanel with screen view tracking", () => {
        const { container } = render(<Analytics />);

        expect(container.firstChild).toBeNull();
        expect(mockOpenPanelComponent).toHaveBeenCalledWith(
            expect.objectContaining({
                clientId: "e981de6c-6332-47eb-938f-0dd32b6c1915",
                apiUrl: "https://opapi.musigree.com",
                trackScreenViews: true,
            }),
        );
    });
});
