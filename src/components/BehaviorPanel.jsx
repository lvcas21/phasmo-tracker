import { BEHAVIORS } from '../data/ghosts';

export default function BehaviorPanel({ activeBehaviors, onToggleBehavior }) {
  return (
    <div className="behavior-panel">
      <h2>Comportamientos observados</h2>
      <div className="behavior-list">
        {BEHAVIORS.map((b) => (
          <label key={b.id} className="behavior-item">
            <input
              type="checkbox"
              checked={activeBehaviors.includes(b.id)}
              onChange={() => onToggleBehavior(b.id)}
            />
            <span>{b.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
