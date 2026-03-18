import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
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

</div>
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
        position: "relative",
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
          position: "relative",
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
          <button
  onClick={() => setMenuOpen(!menuOpen)}
  style={{
    display: isMobile ? "block" : "none",
    background: "transparent",
    border: "none",
    fontSize: "24px",
    cursor: "pointer",
  }}
>
  ☰
</button>
        {/* Меню */}
        <nav 
          style={{ display: isMobile ? "none" : "flex", gap: "20px", alignItems: "center" }}>
          {menuOpen && (
  <div
    style={{
      position: "absolute",
      top: "70px",
      left: 0,
      width: "100%",
      background: "rgba(255,255,255,0.95)",
      backdropFilter: "blur(10px)",
      borderBottom: "1px solid rgba(0,0,0,0.08)",
      padding: "20px",
      display: "flex",
      flexDirection: "column",
      gap: "14px",
      zIndex: 100,
    }}
  >
    <Link href="/ru">Главная</Link>
    <Link href="/ru/modules">Учебные модули</Link>
    <Link href="/ru/library">Библиотека</Link>
    <Link href={loggedIn ? "/ru/profile" : "/ru/login"}>
      {loggedIn ? "Профиль" : "Войти"}
    </Link>
  </div>
)}
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
