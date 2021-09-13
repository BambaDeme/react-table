import { useTable, usePagination } from "react-table";

import { Link } from "react-router-dom";
import React, { useState } from "react";
import Form from "react-bootstrap/Form";

import "../styles/Table.css";
import SimpleSearch from "./SimpleSearch";
//import "./BasicTable.css";
import AdvanceSearch from "./AdvanceSearch";
import PDF from "../exports/JSPDF";
import Pagination from "./Pagination";
import DropdownExport from "./Dropdown";
import ModalFilter from "./ModalFilter";
import SearchInput from "./SearchInput";
import Spinner from "./Spinner";
import { is } from "date-fns/locale";
import { isEmpty } from "lodash";

function Table({
  columns,
  data,
  fetchData,
  loading,
  pageCount: controlledPageCount,
  simpleSearch,
  deleteContact,
  deleteMultiple,
}) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    // Get the state from the instance
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 5 }, // Pass our hoisted table state
      manualPagination: true, // Tell the usePagination
      // hook that we'll handle our own data fetching
      // This means we'll also have to provide our own
      // pageCount.
      pageCount: controlledPageCount,
    },
    usePagination
  );

  const [search, setSearch] = useState("");
  const [advancedSearch, setAdvancedSearch] = useState({});
  const [sort, setSort] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  console.log(selectedRows);

  /*
  const [advancedSearch,setAdvancedSearch] = useState({})

  */
  // Listen for changes in pagination and use the state to fetch our new data
  React.useEffect(() => {
    fetchData({ pageIndex, pageSize, search, advancedSearch, sort });
  }, [fetchData, pageIndex, pageSize, search, advancedSearch, sort]);

  const handleSimpleSearch = (input) => {
    //console.log(input);
    setSearch(input);
  };

  // function that handle the row selection for delete,...
  const selectRow = (id, e) => {
    // if a row is checked we add it to the selectedRow list
    if (e.target.checked) {
      const index = selectedRows.findIndex((row) => row === id);
      if (index == -1) {
        setSelectedRows([...selectedRows, id]);
      }
    } else {
      const index = selectedRows.findIndex((row) => row === id);
      const newRows = selectedRows.slice();
      newRows.splice(index, 1);
      setSelectedRows(newRows);
      //console.log(index);
    }
  };
  // Render the UI for your table
  return (
    <div style={{ width: "90%", margin: "auto", paddingTop: 0 }}>
      {/*<AdvanceSearch advancedSearch={setAdvancedSearch} />*/}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <div>
          <h2>Contacts</h2>
        </div>
        <div style={{ textAlign: "right" }}>
          <Link to={{ pathname: "/addContact" }}>
            <button className="button">Add Contact</button>
          </Link>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 10,
          backgroundColor: "rgb(248,250,251)",
          height: 60,
          borderRadius: 10,
          padding: 20,
        }}
      >
        {/*<SimpleSearch search={handleSimpleSearch} simpleSearch={simpleSearch} />*/}
        <div
          style={{
            display: "flex",
            width: "80%",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <SearchInput
            search={handleSimpleSearch}
            simpleSearch={simpleSearch}
          />
          <div style={{ display: "flex" }}>
            <ModalFilter advancedSearch={setAdvancedSearch} />
            <DropdownExport />
            <button
              className="btn btn-custom"
              onClick={() => {
                if (search !== "") {
                  setSearch("");
                } else {
                  if (!isEmpty(advancedSearch)) {
                    setAdvancedSearch({});
                  }
                }
              }}
              style={{ color: "red" }}
            >
              <i class="bi bi-x-octagon-fill" style={{ color: "red" }}></i>{" "}
              Réinitialiser
            </button>
          </div>
        </div>
        <div className={selectedRows.length > 0 ? "show-trash" : "hide-trash"}>
          <button
            className="btn btn-delete"
            onClick={() => {
              deleteMultiple(selectedRows);
              setSelectedRows([]);
            }}
          >
            <i
              className="bi bi-trash-fill"
              style={{ color: "#fff", fontSize: 20, cursor: "pointer" }}
            ></i>
          </button>
        </div>
      </div>

      <Pagination
        canNextPage={canNextPage}
        nextPage={nextPage}
        canPreviousPage={canPreviousPage}
        previousPage={previousPage}
        gotoPage={gotoPage}
        pageIndex={pageIndex}
        pageCount={pageCount}
        pageSize={pageSize}
        pageOptions={pageOptions}
        setPageSize={setPageSize}
      />

      <table
        {...getTableProps()}
        className="table table-hover table-borderless table-custom"
      >
        <thead className="thead-custom">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>
                  {column.render("Header")}
                  {column.Header === "First Name" ||
                  column.Header === "Last Name" ? (
                    <span
                      onClick={() => setSort(column.id)}
                      style={{ cursor: "pointer" }}
                    >
                      🔼
                    </span>
                  ) : null}
                  <span></span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        {loading ? (
          <Spinner />
        ) : (
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} className="tr-custom">
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>
                      {cell.render("Cell")}
                      {cell.column.Header === "Actions" ? (
                        <>
                          <div className="dropdown">
                            <i
                              className="bi bi-three-dots"
                              style={{ cursor: "pointer" }}
                              data-toggle="dropdown"
                            ></i>
                            <div className="dropdown-menu">
                              <a
                                className="dropdown-item"
                                href="#"
                                onClick={() =>
                                  deleteContact(cell.row.values.id)
                                }
                              >
                                <i
                                  className="bi bi-tv-fill"
                                  style={{ color: "blue" }}
                                ></i>{" "}
                                VIEW
                              </a>
                              <Link
                                to={{
                                  pathname: `/contacts/${cell.row.values.id}`,
                                  state: { contact: cell.row.original },
                                }}
                              >
                                <div
                                  className="dropdown-item"
                                  style={{ textDecoration: "none" }}
                                >
                                  <i
                                    className="bi bi-pen-fill"
                                    style={{ color: "blue" }}
                                  ></i>{" "}
                                  EDIT
                                </div>
                              </Link>

                              <a
                                className="dropdown-item"
                                href="#"
                                onClick={() =>
                                  deleteContact(cell.row.values.id)
                                }
                              >
                                <i
                                  className="bi bi-trash-fill"
                                  style={{ color: "blue" }}
                                ></i>{" "}
                                DELETE
                              </a>
                            </div>
                          </div>
                        </>
                      ) : null}
                      {cell.column.Header === "###" ? (
                        <Form.Check
                          type="checkbox"
                          label=""
                          onChange={(e) => {
                            //console.log(e.target.checked);
                            selectRow(cell.row.values.id, e);
                          }}
                        />
                      ) : null}
                    </td>
                  ))}
                </tr>
              );
            })}
            {/*<tr>
            {loading ? (
              // Use our custom loading state to show a loading indicator
              <td colSpan="10000">Loading...</td>
            ) : (
              <td colSpan="10000">
                Showing {page.length} of ~{controlledPageCount * pageSize}{" "}
                results
              </td>
            )}
            </tr>*/}
          </tbody>
        )}
      </table>
      {/* 
          Pagination can be built however you'd like. 
          This is just a very basic UI implementation:
        */}

      <Pagination
        canNextPage={canNextPage}
        nextPage={nextPage}
        canPreviousPage={canPreviousPage}
        previousPage={previousPage}
        gotoPage={gotoPage}
        pageIndex={pageIndex}
        pageCount={pageCount}
        pageSize={pageSize}
        pageOptions={pageOptions}
        setPageSize={setPageSize}
      />
    </div>
  );
}

export default Table;
