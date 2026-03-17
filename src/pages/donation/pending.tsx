import Link from "next/link";

export default function DonatePendingPage() {
  return (
    <main className="page">
      <div className="card">
        <div className="icon-wrap">
          <div className="ring" />
          <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z"
            />
          </svg>
        </div>
        <span className="tag">En proceso</span>
        <h1>Tu donación está pendiente</h1>
        <div className="divider" />
        <p>
          Recibimos tu solicitud y está siendo procesada. Esto puede tardar unos minutos.
          Te notificaremos por correo cuando se confirme.
        </p>
        <Link href="/" className="btn">
          Volver al inicio
        </Link>
        <p className="notice">
          Si no recibís confirmación en las próximas 24 hs, escribinos a{" "}
          <strong>caiopuyolleguiza@gmail.com</strong>
        </p>
      </div>

      <style jsx>{`
        .page {
          font-family: 'DM Sans', sans-serif;
          background: #f4f0e8;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }
        .card {
          background: #fff;
          border-radius: 2px;
          padding: 4rem 3.5rem;
          max-width: 480px;
          width: 100%;
          text-align: center;
          box-shadow: 0 2px 40px rgba(0, 0, 0, 0.07);
          animation: rise 0.6s cubic-bezier(0.22, 0.61, 0.36, 1) both;
        }
        @keyframes rise {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .icon-wrap {
          width: 72px;
          height: 72px;
          background: #fef3cd;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 2rem;
          position: relative;
        }
        .ring {
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          border: 2px solid transparent;
          border-top-color: #7c5c1e;
          animation: spin 1.4s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .icon-wrap svg {
          width: 36px;
          height: 36px;
          stroke: #7c5c1e;
        }
        .tag {
          display: block;
          font-size: 0.7rem;
          font-weight: 500;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #7c5c1e;
          margin-bottom: 0.75rem;
        }
        h1 {
          font-family: 'Playfair Display', serif;
          font-size: 2rem;
          font-weight: 700;
          color: #1a1a1a;
          line-height: 1.2;
          margin: 0 0 1rem;
        }
        .divider {
          width: 40px;
          height: 2px;
          background: #7c5c1e;
          margin: 0 auto 2.5rem;
        }
        p {
          font-size: 0.95rem;
          color: #888;
          line-height: 1.7;
          margin-bottom: 2.5rem;
        }
        .btn {
          display: inline-block;
          padding: 0.85rem 2.5rem;
          background: #7c5c1e;
          color: #fff;
          text-decoration: none;
          font-size: 0.85rem;
          font-weight: 500;
          letter-spacing: 0.05em;
          border-radius: 2px;
          transition: opacity 0.2s;
          margin-bottom: 2rem;
        }
        .btn:hover { opacity: 0.85; }
        .notice {
          font-size: 0.8rem;
          color: #aaa;
          border-top: 1px solid #eee;
          padding-top: 1.5rem;
          margin-bottom: 0;
        }
        .notice strong { color: #666; }
      `}</style>
    </main>
  );
}