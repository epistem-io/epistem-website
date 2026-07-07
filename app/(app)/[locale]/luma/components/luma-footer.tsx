"use client";

const accentPink = "#cc4778";

export function LumaFooter() {
  return (
    <footer className="luma-footer">
      <style>{`
        .luma-footer {
          background: ${accentPink};
          color: #fff;
        }
        .luma-footer__inner {
          max-width: 1440px;
          margin: 0 auto;
          padding: 22px clamp(24px, 5vw, 64px);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
        }
        .luma-footer__copy {
          font-size: 15px;
          font-weight: 500;
          margin: 0;
        }
        .luma-footer__links {
          display: flex;
          align-items: center;
          gap: clamp(24px, 4vw, 56px);
        }
        .luma-footer__links a {
          font-size: 15px;
          font-weight: 500;
          color: #fff;
          text-decoration: none;
          opacity: 0.92;
          transition: opacity 0.2s ease;
        }
        .luma-footer__links a:hover {
          opacity: 1;
          text-decoration: underline;
        }

        @media (max-width: 700px) {
          .luma-footer__inner {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
            padding: 24px clamp(20px, 5vw, 24px) 28px;
          }
          .luma-footer__links {
            flex-wrap: wrap;
            gap: 20px 28px;
          }
          .luma-footer__links a {
            padding: 2px 0;
          }
        }
      `}</style>

      <div className="luma-footer__inner">
        <p className="luma-footer__copy">© 2026 epistem. All rights reserved.</p>
        <nav className="luma-footer__links" aria-label="Footer">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Use</a>
        </nav>
      </div>
    </footer>
  );
}