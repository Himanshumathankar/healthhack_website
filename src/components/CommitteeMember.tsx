import { useState } from 'react';
import type { Person } from '../data/event';
import './CommitteeMember.css';

export default function CommitteeMember({ person }: { person: Person }) {
  const [imageFailed, setImageFailed] = useState(false);
  const words = person.name.replace(/^(Hon[’']ble\s+)?(Dr\.|Ms\.|Mr\.)\s+/i, '').split(/\s+/);
  const initials = [words[0], words[words.length - 1]].map(word => word[0]).join('');
  const portrait = person.portrait;

  return <article className="person committee-member reveal" tabIndex={0}>
    <div className="member-portrait">
      <span className="member-initials" aria-hidden="true">{initials}</span>
      {portrait && !imageFailed && <img
        src={portrait.src}
        alt={`Portrait of ${person.name}`}
        width={portrait.width}
        height={portrait.height}
        loading="lazy"
        decoding="async"
        style={{ objectPosition: portrait.objectPosition }}
        onError={() => setImageFailed(true)}
      />}
    </div>
    <div className="member-copy"><h4>{person.name}</h4><p>{person.role}</p></div>
  </article>;
}
