import { fireEvent, render, screen } from "@testing-library/react";
import { Banner } from "../Banner";
import "@testing-library/jest-dom/extend-expect";
import { setSearchedMovie } from "../../features/moviesSlice";

const mockDispatch = jest.fn();
const mockUseDispatch = jest.fn();

jest
  .mock("react-redux", () => ({useDispatch: () => mockDispatch,}))
  .mock("../../components/AddMovieSuccessModal", () => ({AddMovieSuccessModal: () => <div>Add Movie Success Modal</div>, }))
  .mock("../../components/AddMovieModal", () => ({AddMovieModal: () => <div>Add Movie Modal</div>,}));
  const mockSetSearchedMovie = jest.fn();
  jest.mock("../../features/moviesSlice.ts", () => ({setSearchedMovie: (params: any) => mockSetSearchedMovie(params)}))

mockDispatch.mockReturnValue(mockUseDispatch);

describe("Banner component", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the component without the modals", () => {
    const { container } = render(<Banner />);
    expect(container).toMatchSnapshot();
  });

  it("should render the component with the 'Add Modal'", () => {
    const { container } = render(<Banner />);
    const addButton = screen.getByText(/add movie/i);
    fireEvent.click(addButton);
    expect(container).toMatchSnapshot();
  });

  it("should render the component with the 'Add Modal Success'", () => {
    render(<Banner />);
    const addButton = screen.getByText(/add movie/i);
    fireEvent.click(addButton);
    //nem tudok hivatkozni komponensen beluli elemre
    // const submitButton = screen.getByText(/SUBMIT/i);
    // fireEvent.click(submitButton);
  });

  // it("should call dispatch after input change with the right action (not mocked)", () => {
  //   const { container } = render(<Banner />);

  //   const inputField = screen.getByTestId("inputField");
  //   fireEvent.change(inputField, { target: { value: "new value" } });

  //   //input change event után volt e dispatch
  //   expect(mockDispatch).toBeCalledTimes(1);
  //   //a dispatch a megfelelő actiont hívta-e meg
  //   expect(mockDispatch).toBeCalledWith(setSearchedMovie("new value"));
  //   // vagy
  //   expect(mockDispatch.mock.calls[0][0]).toStrictEqual({
  //     payload: "new value",
  //     type: "movies/setSearchedMovie",
  //   });
  //   expect(container).toMatchSnapshot();
  // });

  it("should call dispatch after input change with the right action (mocked)", () => {
    //Same as previous test, but with a mocked setSearch function
    const { container } = render(<Banner />);

    mockSetSearchedMovie.mockReturnValueOnce("new value");

    const inputField = screen.getByTestId("inputField");
    fireEvent.change(inputField, { target: { value: "new value" } });

    //input change event után volt e dispatch
    expect(mockDispatch).toBeCalledTimes(1);
    //a dispatch a megfelelő actiont hívta-e meg
    expect(mockSetSearchedMovie).toBeCalledWith("new value")
    expect(container).toMatchSnapshot();
    // console.log(mockDispatch.mock.calls);
    // console.log(mockSetSearchedMovie.mock.calls);
  });
});
