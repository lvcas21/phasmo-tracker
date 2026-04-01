import GhostCard from './GhostCard';

export default function GhostGrid({ ghosts, eliminatedIds }) {
  const visible = ghosts.filter((g) => !eliminatedIds.has(g.id));
  const eliminated = ghosts.filter((g) => eliminatedIds.has(g.id));

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
