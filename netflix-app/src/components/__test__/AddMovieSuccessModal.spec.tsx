import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { AddMovieSuccessModal } from "../AddMovieSuccessModal";

const mockHide = jest.fn();

describe("Add Movie Succedd Modal", () => {

  it("should render the component", () => {
    const { container } = render(<AddMovieSuccessModal close={mockHide} />);
    expect(container).toMatchSnapshot();
  });

  it("should call the hide function from the prop", () => {
    render(<AddMovieSuccessModal close={mockHide} />);

    const overlay = screen.getByTestId("overlay");
    fireEvent.click(overlay);

    expect(mockHide).toBeCalledTimes(1);
  });

});
