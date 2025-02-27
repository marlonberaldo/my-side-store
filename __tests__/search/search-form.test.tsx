import { useRouter, useSearchParams } from "next/navigation";

import { fireEvent, render, screen } from "@testing-library/react";
import SearchForm from "@/app/_components/search-form";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

describe("SearchForm", () => {
  beforeEach(() => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: (key: string) => (key === "q" ? "iphone" : null),
    });
  });

  it("should display the query in the input field", () => {
    render(<SearchForm />);

    const input = screen.getByPlaceholderText("Pesquisar produtos...") as HTMLInputElement;

    expect(input).toHaveValue("iphone");
  });

  it("should redirect when submitting the form", () => {
    const push = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push });

    render(<SearchForm />);

    const input = screen.getByPlaceholderText("Pesquisar produtos...");
    fireEvent.change(input, { target: { value: "iphone" } });

    const form = screen.getByRole("form");
    fireEvent.submit(form);

    expect(push).toHaveBeenCalledWith("/search?q=iphone");
  });
});
