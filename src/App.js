import React from 'react';
import { BrowserRouter, Routes, Route, Link, useParams, useLocation } from 'react-router-dom';

// pages
import Home from './pages/Home';
import LastLocation from './pages/LastLocation';
import Create from './pages/Create';
import Update from './pages/Update';
import OwnerDetails from './pages/OwnerDetails';
import AnimalDetails from './pages/AnimalDetails';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <h1>PawsiConnect</h1>
        <UserLink to="/update" label="Update Current Location" />
        <UserLink to="/last-location" label="Last Seen Locations" />
        <UserLink to="/animal-details" label="Animal Details" />
        <UserLink to="/owner-details" label="Owner Details" />
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/last-location" element={<LastLocation />} />
        <Route path="/create" element={<Create />} />
        <Route path="/:id/update" element={<Update />} />
        <Route path="/owner-details" element={<OwnerDetails />} />
        <Route path="/animal-details" element={<AnimalDetails />} />
        <Route path="/:id/*" element={<UserPage />} />
      </Routes>
    </BrowserRouter>
  );
}

function UserLink({ to, label }) {
  const location = useLocation();
  const id = location.pathname.split('/')[1]; // Extract the ID from the current path
  const firstCharacter = id.charAt(0);
  const match = location.pathname.startsWith(`/${firstCharacter}${to}`);

  return (
    <Link to={`/${firstCharacter}${to}`} className={match ? 'active' : ''}>
      {label}
    </Link>
  );
}

function UserPage() {
  const { id } = useParams();
  const location = useLocation();
  const firstCharacter = id.charAt(0);
  const page = location.pathname.replace(`/${firstCharacter}`, '');

  switch (page) {
    case '/last-location':
      return <LastLocation userId={firstCharacter} />;
    case '/create':
      return <Create userId={firstCharacter} />;
    case '/owner-details':
      return <OwnerDetails userId={firstCharacter} />;
    case '/animal-details':
      return <AnimalDetails userId={firstCharacter} />;
    default:
      return <h2>User ID: {firstCharacter}</h2>;
  }
}

export default App;
