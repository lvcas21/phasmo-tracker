import { EVIDENCES } from '../data/ghosts';

const STATES = ['neutral', 'confirmed', 'ruled_out'];
const LABELS = { neutral: '', confirmed: '\u2713', ruled_out: '\u2717' };
const CLASSES = {
  neutral: 'evidence-btn',
  confirmed: 'evidence-btn confirmed',
  ruled_out: 'evidence-btn ruled-out',
};

export default function EvidencePanel({ evidenceFilters, onToggleEvidence, onReset }) {
  return (
    <div className="evidence-panel">
      <h2>Evidencias</h2>
      <div className="evidence-list">
        {EVIDENCES.map((ev) => {
          const state = evidenceFilters[ev.id] || 'neutral';
          return (
            <button
              key={ev.id}
              className={CLASSES[state]}
              onClick={() => {
                const idx = STATES.indexOf(state);
                const next = STATES[(idx + 1) % STATES.length];
                onToggleEvidence(ev.id, next);
              }}ø
              title={
                state === 'neutral'
                  ? 'Click: confirmar'
                  : state === 'confirmed'
                  ? 'Click: descartar'
                  : 'Click: resetear'
              }
            >
              <span className="evidence-icon">{LABELS[state]}</span>
              <span className="evidence-name">{ev.name}</span>
            </button>
          );
        })}
      </div>
      <button className="reset-btn" onClick={onReset}>
        Resetear todo
      </button>
    </div>
  );
}
