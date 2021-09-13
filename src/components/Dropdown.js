import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import "../styles/Dropdown.css";
const DropdownExport = () => {
  return (
    <div className="dropdown">
      <button type="button" className="btn btn-custom " data-toggle="dropdown">
        <div className="btn-content">
          <i className="bi bi-arrow-down-circle"></i>
          <span>Export</span>
        </div>
      </button>

      <div className="dropdown-menu">
        <a className="dropdown-item" href="#">
          PDF
        </a>

        <a className="dropdown-item" href="#">
          CSV
        </a>
        <a className="dropdown-item" href="#">
          Excel
        </a>
      </div>
    </div>
  );
};

export default DropdownExport;
