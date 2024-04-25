import { render, screen } from "@testing-library/react";
import Todo from "../Screens/Todo";
test("Component rendered successfully", () => {
  render(<Todo></Todo>);
  const element = screen.getByText(/ADD/i);
  expect(element).toBeInTheDocument();
});
