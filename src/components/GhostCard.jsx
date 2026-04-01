import { useState } from 'react';
import { EVIDENCES, BEHAVIORS } from '../data/ghosts';

const evidenceMap = Object.fromEntries(EVIDENCES.map((e) => [e.id, e.name]));
const behaviorMap = Object.fromEntries(BEHAVIORS.map((b) => [b.id, b.label]));

export default function GhostCard({ ghost, eliminated }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`ghost-card ${eliminated ? 'eliminated' : ''}`}
      onClick={() => setExpanded(!expanded)}
    >
      <div className="ghost-card-header">
        <h3>{ghost.name}</h3>
        <span className="ghost-name-en">{ghost.nameEn}</span>
      </div>

      <div className="ghost-evidences">
        {ghost.evidences.map((evId) => (
          <span key={evId} className="evidence-tag">
            {evidenceMap[evId]}
          </span>
        ))}
      </div>

      <p className="ghost-summary">{ghost.summary}</p>

      {expanded && (
        <div className="ghost-detail">
          <p>{ghost.detail}</p>
          {ghost.behaviors.length > 0 && (
            <div className="ghost-behaviors">
              <strong>Pistas clave:</strong>
              <ul>
                {ghost.behaviors.map((bId) => (
                  <li key={bId}>{behaviorMap[bId]}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <span className="expand-hint">{expanded ? 'Menos' : 'Detalle'}</span>
    </div>
  );
}
