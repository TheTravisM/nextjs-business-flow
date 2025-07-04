import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import CriteriaType from "@/components/steps/CriteriaType";

describe("CriteriaType Component", () => {
  it("renders all criteria type options", () => {
    const mockSelected = Array(8).fill(false);
    const mockSetSelected = jest.fn();

    render(
      <CriteriaType selected={mockSelected} setSelected={mockSetSelected} />
    );

    // Check that all option labels are displayed
    expect(screen.getByText("Password")).toBeInTheDocument();
    expect(screen.getByText("Company KB Article")).toBeInTheDocument();
    expect(screen.getByText("Central KB Article")).toBeInTheDocument();
    expect(screen.getByText("Process")).toBeInTheDocument();
    expect(screen.getByText("Website")).toBeInTheDocument();
    expect(screen.getByText("Rack")).toBeInTheDocument();
    expect(screen.getByText("Network")).toBeInTheDocument();
    expect(screen.getByText("Asset")).toBeInTheDocument();
  });

  it("shows selected options correctly", () => {
    // Mock that the first and third options are selected
    const mockSelected = [true, false, true, false, false, false, false, false];
    const mockSetSelected = jest.fn();

    render(
      <CriteriaType selected={mockSelected} setSelected={mockSetSelected} />
    );

    // Find all option items
    const options = screen.getAllByTestId("option-item");

    // Check that the selected options have the selected class
    expect(options[0]).toHaveClass("options__item--selected");
    expect(options[2]).toHaveClass("options__item--selected");

    // Check that non-selected options don't have the selected class
    expect(options[1]).not.toHaveClass("options__item--selected");
    expect(options[3]).not.toHaveClass("options__item--selected");
  });

  it("toggles selection when an option is clicked", () => {
    const mockSelected = Array(8).fill(false);
    const mockSetSelected = jest.fn();

    render(
      <CriteriaType selected={mockSelected} setSelected={mockSetSelected} />
    );

    // Click the "Password" option
    fireEvent.click(screen.getByText("Password"));

    // Check that setSelected was called with the correct array
    const expectedSelection = [
      true,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ];
    expect(mockSetSelected).toHaveBeenCalledWith(expectedSelection);
  });

  it("toggles off when clicking a selected option", () => {
    const mockSelected = [
      true,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ];
    const mockSetSelected = jest.fn();

    render(
      <CriteriaType selected={mockSelected} setSelected={mockSetSelected} />
    );

    // Click the already selected "Password" option
    fireEvent.click(screen.getByText("Password"));

    // It should be deselected
    const expectedSelection = [
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ];
    expect(mockSetSelected).toHaveBeenCalledWith(expectedSelection);
  });

  it("handles Select All checkbox correctly", () => {
    const mockSelected = Array(8).fill(false);
    const mockSetSelected = jest.fn();

    render(
      <CriteriaType selected={mockSelected} setSelected={mockSetSelected} />
    );

    // Find and click the Select All checkbox
    const selectAllCheckbox = screen.getByRole("checkbox", {
      name: /select all/i,
    });
    fireEvent.click(selectAllCheckbox);

    // Should set all options to selected
    expect(mockSetSelected).toHaveBeenCalledWith(Array(8).fill(true));
  });

  it("shows Select All checkbox checked when all options are selected", () => {
    const mockSelected = Array(8).fill(true);
    const mockSetSelected = jest.fn();

    render(
      <CriteriaType selected={mockSelected} setSelected={mockSetSelected} />
    );

    // Select All checkbox should be checked
    const selectAllCheckbox = screen.getByRole("checkbox", {
      name: /select all/i,
    });
    expect(selectAllCheckbox).toBeChecked();
  });

  it("shows Select All checkbox unchecked when not all options are selected", () => {
    const mockSelected = [true, false, true, false, false, false, false, false];
    const mockSetSelected = jest.fn();

    render(
      <CriteriaType selected={mockSelected} setSelected={mockSetSelected} />
    );

    // Select All checkbox should not be checked
    const selectAllCheckbox = screen.getByRole("checkbox", {
      name: /select all/i,
    });
    expect(selectAllCheckbox).not.toBeChecked();
  });

  it("handles Select All unchecking correctly", () => {
    const mockSelected = Array(8).fill(true);
    const mockSetSelected = jest.fn();

    render(
      <CriteriaType selected={mockSelected} setSelected={mockSetSelected} />
    );

    // Find and uncheck the Select All checkbox
    const selectAllCheckbox = screen.getByRole("checkbox", {
      name: /select all/i,
    });
    fireEvent.click(selectAllCheckbox);

    // Should set all options to unselected
    expect(mockSetSelected).toHaveBeenCalledWith(Array(8).fill(false));
  });
});
