import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      setLoggedIn(!!data.session);
    };

    checkSession();

    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      checkSession();
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  return (
    <header
      style={{
        width: "100%",
        padding: "16px 0",
        background: "rgba(248,246,242,0.85)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(0,0,0,0.08)",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "0 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Лого */}
        <Link
          href="/ru"
          style={{
            fontSize: "18px",
            fontWeight: 600,
            color: "#1d1d1d",
            textDecoration: "none",
            letterSpacing: "0.5px",
          }}
        >
          Middle East Study Lab
        </Link>

        {/* Меню */}
        <nav style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <Link href="/ru" className="body-text">Главная</Link>
          <Link href="/ru/modules" className="body-text">Учебные модули</Link>
          <Link href="/ru/library" className="body-text">Библиотека</Link>
          <Link
            href={loggedIn ? "/ru/profile" : "/ru/login"}
            className="button"
          >
            {loggedIn ? "Профиль" : "Войти"}
          </Link>
        </nav>
      </div>
    </header>
  );
}
