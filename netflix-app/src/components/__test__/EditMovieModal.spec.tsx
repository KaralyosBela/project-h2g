import { fireEvent, getByText, render, screen } from "@testing-library/react";
import { IMovie } from "../../interfaces/movies.interface";
import { EditMovieModal } from "../EditMovieModal";

const mockDispatch = jest.fn();
const mockAddMovie = jest.fn();
const mockHide = jest.fn();
const mockUseAppSelector = jest.fn();

jest.mock("react-redux", () => ({
    useDispatch: () => mockDispatch,
  })).mock("../../features/moviesSlice.ts", () => ({
    addMovie: (param: IMovie) => mockAddMovie(param),
  })).mock("../../app/hooks.ts", () => ({
    useAppSelector: () => mockUseAppSelector,
  }));

const mockUseDispatch = jest.fn();
mockDispatch.mockReturnValue(mockUseDispatch);

describe("Edit modal component", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render component correctly", () => {

        const selectedMovieDetails = {
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

    mockUseAppSelector.mockReturnValueOnce(selectedMovieDetails);

    const { container } = render(<EditMovieModal hide={mockHide} />);
    expect(container).toMatchSnapshot();
  });


});
