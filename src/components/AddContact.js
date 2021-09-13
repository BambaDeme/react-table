import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./AddContact.css";
import ShortUniqueId from "short-unique-id";

function AddContact(props) {
  const uid = new ShortUniqueId({ length: 5 });
  const history = useHistory();
  const [formData, setFormData] = useState({
    id: uid(),
    first_name: "",
    last_name: "",
    email: "",
    date_of_birth: "",
    age: "",
    country: "",
    phone: "",
  });

  const handleFormChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    const value = event.target.value;

    const newFormData = { ...formData };
    newFormData[fieldName] = value;
    setFormData(newFormData);
    //console.log(formData)
  };

  const handleFormSublit = (event) => {
    event.preventDefault();
    //console.log(formData);
    props.addContact(formData);
    history.push("/");
  };
  return (
    <>
      <div className="div">
        <form onSubmit={(e) => handleFormSublit(e)}>
          <label>First Name</label>
          <input
            type="text"
            name="first_name"
            placeholder="Your name.."
            className="input"
            onChange={(e) => handleFormChange(e)}
          />

          <label>Last Name</label>
          <input
            type="text"
            name="last_name"
            placeholder="Your last name.."
            className="input"
            onChange={(e) => handleFormChange(e)}
          />

          <label>E-mail</label>
          <input
            type="email"
            name="email"
            placeholder="Your email.."
            className="input"
            onChange={(e) => handleFormChange(e)}
          />

          <label>Date of Birth</label>
          <input
            type="date"
            name="date_of_birth"
            className="input"
            onChange={(e) => handleFormChange(e)}
          />

          <label>Age</label>
          <input
            type="number"
            min="18"
            name="age"
            className="input"
            onChange={(e) => handleFormChange(e)}
          />
          <label>Country</label>
          <select
            id="country"
            name="country"
            className="select"
            onChange={(e) => handleFormChange(e)}
          >
            <option>Choose a country</option>
            <option value="australia">Australia</option>
            <option value="canada">Canada</option>
            <option value="usa">USA</option>
          </select>

          <label>Phone Number</label>
          <input
            type="phone"
            name="phone"
            className="input"
            onChange={(e) => handleFormChange(e)}
          />

          <input type="submit" value="Submit" className="submitInput" />
        </form>
      </div>
      <Link to="/">
        <button className="button">Retour</button>
      </Link>
    </>
  );
}

export default AddContact;
