import { BUILD_YEAR, REVISION } from "../data/build";
import { profile } from "../data/profile";
import { ArrowUp, ArrowUpRight } from "./Icons";
import "./Footer.css";

const REPO = "https://github.com/jbear05/react-portfolio";

// Styled after the title block in the corner of an engineering drawing.
export const Footer = () => (
  <footer className="footer">
    <div className="container">
      <dl className="titleblock">
        <div className="titleblock__cell titleblock__cell--wide">
          <dt className="mono">Drawn by</dt>
          <dd>{profile.name}</dd>
        </div>
        <div className="titleblock__cell">
          <dt className="mono">Title</dt>
          <dd>Portfolio</dd>
        </div>
        <div className="titleblock__cell">
          <dt className="mono">Rev</dt>
          <dd>{REVISION}</dd>
        </div>
        <div className="titleblock__cell">
          <dt className="mono">Sheet</dt>
          <dd>1 of 1</dd>
        </div>
        <div className="titleblock__cell">
          <dt className="mono">Scale</dt>
          <dd>1:1</dd>
        </div>
      </dl>

      <div className="footer__bottom">
        <p>
          © {BUILD_YEAR} {profile.name}. Built with React, Vite and Framer Motion. Set in
          Archivo and IBM Plex Mono.
        </p>
        <div className="footer__links">
          <a className="footer__link mono" href={REPO} target="_blank" rel="noreferrer">
            Source <ArrowUpRight />
            <span className="visually-hidden"> (opens in a new tab)</span>
          </a>
          <a className="footer__link mono" href="#top">
            Back to top <ArrowUp />
          </a>
        </div>
      </div>
    </div>
  </footer>
);
