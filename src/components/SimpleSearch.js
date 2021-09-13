import { useState } from "react";

const SimpleSearch = ({ search }) => {
  const [filter, setFilter] = useState("");
  return (
    <div style={styles.main}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          search(filter);
        }}
      >
        <input
          type="search"
          style={styles.searchInput}
          placeholder="Search..."
          name="search"
          value={filter || ""}
          onChange={(e) => {
            //console.log(e.target.value);
            setFilter(e.target.value);
          }}
        />{" "}
        <button type="submit">Rechercher</button>
      </form>
    </div>
  );
};

const styles = {
  main: {
    textAlign: "center",
    padding: 10,
    marginBottom: 5,
  },
  searchInput: {
    padding: 5,
  },
};
export default SimpleSearch;
