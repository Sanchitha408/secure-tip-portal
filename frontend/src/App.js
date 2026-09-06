import { useState } from 'react';

function App() {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus('');
    try {
      const res = await fetch('http://localhost:5000/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, message }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setTitle('');
        setMessage('');
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col">
      <header className="border-b border-neutral-800 px-8 py-6">
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
          <span className="text-sm tracking-widest uppercase text-neutral-400">Secure Tip Line</span>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-6">
        <div className="max-w-lg w-full">
          <h1 className="text-3xl font-semibold mb-3 tracking-tight">
            Submit information securely
          </h1>
          <p className="text-neutral-400 mb-10 leading-relaxed">
            Your submission is encrypted before it leaves your browser.
            We do not log IP addresses or require any identifying information.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-neutral-500 mb-2">
                Title
              </label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3
                           text-neutral-100 placeholder-neutral-600 focus:outline-none
                           focus:border-emerald-600 transition-colors"
                placeholder="Brief subject line"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-neutral-500 mb-2">
                Message
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={8}
                className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3
                           text-neutral-100 placeholder-neutral-600 focus:outline-none
                           focus:border-emerald-600 transition-colors resize-none"
                placeholder="Describe what you want to report..."
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-700 hover:bg-emerald-600 disabled:opacity-50
                         text-white font-medium py-3 rounded-lg transition-colors"
            >
              {loading ? 'Encrypting & submitting...' : 'Submit Securely'}
            </button>
          </form>

          {status === 'success' && (
            <p className="mt-6 text-emerald-500 text-sm">
              ✓ Submission received. Thank you for your report.
            </p>
          )}
          {status === 'error' && (
            <p className="mt-6 text-red-500 text-sm">
              Something went wrong. Please try again.
            </p>
          )}
        </div>
      </main>

      <footer className="border-t border-neutral-800 px-8 py-4">
        <p className="max-w-3xl mx-auto text-xs text-neutral-600">
          For maximum anonymity, use Tor Browser. This site does not use tracking scripts or third-party analytics.
        </p>
      </footer>
    </div>
  );
}

export default App;
