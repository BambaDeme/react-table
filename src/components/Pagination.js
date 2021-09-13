import "../styles/pagination.css";
const Pagination = (props) => {
  const {
    canNextPage,
    nextPage,
    canPreviousPage,
    previousPage,
    gotoPage,
    pageIndex,
    pageCount,
    pageSize,
    pageOptions,
    setPageSize,
  } = props;

  const pages = [];
  for (let index = 0; index < pageOptions.length; index++) {
    pages.push(index + 1);
  }

  return (
    <>
      <div
        style={{
          margin: "auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "rgb(248,250,251)",
          height: 50,
          borderRadius: 10,
          padding: 20,
        }}
      >
        <div>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <select
              style={{
                width: 100,
                borderRadius: 5,
                color: "blue",
                boxShadow: "1px 1px 1px rgb(248, 250, 251) inset",
              }}
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
              }}
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </div>
          <div style={{ marginLeft: 10, marginRight: 10 }}>|</div>

          <div>
            Go to page:{" "}
            <select
              className=""
              style={{ width: 40, borderRadius: 5, color: "blue" }}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                gotoPage(page);
                //console.log(e.target.value);
              }}
            >
              {pages.map((page) => (
                <option key={page} selected={page === pageIndex + 1}>
                  {page}
                </option>
              ))}
            </select>
          </div>
          <div style={{ marginLeft: 10, marginRight: 10 }}>|</div>
          <div>
            <button
              className="icon-custom"
              disabled={!canPreviousPage}
              onClick={() => previousPage()}
            >
              <i
                className="bi bi-arrow-left"
                style={{
                  fontSize: "20px",
                  color: "blue",
                  margin: 0,
                  padding: 0,
                }}
              ></i>
            </button>{" "}
            <button
              className="icon-custom"
              disabled={!canNextPage}
              onClick={() => nextPage()}
            >
              <i
                className="bi bi-arrow-right"
                style={{
                  fontSize: "20px",
                  color: "blue",
                  margin: 0,
                  padding: 0,
                }}
              ></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Pagination;
