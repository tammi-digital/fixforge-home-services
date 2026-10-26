import { type FormEvent, useRef, useState } from 'react'
import { services } from './services'
import { CardGrid } from './components/CardGrid'
import { MobileNav } from './components/MobileNav'
import './index.css'

const phone = "(719) 924-6381"
const phoneLink = "tel:+17199246381"

function App() {
  const [sent, setSent] = useState(false)
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const serviceListDialog = useRef<HTMLDialogElement>(null)
  const selectedServiceNames = services
    .filter((service) => selectedServices.includes(service.id))
    .map((service) => service.name)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const subject = encodeURIComponent(`Free estimate request from ${data.get('name')}`)
    const body = encodeURIComponent(
      `Name: ${data.get('name')}\nPhone: ${data.get('phone')}\nEmail: ${data.get('email')}\n\nSelected services: ${selectedServiceNames.length ? selectedServiceNames.join(', ') : 'Not specified'}\n\nProject details:\n${data.get('details') || 'Not provided'}`,
    )
    setSent(true)
    window.location.href = `mailto:fixforgehomeservices@gmail.com?subject=${subject}&body=${body}`
  }

  return (
    <div className="site-shell app-root">
      <div className="topbar"><span>Serving Pueblo and nearby communities</span><span>20+ years of hands-on experience <b>·</b> Free estimates</span></div>
      <header className="nav container">
        <a className="brand" href="#home" aria-label="FixForge Home Services home"><span className="brand-mark">✦</span><span>FIX<span>FORGE</span><small>HOME SERVICES</small></span></a>
        <nav><a href="#services">Services</a><a href="#about">About</a><a href="#estimate">Free estimate</a></nav>
        <MobileNav />
        <a className="phone-link" href={phoneLink}>☎ <span>{phone}</span></a>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="container hero-content">
            <p className="eyebrow">Pueblo, Colorado <span>/</span> Home repair and maintenance</p>
            <h1>One call.<br /><em>Your list</em> handled.</h1>
            <p className="hero-copy">From the small jobs you've been putting off to larger home improvements, FixForge brings 20+ years of hands-on experience to your home.</p>
            <div className="actions"><a className="button button-primary" href="#estimate">Get a free estimate <span>↗</span></a><a className="button button-quiet" href={phoneLink}>Call {phone}</a></div>
            <div className="proof-row"><div><strong>20+</strong><span>years experience</span></div><div><strong>FREE</strong><span>estimates</span></div><div><strong>ONE</strong><span>reliable call</span></div></div>
          </div>
          <div className="hero-grid" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span><span></span></div>
          <div className="tool-shape" aria-hidden="true">⌁</div>
        </section>

        <section className="intro section container"><div><p className="eyebrow">The FixForge approach</p><h2>YOUR HOME.<br /><span>YOUR TO-DO LIST.</span><br />OUR TOOLBOX.</h2></div><div className="intro-copy"><p>Good work starts with listening. Tell us what needs attention, and we'll help you make a practical plan to get it done.</p><button className="text-link" type="button" onClick={() => serviceListDialog.current?.showModal()}>{selectedServiceNames.length ? `Edit my list (${selectedServiceNames.length})` : 'Make a list'} <span>→</span></button></div></section>

        <section className="services section" id="services"><div className="container"><div className="section-heading"><div><p className="eyebrow">What we do</p><h2>Ready for the<br /><span>next project.</span></h2></div><p>Repairs, maintenance, installation, and improvements for the places you call home.</p></div><CardGrid /></div></section>

        <section className="honey section"><div className="container honey-inner"><div><p className="eyebrow">The list you've been avoiding</p><h2>Got a<br /><em>honey-do</em> list?</h2></div><div><p>Don't spend every weekend working on your house. Send us the list, and we'll take a look at what needs to be done.</p><button className="button button-light" type="button" onClick={() => serviceListDialog.current?.showModal()}>{selectedServiceNames.length ? `Edit my list (${selectedServiceNames.length})` : 'Make a list'} <span>↗</span></button></div></div></section>

        <section className="about section container" id="about"><div className="about-stamp">FF<br /><span>20+</span><br />YEARS</div><div><p className="eyebrow">Experience you can count on</p><h2>Built to fix.<br /><em>Trusted to finish.</em></h2><p className="about-copy">With more than 20 years of hands-on experience, FixForge Home Services provides dependable help for repairs, maintenance, installations, and home improvement projects.</p><div className="area-note"><span>⌖</span><p><strong>Serving Pueblo and surrounding communities.</strong><br />Colorado Springs service is available for qualifying projects where the size and scope make the trip worthwhile.</p></div></div></section>

        <section className="estimate section" id="estimate"><div className="container estimate-grid"><div><p className="eyebrow">Let's get started</p><h2>Tell us what<br /><em>needs doing.</em></h2><p>Share a few details about your project. We'll use your information to follow up and talk through a free estimate.</p><a href={phoneLink} className="estimate-phone">☎ {phone}</a></div><form onSubmit={handleSubmit}><label>Name<input name="name" required placeholder="Your name" /></label><label>Phone<input name="phone" required type="tel" placeholder="(719) 000-0000" /></label><label>Email <span>(optional)</span><input name="email" type="email" placeholder="you@example.com" /></label><label>{selectedServiceNames.length ? 'Anything else?' : 'What needs doing?'}<textarea name="details" required={selectedServiceNames.length === 0} rows={4} placeholder={selectedServiceNames.length ? 'Add any helpful details (optional)...' : 'Tell us about your project...'}></textarea></label>{selectedServiceNames.length > 0 && <p className="service-selection-summary">Services in your list: {selectedServiceNames.join(', ')}</p>}<button className="button button-primary" type="submit">Request my free estimate <span>↗</span></button>{sent && <p className="form-note">Your email app should open with your estimate request ready to send.</p>}</form></div></section>
      </main>
      <dialog className="service-list-dialog" aria-labelledby="service-list-title" ref={serviceListDialog} onClick={(event) => { if (event.target === event.currentTarget) event.currentTarget.close() }}>
        <div className="service-list-content">
          <div className="service-list-heading">
            <div><p className="eyebrow">Build your list</p><h2 id="service-list-title">What needs fixing?</h2><p>Select any services you'd like us to look at. Your choices will be included with your estimate request.</p></div>
            <button className="service-list-close" type="button" aria-label="Close service list" onClick={() => serviceListDialog.current?.close()}>×</button>
          </div>
          <fieldset className="service-list-options">
            <legend className="service-list-count" aria-live="polite">{selectedServices.length} selected</legend>
            {services.map((service) => (
              <label className="service-list-option" key={service.id}>
                <input
                  type="checkbox"
                  checked={selectedServices.includes(service.id)}
                  onChange={() => setSelectedServices((current) => current.includes(service.id) ? current.filter((id) => id !== service.id) : [...current, service.id])}
                />
                <span className="service-list-option-copy"><strong>{service.name}</strong><small>{service.bio}</small></span>
              </label>
            ))}
          </fieldset>
          <div className="service-list-actions">
            <button className="button button-quiet" type="button" onClick={() => serviceListDialog.current?.close()}>Close</button>
            <button className="button button-primary" type="button" disabled={selectedServices.length === 0} onClick={() => serviceListDialog.current?.close()}>Save my list <span>↗</span></button>
          </div>
        </div>
      </dialog>
      <footer><div className="container footer-inner"><a className="brand" href="#home"><span className="brand-mark">✦</span><span>FIX<span>FORGE</span><small>HOME SERVICES</small></span></a><p>Built to Fix. Trusted to Finish.<br />Pueblo, Colorado</p><a className="phone-link" href={phoneLink}>{phone} ↗</a></div><div className="container footer-bottom"><span>© 2026 FixForge Home Services</span><a href="mailto:fixforgehomeservices@gmail.com">fixforgehomeservices@gmail.com</a></div></footer>
      <a className="mobile-call" href={phoneLink}>☎ Call now</a>
    </div>
  )
}

export default App
