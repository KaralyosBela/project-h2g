import { render, screen } from "@testing-library/react";
import { HomePage } from "../HomePage";
import { IMovie } from "../../interfaces/movies.interface";

const mockDispatch = jest.fn();
const mockUseDispatch = jest.fn(() => mockDispatch); //itt is megtudom hívni
// const dispatch = useDispatch<AppDispatch>(); kb ami itt történik
const mockUseAppSelector = jest.fn();
const mockUseMovies = jest.fn();

// jest.mock("../../components/MovieList", () => ({
//   MovieList: () => <div>MovieList</div>,
// }));

jest.mock("../../app/hooks.ts", () => ({
  useAppSelector: () => mockUseAppSelector(),
}));

jest.mock("react-redux", () => ({
  useDispatch: () => mockUseDispatch, //itt eddig megvolt hívva a mockUseDispatch()
}));

jest.mock("../../features/movies.hook.ts", () => ({
  useMovies: () => mockUseMovies(),
}));


describe("Homepage", () => {
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render component", () => {
    const movies: IMovie[] = [
      {
        id: "1",
        title: "Cim1",
        tagline: "alcim1",
        vote_average: 4,
        vote_count: 4,
        budget: 4,
        revenue: 4,
        release_date: "2019 01 02",
        genres: ["asd234asd", "as324d"],
        poster_path: "path:://asdasdasd",
        runtime: 4,
        overview: "the best movie ever",
      },
      {
        id: "2",
        title: "cim2",
        tagline: "alcim2",
        vote_average: 4,
        vote_count: 4,
        budget: 4,
        revenue: 4,
        release_date: "2011 02 02",
        genres: ["sdfsdfd", "asddfsd"],
        poster_path: "path://asdasd34234",
        runtime: 4,
        overview: "the best movie ever 2",
      },
    ];
    const movieSelected = {
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
    const bannerVisible = false;
    mockUseAppSelector.mockReturnValueOnce(movieSelected);
    mockUseAppSelector.mockReturnValueOnce(bannerVisible);
    mockUseMovies.mockReturnValue(movies);

    const { container } = render(<HomePage />);

    // expect(mockUseDispatch.mock.calls.length).toEqual(2);

    expect(container).toMatchSnapshot();
    screen.debug();
  });
});
