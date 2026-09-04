import { useState } from "react";

const links = [
  { label: "Resume", href: "/resume.pdf", icon: "doc" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/bbinko",
    icon: "linkedin",
  },
  { label: "GitHub", href: "https://github.com/bebinko", icon: "github" },
  { label: "Email", href: "mailto:binkowskibrady@gmail.com", icon: "mail" },
] as const;

const photos = [
  { number: "04", caption: "My girlfriend's cat, Kirby", src: "/photos/kirby.jpg", alt: "Kirby the cat", imageClassName: "kirby-photo" },
  { number: "03", caption: "My dog Barkley, 5 yo", src: "/photos/barkley.jpg", alt: "Brady's dog Barkley", imageClassName: "" },
  { number: "02", caption: "My beautiful girlfriend and me", src: "/photos/me-and-gf.jpg", alt: "Brady and his girlfriend", imageClassName: "" },
  { number: "01", caption: "My junior year of college", src: "/photos/headshot-photo.jpg", alt: "Brady during his junior year of college", imageClassName: "" },
] as const;

const photoPositions = ["photo-one", "photo-two", "photo-three", "photo-four"];

function LinkIcon({ name }: { name: (typeof links)[number]["icon"] }) {
  if (name === "linkedin")
    return (
      <svg className="icon-filled" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V8.98h3.42v1.57h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.29ZM5.32 7.41a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13Zm1.78 13.04H3.54V8.98H7.1v11.47Z" />
      </svg>
    );
  if (name === "github")
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M9 18.5c-4.5 1.4-4.5-2.3-6.3-2.8m12.6 5v-3.5c0-1 .1-1.5-.5-2.1 2.8-.3 5.7-1.4 5.7-6.2a4.8 4.8 0 0 0-1.3-3.4 4.5 4.5 0 0 0-.1-3.4s-1-.3-3.5 1.3a12 12 0 0 0-6.3 0C6.9 1.8 5.8 2.1 5.8 2.1a4.5 4.5 0 0 0-.1 3.4 4.8 4.8 0 0 0-1.3 3.4c0 4.8 2.9 5.9 5.7 6.2-.6.6-.6 1.3-.5 2.1v3.5" />
      </svg>
    );
  if (name === "mail")
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M3 5.5h18v13H3zM3.5 6l8.5 7 8.5-7" />
      </svg>
    );
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 3.5h7l4 4v13H7zM14 3.5v4h4M10 12h5m-5 4h5" />
    </svg>
  );
}

export default function App() {
  const [photoOrder, setPhotoOrder] = useState([...photos]);

  const sendTopPhotoToBack = () => {
    setPhotoOrder((current) => [current[current.length - 1], ...current.slice(0, -1)]);
  };

  return (
    <main className="site-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <section className="intro" aria-labelledby="intro-title">
        <div className="eyebrow">
          <span /> Based in Illinois, USA
        </div>
        <h1 id="intro-title">
          hi, brady here<span className="accent">.</span>
        </h1>
        <p className="role">22 yo full-stack engineer from Joliet, Illinois</p>
        <div className="bio-copy">
          <p>
            Senior computer science undergrad from Illinois State University.
          </p>
          <p>Check out my information linked below.</p>
        </div>
        <nav className="social-links" aria-label="Social links">
          {links.map((link) => (
            <a key={link.label} href={link.href} aria-label={link.label}>
              <LinkIcon name={link.icon} />
              <span>{link.label}</span>
            </a>
          ))}
        </nav>
      </section>
      <section className="gallery-wrap" aria-label="Photo gallery">
        <div className="photo-deck">
          {photoOrder.map((photo, index) => (
            <figure
              key={photo.number}
              className={`photo-card ${photoPositions[index]}`}
              aria-hidden={index !== photoOrder.length - 1}
            >
              <div className="photo-placeholder">
                <img className={photo.imageClassName} src={photo.src} alt={photo.alt} />
              </div>
              <figcaption>
                <span>{photo.caption}</span>
                <small>{photo.number} / 04</small>
              </figcaption>
              {index === photoOrder.length - 1 && (
                <button
                  className="gallery-arrow"
                  type="button"
                  onClick={sendTopPhotoToBack}
                  aria-label={`Move ${photo.caption} to the back and show the next photo`}
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="m15 5-7 7 7 7" />
                  </svg>
                </button>
              )}
            </figure>
          ))}
        </div>
        <p className="sr-only" aria-live="polite">Showing {photoOrder[photoOrder.length - 1].caption}</p>
      </section>
      <footer>BRADY / SOFTWARE ENGINEER / 2026</footer>
    </main>
  );
}
