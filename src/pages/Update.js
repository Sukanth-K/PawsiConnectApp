import React, { useEffect, useState } from 'react';
import MapComponent from './MapComponent';

import supabase from "../config/supabaseClient"

const Update = () => {
  //console.log(supabase)
  const [map, setMap] = useState(null);
  const [watchId, setWatchId] = useState(null);
  
  return (
    <div className="page home">
      <h2>Home</h2>
      <div id="map" style={{ width: '500px', height: '500px' }}></div>
      <MapComponent />
    </div>
  );
};

export default Update;
