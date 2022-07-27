import { fireEvent, getByText, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import { DeleteMovieModal } from "../DeleteMovieModal";

const mockDispatch = jest.fn();
const mockUseDispatch = jest.fn(() => mockDispatch);
const mockUseAppSelector = jest.fn();
const mockDeleteMovie = jest.fn();

jest
  .mock("../../app/hooks.ts", () => ({
    useAppSelector: () => mockUseAppSelector(),
  }))
  .mock("react-redux", () => ({
    useDispatch: () => mockUseDispatch, //itt eddig megvolt hívva a mockUseDispatch()
  }))
  .mock("../../features/moviesSlice.ts", () => ({
    deleteMovie: (param: any) => mockDeleteMovie(param),
  }));

describe("Delete modal component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("shoule render component correctly", () => {
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

    mockUseAppSelector.mockReturnValueOnce(selectedMovie);

    const mockHide = jest.fn();
    const { container } = render(
      // <Provider store={store}>
      <DeleteMovieModal hide={mockHide} />
      //   </Provider>
    );

    const deleteButton = screen.getByText(/Confirm/i);
    fireEvent.click(deleteButton);

    // expect(mockUseDispatch).toHaveBeenCalledWith(selectedMovie);
    expect(mockUseDispatch.mock.calls.length).toEqual(1);
    expect(container).toMatchSnapshot();
  });

  it("shoule render component 2", () => {
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

    mockUseAppSelector.mockReturnValueOnce(selectedMovie);

    const mockHide = jest.fn();
    const { container } = render(
      // <Provider store={store}>
      <DeleteMovieModal hide={mockHide} />
      //   </Provider>
    );

    const overlay = screen.getByTestId("overlay");
    fireEvent.click(overlay);

    // expect(mockUseDispatch).toHaveBeenCalledWith(selectedMovie);
    // expect(mockUseDispatch.mock.calls.length).toEqual(1);
    expect(mockHide.mock.calls.length).toEqual(1);
    expect(container).toMatchSnapshot();
  });

  it("shoule render component 3", () => {
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

    mockUseAppSelector.mockReturnValueOnce(selectedMovie);
    mockDeleteMovie.mockReturnValueOnce("mockDeleteMovie");

    const mockHide = jest.fn();
    const { container } = render(
      // <Provider store={store}>
      <DeleteMovieModal hide={mockHide} />
      //   </Provider>
    );

    const deleteButton = screen.getByText(/Confirm/i);
    fireEvent.click(deleteButton);

    // expect(mockUseDispatch.mock.calls.length).toEqual(1);
    //expect(mockUseDispatch).toHaveBeenCalledWith(selectedMovie);
    // expect(mockUseDispatch.mock.calls.length).toEqual(1);
    // expect(mockHide.mock.calls.length).toEqual(1);
    expect(mockDeleteMovie.mock.calls.length).toEqual(1);
    expect(mockDeleteMovie.mock.calls[0][0]).toEqual(selectedMovie);
    // expect(mockUseDispatch.mock.calls[0][0]).toEqual("mockDeleteMovie");
    expect(container).toMatchSnapshot();
  });

});
