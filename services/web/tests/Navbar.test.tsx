import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Navbar } from "@/components/Navbar";

let pathname = "/";
vi.mock("next/navigation", () => ({ usePathname: () => pathname }));

// jsdom has no layout, so give each link a box: [left, width]
const BOXES: Record<string, [number, number]> = {
  Timeline: [10, 60],
  Art: [100, 20],
  Philosophy: [150, 80],
};

const rect = (left: number, width: number) =>
  ({ left, width, top: 0, bottom: 20, right: left + width, height: 20 }) as DOMRect;

const nav = () => screen.getAllByRole("navigation")[0];
const line = () => nav().querySelector<HTMLElement>("span[aria-hidden]")!;

describe("<Navbar />", () => {
  beforeEach(() => {
    pathname = "/";
    vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(function (
      this: HTMLElement
    ) {
      const box = this.tagName === "A" ? BOXES[this.textContent ?? ""] : undefined;
      return box ? rect(...box) : rect(0, 500);
    });
    // The real observer reports once as soon as it starts observing
    vi.stubGlobal(
      "ResizeObserver",
      class {
        constructor(private callback: () => void) {}
        observe() {
          this.callback();
        }
        disconnect() {}
      }
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("puts the line under the current link without sliding on first load", () => {
    render(<Navbar />);
    const current = within(nav()).getByRole("link", { name: "Timeline" });

    expect(current).toHaveAttribute("aria-current", "page");
    expect(current.className).not.toContain("underline");
    expect(line().style.transform).toBe("translate(10px, 24px) scaleX(60)");
    expect(line().style.transitionProperty).toBe("none");
    expect(line().style.opacity).toBe("1");
  });

  it("slides the line to the newly selected link", () => {
    const { rerender } = render(<Navbar />);

    pathname = "/philosophy";
    rerender(<Navbar />);

    expect(within(nav()).getByRole("link", { name: "Philosophy" })).toHaveAttribute(
      "aria-current",
      "page"
    );
    expect(within(nav()).getByRole("link", { name: "Timeline" })).not.toHaveAttribute(
      "aria-current"
    );
    expect(line().style.transform).toBe("translate(150px, 24px) scaleX(80)");
    expect(line().style.transitionProperty).toBe("");
  });

  it("hides the line on pages that are not in the nav", () => {
    const { rerender } = render(<Navbar />);

    pathname = "/somewhere-else";
    rerender(<Navbar />);

    expect(within(nav()).queryByRole("link", { current: "page" })).not.toBeInTheDocument();
    expect(line().style.opacity).toBe("0");
  });

  it("places Contact last in desktop and mobile navigation", () => {
    render(<Navbar />);

    for (const navigation of screen.getAllByRole("navigation", { hidden: true })) {
      expect(
        within(navigation)
          .getAllByRole("link", { hidden: true })
          .map((link) => link.textContent)
      ).toEqual(["Timeline", "Art", "Philosophy", "Resume", "Contact"]);
    }
  });

  it("keeps a theme toggle in the header and floats a second one outside it for phones", () => {
    render(<Navbar />);
    const header = screen.getByRole("banner");
    const toggles = screen.getAllByRole("button", { name: "Toggle theme" });
    const floating = toggles.filter((toggle) => !header.contains(toggle));

    expect(toggles).toHaveLength(2);
    expect(floating).toHaveLength(1);
    expect(floating[0].className).toContain("fixed");
    expect(floating[0].className).toContain("md:hidden");
    expect(within(header).getByRole("button", { name: "Toggle theme" }).className).toContain(
      "md:block"
    );
  });

  it("animates the mobile menu and closes it with Escape", async () => {
    const user = userEvent.setup();
    render(<Navbar />);
    const trigger = screen.getByRole("button", { name: "Open navigation menu" });

    await user.click(trigger);

    const mobileMenu = document.getElementById("mobile-navigation")!;
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(within(mobileMenu).getAllByRole("link")).toHaveLength(5);
    expect(mobileMenu.querySelector("nav")).toHaveClass("flex-col");
    expect(mobileMenu).toHaveClass("translate-y-0", "opacity-100");
    expect(mobileMenu).toHaveAttribute("aria-hidden", "false");
    expect(document.body.style.overflow).toBe("hidden");

    fireEvent.keyDown(document, { key: "Escape" });

    expect(screen.getByRole("button", { name: "Open navigation menu" })).toHaveAttribute(
      "aria-expanded",
      "false"
    );
    expect(mobileMenu).toHaveClass("-translate-y-3", "opacity-0");
    expect(mobileMenu).toHaveAttribute("aria-hidden", "true");
    expect(document.body.style.overflow).toBe("");
  });
});
