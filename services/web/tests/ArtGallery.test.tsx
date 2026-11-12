import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { ArtGallery } from "@/components/ArtGallery";
import { ART_SERIES } from "@/data/art";

const flow = (title: string) => screen.getByRole("group", { name: new RegExp(`^${title}\\.`) });

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
    render(<ArtGallery />);

    const portraits = screen.getByRole("slider", { name: "Scrub through Portraits" });
    const figures = screen.getByRole("slider", { name: "Scrub through Figures" });
    const experimental = screen.getByRole("slider", { name: "Scrub through Experimental Pieces" });

    fireEvent.change(figures, { target: { value: "1" } });
    await waitFor(() => expect(figures).toHaveValue("1"));

    fireEvent.change(portraits, { target: { value: "2" } });
    await waitFor(() => expect(portraits).toHaveValue("2"));

    expect(experimental).toHaveValue("0");
    expect(screen.getAllByRole("slider")).toHaveLength(ART_SERIES.length);
    expect(screen.queryByRole("button", { name: /previous|next|spin/i })).not.toBeInTheDocument();
    expect(screen.queryByText(/drag · swipe/)).not.toBeInTheDocument();
    expect(screen.queryByText(/^\d\d \/ \d\d$/)).not.toBeInTheDocument();
  });

  it("opens the front piece in a viewer that stays within the series", async () => {
    const user = userEvent.setup();
    render(<ArtGallery />);
    const stage = flow("Figures");

    stage.focus();
    await user.keyboard("{ArrowRight}");
    await waitFor(() =>
      expect(screen.getByRole("slider", { name: "Scrub through Figures" })).toHaveValue("1")
    );

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
    expect(screen.getByRole("slider", { name: "Scrub through Portraits" })).toHaveValue("0");
    expect(screen.getByRole("slider", { name: "Scrub through Figures" })).toHaveValue("3");
    expect(screen.getByRole("slider", { name: "Scrub through Experimental Pieces" })).toHaveValue(
      "0"
    );
  });
});
