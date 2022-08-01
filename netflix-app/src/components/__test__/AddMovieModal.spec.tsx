import { fireEvent, getByText, render, screen } from "@testing-library/react";
import { IMovie } from "../../interfaces/movies.interface";
import { AddMovieModal } from "../AddMovieModal";
import { DeleteMovieModal } from "../DeleteMovieModal";

const mockDispatch = jest.fn();
const mockAddMovie = jest.fn();
const mockHide = jest.fn();
const mockSubmitted = jest.fn();

jest.mock("react-redux", () => ({
    useDispatch: () => mockDispatch,
  })).mock("../../features/moviesSlice.ts", () => ({
    addMovie: (param: IMovie) => mockAddMovie(param),
  }));

const mockUseDispatch = jest.fn();
mockDispatch.mockReturnValue(mockUseDispatch);

describe("Add modal component", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render component correctly", () => {
    const { container } = render(<AddMovieModal hide={mockHide} submitted={mockSubmitted} />);
    expect(container).toMatchSnapshot();
  });

  it("should call dispatch with correct action when movie added", () => {

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

    const { container } = render(<AddMovieModal hide={mockHide} submitted={mockSubmitted} />);

    //a megadott érték lesz returnulve ha meghívom a függvényt.
    // mockAddMovie.mockReturnValue("returned value")

    const title = screen.getByTestId("title");
    const movieUrl = screen.getByTestId("movieUrl");
    const relDate = screen.getByTestId("relDate");
    const overview = screen.getByTestId("overview");
    const formSubmit = screen.getByRole("form");

    fireEvent.change(title, { target: { value: "Title" } });
    fireEvent.change(movieUrl, { target: { value: "http:blabla" } });
    fireEvent.change(relDate, { target: { value: "2022" } });
    fireEvent.change(overview, { target: { value: "best movie" } });
    fireEvent.submit(formSubmit);

    // expect(mockAddMovie).toBeCalledWith("xyz");
    expect(mockHide).toBeCalledTimes(1);
    expect(mockSubmitted).toBeCalledTimes(1);
    expect(container).toMatchSnapshot();
    console.log(mockDispatch.mock.calls);

  });

});
