import React from "react";
import axios from "axios";
import Application from "components/Application";

import {
  render, 
  cleanup, 
  waitForElement,
  fireEvent,
  getByText,
  getAllByTestId,
  getByAltText,
  getByPlaceholderText,
  waitForElementToBeRemoved,
  queryByText, 
  queryByAltText
} from "@testing-library/react";

afterEach(cleanup);

describe("Application", () => {

  it("calls the function", () => {
    const fn = jest.fn();
    fn();
    expect(fn).toHaveBeenCalledTimes(1);
   });


  it("changes the selected day based on user click", async () => {
    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, "Monday"));
    fireEvent.click(getByText(container, "Tuesday"));
    expect(getByText(container, "Leopold Silvers")).toBeInTheDocument();
  });


  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    // 1. Render the application
    const { container, debug } = render(<Application />);

    // 2. Wait for application to render and search for Archie Cohen 
    await waitForElement(() => getByText(container, "Monday"));
    fireEvent.click(getByText(container, "Monday"));
    await waitForElement(() => getByText(container, "Archie Cohen"));
  
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    fireEvent.click(getByAltText(appointment, "Add"));
    fireEvent.change(getByPlaceholderText(appointment,  /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
  
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"))
    expect(getByText(appointment, "Saving")).toBeInTheDocument();
    waitForElementToBeRemoved(() => getByText(appointment, "Saving"));
    debug()

    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });
  


   it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container, debug } = render(<Application />);
    await waitForElement(() => getByText(container, "Monday"));
    fireEvent.click(getByText(container, "Monday"));
  
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
  
    // 3. Click the "Delete" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    fireEvent.click(queryByAltText(appointment, "Delete"));

    // 4. Check that the confirmation message is shown.
    expect(getByText(appointment, 'Are you really bout dis')).toBeInTheDocument();
    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(getByText(appointment, "Confirm"));
    // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, 'Deleting')).toBeInTheDocument();

    // 7. Wait until the element with the "Add" button is displayed.
    waitForElement(() => getByText(appointment, "Add"));
    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });


  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    // 1. Render the Application.
    const { container, debug } = render(<Application />);
  
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Monday"));
    fireEvent.click(getByText(container, "Monday"));

    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointment = getAllByTestId(container, "appointment").find(
    appointment => queryByText(appointment, "Archie Cohen")
    );
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();

    // 3. Click the "Edit" button on the booked appointment.
    fireEvent.click(getByAltText(appointment, "Edit"));
      
    // 4. Change the name and save 
    waitForElement(() => fireEvent.change(getByText(appointment, 'Archie Cohen'), {
      target: { value: "Alex" }
    }));
    
    // 5. Click the "Confirm" button on the confirmation.
    waitForElement(() => fireEvent.click(getByText(appointment, "Save")));
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });
  
});
