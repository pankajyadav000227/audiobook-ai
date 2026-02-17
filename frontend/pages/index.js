'use client';

import { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function Home() {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [audiobook, setAudiobook] = useState(null);
  const [error, setError] = useState('');
  const [playing, setPlaying] = useState(false);

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!topic.trim()) {
      setError('Please enter a topic');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const response = await axios.post(`${API_BASE_URL}/api/generate`, {
        topic: topic,
      });
      
      setAudiobook(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to generate audiobook');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-8 shadow-lg">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">📚 AudioBook AI</h1>
          <p className="text-blue-100">Transform any topic into a professional audiobook</p>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Input Section */}
        <div className="bg-white rounded-lg shadow-xl p-8 mb-8">
          <form onSubmit={handleGenerate}>
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-3">
                What topic would you like to learn about?
              </label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., History of Space Exploration, Digital Marketing Basics..."
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition"
                disabled={loading}
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 transition transform hover:scale-105"
            >
              {loading ? 'Generating... ⏳' : '✨ Generate Audiobook'}
            </button>
          </form>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-8 rounded">
            <p className="font-semibold">Error</p>
            <p>{error}</p>
          </div>
        )}

        {/* Results Section */}
        {audiobook && (
          <div className="bg-white rounded-lg shadow-xl p-8">
            <div className="flex items-center mb-6">
              <h2 className="text-3xl font-bold text-gray-800 flex-1">{audiobook.title}</h2>
              <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold">Ready</span>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* Content Section */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Content Preview</h3>
                <div className="bg-gray-50 p-4 rounded-lg max-h-96 overflow-y-auto">
                  <p className="text-gray-700 leading-relaxed text-sm">{audiobook.content?.substring(0, 500)}...</p>
                </div>
              </div>

              {/* Audio Player */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Audio Player</h3>
                <div className="bg-gray-50 p-6 rounded-lg text-center">
                  {audiobook.audioUrl && (
                    <>
                      <audio
                        controls
                        className="w-full mb-4"
                        onPlay={() => setPlaying(true)}
                        onPause={() => setPlaying(false)}
                      >
                        <source src={audiobook.audioUrl} type="audio/mpeg" />
                        Your browser does not support the audio element.
                      </audio>
                      <p className="text-sm text-gray-600 mt-2">Duration: {audiobook.duration || 'N/A'}</p>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Metadata */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-gray-200">
              <div className="text-center">
                <p className="text-gray-600 text-sm">Words</p>
                <p className="text-2xl font-bold text-blue-600">{audiobook.wordCount || 0}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-600 text-sm">Chapters</p>
                <p className="text-2xl font-bold text-purple-600">{audiobook.chapters || 1}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-600 text-sm">Voice</p>
                <p className="text-2xl font-bold text-green-600">{audiobook.voice || 'Nova'}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-600 text-sm">Language</p>
                <p className="text-2xl font-bold text-orange-600">{audiobook.language || 'EN'}</p>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!audiobook && !loading && (
          <div className="bg-white rounded-lg shadow-xl p-12 text-center">
            <div className="text-6xl mb-4">🎧</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Create Your First Audiobook</h3>
            <p className="text-gray-600">Enter a topic above and let AI create an engaging audiobook for you!</p>
          </div>
        )}
      </div>
    </div>
  );
}
