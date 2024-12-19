// src/components/Table.tsx
import React, { useEffect, useState } from "react";
import "./index.css";

interface Project {
  id: number;
  percentageFunded: number;
  amountPledged: number;
}

const Table: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const recordsPerPage = 5;

  useEffect(() => {
    // Fetch data from the given URL
    fetch(
      "https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json"
    )
      .then((response) => response.json())
      .then((data) => {
        setProjects(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Pagination logic
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = projects.slice(indexOfFirstRecord, indexOfLastRecord);

  const totalPages = Math.ceil(projects.length / recordsPerPage);

  return (
    <div className="table-container">
      <table className="table" role="table" aria-labelledby="tableTitle">
        <caption id="tableTitle">Project Funding Table</caption>
        <thead>
          <tr>
            <th scope="col">S.No.</th>
            <th scope="col">Percentage Funded</th>
            <th scope="col">Amount Pledged</th>
          </tr>
        </thead>
        <tbody>
          {currentRecords.map((project, index) => (
            <tr key={project.id}>
              <td>{indexOfFirstRecord + index + 1}</td>
              <td>{project["percentage.funded"]}</td>
              <td>{project["amt.pledged"]}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="pagination" role="navigation" aria-label="Page navigation">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          aria-label="Go to previous page"
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={currentPage === i + 1 ? "active" : ""}
            onClick={() => setCurrentPage(i + 1)}
            aria-current={currentPage === i + 1 ? "page" : undefined}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          aria-label="Go to next page"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Table;
