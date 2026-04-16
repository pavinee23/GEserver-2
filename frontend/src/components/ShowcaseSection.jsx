import { statusClassName, clientPortalUrl, clientLoginUrl } from "@/lib/data";

export default function ShowcaseSection({
  ui,
  filteredClients,
  query,
  setQuery,
  activeFilter,
  setActiveFilter,
  filterOptions,
}) {
  return (
    <section className="agency-section agency-section-light" id="showcase">
      <div className="container-xxl agency-shell">
        <div className="agency-section-shell agency-section-shell-glow">
          <div className="section-intro text-center">
            <h2 className="section-title">{ui.showcaseTitle}</h2>
            <p className="section-subtitle">{ui.showcaseSubtitle}</p>
          </div>

          <div className="showcase-toolbar">
            <div className="showcase-search">
              <label htmlFor="client-search">{ui.searchLabel}</label>
              <input
                id="client-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={ui.searchPlaceholder}
              />
            </div>
            <div className="showcase-filters">
              {filterOptions.map((option) => (
                <button
                  key={option.key}
                  type="button"
                  className={`filter-pill ${activeFilter === option.key ? "is-active" : ""}`}
                  onClick={() => setActiveFilter(option.key)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div className="row g-4">
            {filteredClients.map((client, index) => (
              <div
                key={client.slug}
                className={index === 0 ? "col-12 col-lg-6" : "col-12 col-md-6 col-lg-3"}
              >
                <article className={`showcase-card ${index === 0 ? "showcase-card-featured" : ""}`}>
                  <div className="showcase-visual">
                    <div className="showcase-glow" />
                    <div className="showcase-visual-content">
                      <span className={`status-pill ${statusClassName(client.status)}`}>
                        {ui.statusLabels[client.status] || client.status}
                      </span>
                      <span className="client-slug">{client.slug}</span>
                    </div>
                  </div>
                  <div className="showcase-body">
                    <h3>{client.name}</h3>
                    <p>{client.description}</p>
                    <div className="showcase-meta">
                      <span>{client.contact_email}</span>
                      <span>{client.contact_phone}</span>
                    </div>
                    <div className="showcase-actions">
                      <a className="btn agency-btn-primary" href={clientPortalUrl(client.slug)}>
                        {ui.viewPortal}
                      </a>
                      <a className="btn agency-btn-soft" href={clientLoginUrl(client.slug)}>
                        {ui.enterSystem}
                      </a>
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>

          {filteredClients.length === 0 && (
            <div className="empty-state-panel">
              <strong>{ui.emptyTitle}</strong>
              <span>{ui.emptyText}</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
