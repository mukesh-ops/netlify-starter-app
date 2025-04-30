import { useState } from 'react';
import './App.css';

function App() {
  const [prompt, setPrompt] = useState('');
  const [siteUrl, setSiteUrl] = useState('');
  const [wpKey, setWpKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const handleGenerate = async () => {
    setLoading(true);
    const res = await fetch('https://your-backend-url.com/api/generate-site', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
        siteUrl,
        wpKey,
      }),
    });

    const data = await res.json();
    setResponse(data);
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
      <input
        type="text"
        placeholder="Your WordPress site URL"
        value={siteUrl}
        onChange={(e) => setSiteUrl(e.target.value)}
      />
      <input
        type="password"
        placeholder="WP Application Password of the site"
        value={wpKey}
        onChange={(e) => setWpKey(e.target.value)}
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
