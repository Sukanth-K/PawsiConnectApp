import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useParams } from 'react-router-dom';

const supabaseUrl = 'https://ywnwijqxsujnqsaclcqt.supabase.co/';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl3bndpanF4c3VqbnFzYWNsY3F0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODg1NTQyNjMsImV4cCI6MjAwNDEzMDI2M30.Aq88brQwByj2teCP8vZVwErCITyaYoGm0uB3gA2qSRM'; // Replace with your Supabase API key

const supabase = createClient(supabaseUrl, supabaseKey);

const AnimalDetails = () => {
  const [animalDetails, setAnimalDetails] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchAnimalDetails = async () => {
      try {
        const { data, error } = await supabase
          .from('AnimalDetails')
          .select('*')
          .eq('id', id)
          .limit(1);

        if (error) {
          console.error(error);
        } else {
          setAnimalDetails(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchAnimalDetails();
  }, [id]);

  return (
    <div className="page">
      <h2>Animal Details</h2>
      <div>
        {animalDetails.map((animal) => (
          <div key={animal.id}>
            <h3>ID: {animal.id}</h3>
            <p>Name of the Animal: {animal['Name of the Animal']}</p>
            <p>Animal Type: {animal['Animal Type']}</p>
            <p>Type: {animal.Type}</p>
            <p>Breed: {animal.Breed}</p>
            <p>Age: {animal.Age}</p>
            <p>Markings: {animal.Markings}</p>
            {animal['Image URL'] && (
              <img
                src={animal['Image URL']}
                alt={`Image of ${animal['Name of the Animal']}`}
                style={{ maxWidth: '25%', height: 'auto' }}
              />
            )}
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimalDetails;
