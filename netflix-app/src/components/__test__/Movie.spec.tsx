import { fireEvent, render, screen } from "@testing-library/react";
import { Movie } from "../Movie";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import "@testing-library/jest-dom/extend-expect";

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

// const mockDispatch = jest.fn();
// const mockUseDispatch = jest.fn(() => mockDispatch()); //itt is megtudom hívni

// jest.mock("react-redux", () => ({
//   useDispatch: () => mockUseDispatch(),
// }));

describe("Movie component", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render Movie component with the movie details", () => {
    const { container } = render(
      <Provider store={store}>
        <Movie movie={movie} />
      </Provider>
    );
    expect(container).toMatchSnapshot();
    // screen.debug();
  });

  it("should open options modal on when clicked on the movie card", () => {
    const { container } = render(
      <Provider store={store}>
        <Movie movie={movie} />
      </Provider>
    );

    //divet hogy érdemes lekérni
    const movieCard = screen.getByTestId("card");
    fireEvent.click(movieCard);
    expect(container).toMatchSnapshot();
    // screen.debug();
  });

  it("should open options modal on when clicked the circle on the card", () => {
    const { container } = render(
      <Provider store={store}>
        <Movie movie={movie} />
      </Provider>
    );

    //divet hogy érdemes lekérni
    const circle = screen.getByTestId("card");
    fireEvent.click(circle);
    expect(container).toMatchSnapshot();
    // screen.debug();
  });

  it("should open the edit modal", () => {
    const { container } = render(
      <Provider store={store}>
        <Movie movie={movie} />
      </Provider>
    );

    //divet hogy érdemes lekérni
    const card = screen.getByTestId("card");
    fireEvent.click(card);
    const editBtn = screen.getByText(/Edit/i);
    fireEvent.click(editBtn);
    // expect(mockUseDispatch.mock.calls.length).toEqual(2);
    // expect(mockUseDispatch).toBeCalledWith(movie);
    expect(container).toMatchSnapshot();
    // screen.debug();
  });

  it("should open the delete modal", () => {
    const { container } = render(
      <Provider store={store}>
        <Movie movie={movie} />
      </Provider>
    );

    //divet hogy érdemes lekérni
    const card = screen.getByTestId("card");
    fireEvent.click(card);
    const deleteBtn = screen.getByText(/Delete/i);
    fireEvent.click(deleteBtn);
    expect(container).toMatchSnapshot();
    // screen.debug();
  });

  it("should close the options modal on card leave", () => {
    const { container } = render(
      <Provider store={store}>
        <Movie movie={movie} />
      </Provider>
    );

    //divet hogy érdemes lekérni
    const card = screen.getByTestId("card");
    fireEvent.click(card);
    fireEvent.mouseOut(card);
    expect(container).toMatchSnapshot();
    // screen.debug();
  });
});
