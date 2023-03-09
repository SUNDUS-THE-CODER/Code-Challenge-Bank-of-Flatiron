import React from "react";

function Search({ setFilter }) {
  return (
    <div className="ui large fluid icon input">
      <input
        type="text"
        placeholder="Search transaction by ID, date, description, category or amount"
        onChange={(ev) => setFilter(ev.target.value)}
      />
      <i className="circular search link icon"></i>
    </div>
  );
}

export default Search;
