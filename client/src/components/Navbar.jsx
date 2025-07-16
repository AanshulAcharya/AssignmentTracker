// src/components/Navbar.js
import React, { useState, useRef, useEffect } from 'react';

function Navbar({ searchQuery, setSearchQuery }) {
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const searchRef = useRef(null); // Reference to the search area

  // Toggle the search bar
  const toggleMobileSearch = () => {
    setShowMobileSearch((prev) => !prev);
  };

  // Detect outside click to close the mobile search bar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target) &&
        !event.target.closest('.btn-toggle-search') // Prevents immediate close on icon click
      ) {
        setShowMobileSearch(false);
      }
    };

    if (showMobileSearch) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMobileSearch]);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
        <a className="navbar-brand" href="#"><i class="bi bi-journal"></i> Assignment Tracker</a>

        {/* Large screen: full search bar */}
        <form className="d-none d-lg-flex ms-auto" role="search">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="btn btn-outline-success" type="submit">
            <i className="bi bi-search"></i>
          </button>
        </form>

        {/* Small screen: search icon button */}
        <button
          className="btn btn-outline-primary d-lg-none ms-auto btn-toggle-search"
          onClick={toggleMobileSearch}
        >
          <i className="bi bi-search"></i>
        </button>
      </nav>

      {/* Small screen: search input below navbar */}
      {showMobileSearch && (
        <div
          ref={searchRef}
          className="bg-light p-3 d-lg-none border-top"
        >
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search..."
              aria-label="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      )}
    </>
  );
}


export default Navbar;