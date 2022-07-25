import React from "react";
import { render, screen } from "@testing-library/react";
import { MovieList } from "../MovieList";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import renderer from 'react-test-renderer';

describe("Movie list component", () => {
  it("should render component with movie elements", () => {
    const tree = renderer.create(
      <Provider store={store}>
        <MovieList
          moviesList={[
            {
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
            },
            {
              id: "63710",
              title: "Honey 2",
              tagline: "Go every step of the way.",
              vote_average: 5.9,
              vote_count: 146,
              release_date: "2011-06-23",
              poster_path:
                "https://image.tmdb.org/t/p/w500/2pVEMvhXtEUu2rnY94rCZUQ43HL.jpg",
              overview:
                "Sequel to the 2003 dance movie Honey. Recently released from juvenile detention, talented dancer Maria Ramirez finds an outlet for her passion with a new dance crew.",
              budget: 0,
              revenue: 0,
              genres: ["Comedy", "Drama", "Music"],
              runtime: 110,
            },
          ]}
        />
      </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
    // screen.debug();
  });

  it("should render component without elements", () => {
    const tree = renderer.create(
      <Provider store={store}>
        <MovieList
          moviesList={[]}
        />
      </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
    // screen.debug();
  });
});
