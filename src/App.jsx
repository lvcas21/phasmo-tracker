import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ghosts } from './data/ghosts';
import EvidencePanel from './components/EvidencePanel';
import GhostGrid from './components/GhostGrid';
import LanguageSelector from './components/LanguageSelector';
import './App.css';

export default function App() {
  const { t } = useTranslation();
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
        <div className="header-glow-clip">
          <div className="header-glow" />
        </div>
        <LanguageSelector />
        <h1>{t('header.title')}</h1>
        <p>{t('header.subtitle')}</p>
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
              {t('filters.active', { count: activeCount })}
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
              placeholder={t('search.placeholder')}
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
