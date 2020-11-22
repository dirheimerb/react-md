import React from "react";
import { fireEvent, render } from "@testing-library/react";

import { TextField } from "../TextField";

describe("TextField", () => {
  it("should render correctly", () => {
    const props = { id: "field" };
    const { container, rerender } = render(<TextField {...props} />);

    expect(container).toMatchSnapshot();

    rerender(<TextField {...props} label="Label" placeholder="Placeholder" />);
    expect(container).toMatchSnapshot();

    rerender(
      <TextField {...props} label="Label" placeholder="Placeholder" disabled />
    );
    expect(container).toMatchSnapshot();
    expect(document.getElementById("field")).toHaveAttribute("disabled");
  });

  it("should correctly call the onChange event", () => {
    const onChange = jest.fn();
    const { getByRole } = render(
      <TextField id="field" label="Label" onChange={onChange} />
    );
    const field = getByRole("textbox");
    expect(onChange).not.toBeCalled();

    fireEvent.change(field, { target: { value: "2" } });
    expect(onChange).toBeCalledTimes(1);
  });

  it("should add the inactive floating label state when a number text field is blurred while containing an invalid value", () => {
    const { getByRole, getByText } = render(
      <TextField id="text-field" label="Label" type="number" defaultValue="" />
    );

    const field = getByRole("spinbutton") as HTMLInputElement;
    const label = getByText("Label");
    expect(field).toHaveAttribute("value", "");
    expect(label.className).not.toContain("rmd-floating-label--active");
    expect(label.className).not.toContain("rmd-floating-label--inactive");

    fireEvent.focus(field);
    expect(label.className).toContain("rmd-floating-label--active");
    expect(label.className).not.toContain("rmd-floating-label--inactive");

    fireEvent.change(field, { target: { value: "123" } });
    expect(label.className).toContain("rmd-floating-label--active");
    expect(label.className).not.toContain("rmd-floating-label--inactive");

    // TODO: Look into writing real browser tests since this isn't implemented in JSDOM
    Object.defineProperty(field.validity, "badInput", {
      writable: true,
      value: true,
    });
    expect(field.validity.badInput).toBe(true);
    fireEvent.change(field, {
      target: { value: "123-" },
    });
    expect(field.validity.badInput).toBe(true);
    expect(label.className).toContain("rmd-floating-label--active");
    expect(label.className).not.toContain("rmd-floating-label--inactive");

    fireEvent.blur(field);
    expect(label.className).toContain("rmd-floating-label--active");
    expect(label.className).toContain("rmd-floating-label--inactive");
  });

  it("should not add the inactive floating label state when a non-number type has a badInput validity", () => {
    const { getByRole, getByText } = render(
      <TextField id="text-field" label="Label" type="url" defaultValue="" />
    );

    const field = getByRole("textbox") as HTMLInputElement;
    const label = getByText("Label");
    expect(field).toHaveAttribute("value", "");
    expect(label.className).not.toContain("rmd-floating-label--active");
    expect(label.className).not.toContain("rmd-floating-label--inactive");

    fireEvent.focus(field);
    expect(label.className).toContain("rmd-floating-label--active");
    expect(label.className).not.toContain("rmd-floating-label--inactive");

    // TODO: Look into writing real browser tests since this isn't implemented in JSDOM
    Object.defineProperty(field.validity, "badInput", {
      writable: true,
      value: true,
    });
    fireEvent.change(field, { target: { value: "123" } });
    expect(field.validity.badInput).toBe(true);
    expect(label.className).toContain("rmd-floating-label--active");
    expect(label.className).not.toContain("rmd-floating-label--inactive");

    fireEvent.blur(field);
    expect(field.validity.badInput).toBe(true);
    expect(label.className).toContain("rmd-floating-label--active");
    expect(label.className).toContain("rmd-floating-label--inactive");

    fireEvent.focus(field);
    expect(label.className).toContain("rmd-floating-label--active");
    expect(label.className).not.toContain("rmd-floating-label--inactive");

    fireEvent.change(field, { target: { value: "" } });
    fireEvent.blur(field);
    expect(label.className).not.toContain("rmd-floating-label--active");
    expect(label.className).not.toContain("rmd-floating-label--inactive");
  });
});
