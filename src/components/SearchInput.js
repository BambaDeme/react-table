import React, { useState } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import * as Icon from "react-bootstrap-icons";
import { Button, Form } from "react-bootstrap";

const SearchInput = ({ search }) => {
  const [filter, setFilter] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        search(filter);
        //console.log("hello there !!!");
      }}
      style={{ flex: 2 }}
    >
      <InputGroup className="">
        <Button variant="outline-info" id="button-addon1" type="submit">
          <Icon.Search />
        </Button>

        <FormControl
          placeholder="Search for names ...."
          aria-label=""
          aria-describedby="basic-addon1"
          value={filter || ""}
          onChange={(e) => {
            //console.log(e.target.value);
            setFilter(e.target.value);
            //console.log(filter);
          }}
        />
      </InputGroup>
    </form>
  );
};

export default SearchInput;
