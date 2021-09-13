import React, { useMemo } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { isEmpty, result } from "lodash";
import { COLUMNS } from "./components/columns";
import api from "./api/axios";
import Table from "./components/Table";
import AddContact from "./components/AddContact";
import EditContact from "./components/EditContact";

function App() {
  // les colonnes de la table
  const columns = useMemo(() => COLUMNS, []);

  // We'll start our table without any data
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [pageCount, setPageCount] = React.useState(0);
  const fetchIdRef = React.useRef(0);

  // appel à l'api pour recupérer les données
  const retriveDataFromApi = (limit, page, filter, advanceFilter, sort) => {
    //console.log(advanceFilter);

    if (filter === undefined || filter.trim() === "") {
      if (isEmpty(advanceFilter)) {
        //console.log("hello null");
        return api.get(
          `/contacts?_limit=${limit}&_page=${page + 1}&_sort=${sort}&_order=asc`
        );
      } else {
        console.log(advanceFilter);
        return api.get(
          `/contacts?gender=${advanceFilter.gender}&country=${
            advanceFilter.country
          }&date_of_birth_gte=${advanceFilter.dob_begin}&date_of_birth_lte=${
            advanceFilter.dob_end
          }&_limit=${limit}&_page=${page + 1}`
        );
      }
    } else {
      return api.get(`/contacts?q=${filter}&_limit=${limit}&_page=${page + 1}`);
    }
  };

  // recherche simple
  const simpleSearch = (search) => {
    api.get(`/contacts?q=${search}`).then((response) => {
      setData(response.data);
    });
  };

  //ajout de contact
  const addContact = (newContact) => {
    //console.log(newContact)
    api
      .post("/contacts", newContact)
      .then((response) => {
        alert("contact " + response.data.first_name + " created succesfully");
        setData([...data, newContact]);
      })
      .catch((err) => alert("erreur lore de la création du contact"));
  };

  // modification de contact
  const editContact = (editedContact) => {
    //console.log(editedCOntact)
    api.put(`/contacts/${editedContact.id}`, editedContact).then((response) => {
      alert("contact updated successfully");
      const index = data.findIndex((data) => data.id === editedContact.id);
      const newData = [...data];
      newData[index] = editedContact;
      setData(newData);
    });
  };
  // suppression
  const deleteContact = (id) => {
    //console.log(id);
    if (window.confirm(`Supprimer le contact ${id} ?`)) {
      api
        .delete(`/contacts/${id}`)
        .then((response) => {
          alert("Contact deleted successfully");
          const index = data.findIndex((data) => data.id === id);
          const updatedData = [...data];
          updatedData.splice(index, 1);
          setData(updatedData);
        })
        .catch(() => alert("erreur lors de la suppression"));
    }
  };
  const deleteMultipleContact = (contacts) => {
    if (window.confirm(`Supprimer les contacts ${contacts}`)) {
      let promises = [];
      contacts.forEach((contact) => {
        promises.push(api.delete(`/contacts/${contact}`));
      });
      Promise.all(promises)
        .then((results) => {
          const deletedIndexes = [];

          let updatedData = [...data];

          for (let index = 0; index < contacts.length; index++) {
            console.log(contacts[index]);
            updatedData = updatedData.filter(
              (data) => data.id !== contacts[index]
            );
          }

          console.log(data);
          setData(updatedData);
          alert("contacts supprimés avec succés");
        })
        .catch(() => console.log("erreur"));
    }
  };
  const fetchData = React.useCallback(
    ({ pageSize, pageIndex, search, advancedSearch, sort }) => {
      const fetchId = ++fetchIdRef.current;

      // Set the loading state
      setLoading(true);
      retriveDataFromApi(
        pageSize,
        pageIndex,
        search,
        advancedSearch,
        sort
      ).then((response) => {
        //console.log(response);
        setData(response.data);
        setPageCount(Math.ceil(response.headers["x-total-count"] / pageSize));
        setLoading(false);
      });
    },
    []
  );

  // On retourne le composant Table
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => (
              <Table
                {...props}
                columns={columns}
                data={data}
                fetchData={fetchData}
                loading={loading}
                pageCount={pageCount}
                simpleSearch={simpleSearch}
                deleteContact={deleteContact}
                deleteMultiple={deleteMultipleContact}
              />
            )}
          />
          <Route
            exact
            path="/addContact"
            render={(props) => <AddContact addContact={addContact} />}
          />
          <Route
            exact
            path="/contacts/:id"
            render={(props) => <EditContact editContact={editContact} />}
          />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
