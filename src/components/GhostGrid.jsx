import { useTranslation } from 'react-i18next';
import GhostCard from './GhostCard';

export default function GhostGrid({ ghosts, eliminatedIds, search }) {
  const { t } = useTranslation();
  const term = search.toLowerCase();

  const matched = ghosts.filter((g) => {
    const name = t(`ghosts.${g.id}.name`).toLowerCase();
    return name.includes(term);
  });

  const visible = matched.filter((g) => !eliminatedIds.has(g.id));
  const eliminated = matched.filter((g) => eliminatedIds.has(g.id));

  return (
    <div className="ghost-grid-wrapper">
      <div className="ghost-count">
        {t('ghostGrid.possible', { count: visible.length })}
      </div>
      <div className="ghost-grid">
        {visible.map((ghost) => (
          <GhostCard key={ghost.id} ghost={ghost} eliminated={false} />
        ))}
        {eliminated.map((ghost) => (
          <GhostCard key={ghost.id} ghost={ghost} eliminated={true} />
        ))}
      </div>
    </div>
  );
}
