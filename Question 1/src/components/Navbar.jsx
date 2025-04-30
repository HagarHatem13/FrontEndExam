import React from 'react';

const Navbar = ({ search, setSearch, onAdd }) => (
  <div className="flex justify-between mb-4">
    <input
      className="border px-2 py-1 rounded w-1/2"
      placeholder="Search..."
      value={search}
      onChange={e => setSearch(e.target.value)}
    />
    <button onClick={onAdd}
      className="bg-blue-500 text-white px-4 py-2 rounded">+ Add</button>
  </div>
);

export default Navbar;