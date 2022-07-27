import { fireEvent, render, screen } from "@testing-library/react";
import { Banner } from "../Banner";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import "@testing-library/jest-dom/extend-expect";

// const mockUseState = jest.fn();

jest.mock("../../components/AddMovieSuccessModal", () => ({
  AddMovieSuccessModal: () => <div>Add Movie Success Modal</div>,
})).mock("../../components/AddMovieModal", () => ({
  AddMovieModal: () => <div>Add Movie Modal</div>,
}));
// .mock("react", () => ({
//   useState: () => mockUseState(),
// }));

describe("Banner component", () => {

  it("should render the component without the modals", () => {
    const {container} = render(
      <Provider store={store}>
        <Banner />
      </Provider>
    );
  
    expect(container).toMatchSnapshot();
    // screen.debug();
  });

  
it("should render the component with the 'Add Modal'", () => {
  const {container} = render(
    <Provider store={store}>
      <Banner />
    </Provider>
  );

  const addButton = screen.getByText(/add movie/i);
  fireEvent.click(addButton);

  expect(container).toMatchSnapshot();
  // screen.debug();
});

it("should render the component with the 'Add Modal Success'", () => {
  const {container} = render(
    <Provider store={store}>
      <Banner />
    </Provider>

  );

  const addButton = screen.getByText(/add movie/i);
  fireEvent.click(addButton);
  //nem tudok hivatkozni komponensen beluli elemre
  // const submitButton = screen.getByText(/SUBMIT/i);
  // fireEvent.click(submitButton);
  // screen.debug();
});

})
