import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { ArtGallery } from "@/components/ArtGallery";
import { ART_SERIES } from "@/data/art";

const flow = (title: string) => screen.getByRole("group", { name: new RegExp(`^${title}\\.`) });
const counts = () => screen.getAllByText(/^\d\d \/ \d\d$/).map((el) => el.textContent);

describe("<ArtGallery />", () => {
  it("renders one cover flow per series, each with its own pieces", () => {
    render(<ArtGallery />);
    expect(screen.getAllByRole("group", { name: /arrow keys browse/ })).toHaveLength(
      ART_SERIES.length
    );
    for (const series of ART_SERIES) {
      expect(screen.getByRole("heading", { name: series.title })).toBeInTheDocument();
      expect(flow(series.title).querySelectorAll("img.cf-face")).toHaveLength(series.pieces.length);
    }
  });

  it("moves each cover flow independently", async () => {
    const user = userEvent.setup();
    render(<ArtGallery />);
    await waitFor(() => expect(counts()).toEqual(["01 / 08", "01 / 04", "01 / 04"]));

    await user.click(screen.getByRole("button", { name: "Next: Figures" }));
    await waitFor(() => expect(counts()).toEqual(["01 / 08", "02 / 04", "01 / 04"]));

    await user.click(screen.getByRole("button", { name: "Next: Portraits" }));
    await user.click(screen.getByRole("button", { name: "Next: Portraits" }));
    await waitFor(() => expect(counts()).toEqual(["03 / 08", "02 / 04", "01 / 04"]));
    expect(screen.getByRole("button", { name: "Previous: Experimental Pieces" })).toHaveAttribute(
      "aria-disabled",
      "true"
    );
  });

  it("opens the front piece in a viewer that stays within the series", async () => {
    const user = userEvent.setup();
    render(<ArtGallery />);
    const stage = flow("Figures");

    stage.focus();
    await user.keyboard("{ArrowRight}");
    await waitFor(() => expect(counts()[1]).toBe("02 / 04"));

    await user.keyboard("{Enter}");
    const viewer = screen.getByRole("dialog", { name: "Figures viewer" });
    expect(within(viewer).getByText("Figures · No. 2")).toBeInTheDocument();

    // Stepping back past the first piece wraps to the last piece of the same series
    await user.keyboard("{ArrowLeft}");
    await within(viewer).findByText("Figures · No. 1");
    await user.keyboard("{ArrowLeft}");
    await within(viewer).findByText("Figures · No. 4");

    await user.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    expect(stage).toHaveFocus();
    // The carousel followed the viewer; the other series never moved
    expect(counts()).toEqual(["01 / 08", "04 / 04", "01 / 04"]);
  });
});
