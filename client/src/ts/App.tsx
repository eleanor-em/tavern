import React, { useState, useEffect } from 'react';
import '../css/App.css';
import Landing from './Landing';
import api from './api';

const email = 'elmcmurtry1@gmail.com';
const password = 'password';

function App() {
  const [page, setPage] = useState((<p>please wait...</p>));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await api.authenticate(email, password);
        setPage((
          <Landing user={data} />
        ));
      } catch (error) {
        console.error(error);
        alert(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>{page}</div>
  );
}

export default App;
