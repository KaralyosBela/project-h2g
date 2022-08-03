import { fireEvent, render, screen } from "@testing-library/react";
import { FilterBar } from "../FilterBar";
import "@testing-library/jest-dom/extend-expect";
import { setGenreFilter, setSortParams } from "../../features/moviesSlice";

const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  useDispatch: () => mockDispatch,
}));

const mockUseDispatch = jest.fn();
mockDispatch.mockReturnValue(mockUseDispatch);

it("should render the filterbar component correctly", () => {
  const { container } = render(<FilterBar movieCount={10} />);
  expect(container).toMatchSnapshot();
});

it("should render the filterbar component with the correct amount of movies", () => {
  render(<FilterBar movieCount={900} />);
  const spanElement = screen.getByText(/900/i);
  expect(spanElement).toBeInTheDocument();
});

it("the 'all' button should be selected on init", () => {
  render(<FilterBar movieCount={0} />);
  const allButtion = screen.getByText(/All/i);
  expect(allButtion).toHaveClass("active");
});

it("the 'comedy' button should have an active class when clicked", () => {
  render(<FilterBar movieCount={0} />);
  const allButton = screen.getByText(/All/i);
  const actionButton = screen.getByText(/Action/i);
  const comedyButton = screen.getByText(/Comedy/i);
  const horrorButton = screen.getByText(/Horror/i);
  const crimeButton = screen.getByText(/Crime/i);

  fireEvent.click(allButton);
  expect(allButton).toHaveClass("active");
  fireEvent.click(actionButton);
  expect(actionButton).toHaveClass("active");
  fireEvent.click(comedyButton);
  expect(comedyButton).toHaveClass("active");
  fireEvent.click(horrorButton);
  expect(horrorButton).toHaveClass("active");
  fireEvent.click(crimeButton);
  expect(crimeButton).toHaveClass("active");
});

it("should dispatch a function once", () => {
  render(<FilterBar movieCount={0} />);

  const actionButton = screen.getByText(/Action/i);
  fireEvent.click(actionButton);
  const selectInput = screen.getByTestId(/SelectInput/i);
  fireEvent.change(selectInput);
  expect(actionButton).toHaveClass("active");
  expect(mockDispatch).toHaveBeenCalledTimes(2);
  expect(mockDispatch).toHaveBeenCalledWith(setGenreFilter("action"));
  expect(mockDispatch).toHaveBeenCalledWith(
    setSortParams({ key: "releaseDate", order: "ascending" })
  );
  //miért kell strict equal
  expect(mockDispatch.mock.calls[0][0]).toStrictEqual({
    payload: "action",
    type: "movies/setGenreFilter",
  });
  expect(mockDispatch.mock.calls[1][0]).toStrictEqual({
    payload: { key: "releaseDate", order: "ascending" },
    type: "movies/setSortParams",
  });
});
