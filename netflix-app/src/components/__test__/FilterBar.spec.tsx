import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { FilterBar } from "../FilterBar";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import '@testing-library/jest-dom/extend-expect';
import renderer from 'react-test-renderer';

const MockFilterBar = ({movieCount}: any) => {
  return (
    <Provider store={store}>
      <FilterBar movieCount={movieCount} />
    </Provider>
  );
};

it("should render the filterbar component correctly", () => {
  const tree = renderer.create(<MockFilterBar movieCount={10} />).toJSON();
  expect(tree).toMatchSnapshot();
  // screen.debug();
});

it("should render the filterbar component with the correct amount of movies", () => {
  render(<MockFilterBar movieCount={900} />);
  const spanElement = screen.getByText(/900/i);
  expect(spanElement).toBeInTheDocument();
  // screen.debug();
});

it("the 'all' button should be selected on init", () => {
  render(<MockFilterBar movieCount={0} />);
  const allButtion = screen.getByText(/All/i);
  expect(allButtion).toHaveClass("active");
  // screen.debug();
});

it("the 'comedy' button should have an active class when clicked", () => {
  render(<MockFilterBar movieCount={0} />);
  const comedyButton = screen.getByText(/Comedy/i);
  fireEvent.click(comedyButton);
  expect(comedyButton).toHaveClass("active");
  // screen.debug();
});

