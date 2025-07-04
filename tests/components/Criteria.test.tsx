import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Criteria from "@/components/steps/Criteria";

describe("Criteria Component", () => {
  it("renders all criteria options", () => {
    const mockSelected = null;
    const mockSetSelected = jest.fn();

    render(<Criteria selected={mockSelected} setSelected={mockSetSelected} />);

    // Check that all option labels are displayed
    expect(screen.getByText("Company")).toBeInTheDocument();
    expect(screen.getByText("Record")).toBeInTheDocument();
    expect(screen.getByText("Website")).toBeInTheDocument();
    expect(screen.getByText("Expiration")).toBeInTheDocument();
    expect(screen.getByText("User")).toBeInTheDocument();
    expect(screen.getByText("Group")).toBeInTheDocument();
    expect(screen.getByText("Integration")).toBeInTheDocument();
  });

  it("shows selected option when one is chosen", () => {
    const mockSelected = 1; // Second option is selected (index 1)
    const mockSetSelected = jest.fn();

    render(<Criteria selected={mockSelected} setSelected={mockSetSelected} />);

    // Find all option items using the data-testid you added
    const options = screen.getAllByTestId("option-item");

    // Check that the second option has the selected class
    expect(options[1]).toHaveClass("options__item--selected");

    // Other options should not have the selected class
    expect(options[0]).not.toHaveClass("options__item--selected");
    expect(options[2]).not.toHaveClass("options__item--selected");
  });

  it("calls setSelected with correct index when option is clicked", () => {
    const mockSelected = null;
    const mockSetSelected = jest.fn();

    render(<Criteria selected={mockSelected} setSelected={mockSetSelected} />);

    // Find the "Record" option and click it
    fireEvent.click(screen.getByText("Record"));

    // Check that setSelected was called with the correct index
    expect(mockSetSelected).toHaveBeenCalledTimes(1);
    expect(mockSetSelected).toHaveBeenCalledWith(1);
  });

  it("deselects currently selected option when clicked again", () => {
    const mockSelected = 0; // Company is selected (index 0)
    const mockSetSelected = jest.fn();

    render(<Criteria selected={mockSelected} setSelected={mockSetSelected} />);

    // Click the already selected option
    fireEvent.click(screen.getByText("Company"));

    // It should be deselected (set to null)
    expect(mockSetSelected).toHaveBeenCalledWith(null);
  });

  it("changes selection when a different option is clicked", () => {
    const mockSelected = 0; // First option is selected
    const mockSetSelected = jest.fn();

    render(<Criteria selected={mockSelected} setSelected={mockSetSelected} />);

    // Click a different option
    fireEvent.click(screen.getByText("Website"));

    // Selection should change to the new option
    expect(mockSetSelected).toHaveBeenCalledWith(2); // Website is at index 2
  });

  it("shows actual content for debugging", () => {
    const mockSelected = null;
    const mockSetSelected = jest.fn();

    const { container, debug } = render(
      <Criteria selected={mockSelected} setSelected={mockSetSelected} />
    );

    // This will print the HTML to the console
    debug();

    // See all available option items:
    const options = screen.getAllByTestId("option-item");
    options.forEach((el, i) => {
      console.log(`Option ${i}:`, el.textContent);
    });
  });
});
