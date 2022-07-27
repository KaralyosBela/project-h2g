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
  const {container} = render(<MockFilterBar movieCount={10} />);
  expect(container).toMatchSnapshot();
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
  const allButton = screen.getByText(/All/i);
  const actionButton = screen.getByText(/Action/i);
  const comedyButton = screen.getByText(/Comedy/i);
  const horrorButton = screen.getByText(/Horror/i);
  const crimeButton = screen.getByText(/Crime/i);

  fireEvent.click(allButton);
  expect(allButton).toHaveClass("active");
  fireEvent.click(actionButton);
  expect(actionButton).toHaveClass("active");
  fireEvent.click(comedyButton);
  expect(comedyButton).toHaveClass("active");
  fireEvent.click(horrorButton);
  expect(horrorButton).toHaveClass("active");
  fireEvent.click(crimeButton);
  expect(crimeButton).toHaveClass("active");
  // screen.debug();
});

