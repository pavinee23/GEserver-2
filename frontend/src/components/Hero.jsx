import { statusClassName } from "@/lib/data";

export default function Hero({
  ui,
  profile,
  services,
  clients,
  onlineCount,
  maintenanceCount,
  comingSoonCount,
  loading,
}) {
  const heroClients = clients.slice(0, 3);

  return (
    <header className="agency-masthead" id="top">
      <div className="container-xxl agency-shell">
        <div className="row g-4 align-items-stretch">
          <div className="col-12 col-xl-7">
            <div className="masthead-copy">
              <span className="section-kicker section-kicker-light">{ui.heroKicker}</span>
              <p className="masthead-welcome">{ui.heroWelcome}</p>
              <h1 className="masthead-title">{ui.heroTitle}</h1>
              <p className="masthead-subtitle">{ui.heroSubtitle}</p>

              <div className="masthead-signals">
                {services.slice(0, 3).map((service, index) => (
                  <div key={service.id || service.highlight} className="masthead-signal">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <strong>{service.highlight}</strong>
                  </div>
                ))}
              </div>

              <div className="masthead-actions">
                <a className="btn agency-btn-primary btn-lg" href="#showcase">
                  {ui.heroPrimaryButton}
                </a>
                <a className="btn agency-btn-outline btn-lg" href="#journey">
                  {ui.heroSecondaryButton}
                </a>
              </div>

              <div className="masthead-stats">
                <div className="masthead-stat">
                  <span>{ui.statPortals}</span>
                  <strong>{clients.length}</strong>
                </div>
                <div className="masthead-stat">
                  <span>{ui.statLive}</span>
                  <strong>{onlineCount}</strong>
                </div>
                <div className="masthead-stat">
                  <span>{ui.statServices}</span>
                  <strong>{services.length}</strong>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-xl-5">
            <aside className="masthead-panel">
              <div className="masthead-panel-top">
                <div>
                  <span className="section-kicker">{ui.panelKicker}</span>
                  <h2>{ui.panelTitle}</h2>
                </div>
                <span className="sync-pill">{loading ? ui.syncing : ui.liveSync}</span>
              </div>

              <p className="masthead-panel-copy">{ui.panelCopy}</p>

              <div className="contact-mini-card">
                <span>{ui.primaryContact}</span>
                <strong>{profile.email}</strong>
                <small>{profile.phone}</small>
              </div>

              <div className="live-board">
                <div className="live-board-head">
                  <span>{ui.portalAvailability}</span>
                  <span className="board-dot" aria-hidden="true" />
                </div>
                {heroClients.map((client) => (
                  <div key={client.slug} className="live-board-row">
                    <div>
                      <strong>{client.name}</strong>
                      <span>{client.slug}</span>
                    </div>
                    <span className={`status-pill ${statusClassName(client.status)}`}>
                      {ui.statusLabels[client.status] || client.status}
                    </span>
                  </div>
                ))}
              </div>

              <div className="agency-mini-grid">
                <div>
                  <span>{ui.maintenance}</span>
                  <strong>{maintenanceCount}</strong>
                </div>
                <div>
                  <span>{ui.comingSoon}</span>
                  <strong>{comingSoonCount}</strong>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </header>
  );
}
