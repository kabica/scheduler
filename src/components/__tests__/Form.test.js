import React from "react";
import Form from "components/Appointment/Form";
import Application from "components/Application";
import { fireEvent, act } from "@testing-library/react";
import { render, cleanup } from "@testing-library/react";

import {
  getByPlaceholderText,
  getAllByPlaceholderText,
  getByTestId,
  getAllByTestId, 
  getByText, 
  queryByText
} from '@testing-library/dom'
afterEach(cleanup);



describe("Form", () => {
  afterEach(cleanup);
  const interviewers = [
    {
      id: 1,
      name: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png"
    }
  ];
  
  const { getByPlaceholderText } = render(
    <Form interviewers={interviewers} />
  );
  

  it("renders without student name if not provided", () => {
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
  });
  
  // it("validates that the student name is not blank", () => {
  //   /* 1. Create the mock onSave function */
  //   const onSave = jest.fn();
  
  //   /* 2. Render the Form with interviewers and the onSave mock function passed as an onSave prop, the name prop should be blank or undefined */
  //   const { getByText } = render(
  //     <Form interviewers={interviewers} onSave={onSave} />
  //   );
  
  //   /* 3. Click the save button */
  //   act(() => {
  //     fireEvent.click(getByText("Save"));
  //   })
  
  //   expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
  //   expect(onSave).not.toHaveBeenCalled();
  // });
  
  // it("can successfully save after trying to submit an empty student name", () => {
  //   const onSave = jest.fn();
  //   const { getByText, getByPlaceholderText, queryByText } = render(
  //     <Form interviewers={interviewers} onSave={onSave} />
  //   );
  
  //   act(() => {
  //     fireEvent.click(getByText("Save"));
  //   })
  
  //   expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
  //   expect(onSave).not.toHaveBeenCalled();
  
  //   act(() => {
  //     fireEvent.change(getByPlaceholderText("Enter Student Name"), {
  //       target: { value: "Lydia Miller-Jones" }
  //     });
  //   });
  //   expect(queryByText(/student name cannot be blank/i)).toBeNull();

  //   act(() => {
  //     fireEvent.click(getByText("Save"));
  //   });
  //   expect(onSave).toHaveBeenCalledTimes(0);

  // });


});
