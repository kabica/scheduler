import React from "react";
import DayListItem from "components/DayList/DayListItem";
import { render, cleanup } from "@testing-library/react";

afterEach(cleanup);

it("renders day list", () => {
  render(<DayListItem />);
});

it("displays 'no spots remaining' when the spot count is zero", () => {
  const { getByText } = render(<DayListItem name="Monday" spots={0} />);
  expect(getByText("no spots remaining")).toBeInTheDocument();
});

it("renders '5 spots remaining' when the spot count is five", () => {
  const { getByText } = render(<DayListItem name="Monday" spots={5} />);
  expect(getByText("5 spots remaining")).toBeInTheDocument();
});

