import { useTranslation } from 'react-i18next';
import { EVIDENCES } from '../data/ghosts';

const STATES = ['neutral', 'confirmed', 'ruled_out'];
const LABELS = { neutral: '', confirmed: '\u2713', ruled_out: '\u2717' };
const CLASSES = {
  neutral: 'evidence-btn',
  confirmed: 'evidence-btn confirmed',
  ruled_out: 'evidence-btn ruled-out',
};

export default function EvidencePanel({ evidenceFilters, onToggleEvidence, onReset }) {
  const { t } = useTranslation();

  return (
    <div className="evidence-panel">
      <h2>{t('evidence.title')}</h2>
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
              }}
              title={
                state === 'neutral'
                  ? t('evidence.tooltip_confirm')
                  : state === 'confirmed'
                  ? t('evidence.tooltip_discard')
                  : t('evidence.tooltip_reset')
              }
            >
              <span className="evidence-icon">{LABELS[state]}</span>
              <span className="evidence-name">{t(`evidence.${ev.id}`)}</span>
            </button>
          );
        })}
      </div>
      <button className="reset-btn" onClick={onReset}>
        {t('evidence.reset')}
      </button>
    </div>
  );
}
