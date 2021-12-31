// Import resources
import React, { useMemo } from "react";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
import { ButtonGroup, Button, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import {
  FaArrowDown,
  FaArrowUp,
  FaFastBackward,
  FaFastForward,
} from "react-icons/fa";

// Import custom files
import { COLUMNS_PROFITS } from "../config/columnsProfits";
import { selectProfits } from "../redux/slices/chartSlice";
import TableGlobalFilter from "./TableGlobalFilter";

// Component
function TableProfits() {
  // Define profits
  const profits = useSelector(selectProfits);

  // Debug
  //console.log("State: ", profits?);

  // Memorize data and columns to avoid re-render of data
  const columns = useMemo(() => COLUMNS_PROFITS, []);
  const data = useMemo(() => {
    // Check data
    if (!profits) {
      return [];
    } else {
      return profits;
    }
  }, [profits]);

  // Destructure props from table instance
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    page,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    prepareRow,
    state: { pageIndex, globalFilter },
    setGlobalFilter,
  } = useTable(
    { columns: columns, data: data },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  // Return component
  return (
    <>
      {profits?.length < 1 ? (
        <p className="text-center small">No records available.</p>
      ) : (
        <>
          {/** Table actions */}
          <div className="d-flex flex-row justify-content-between">
            <div></div>
            {/** Search */}
            <TableGlobalFilter
              filter={globalFilter}
              setFilter={setGlobalFilter}
              divClass="mb-2 col-4"
              placeholder="Search table..."
            />
          </div>

          {/** TABLE */}
          <Table borderless striped hover responsive {...getTableProps}>
            {/** HEADER */}
            <thead className="bg-primary text-white">
              {/** Setup headerGroups */}
              {headerGroups.map((headerGroup, index) => (
                <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                  {headerGroup.headers.map((column, index) => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      key={index}
                    >
                      {column.render("Header")}
                      {/** Sorting icon */}
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <FaArrowDown className="ml-2" />
                        ) : (
                          <FaArrowUp className="ml-2" />
                        )
                      ) : (
                        ""
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            {/** BODY */}
            <tbody {...getTableBodyProps}>
              {/** Setup rows - page is used for pagination */}
              {page.map((row) => {
                prepareRow(row);
                // Return tr tag
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      // Return td tag
                      return (
                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>

            {/** FOOTER */}
            <tfoot className="bg-primary text-white">
              {/** Setup footerGroups */}
              {footerGroups.map((footerGroup, index) => (
                <tr {...footerGroup.getFooterGroupProps()} key={index}>
                  {footerGroup.headers.map((column, index) => (
                    <th {...column.getFooterProps()} key={index}>
                      {column.render("Footer")}
                    </th>
                  ))}
                </tr>
              ))}
            </tfoot>
          </Table>

          {/** PAGINATION */}
          <div className="d-flex justify-content-center">
            {/** Main container */}
            <div className="text-center mt-2">
              {/** Go to page */}
              <div className="d-flex flex-row justify-content-center mb-2">
                <div className="form-text align-self-center me-2">
                  Go to page
                </div>
                <input
                  type="number"
                  defaultValue={pageIndex + 1}
                  onChange={(e) => {
                    const page = e.target.value
                      ? Number(e.target.value) - 1
                      : 0;
                    gotoPage(page);
                  }}
                  className="form-control form-control-sm"
                  style={{ width: "60px" }}
                />
              </div>

              {/** Buttons */}
              <ButtonGroup>
                <Button
                  variant="secondary"
                  size="sm"
                  className="px-3"
                  onClick={() => gotoPage(0)}
                  disabled={!canPreviousPage}
                >
                  <FaFastBackward color="white" />
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => previousPage()}
                  disabled={!canPreviousPage}
                >
                  Previous
                </Button>
                <Button
                  variant="primary"
                  onClick={() => nextPage()}
                  disabled={!canNextPage}
                >
                  Next
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  className="px-3"
                  onClick={() => gotoPage(pageCount - 1)}
                  disabled={!canNextPage}
                >
                  <FaFastForward color="white" />
                </Button>
              </ButtonGroup>

              {/** Current page and total pages */}
              <div className="small text-muted mt-1">
                {profits?.length > 0 &&
                  `Showing page ${pageIndex + 1} of ${pageOptions.length}`}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

// Export
export default TableProfits;
