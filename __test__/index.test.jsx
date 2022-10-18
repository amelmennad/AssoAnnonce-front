import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Home from "../pages/index";

describe('Home', () => {
  it('renders a heading', () => {
    render(<Home />);

    const heading = screen.getByRole('heading', {
      name: /Bienvenue sur AssoAnnonce/i,
    });

    expect(heading).toBeInTheDocument();
  });
});
describe('Home 2', () => {
  it('renders a heading', () => {
    render(<Home />);

    const heading = screen.getByRole('heading', {
      name: /Bienvenue sur AssoAnnonce/i,
    });

    expect(heading).toBeInTheDocument();
  });
});