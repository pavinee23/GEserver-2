import { languageOptions } from "@/lib/data";

export default function Navbar({ ui, currentLanguage, setCurrentLanguage, profile }) {
  return (
    <nav className="agency-navbar">
      <div className="container-xxl agency-shell">
        <div className="agency-navbar-shell">
          <a className="agency-brand" href="#top">
            <img
              src="/logo-mark.svg"
              alt="GOEUN SERVER HUB"
              width="64"
              height="64"
              className="agency-brand-logo"
            />
            <span className="agency-brand-copy">
              <span className="agency-brand-kicker">{ui.brandKicker}</span>
              <strong>{profile.brand_name}</strong>
              <span>{ui.brandSubtitle}</span>
            </span>
          </a>
          <div className="agency-nav-tools">
            <div className="agency-language-switcher" aria-label="Language switcher">
              {languageOptions.map((option) => (
                <button
                  key={option.key}
                  type="button"
                  className={`agency-language-button ${currentLanguage === option.key ? "is-active" : ""}`}
                  onClick={() => setCurrentLanguage(option.key)}
                >
                  {option.label}
                </button>
              ))}
            </div>
            <div className="agency-nav-links">
              <a href="#services">{ui.navServices}</a>
              <a href="#showcase">{ui.navPortals}</a>
              <a href="#journey">{ui.navJourney}</a>
              <a href="#contact">{ui.navContact}</a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
