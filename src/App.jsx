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

  const activeCount = Object.keys(evidenceFilters).length;

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-glow" />
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
          {activeCount > 0 && (
            <div className="active-filters">
              {activeCount} filtro{activeCount !== 1 ? 's' : ''} activo{activeCount !== 1 ? 's' : ''}
            </div>
          )}
        </aside>

        <main className="main-content">
          <div className="search-wrapper">
            <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              className="search-input"
              placeholder="Buscar fantasma..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <GhostGrid ghosts={ghosts} eliminatedIds={eliminatedIds} search={search} />
        </main>
      </div>
    </div>
  );
}
