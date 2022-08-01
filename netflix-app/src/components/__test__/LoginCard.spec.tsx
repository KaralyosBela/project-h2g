import { fireEvent, render, screen } from "@testing-library/react";
import { LoginCard } from "../LoginCard";

const mockDispatch = jest.fn();
const mockUseDispatch = jest.fn();
const mockNavigate = jest.fn();
const mockUseNavigate = jest.fn();
jest
  .mock("react-redux", () => ({ useDispatch: () => mockDispatch }))
  .mock("react-router-dom", () => ({ useNavigate: () => mockNavigate }));
mockDispatch.mockReturnValue(mockUseDispatch);
mockNavigate.mockReturnValue(mockUseNavigate);

describe("Login component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the login compoenent", () => {
    const { container } = render(<LoginCard />);
    expect(container).toMatchSnapshot();
  });

  it("should call navigate when authenticated", () => {
    render(<LoginCard />);

    const userInput = screen.getByTestId("userIdInput");
    const passwordInput = screen.getByTestId("passwordInput");
    const form = screen.getByRole("form");
    fireEvent.change(userInput, { target: { value: "admin" } });
    fireEvent.change(passwordInput, { target: { value: "admin" } });
    fireEvent.submit(form);

    expect(mockNavigate).toBeCalledTimes(1);
    expect(mockNavigate).toBeCalledWith("/");
  });

  it("should not call navigate when not authenticated", () => {
    render(<LoginCard />);

    const userInput = screen.getByTestId("userIdInput");
    const passwordInput = screen.getByTestId("passwordInput");
    const form = screen.getByRole("form");
    fireEvent.change(userInput, { target: { value: "asd" } });
    fireEvent.change(passwordInput, { target: { value: "asd" } });
    fireEvent.click(form);

    expect(mockNavigate).toBeCalledTimes(0); //or expect(mockNavigate).not.toBeCalled();
  });
});
