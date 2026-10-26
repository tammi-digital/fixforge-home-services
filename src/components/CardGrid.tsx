import ProfileCard from './ProfileCard'
import { services } from '../services'

export function CardGrid() {
  return (
    <div className="card-grid">
      {services.map((service) => (
        <ProfileCard key={service.id} {...service} href="#estimate" />
      ))}
    </div>
  )
}