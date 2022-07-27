import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import { MovieBanner } from "../MovieBanner";

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

describe("Movie banner component", () => {
  it("should render movie banner", () => {
    const { container } = render(
      <Provider store={store}>
        <MovieBanner movie={movie} />
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });
});
