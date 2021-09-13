import { useState } from "react";

const AdvanceSearch = ({ advancedSearch }) => {
  const [form, setForm] = useState({
    prenom: "",
    nom: "",
    telephone: "",
  });

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
    //console.log(e.target.prenom.value);
    if (
      form.prenom.trim() === "" &&
      form.nom.trim() === "" &&
      form.telephone.trim() === ""
    ) {
      alert("fill in  at least one field");
    } else {
      //console.log(form);
      advancedSearch(form);
    }
  };
  return (
    <div style={styles.main}>
      <form
        onSubmit={(e) => {
          handleFormSubmit(e);
        }}
      >
        <input
          type="text"
          placeholder="prenom..."
          name="prenom"
          value={form.prenom}
          onChange={(e) => handleformChange(e)}
        />
        <input
          type="text"
          placeholder="nom..."
          name="nom"
          value={form.nom}
          onChange={(e) => handleformChange(e)}
        />
        <input
          type="text"
          placeholder="telephone..."
          name="telephone"
          value={form.telephone}
          onChange={(e) => handleformChange(e)}
        />

        <button type="submit">Recherche Avancé</button>
      </form>
    </div>
  );
};

const styles = {
  main: {
    textAlign: "center",
    padding: 10,
    marginBottom: 10,
  },
};

/*

UseEffect si l'advance search change
*/
export default AdvanceSearch;
