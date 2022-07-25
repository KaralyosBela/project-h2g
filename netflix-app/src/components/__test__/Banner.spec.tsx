import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { Banner } from "../Banner";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import '@testing-library/jest-dom/extend-expect';
import renderer from 'react-test-renderer';

const MockFilterBar = ({movieCount}: any) => {
  return (
    <Provider store={store}>
      <Banner/>
    </Provider>
  );
};

it("should render the filterbar component correctly", () => {
  const tree = renderer.create(<MockFilterBar movieCount={10} />).toJSON();
  expect(tree).toMatchSnapshot();
  // screen.debug();
});
