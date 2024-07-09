import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useParams } from 'react-router-dom';
import './App.css';

const API_URL = 'http://api.alquran.cloud/v1/quran/en.asad';

function App() {
  const [surahs, setSurahs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API_URL)
      .then(response => response.json())
      .then(data => {
        setSurahs(data.data.surahs);
        setLoading(false);
      });
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<SurahList surahs={surahs} loading={loading} />} />
          <Route path="/surah/:number" element={<Surah />} />
        </Routes>
      </div>
    </Router>
  );
}

function SurahList({ surahs, loading }) {
  return (
    <div>
      <h1>Quran Surahs</h1>
      {loading ? <p>Loading...</p> : (
        <ul className="surah-list">
          {surahs.map(surah => (
            <li key={surah.number}>
              <Link to={`/surah/${surah.number}`}>
                {surah.number}. {surah.englishName}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Surah() {
  const { number } = useParams();
  const [ayahs, setAyahs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://api.alquran.cloud/v1/surah/${number}/en.asad`)
      .then(response => response.json())
      .then(data => {
        setAyahs(data.data.ayahs);
        setLoading(false);
      });
  }, [number]);

  return (
    <div>
      <h1>Ayahs</h1>
      {loading ? <p>Loading...</p> : (
        <ul className="ayah-list">
          {ayahs.map(ayah => (
            <li key={ayah.numberInSurah}>
              {ayah.numberInSurah}. {ayah.text}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
