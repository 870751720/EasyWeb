import React from 'react';
import { useRequest } from 'ahooks';
import './App.css';

const App: React.FC = () => {
  const { run, loading } = useRequest(
    async (username: string, password: string) => {
      const response = await fetch('/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      return response.json();
    },
    {
      manual: true,
    }
  );

  const handleRegister = async () => {
    const username = 'your_username';
    const password = 'your_password';
    const result = await run(username, password);
    console.log(result);
  };

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={handleRegister} disabled={loading}>
          {loading ? '注册中...' : '注册用户'}
        </button>
      </header>
    </div>
  );
};

export default App;