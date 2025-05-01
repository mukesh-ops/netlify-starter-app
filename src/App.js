import { useState } from 'react';
import './App.css';

function App() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const handleGenerate = async () => {
    setLoading(true);
    setResponse(null);

    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      setResponse(data);
    } catch (err) {
      setResponse({ error: 'Failed to connect to backend.' });
    }

    setLoading(false);
  };

  return (
    <div className="app">
      <h1>AI WordPress Site Generator</h1>

      <textarea
        placeholder="Describe the website you want..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <button onClick={handleGenerate} disabled={loading}>
        {loading ? 'Generating...' : 'Generate Website'}
      </button>

      {response && (
        <div className="response">
          <h2>Result:</h2>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
