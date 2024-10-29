import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MyComponent = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchdata() {
      // GET 요청
      // var url = 'https://jsonplaceholder.typicode.com/users';
      var url = '/public_data.json';
      axios({
        method: 'get',
        url: url,
        headers: { 
          Authorization: 'token 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'
        }
      })
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
    }

    fetchdata();
  }, []);
  
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