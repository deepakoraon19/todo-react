import { render, screen } from "@testing-library/react";
import UserContext from "../Contexts/UserContext";
import Todo from "../Screens/Todo";

jest.mock('firebase/auth', () => {
  const getAuthMock = jest.fn();
  return {
    getAuth: getAuthMock
  }
})

test("Component rendered successfully", () => {
  const contextValue = { setUser: () => {}, user: {uid : "D4LUHHbqqAa5Pk7JxYvjooZEV1H3"} };
  render(
    <UserContext.Provider value={contextValue}>
      <Todo></Todo>
    </UserContext.Provider>
  );
  const element = screen.getByText(/Add/i);
  expect(element).toBeInTheDocument();
});
