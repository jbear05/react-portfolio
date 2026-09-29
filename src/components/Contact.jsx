import { useState } from "react";
import { m } from "framer-motion";
import { profile } from "../data/profile";
import { useClock } from "../hooks/useClock";
import { ArrowRight, ArrowUpRight, GitHub, LinkedIn } from "./Icons";
import { Marks } from "./Marks";
import { SectionHeader } from "./SectionHeader";
import "./Contact.css";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const EMPTY = { name: "", email: "", message: "" };

const DIRECT = [
  {
    label: "LinkedIn",
    handle: "in/jair-garcia-fonseca",
    href: profile.links.linkedin,
    Icon: LinkedIn,
  },
  {
    label: "GitHub",
    handle: "@jbear05",
    href: profile.links.github,
    Icon: GitHub,
  },
];

export const Contact = () => {
  const [form, setForm] = useState(EMPTY);
  const [trap, setTrap] = useState("");
  const [status, setStatus] = useState({ state: "idle", message: "" });
  const time = useClock(profile.timeZone);
  const sending = status.state === "sending";

  const update = (event) => {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  };

  const submit = async (event) => {
    event.preventDefault();
    if (sending) return;

    // Bots fill in every field, including the one people never see.
    if (trap) {
      setStatus({ state: "sent", message: "Message sent. Thanks!" });
      setForm(EMPTY);
      return;
    }

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      setStatus({
        state: "error",
        message: "The form isn't configured yet. Please reach out on LinkedIn instead.",
      });
      return;
    }

    setStatus({ state: "sending", message: "" });
    try {
      const { default: emailjs } = await import("@emailjs/browser");
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, form, { publicKey: PUBLIC_KEY });
      setStatus({ state: "sent", message: "Message sent. Thanks, I'll get back to you soon." });
      setForm(EMPTY);
    } catch {
      setStatus({
        state: "error",
        message: "That didn't go through. Please try again, or reach out on LinkedIn.",
      });
    }
  };

  return (
    <section id="contact" className="section contact" aria-labelledby="contact-title">
      <div className="container">
        <SectionHeader
          number="04"
          label="Contact"
          id="contact-title"
          title="Let's build something."
          intro="Hiring for an internship, starting a project, or one person short for a hackathon team? Send a note and I'll get back to you."
        />

        <div className="contact__grid">
          <m.div
            className="contact__direct"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="mono contact__label">Direct lines</p>
            <ul className="contact__links">
              {DIRECT.map(({ label, handle, href, Icon }) => (
                <li key={label}>
                  <a href={href} target="_blank" rel="noreferrer">
                    <Icon className="contact__icon" />
                    <span className="contact__link-label">{label}</span>
                    <span className="contact__handle mono">{handle}</span>
                    <ArrowUpRight className="contact__arrow" />
                    <span className="visually-hidden"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
            <p className="contact__local mono">
              {profile.location} · {time}
            </p>
          </m.div>

          <m.form
            className="contact__form"
            onSubmit={submit}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <Marks />
            <div className="contact__form-bar mono">
              <span>Form 04-A</span>
              <span>Message</span>
            </div>

            <div className="field">
              <label htmlFor="contact-name" className="mono">
                <span>01</span> Name
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Your name"
                required
                maxLength={120}
                value={form.name}
                onChange={update}
              />
            </div>

            <div className="field">
              <label htmlFor="contact-email" className="mono">
                <span>02</span> Email
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@company.com"
                required
                maxLength={200}
                value={form.email}
                onChange={update}
              />
            </div>

            <div className="field">
              <label htmlFor="contact-message" className="mono">
                <span>03</span> Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                placeholder="What are you working on?"
                required
                maxLength={4000}
                value={form.message}
                onChange={update}
              />
            </div>

            <div className="contact__trap" aria-hidden="true">
              <label htmlFor="contact-website">Leave this empty</label>
              <input
                id="contact-website"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={trap}
                onChange={(event) => setTrap(event.target.value)}
              />
            </div>

            <div className="contact__actions">
              <button type="submit" className="btn btn--primary" disabled={sending}>
                {sending ? "Sending…" : "Send message"}
                <ArrowRight />
              </button>
              <p
                className={`contact__status contact__status--${status.state}`}
                role="status"
                aria-live="polite"
              >
                {status.message}
              </p>
            </div>
          </m.form>
        </div>
      </div>
    </section>
  );
};
