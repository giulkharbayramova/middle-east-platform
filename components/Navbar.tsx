import Link from "next/link";
import { useEffect, useRef, useState } from "react";
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
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen && isMobile) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
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

        {/* Десктопное меню */}
        {!isMobile && (
          <nav style={{ display: "flex", gap: "20px", alignItems: "center" }}>
             <Link href="/ru/about" style={{ textDecoration: "none", color: "#1d1d1d" }}>
              О проекте
            </Link>
            <Link href="/ru" style={{ textDecoration: "none", color: "#1d1d1d" }}>
              Главная
            </Link>
            <Link href="/ru/modules" style={{ textDecoration: "none", color: "#1d1d1d" }}>
              Учебные модули
            </Link>
            <Link href="/ru/library" style={{ textDecoration: "none", color: "#1d1d1d" }}>
              Библиотека
            </Link>
            <Link
              href={loggedIn ? "/ru/profile" : "/ru/login"}
              style={{
                textDecoration: "none",
                color: "#fff",
                background: "#1d1d1d",
                padding: "8px 16px",
                borderRadius: "4px",
                fontWeight: 500,
              }}
            >
              {loggedIn ? "Профиль" : "Войти"}
            </Link>
          </nav>
        )}

        {/* Мобильная кнопка */}
        {isMobile && (
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              width: "24px",
              height: "24px",
              position: "relative",
              zIndex: 200, // чтобы кнопка была выше меню
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
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
                transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none",
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
                transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none",
              }}
            />
          </button>
        )}

        {/* Мобильное меню */}
        {isMobile && (
          <div
            ref={menuRef}
            style={{
              position: "absolute",
              top: 70,
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
              transition: "transform 0.3s ease, opacity 0.3s ease",
              transform: menuOpen ? "translateY(0)" : "translateY(-20px)",
              opacity: menuOpen ? 1 : 0,
              pointerEvents: menuOpen ? "auto" : "none",
            }}
          >
             <Link href="/ru/about" style={{ textDecoration: "none", color: "#1d1d1d" }}>
              О проекте
            </Link>
            <Link href="/ru" style={{ textDecoration: "none", color: "#1d1d1d" }}>
              Главная
            </Link>
            <Link href="/ru/modules" style={{ textDecoration: "none", color: "#1d1d1d" }}>
              Учебные модули
            </Link>
            <Link href="/ru/library" style={{ textDecoration: "none", color: "#1d1d1d" }}>
              Библиотека
            </Link>
            <Link href="/ru/dictionary" style={{ textDecoration: "none", color: "#1d1d1d" }}>
              Словарь
            </Link>
            <Link
              href={loggedIn ? "/ru/profile" : "/ru/login"}
              style={{ textDecoration: "none", color: "#1d1d1d" }}
            >
              {loggedIn ? "Профиль" : "Войти"}
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}