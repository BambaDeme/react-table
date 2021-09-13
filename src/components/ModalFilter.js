import React, { useState } from "react";
import { useEffect } from "react";
import SearchInput from "./SearchInput";
import api from "../api/axios";
import ShortUniqueId from "short-unique-id";

import "../styles/ModalFilter.css";
const ModalFilter = ({ advancedSearch }) => {
  const [form, setForm] = useState({
    gender: "",
    country: "",
    dob_begin: "",
    dob_end: "",
  });

  const [filters, setFilters] = useState([]);

  useEffect(() => {
    api.get("/filtres").then((results) => {
      console.log(results);
      setFilters(results.data);
    });
  }, []);

  const handleformChange = (e) => {
    const fieldName = e.target.getAttribute("name");
    //setForm({ fieldName: e.target.value });
    const formChange = { ...form };
    formChange[fieldName] = e.target.value;
    setForm(formChange);
    //console.log(form);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    //console.log(form);
    /*if (
      form.prenom.trim() === "" &&
      form.nom.trim() === "" &&
      form.telephone.trim() === ""
    ) {
      alert("fill in  at least one field");
    } else {
      
      advancedSearch(form);
      setForm({
        prenom: "",
        nom: "",
        telephone: "",
      });
    }*/
    advancedSearch(form);
    setForm({
      gender: "",
      country: "",
      dob_begin: "",
      dob_end: "",
    });

    document.getElementById("close").click();
    /*document.getElementById("myModal").classList.remove("show", "d-block");
    document
      .querySelectorAll(".modal-backdrop")
      .forEach((el) => el.classList.remove("modal-backdrop"));*/
  };
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // gére l'enregistrement d'un filtre
  const enregistrerFiltre = (e) => {
    e.preventDefault();
    let filterName = prompt("le nom à donner au filtre : ");
    const newFilter = form;
    newFilter["title"] = filterName;
    const uid = new ShortUniqueId({ length: 5 });
    newFilter["id"] = uid();
    console.log(newFilter);
    api.post("filtres", newFilter).then((results) => {
      alert(`filtre enregistré`);
      setFilters([...filters, newFilter]);
    });
  };

  // gére le choix d'un filtre
  const handleFilterClick = (filtre) => {
    setForm({
      gender: filtre.gender,
      country: filtre.country,
      dob_begin: filtre.dob_begin,
      dob_end: filtre.dob_end,
    });
  };

  return (
    <div style={{ marginRight: 10, marginLeft: 20 }}>
      <button
        type="button"
        className="btn btn-custom"
        data-toggle="modal"
        data-target="#myModal"
        onClick={handleShow}
      >
        <div className="btn-content">
          <i className="bi bi-funnel"></i>
          Filtres
        </div>
      </button>
      <div className="modal fade" id="myModal">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Filtres</h4>
              <button
                type="button"
                className="close"
                id="close"
                data-dismiss="modal"
              >
                &times;
              </button>
            </div>

            <div className="modal-body">
              <div>
                <h6>Mes filtres : </h6>
                {filters.map((filter) => (
                  <span
                    className="filtre"
                    onClick={() => handleFilterClick(filter)}
                  >
                    {filter.title}
                  </span>
                ))}
              </div>
              <form
                onSubmit={(e) => {
                  handleFormSubmit(e);
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "80%",
                    margin: "auto",
                    marginBottom: 10,
                  }}
                >
                  <div>
                    <label>Gender: </label>{" "}
                    <select
                      class=""
                      name="gender"
                      onChange={(e) => handleformChange(e)}
                      value={form.gender}
                    >
                      <option value="none">gender ...</option>
                      <option>Male</option>
                      <option>Female</option>
                    </select>
                  </div>

                  <div>
                    <label>Country: </label>{" "}
                    <select
                      class=" "
                      name="country"
                      onChange={(e) => handleformChange(e)}
                      value={form.country}
                    >
                      <option value="none">select a country</option>
                      <option value="USA">USA</option>
                      <option value="China">China</option>
                      <option value="Canada">Canada</option>
                    </select>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    width: "80%",
                    margin: "auto",
                    marginBottom: 10,
                  }}
                >
                  <div style={{ marginBottom: 10 }}>Date of birth: </div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div className="date">
                      <label>From: </label>
                      <input
                        className="form-control"
                        type="date"
                        name="dob_begin"
                        onChange={(e) => handleformChange(e)}
                        value={form.dob_begin}
                      />
                    </div>
                    <div className="date">
                      <label>To: </label>
                      <input
                        className="form-control"
                        type="date"
                        name="dob_end"
                        onChange={(e) => handleformChange(e)}
                        value={form.dob_end}
                      />
                    </div>
                  </div>
                </div>

                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <button className="btn btn-custom" type="submit">
                    Appliquer
                  </button>
                  <button
                    className="btn btn-custom"
                    onClick={(e) => enregistrerFiltre(e)}
                  >
                    Enregistrer
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalFilter;
