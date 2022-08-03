import { fireEvent, getByText, render, screen } from "@testing-library/react";
import { DeleteMovieModal } from "../DeleteMovieModal";

const mockDispatch = jest.fn();
const mockUseAppSelector = jest.fn();
const mockDeleteMovie = jest.fn();
const mockHide = jest.fn();

jest.mock("../../app/hooks.ts", () => ({
    useAppSelector: () => mockUseAppSelector(),
  })).mock("react-redux", () => ({
    useDispatch: () => mockDispatch,
  })).mock("../../features/moviesSlice.ts", () => ({
      deleteMovie: (param: any) => mockDeleteMovie(param),
  }));

const mockUseDispatch = jest.fn();
mockDispatch.mockReturnValue(mockUseDispatch);

describe("Delete modal component", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render component correctly", () => {
    const selectedMovie = {
      id: "string",
      title: "string",
      tagline: "string",
      vote_average: 4,
      vote_count: 4,
      budget: 4,
      revenue: 4,
      release_date: "string",
      genres: ["asd", "asd"],
      poster_path: "string",
      runtime: 4,
      overview: "string",
    };
    // mockUseAppSelector.mockReturnValueOnce(selectedMovie);
    const { container } = render(<DeleteMovieModal hide={mockHide} />);
    // const deleteButton = screen.getByText(/Confirm/i);
    // fireEvent.click(deleteButton);
    // expect(mockUseDispatch).toHaveBeenCalledWith(selectedMovie);
    // expect(mockUseDispatch.mock.calls.length).toEqual(1);
    expect(container).toMatchSnapshot();
  });

  it("should call hide prop when overlay clicked", () => {
    const selectedMovie = {
      id: "string",
      title: "string",
      tagline: "string",
      vote_average: 4,
      vote_count: 4,
      budget: 4,
      revenue: 4,
      release_date: "string",
      genres: ["asd", "asd"],
      poster_path: "string",
      runtime: 4,
      overview: "string",
    };

    const { container } = render(<DeleteMovieModal hide={mockHide} />);

    const overlay = screen.getByTestId("overlay");
    fireEvent.click(overlay);

    expect(mockHide).toBeCalledTimes(1);
    expect(container).toMatchSnapshot();
  });

  it("should dispatch with the correct action, then call hide prop fnc", () => {
    const selectedMovie = {
      id: "string",
      title: "string",
      tagline: "string",
      vote_average: 4,
      vote_count: 4,
      budget: 4,
      revenue: 4,
      release_date: "string",
      genres: ["asd", "asd"],
      poster_path: "string",
      runtime: 4,
      overview: "string",
    };

    mockUseAppSelector.mockReturnValueOnce(selectedMovie); //ezt hogy kéne elképzelni
    mockDeleteMovie.mockReturnValueOnce(selectedMovie);

    const { container } = render(<DeleteMovieModal hide={mockHide} />);

    const deleteButton = screen.getByText(/Confirm/i);
    fireEvent.click(deleteButton);

    expect(mockHide).toBeCalledTimes(1);
    expect(mockDispatch).toBeCalledTimes(1);
    // async cuccok még nem mennek
    expect(mockDeleteMovie).toBeCalledWith(selectedMovie); //mockdeleteMovie(selectedMovie) így nézne ki
    expect(container).toMatchSnapshot();
  });

});
