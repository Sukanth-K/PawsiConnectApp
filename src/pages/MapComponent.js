import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const apiKey = `https://maps.googleapis.com/maps/api/js?key=&callback=initMap`; // Replace with your Google Maps API key

const MapComponent = () => {
  const [map, setMap] = useState(null);
  const [watchId, setWatchId] = useState(null);
  const [details, setDetails] = useState('');
  const [formError, setFormError] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const supabaseUrl = 'https://ywnwijqxsujnqsaclcqt.supabase.co/';
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl3bndpanF4c3VqbnFzYWNsY3F0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODg1NTQyNjMsImV4cCI6MjAwNDEzMDI2M30.Aq88brQwByj2teCP8vZVwErCITyaYoGm0uB3gA2qSRM'

  const supabase = createClient(supabaseUrl, supabaseKey);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!details) {
      setFormError('Error');
      return;
    }

    if (latitude === null || longitude === null) {
      console.log('Location data not available');
      return;
    }

    const updates = {
      latitude: latitude.toString(),
      longitude: longitude.toString(),
      created_at: new Date().toISOString(),
    };

    try {
      const id = window.location.href.match(/\/([^/]+)\/update$/)?.[1]; // Extract the id from the URL using regex
      if (!id) {
        console.log('Invalid URL');
        return;
      }

      const { error } = await supabase.from(id).upsert(updates); // Use the id as the table name

      if (error) {
        console.log(error);
        setFormError('Please fill in all the fields correctly');
      } else {
        setFormError(null);
      }
    } catch (error) {
      console.log(error);
      setFormError('An error occurred while updating the location');
    }
  };

  const successCallback = (position) => {
    const { latitude, longitude } = position.coords;
    setLatitude(latitude);
    setLongitude(longitude);
    const currentTime = new Date().toLocaleTimeString();

    const detailsContent = `Last Location of the dog
      Latitude: ${latitude} | Longitude: ${longitude}
      Time: ${currentTime}`;

    setDetails(detailsContent);

    if (map) {
      const location = { lat: latitude, lng: longitude };
      map.setCenter(location);
      new window.google.maps.Marker({
        position: location,
        map: map,
      });
    }
  };

  const errorCallback = (error) => {
    console.log('Error occurred: ' + error.code);
  };

  const options = {};

  const initMap = () => {
    if (window.google && window.google.maps) {
      const mapInstance = new window.google.maps.Map(document.getElementById('map'), {
        zoom: 15,
      });
      setMap(mapInstance);
    } else {
      console.error('Google Maps API not loaded.');
    }
  };

  const updateLocation = () => {
    if (watchId) {
      navigator.geolocation.clearWatch(watchId);
    }

    const newWatchId = navigator.geolocation.watchPosition(successCallback, errorCallback, options);
    setWatchId(newWatchId);
  };

  useEffect(() => {
    const loadGoogleMapsAPI = () => {
      if (!window.google || !window.google.maps) {
        const script = document.createElement('script');
        script.src = apiKey;
        script.defer = true;
        script.async = true;
        script.onload = () => {
          initMap();
        };
        document.head.appendChild(script);
      } else {
        initMap();
      }
    };

    loadGoogleMapsAPI();

    navigator.geolocation.getCurrentPosition(successCallback, errorCallback, options);

    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, []);

  return (
    <div>
      <div id="details">{details}</div>
      <form onSubmit={handleSubmit}>
        <button type="submit" onClick={updateLocation}>
          Click to Update Location
        </button>
      </form>
      <div id="map" style={{ width: '100%', height: '400px' }}></div>
    </div>
  );
};

export default MapComponent;
