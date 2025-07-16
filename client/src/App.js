import React, { useEffect, useState } from 'react';
import Header from './components/Navbar';
import SessionManager from './components/SessionManger';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  return (
    <div>
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <SessionManager searchQuery={searchQuery} />

    </div>
  )
}

export default App;