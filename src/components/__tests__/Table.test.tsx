// src/components/__tests__/Table.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import Table from "../Table";

describe("Table Component", () => {
  test("renders the table with headers", () => {
    render(<Table />);
    expect(screen.getByText("S.No.")).toBeInTheDocument();
    expect(screen.getByText("Percentage Funded")).toBeInTheDocument();
    expect(screen.getByText("Amount Pledged")).toBeInTheDocument();
  });
});