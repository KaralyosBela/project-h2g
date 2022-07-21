import React from "react";
import { render } from "@testing-library/react";
import { LoginPage } from "./LoginPage";

jest.mock("../ui/Layout", () => ({
  Layout: () => <div>Container</div>,
}));
//komponens név
describe("LoginPage", () => {
  it("should render component", () => {
    const {container} = render(<LoginPage />);
    expect(container).toMatchSnapshot();
  });
});
