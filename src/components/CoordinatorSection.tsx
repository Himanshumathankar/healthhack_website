import { useState } from 'react';
import { MessageCircle, MessageSquare, Phone } from 'lucide-react';
import { coordinatorContacts } from '../data/coordinator';
import './CoordinatorSection.css';

function CoordinatorCard({ person, index }: { person: typeof coordinatorContacts[number]; index: number }) {
  const [imageFailed, setImageFailed] = useState(false);
  const { portrait } = person;
  const initials = person.name.split(' ').map(word => word[0]).join('');

  return <article className="coordinator-card reveal" aria-labelledby={`coordinator-name-${index}`}>
    <div className="coordinator-identity">
      <div className="coordinator-portrait">
        <span aria-hidden="true">{initials}</span>
        {!imageFailed && <img src={portrait.src} alt={`Portrait of ${person.name}`}
          width={portrait.width} height={portrait.height} loading="lazy" decoding="async"
          style={{ width: `${portrait.scale * 100}%`, transform: `translate(-${portrait.x}%, -${portrait.y}%)` }}
          onError={() => setImageFailed(true)}/>}
      </div>
      <div className="coordinator-copy">
        <h3 id={`coordinator-name-${index}`}>{person.name}</h3>
        <a className="coordinator-number" href={person.call} aria-label={`Call ${person.name} at ${person.phone}`}>{person.phone}</a>
      </div>
    </div>
    <div className="coordinator-actions">
      <a href={person.call} aria-label={`Call ${person.name}`}><Phone size={14} aria-hidden="true"/>Call</a>
      <a href={person.whatsapp} target="_blank" rel="noopener noreferrer" aria-label={`Message ${person.name} on WhatsApp`}><MessageCircle size={14} aria-hidden="true"/>WhatsApp</a>
      <a href={person.sms} aria-label={`Send SMS to ${person.name}`}><MessageSquare size={14} aria-hidden="true"/>SMS</a>
    </div>
  </article>;
}

export default function CoordinatorSection() {
  return <section id="coordinator" tabIndex={-1} className="coordinator-section" aria-labelledby="coordinator-heading">
    <div className="container">
      <h2 id="coordinator-heading" className="coordinator-heading reveal">Student Coordinator</h2>
      <div className="coordinator-grid" data-stagger>
        {coordinatorContacts.map((person, index) => <CoordinatorCard key={person.name} person={person} index={index}/>)}
      </div>
    </div>
  </section>;
}
