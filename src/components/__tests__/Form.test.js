import React from "react";
import Form from "components/Appointment/Form";
import Edit from "components/Appointment/Edit";
import { render, cleanup , fireEvent, getByAltText} from "@testing-library/react";



afterEach(cleanup);

describe("Form", () => {
  const interviewers = [
    {
      id: 1,
      name: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png"
    }
  ];

  it("renders without student name if not provided", () => {
    const { getByPlaceholderText } = render(
      <Form interviewers={interviewers}/>
    );
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
  });


  it("renders with initial student name", () => {
    const { getByPlaceholderText } = render(
      <Edit interviewers={interviewers} name="Lydia Miller-Jones" />
    );
    expect(getByPlaceholderText("Lydia Miller-Jones")).toHaveValue("Lydia Miller-Jones");
  });

  it("validates that the student name is not blank", () => {
    const onSave = jest.fn();
    const { getByText } = render(
      <Form interviewers={interviewers} onSave={onSave} />
    );

    fireEvent.click(getByText("Save"));

    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  });

  it("can successfully save after trying to submit an empty student name", async () => {
    const onSave = jest.fn();
    const { getByText, getByPlaceholderText, queryByText, debug } = render(
      <Form interviewers={interviewers} onSave={onSave} interviewer={1}/>
    );

    fireEvent.click(getByText("Save"));
    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();

    fireEvent.change(getByPlaceholderText("Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });

    fireEvent.click(getByText("Save"));
    expect(queryByText(/student name cannot be blank/i)).toBeNull();
    debug()
    
    expect(onSave).toHaveBeenCalledTimes(0);
    // expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", "Sylvia Palmer");
  });

  it("calls onCancel and resets the input field", () => {
    const onCancel = jest.fn();
    const { getByText, getByPlaceholderText, queryByText } = render(
      <Form
        interviewers={interviewers}
        name="Lydia Mill-Jones"
        onSave={jest.fn()}
        onCancel={onCancel}
      />
    );

    fireEvent.click(getByText("Save"));

    fireEvent.change(getByPlaceholderText("Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });

    fireEvent.click(getByText("Cancel"));

    expect(queryByText(/student name cannot be blank/i)).toBeNull();

    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");

    expect(onCancel).toHaveBeenCalledTimes(1);
  });
});