import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Отслеживание размера экрана
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Проверка сессии Supabase
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

  // Закрытие меню при клике вне
  useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    // Проверяем что current существует
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setMenuOpen(false);
    }
  };

  if (menuOpen && isMobile) {
    document.addEventListener("mousedown", handleClickOutside);
  }

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, [menuOpen, isMobile]);

  return (
    <header
      style={{
        width: "100%",
        padding: "16px 0",
        background: "rgba(248,246,242,0.95)",
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

        {/* Кнопка меню для мобильных */}
        {isMobile && (
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: "transparent",
              border: "none",
              fontSize: "24px",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              width: "24px",
              height: "18px",
              padding: 0,
            }}
            aria-label="Toggle menu"
          >
            <span
              style={{
                display: "block",
                height: "3px",
                width: "100%",
                background: "#1d1d1d",
                borderRadius: "2px",
                transition: "0.3s",
                transform: menuOpen ? "rotate(45deg) translate(4px, 4px)" : "none",
              }}
            />
            <span
              style={{
                display: "block",
                height: "3px",
                width: "100%",
                background: "#1d1d1d",
                borderRadius: "2px",
                transition: "0.3s",
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              style={{
                display: "block",
                height: "3px",
                width: "100%",
                background: "#1d1d1d",
                borderRadius: "2px",
                transition: "0.3s",
                transform: menuOpen ? "rotate(-45deg) translate(4px, -4px)" : "none",
              }}
            />
          </button>
        )}

        {/* Меню */}
        {isMobile ? (
          <div
            ref={menuRef}
            style={{
              position: "absolute",
              top: menuOpen ? "70px" : "-500px",
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
              transition: "top 0.3s ease-in-out",
            }}
          >
            <Link href="/ru">Главная</Link>
            <Link href="/ru/modules">Учебные модули</Link>
            <Link href="/ru/library">Библиотека</Link>
            <Link href={loggedIn ? "/ru/profile" : "/ru/login"}>
              {loggedIn ? "Профиль" : "Войти"}
            </Link>
          </div>
        ) : (
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
        )}
      </div>
    </header>
  );
}