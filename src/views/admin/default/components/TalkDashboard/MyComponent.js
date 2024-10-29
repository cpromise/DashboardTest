import React, { useState, useEffect } from 'react';

const MyComponent = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Authorization': 'token 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',
    };

    // Fetch the JSON data when the component mounts with headers
    fetch('/public_data.json', {
      method: 'GET', // Optional, defaults to 'GET'
      headers: headers,
    })
      .then((response) => {
        if (!response.ok) {
          console.log("fetch error");
          throw new Error('Network response was not ok');
        }
        console.log("response ", response);
        return response.json();
      })
      .then((jsonData) => {
        setData(jsonData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []); // Empty dependency array to run only once on mount

  if (!data) {
    return <div>Loading...</div>; // Show a loading message while data is being fetched
  }

  return (
    <div>
      <h1>Data from JSON</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default MyComponent;