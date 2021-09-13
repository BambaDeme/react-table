import { useLocation, Link, useHistory } from "react-router-dom";
import { useState } from "react";
//import moment from "moment"
import "./AddContact.css";
const EditContact = (props) => {
  const location = useLocation();
  const history = useHistory();
  const contact = location.state.contact;
  //console.log(moment(contact.date_of_birth).format("mm-dd-yyyy"))
  const [formData, setFormData] = useState({
    id: contact.id,
    first_name: contact.first_name,
    last_name: contact.last_name,
    email: contact.email,
    date_of_birth: contact.date_of_birth,
    age: contact.age,
    country: contact.country,
    phone: contact.phone,
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
    props.editContact(formData);
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
            defaultValue={formData.first_name}
          />

          <label>Last Name</label>
          <input
            type="text"
            name="last_name"
            placeholder="Your last name.."
            className="input"
            onChange={(e) => handleFormChange(e)}
            defaultValue={formData.last_name}
          />

          <label>E-mail</label>
          <input
            type="email"
            name="email"
            placeholder="Your email.."
            className="input"
            onChange={(e) => handleFormChange(e)}
            defaultValue={formData.email}
          />

          <label>Date of Birth</label>
          <input
            type="date"
            name="date_of_birth"
            className="input"
            onChange={(e) => handleFormChange(e)}
            defaultValue={formData.date_of_birth}
          />

          <label>Age</label>
          <input
            type="number"
            min="18"
            name="age"
            className="input"
            onChange={(e) => handleFormChange(e)}
            defaultValue={formData.age}
          />
          <label>Country</label>
          <select
            id="country"
            name="country"
            className="select"
            onChange={(e) => handleFormChange(e)}
            defaultChecked={formData.country}
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
            defaultValue={formData.phone}
          />

          <input type="submit" value="Submit" className="submitInput" />
        </form>
      </div>
      <Link to="/">
        <button className="button">Retour</button>
      </Link>
    </>
  );
};

export default EditContact;
