export function MobileNav() {
  return (
    <details className="mobile-nav">
      <summary aria-label="Open navigation menu">☰</summary>
      <div className="mobile-nav-menu">
        <a href="#services">Services</a>
        <a href="#about">About</a>
        <a href="#estimate">Free estimate</a>
      </div>
    </details>
  )
}