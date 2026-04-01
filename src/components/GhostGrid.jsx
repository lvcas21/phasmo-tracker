import GhostCard from './GhostCard';

export default function GhostGrid({ ghosts, eliminatedIds, search }) {
  const term = search.toLowerCase();
  const matched = ghosts.filter(
    (g) => g.name.toLowerCase().includes(term) || g.nameEn.toLowerCase().includes(term)
  );
  const visible = matched.filter((g) => !eliminatedIds.has(g.id));
  const eliminated = matched.filter((g) => eliminatedIds.has(g.id));

  return (
    <div className="ghost-grid-wrapper">
      <div className="ghost-count">
        <strong>{visible.length}</strong> fantasma{visible.length !== 1 ? 's' : ''} posible{visible.length !== 1 ? 's' : ''}
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
