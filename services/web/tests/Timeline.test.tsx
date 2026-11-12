import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Timeline } from "@/components/Timeline";
import { CAREER, TYPES } from "@/data/career";

const entries = () => document.querySelectorAll("article.ledger-entry");
const filters = () => within(screen.getByRole("group", { name: "Filter timeline" }));

describe("<Timeline />", () => {
  it("renders every career item by default", () => {
    render(<Timeline />);
    expect(entries()).toHaveLength(CAREER.length);
    expect(document.querySelector(".ledger > .absolute > div")).toBeInTheDocument();
    expect(document.querySelectorAll(".ledger-entry > span.absolute")).toHaveLength(0);
  });

  it("omits counts from both All filters", () => {
    render(<Timeline />);
    const filterGroup = screen.getByRole("group", { name: "Filter timeline" });
    const allButtons = [...filterGroup.querySelectorAll("button")].filter((button) =>
      button.textContent?.trim().startsWith("All")
    );

    expect(allButtons).toHaveLength(2);
    expect(allButtons.map((button) => button.textContent?.trim())).toEqual(["All", "All"]);
  });

  it("filters by type and toggles back to all", async () => {
    const user = userEvent.setup();
    render(<Timeline />);
    const roles = filters().getByRole("button", { name: new RegExp(`^${TYPES.role.label}\\b`) });

    await user.click(roles);
    expect(roles).toHaveAttribute("aria-pressed", "true");
    expect(entries()).toHaveLength(CAREER.filter((it) => it.type === "role").length);

    await user.click(roles);
    expect(roles).toHaveAttribute("aria-pressed", "false");
    expect(entries()).toHaveLength(CAREER.length);
  });

  it("filters by organization", async () => {
    const user = userEvent.setup();
    render(<Timeline />);

    await user.click(filters().getByRole("button", { name: /^Filter by Google/ }));
    expect(entries()).toHaveLength(CAREER.filter((it) => it.org === "google").length);
  });

  it("shows the Bell Canada AI post-training role with its date range and summary", async () => {
    const user = userEvent.setup();
    render(<Timeline />);
    const card = screen.getByRole("button", { name: /AI Model Post-Training/ });
    const entry = card.closest("article");

    expect(card).toHaveTextContent("Jul 2023 – Apr 2024");
    await user.click(card);
    expect(
      within(entry as HTMLElement).getByText("Bell Canada - Artificial Intelligence")
    ).toBeInTheDocument();
    expect(
      within(entry as HTMLElement).getByText(/post-training.*call center operations/i)
    ).toBeInTheDocument();
  });

  it("filters by Bell Canada", async () => {
    const user = userEvent.setup();
    render(<Timeline />);

    await user.click(filters().getByRole("button", { name: /^Filter by Bell Canada/ }));
    expect(entries()).toHaveLength(1);
    expect(within(entries()[0] as HTMLElement).getByRole("button")).toHaveTextContent(
      "AI Model Post-Training"
    );
  });

  it("expands and collapses an entry", async () => {
    const user = userEvent.setup();
    render(<Timeline />);
    const toggle = within(entries()[0] as HTMLElement).getByRole("button");

    expect(toggle).toHaveAttribute("aria-expanded", "false");
    await user.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    await user.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });
});
