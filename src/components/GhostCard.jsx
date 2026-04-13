import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function GhostCard({ ghost, eliminated }) {
  const [expanded, setExpanded] = useState(false);
  const { t } = useTranslation();

  return (
    <div
      className={`ghost-card ${eliminated ? 'eliminated' : ''}`}
      onClick={() => setExpanded(!expanded)}
    >
      <div className="ghost-card-header">
        <h3>{t(`ghosts.${ghost.id}.name`)}</h3>
      </div>

      <div className="ghost-evidences">
        {ghost.evidences.map((evId) => (
          <span key={evId} className="evidence-tag">
            {t(`evidence.${evId}`)}
          </span>
        ))}
      </div>

      <p className="ghost-summary">{t(`ghosts.${ghost.id}.summary`)}</p>

      {expanded && (
        <div className="ghost-detail">
          <p>{t(`ghosts.${ghost.id}.detail`)}</p>
        </div>
      )}

      <span className="expand-hint">{expanded ? t('ghostCard.less') : t('ghostCard.detail')}</span>
    </div>
  );
}
