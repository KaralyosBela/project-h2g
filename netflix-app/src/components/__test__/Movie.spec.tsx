import { fireEvent, render, screen } from "@testing-library/react";
import { Movie } from "../Movie";
import "@testing-library/jest-dom/extend-expect";
import { setChoosenMovie, setMovieBannerStatus } from "../../features/moviesSlice";

const movie = {
  id: "903",
  title: "Cool Hand Luke",
  tagline: "What we've got here is failure to communicate.",
  vote_average: 7.7,
  vote_count: 471,
  release_date: "1967-06-22",
  poster_path:
    "https://image.tmdb.org/t/p/w500/vDwphkloD7ToaDpKASAXGgHOclN.jpg",
  overview:
    "When petty criminal Luke Jackson is sentenced to two years in a Florida prison farm, he doesn't play by the rules of either the sadistic warden or the yard's resident heavy, Dragline, who ends up admiring the new guy's unbreakable will. Luke's bravado, even in the face of repeated stints in the prison's dreaded solitary confinement cell, \"the box,\" make him a rebel hero to his fellow convicts and a thorn in the side of the prison officers.",
  budget: 3200000,
  revenue: 16217773,
  genres: ["Crime", "Drama"],
  runtime: 126,
};


window.scrollTo = jest.fn();
const mockDispatch = jest.fn();
const mockUseDispatch = jest.fn();
// const mockSetChoosenMovie = jest.fn();
// const mockSetMovieBannerStatus = jest.fn();

jest.mock("react-redux", () => ({
  useDispatch: () => mockDispatch,
})).mock("../../components/EditMovieModal", () => ({
  EditMovieModal: () => <div>EditMovieModal</div>,
})).mock("../../components/DeleteMovieModal", () => ({
  DeleteMovieModal: () => <div>DeleteMovieModal</div>,
}));
// .mock("../../features/moviesSlice", () => ({
//   // setChoosenMovie: (param: any) => mockSetChoosenMovie(param),
//   setMovieBannerStatus: (param: any) => mockSetMovieBannerStatus(param),
// }))

mockDispatch.mockReturnValue(mockUseDispatch);

describe("Movie component", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render Movie component", () => {
    const { container } = render(<Movie movie={movie} />);
    expect(container).toMatchSnapshot();
  });

  it("should open options modal on when clicked on the movie card", () => {
    const { container } = render(<Movie movie={movie} />);
    const movieCard = screen.getByTestId("card");
    fireEvent.click(movieCard);
    expect(container).toMatchSnapshot();
  });

  it("should open options modal on when clicked the circle on the card", () => {
    const { container } = render(<Movie movie={movie} />);
    const circle = screen.getByTestId("circle");
    fireEvent.click(circle);
    expect(container).toMatchSnapshot();
  });

  it("should open the edit modal", () => {
    const { container } = render(<Movie movie={movie} />);
    const card = screen.getByTestId("card");
    fireEvent.click(card);
    const editBtn = screen.getByText(/Edit/i);
    fireEvent.click(editBtn);

    expect(mockDispatch).toBeCalledTimes(1);
    expect(mockDispatch).toBeCalledWith(setChoosenMovie(movie));
    expect(mockDispatch.mock.calls[0][0]).toStrictEqual({
      payload: movie,
      type: "movies/setChoosenMovie",
    });
    expect(container).toMatchSnapshot();
  });

  it("should open the delete modal", () => {
    const { container } = render(<Movie movie={movie} />);
    const card = screen.getByTestId("card");
    fireEvent.click(card);
    const deleteBtn = screen.getByText(/Delete/i);
    fireEvent.click(deleteBtn);

    expect(mockDispatch).toBeCalledTimes(1);
    expect(mockDispatch).toBeCalledWith(setChoosenMovie(movie));
    expect(mockDispatch.mock.calls[0][0]).toStrictEqual({
      payload: movie,
      type: "movies/setChoosenMovie",
    });
    expect(container).toMatchSnapshot();
  });

  it("should open the info modal", () => {
    const { container } = render(<Movie movie={movie} />);
    //Click on card, modal pops up, click on delete button -> delete modal appear
    const card = screen.getByTestId("card");
    fireEvent.click(card);
    const infoBtn = screen.getByText(/Info/i);
    fireEvent.click(infoBtn);

    expect(mockDispatch).toBeCalledTimes(2);
    expect(mockDispatch).toBeCalledWith(setChoosenMovie(movie));
    expect(mockDispatch.mock.calls[0][0]).toStrictEqual({
      payload: movie,
      type: "movies/setChoosenMovie",
    });
    expect(mockDispatch).toBeCalledWith(setMovieBannerStatus(true));
    expect(mockDispatch.mock.calls[1][0]).toStrictEqual({
      payload: true,
      type: "movies/setMovieBannerStatus",
    });
    expect(container).toMatchSnapshot();
  });


  it("should close the options modal on card leave", () => {
    const { container } = render(<Movie movie={movie} />);
    //Click on card, modal pops up, leave card -> modal disappear
    const card = screen.getByTestId("card");
    fireEvent.click(card);
    fireEvent.mouseOut(card);
    expect(container).toMatchSnapshot();
  });
});
