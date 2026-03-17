import Link from "next/link";

export default function DonateFailurePage() {
  return (
    <main className="page">
      <div className="card">
        <div className="icon-wrap">
          <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <span className="tag">Pago no procesado</span>
        <h1>Algo salió mal</h1>
        <div className="divider" />
        <p>
          No pudimos procesar tu donación. No se realizó ningún cargo.
          Podés intentarlo nuevamente o contactarnos si el problema persiste.
        </p>
        <div className="actions">
          <Link href="/donate" className="btn btn-primary">
            Intentar de nuevo
          </Link>
          <Link href="/" className="btn btn-secondary">
            Volver al inicio
          </Link>
        </div>
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
          background: #fde8e3;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 2rem;
          animation: pop 0.5s 0.3s cubic-bezier(0.22, 0.61, 0.36, 1) both;
        }
        @keyframes pop {
          from { transform: scale(0.5); opacity: 0; }
          to   { transform: scale(1); opacity: 1; }
        }
        .icon-wrap svg {
          width: 36px;
          height: 36px;
          stroke: #b5341a;
        }
        .tag {
          display: block;
          font-size: 0.7rem;
          font-weight: 500;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #b5341a;
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
          background: #b5341a;
          margin: 0 auto 2.5rem;
        }
        p {
          font-size: 0.95rem;
          color: #888;
          line-height: 1.7;
          margin-bottom: 2.5rem;
        }
        .actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }
        .btn {
          display: inline-block;
          padding: 0.85rem 2rem;
          text-decoration: none;
          font-size: 0.85rem;
          font-weight: 500;
          letter-spacing: 0.05em;
          border-radius: 2px;
          transition: opacity 0.2s;
        }
        .btn-primary { background: #b5341a; color: #fff; }
        .btn-secondary { background: transparent; color: #1a1a1a; border: 1px solid #ddd; }
        .btn:hover { opacity: 0.8; }
      `}</style>
    </main>
  );
}