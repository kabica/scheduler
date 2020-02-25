import React from "react";
import { render, cleanup, act } from "@testing-library/react";
import Application from "components/Application";
import {
  getByText, 
  waitForElement, 
  fireEvent, 
  getAllByTestId,
  prettyDOM,
  getByAltText,
  getByPlaceholderText, 
  queryByText,
  queryByAltText, 
  waitForElementToBeRemoved
} from '@testing-library/dom'
import axios from "axios";
import { debug } from "util";


afterEach(cleanup);

describe("Application", () => {
  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
  //   const { container , debug } = render(<Application />);
  
  //   waitForElement(() => getByText(container, "Archie Cohen"));
    
  //   const appointments = waitForElement(() => getAllByTestId(container, "appointment"));
  //   const appointment = appointments[0];
  //   // debug();
  //   waitForElement(() => fireEvent.click(getByAltText(appointment, "Add")));
  //   waitForElement(() => fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
  //     target: { value: "Lydia Miller-Jones" }
  //   }));

  //   waitForElement(() => fireEvent.click(getByAltText(appointment, "Sylvia Palmer")));
  //   waitForElement(() => fireEvent.click(getByText(appointment, "Save")));
  
  //   waitForElement(() => expect(getByText(appointment, "Saving")).toBeInTheDocument());
  //   waitForElement(() => waitForElementToBeRemoved(() => getByText(appointment, "Saving")))
    
  //   waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
  
  //   const day = waitForElement(() => getAllByTestId(container, "day").find(day =>
  //     queryByText(day, "Monday")
  //   ));

  //  expect(getByText(day, "no spots remaining")).toBeInTheDocument();

    
    // const day = await getAllByTestId(container, "day").find(day => getByText(day, 'Monday'));

    // setTimeout(() => {
    //   expect(getByText(day, "no spots remaining")).toBeInTheDocument();
    // }, 1000)
 
    
  });
  
  // it("changes the schedule when a new day is selected", async () => {
  //   const { getByText, debug } = render(<Application />);
  
  //   await waitForElement(() => getByText("Tuesday"));
  //   fireEvent.click(getByText("Tuesday"));

  //   // act(() => {fireEvent.click(getByText("Tuesday"));})
  
  //   expect(getByText("Leopold Silvers")).toBeInTheDocument();
  // });

  it("calls the function", () => {
    const fn = jest.fn();
    fn();
    expect(fn).toHaveBeenCalledTimes(1);
   });

   it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container, debug } = render(<Application />);
    await waitForElement(() => getByText(container, "Monday"));

    waitForElement(() => fireEvent.click(getByText(container, "Monday")));
  
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
  
    // 3. Click the "Delete" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );

  
    await waitForElement(() => fireEvent.click(queryByAltText(appointment, "Delete")));

    // // 4. Check that the confirmation message is shown.
    expect(getByText(appointment, 'Are you really bout dis')).toBeInTheDocument();
    // // 5. Click the "Confirm" button on the confirmation.
    waitForElement(() => fireEvent.click(getByText(appointment, "Confirm")));
    // // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, 'Deleting')).toBeInTheDocument();
    // // 7. Wait until the element with the "Add" button is displayed.

    await waitForElement(() => getByText(appointment, "Add"));

    // // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    // const day = getAllByTestId(container, "day").find(day =>
    //   queryByText(day, "Monday")
    // );
    // setTimeout(() => {
    //   expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
    // }, 250);
    debug();
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    // 1. Render the Application.
    const { container } = render(<Application />);
  
    // 2. Wait until the text "Archie Cohen" is displayed.
    // waitForElement(() => getByText(container, "Archie Cohen"));

    // const appointment = await getAllByTestId(container, "appointment").find(
    // appointment => queryByText(appointment, "Archie Cohen")
    // );
    // const day = getAllByTestId(container, "day").find(day =>
    //   queryByText(day, "Monday")
    // );
    // setTimeout(() => {
    //   expect(getByText(day, "4 spots remaining")).toBeInTheDocument();
    // }, 250)
    // expect(getByText(day, "4 spots remaining")).toBeInTheDocument();

    // // 3. Click the "Delete" button on the booked appointment.
    // const appointment = await getAllByTestId(container, "appointment").find(
    //   appointment => queryByText(appointment, "Archie Cohen")
    // );
  
    // fireEvent.click(queryByAltText(appointment, "Edit"));

    // // 4. Change the name and save 
    // setTimeout(() => {
    //   fireEvent.change(getByText(appointment, 'Archie Cohen'), {
    //     target: { value: "Alex" }
    //   });
    // }, 500)
    
    // // 5. Click the "Confirm" button on the confirmation.
    // fireEvent.click(getByText(appointment, "Save"));
    // // 6. Check that the element with the text "Deleting" is displayed.
    // setTimeout(() => {
    //   expect(getByText(appointment, 'Alex')).toBeInTheDocument();
    // }, 500)
    
    // // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    
    // setTimeout(() => {
    //   expect(getByText(day, "4 spots remaining")).toBeInTheDocument();
    // }, 250);
  });
  
});
