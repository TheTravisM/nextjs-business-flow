import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Review from "@/components/steps/Review";

describe("Review Component", () => {
  // Mock data
  const mockCriteriaTypeSelections = ["Password", "Website", "Network"];

  const mockTriggerSelection = "Record created";

  it("renders the review page title", () => {
    render(
      <Review
        criteriaTypeSelections={mockCriteriaTypeSelections}
        triggerSelection={mockTriggerSelection}
      />
    );

    // Check for the heading text - match what's actually there
    expect(screen.getByText(/Review your workflow below/i)).toBeInTheDocument();
  });

  it("displays all selected criteria types", () => {
    render(
      <Review
        criteriaTypeSelections={mockCriteriaTypeSelections}
        triggerSelection={mockTriggerSelection}
      />
    );

    // Check that each criteria type selection is displayed
    mockCriteriaTypeSelections.forEach((selection) => {
      expect(screen.getByText(selection)).toBeInTheDocument();
    });
  });

  it("displays the summary paragraph with trigger action", () => {
    render(
      <Review
        criteriaTypeSelections={mockCriteriaTypeSelections}
        triggerSelection={mockTriggerSelection}
      />
    );

    expect(
      screen.getByText(
        /When any of the following record types is processed, add a flag/i
      )
    ).toBeInTheDocument();
  });

  it("renders criteria types as a list", () => {
    render(
      <Review
        criteriaTypeSelections={mockCriteriaTypeSelections}
        triggerSelection={mockTriggerSelection}
      />
    );

    // Check that there's a list structure
    const list = screen.getByRole("list");
    expect(list).toBeInTheDocument();

    // Check that list items match our selections
    const listItems = screen.getAllByRole("listitem");
    expect(listItems.length).toBe(mockCriteriaTypeSelections.length);

    // Check content of each list item
    listItems.forEach((item, index) => {
      expect(item).toHaveTextContent(mockCriteriaTypeSelections[index]);
    });
  });

  it("handles empty criteria type selections", () => {
    const { debug } = render(
      <Review
        criteriaTypeSelections={[]}
        triggerSelection={mockTriggerSelection}
      />
    );

    const list = screen.getByRole("list");
    expect(list).toBeInTheDocument();
    expect(list.children.length).toBe(0);
    expect(
      screen.getByText(/When any of the following record types is/)
    ).toBeInTheDocument();
  });

  it("handles empty trigger selection", () => {
    render(
      <Review
        criteriaTypeSelections={mockCriteriaTypeSelections}
        triggerSelection=""
      />
    );

    expect(
      screen.getByText(
        /When any of the following record types is processed, add a flag/i
      )
    ).toBeInTheDocument();

    // Verify the list is still there with items
    const listItems = screen.getAllByRole("listitem");
    expect(listItems.length).toBe(mockCriteriaTypeSelections.length);
  });

  it("displays correct information when all data is provided", () => {
    const { container } = render(
      <Review
        criteriaTypeSelections={mockCriteriaTypeSelections}
        triggerSelection={mockTriggerSelection}
      />
    );

    // Check overall structure - match what's actually in the output
    expect(screen.getByText(/Review your workflow below/i)).toBeInTheDocument();

    // The paragraph contains the summary information
    expect(
      screen.getByText(
        /When any of the following record types is processed, add a flag/i
      )
    ).toBeInTheDocument();

    // Individual selections
    expect(screen.getByText("Password")).toBeInTheDocument();
    expect(screen.getByText("Website")).toBeInTheDocument();
    expect(screen.getByText("Network")).toBeInTheDocument();

    // Optional: Take a snapshot of the rendered component
    expect(container).toMatchSnapshot();
  });
});
