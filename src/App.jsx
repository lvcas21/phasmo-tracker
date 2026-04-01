import { useState, useMemo } from 'react';
import { ghosts } from './data/ghosts';
import EvidencePanel from './components/EvidencePanel';
import GhostGrid from './components/GhostGrid';
import './App.css';

export default function App() {
  const [evidenceFilters, setEvidenceFilters] = useState({});
  const [search, setSearch] = useState('');

  const handleToggleEvidence = (id, state) => {
    setEvidenceFilters((prev) => {
      const next = { ...prev };
      if (state === 'neutral') {
        delete next[id];
      } else {
        next[id] = state;
      }
      return next;
    });
  };

  const handleReset = () => {
    setEvidenceFilters({});
    setSearch('');
  };

  const eliminatedIds = useMemo(() => {
    const eliminated = new Set();

    ghosts.forEach((ghost) => {
      for (const [evId, state] of Object.entries(evidenceFilters)) {
        if (state === 'confirmed' && !ghost.evidences.includes(evId)) {
          eliminated.add(ghost.id);
          return;
        }
        if (state === 'ruled_out' && ghost.evidences.includes(evId)) {
          eliminated.add(ghost.id);
          return;
        }
      }
    });

    return eliminated;
  }, [evidenceFilters]);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Phasmo Tracker</h1>
        <p>Identifica al fantasma descartando opciones</p>
      </header>

      <div className="app-layout">
        <aside className="sidebar">
          <EvidencePanel
            evidenceFilters={evidenceFilters}
            onToggleEvidence={handleToggleEvidence}
            onReset={handleReset}
          />
        </aside>

        <main className="main-content">
          <input
            type="text"
            className="search-input"
            placeholder="Buscar fantasma..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <GhostGrid ghosts={ghosts} eliminatedIds={eliminatedIds} search={search} />
        </main>
      </div>
    </div>
  );
}
