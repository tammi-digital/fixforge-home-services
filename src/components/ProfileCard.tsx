import './ProfileCard.css'

type ProfileCardProps = {
  name: string
  role: string
  bio: string
  tagline: string
  featured?: boolean
  location: string
  years: number
  href: string
}

function ProfileCard({ name, role, bio, tagline, featured = false, location, years, href }: ProfileCardProps) {
  const cardClass = `profile-card ${featured ? 'featured' : 'standard'}`

  return (
    <article className={cardClass}>
      <header className="profile-header">
        <div>
          <h3 className="profile-name">{name}</h3>
          <div className="profile-role">{role}</div>
        </div>
        {featured && <span className="featured-pill">Featured</span>}
      </header>
      <div className="profile-tagline">{tagline}</div>
      <p className="profile-bio">{bio}</p>
      <footer className="profile-footer">
        <span>{location}</span>
        <span>{years}+ yrs experience</span>
        <a className="profile-estimate-link" href={href}>Estimate ↗</a>
      </footer>
    </article>
  )
}

export default ProfileCard