import React, { useEffect, useState } from 'react';

const Leads = () => {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/leads')
      .then((response) => response.json())
      .then((data) => setLeads(data))
      .catch((error) => console.error('Error:', error));
  }, []);

  return (
    <div>
      <h2>Leads</h2>
      <ul>
        {leads.map((lead) => (
          <li key={lead._id}>{lead.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Leads;
