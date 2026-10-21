import React, { useState } from "react";

import "./SearchBar.css";

export default function SearchBar({
  isSearchBarOpen,
  setSearchBarOpen,
}) {
  const [searchValue, setSearchValue] = useState("");

  function toggleSearchBar() {
    setSearchValue("");
    setSearchBarOpen(false);
  }

  return (
    <>
      {isSearchBarOpen && (
        <div className="search__bar">
          <button
            className="search__button"
            disabled={!searchValue}
          >
            <i className="bi bi-search"></i>
          </button>
          <input
            value={searchValue}
            className="search__input"
            type="text"
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search..."
          />

          <button
            className="cancel__button"
            onClick={() => {
              toggleSearchBar();
            }}
          >
            <i className="bi bi-x-lg"></i>
          </button>
        </div>
      )}
    </>
  );
}
