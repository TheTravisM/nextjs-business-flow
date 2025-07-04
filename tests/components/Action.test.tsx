import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import Action from "@/components/steps/Action";

describe("Action Component", () => {
  it("renders all action options", () => {
    const mockSelected = [false, false, false];
    const mockSetSelected = jest.fn();

    render(<Action selected={mockSelected} setSelected={mockSetSelected} />);

    expect(screen.getByText("Add flag")).toBeInTheDocument();
    expect(screen.getByText("Send Email")).toBeInTheDocument();
    expect(screen.getByText("Send webhook")).toBeInTheDocument();
  });

  it("calls setSelected when an option is clicked", () => {
    const mockSelected = [false, false, false];
    const mockSetSelected = jest.fn();

    render(<Action selected={mockSelected} setSelected={mockSetSelected} />);

    // Click the first option
    fireEvent.click(screen.getByText("Add flag"));

    // Check if mockSetSelected was called with the correct argument
    expect(mockSetSelected).toHaveBeenCalledTimes(1);
    expect(mockSetSelected).toHaveBeenCalledWith([true, false, false]);
  });
});
