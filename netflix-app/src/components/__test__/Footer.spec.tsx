import { render, screen } from "@testing-library/react";
import { Footer } from "../Footer";
const add = jest.fn();
describe("Footer component", () => {
  it("Rendered footer", () => {
    const {container} = render(<Footer />);
    expect(container).toMatchSnapshot();
  });

  it("h4 has a text called netflixroulette", () => {
    const { getByTestId } = render(<Footer />);
    const headerEl = getByTestId("header");
    expect(headerEl.textContent).toBe("netflixroulette");
  });

  it("footer has a classname of footer", () => {
    const { getByTestId } = render(<Footer />);
    const footerEl = getByTestId("footer");
    expect(footerEl.className).toBe("footer");
  });

  it("span has a text called netflix", () => {
    const { getByTestId } = render(<Footer />);
    const spanEl = getByTestId("span");
    expect(spanEl.textContent).toBe("netflix");
  });

  it("should add", () => {
    add.mockReturnValue(3);
    expect(add()).toBe(3);
  })
});
