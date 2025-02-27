import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";

import { SearchForm } from "@/app/_components/search-form";

import { render, screen } from "@testing-library/react";

jest.mock("next/navigation", () => ({
  useSearchParams: jest.fn(),
}));

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("next/form", () => ({
  __esModule: true,
  default: ({ children, ...props }: { children: React.ReactNode;[key: string]: unknown }) => <form {...props}>{children}</form>,
}));

describe("SearchForm", () => {
  beforeEach(() => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: (key: string) => (key === "q" ? "iphone" : null),
    });

    (useRouter as jest.Mock).mockReturnValue({ push: jest.fn() });
  });

  it("should display the query in the input field", () => {
    render(<SearchForm />);

    const input = screen.getByPlaceholderText("Pesquisar produtos...") as HTMLInputElement;

    expect(input).toHaveValue("iphone");
  });
});
