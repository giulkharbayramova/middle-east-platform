import RegionMap from "../../components/RegionMap";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
export default function Home() {
  const sections = [
    { title: "Библиотека", desc: "Книги, статьи, фильмы и подборки по странам региона.", link: "/ru/library" },
    { title: "Учебные модули", desc: "Углуби знания по культуре, политике и экономике.", link: "/ru/modules" },
    { title: "Страны", desc: "Изучай страны региона и ключевые факты по каждой.", link: "/ru/countries" },
  ];

  const [announcements, setAnnouncements] = useState<any[]>([]);
  useEffect(() => {
  fetchAnnouncements();
}, []);

async function fetchAnnouncements() {
  const { data } = await supabase
    .from("announcements")
    .select("*")
    .order("created_at", { ascending: false });

  if (data) setAnnouncements(data);
}

  return (
    <div style={{ background: "#f8f6f2", minHeight: "100vh" }}>
      {/* HERO */}
      <main style={{ padding: "clamp(20px, 5vw, 70px) clamp(16px, 6vw, 60px)" }}>
        <section
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            padding: "clamp(20px, 5vw, 70px)",
            borderRadius: "28px",
            backgroundImage: "url('/hero-bg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            border: "1px solid rgba(0,0,0,0.08)",
            boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* subtle decoration */}
          <div
            style={{
              position: "absolute",
              top: "-80px",
              right: "-100px",
              width: "280px",
              height: "280px",
              borderRadius: "50%",
              background: "rgba(180, 140, 90, 0.12)",
              filter: "blur(30px)",
            }}
          />

          <div style={{ position: "relative", zIndex: 2 }}>
            <p
              style={{
                fontSize: "13px",
                letterSpacing: "1px",
                textTransform: "uppercase",
                color: "#6b5a44",
              }}
            >
              образовательная платформа
            </p>

            <h1 style={{ fontSize: "clamp(28px, 6vw, 46px)", margin: "18px 0", lineHeight: "1.15", color: "#1d1d1d" }}>
              Ближний Восток: бизнес, культура и дипломатия
            </h1>

            <p style={{ fontSize: "clamp(14px, 3.5vw, 18px)", maxWidth: "650px", color: "#444", lineHeight: "1.6" }}>
              Платформа для студентов и всех, кто хочет понимать регион глубже:
              от делового этикета и политических контекстов до культуры и современной экономики.
            </p>

            <div style={{ display: "flex", gap: "14px", marginTop: "28px" }}>
              <a
                href="/ru/register"
                style={{
                  padding: "12px 18px",
                  borderRadius: "999px",
                  background: "#1d1d1d",
                  color: "#fff",
                  textDecoration: "none",
                  fontSize: "14px",
                }}
              >
                Начать обучение
              </a>

              <a
                href="#sections"
                style={{
                  padding: "12px 18px",
                  borderRadius: "999px",
                  border: "1px solid rgba(0,0,0,0.15)",
                  color: "#1d1d1d",
                  textDecoration: "none",
                  fontSize: "14px",
                  background: "rgba(255,255,255,0.45)",
                  backdropFilter: "blur(6px)",
                }}
              >
                Посмотреть разделы
              </a>
            </div>
          </div>
        </section>
<RegionMap />
        {/* SECTIONS */}
<section id="sections" style={{ maxWidth: "1100px", margin: "70px auto 0" }}>
  <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "20px" }}>
    <div>
      <h2 style={{ fontSize: "26px", marginBottom: "10px", color: "#1d1d1d" }}>
        Разделы платформы
      </h2>
      <p style={{ margin: 0, fontSize: "14px", color: "#555", maxWidth: "650px", lineHeight: "1.6" }}>
        Всё нужное собрано в одном месте — учебные материалы, рекомендации и практика.
      </p>
    </div>
  </div>

  <div
    style={{
      marginTop: "26px",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
      gap: "18px",
    }}
  >
    {sections.map((item) => (
      <Link
        key={item.title}
        href={item.link}
        style={{ textDecoration: "none" }}
      >
        <div
          style={{
            padding: "24px",
            borderRadius: "22px",
            background: "rgba(255,255,255,0.78)",
            border: "1px solid rgba(0,0,0,0.08)",
            boxShadow: "0 6px 18px rgba(0,0,0,0.04)",
            position: "relative",
            overflow: "hidden",
            transition: "all 0.25s ease",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-6px)";
            e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,0,0,0.08)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 6px 18px rgba(0,0,0,0.04)";
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              width: "100%",
              height: "2px",
              background:
                "linear-gradient(90deg, rgba(180,140,90,0.35), rgba(180,140,90,0))",
              opacity: 0.7,
            }}
          />

          <h3 style={{ fontSize: "18px", marginBottom: "10px", color: "#1d1d1d" }}>
            {item.title}
          </h3>

          <p style={{ margin: 0, fontSize: "14px", color: "#555", lineHeight: "1.55" }}>
            {item.desc}
          </p>

          <div
            style={{
              marginTop: "18px",
              fontSize: "13px",
              color: "#6b5a44",
              opacity: 0.8,
            }}
          >
            Подробнее →
          </div>
        </div>
      </Link>
    ))}
  </div>
</section>
        {/* ROADMAP */}
<section style={{ maxWidth: "1100px", margin: "90px auto 0" }}>
  <div style={{ display: "flex", justifyContent: "space-between", gap: "20px", alignItems: "flex-end" }}>
    <div>
      <h2 style={{ fontSize: "26px", marginBottom: "12px", color: "#1d1d1d" }}>
        Учебный путь
      </h2>

      <p style={{ margin: 0, fontSize: "14px", color: "#555", maxWidth: "720px", lineHeight: "1.65" }}>
        Мы выстроили обучение так, чтобы постепенно перейти от базовых знаний к практическому пониманию региона —
        дипломатия, бизнес, культура и современные процессы.
      </p>
    </div>
  </div>

  <div
    style={{
      marginTop: "28px",
      borderRadius: "26px",
      padding: "34px",
      background: "rgba(255,255,255,0.78)",
      border: "1px solid rgba(0,0,0,0.08)",
      boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
      position: "relative",
      overflow: "hidden",
    }}
  >
    {/* восточная подсветка */}
    <div
      style={{
        position: "absolute",
        top: "-90px",
        left: "-90px",
        width: "240px",
        height: "240px",
        borderRadius: "50%",
        background: "rgba(180, 140, 90, 0.10)",
        filter: "blur(35px)",
      }}
    />

    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        gap: "22px",
        position: "relative",
        zIndex: 2,
      }}
    >
      {[
        {
          step: "01",
          title: "Основы региона",
          desc: "Ключевые понятия, история, религиозный и культурный контекст.",
        },
        {
          step: "02",
          title: "Страны и особенности",
          desc: "Сравнение стран GCC, Levant, Maghreb. Политические системы и общество.",
        },
        {
          step: "03",
          title: "Бизнес и этикет",
          desc: "Деловые коммуникации, переговоры, культура доверия и протокол.",
        },
        {
          step: "04",
          title: "Дипломатия и современность",
          desc: "Геополитика, международные отношения, экономика и актуальные процессы.",
        },
      ].map((item) => (
        <div
          key={item.step}
          style={{
            padding: "22px",
            borderRadius: "22px",
            border: "1px solid rgba(0,0,0,0.08)",
            background: "rgba(255,255,255,0.65)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* тонкая линия сверху */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              height: "2px",
              width: "100%",
              background: "linear-gradient(90deg, rgba(180,140,90,0.45), rgba(180,140,90,0))",
              opacity: 0.9,
            }}
          />

          <p
            style={{
              margin: 0,
              fontSize: "12px",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              opacity: 0.55,
              color: "#6b5a44",
            }}
          >
            шаг {item.step}
          </p>

          <h3 style={{ fontSize: "18px", margin: "12px 0 10px", color: "#1d1d1d" }}>
            {item.title}
          </h3>

          <p style={{ margin: 0, fontSize: "14px", color: "#555", lineHeight: "1.55" }}>
            {item.desc}
          </p>

        </div>
      ))}
    </div>

    <div style={{ marginTop: "26px", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
      <p style={{ margin: 0, fontSize: "13px", color: "#666" }}>
        Прогресс будет автоматически отображаться в личном кабинете.
      </p>

      <a
        href="/ru/modules"
        style={{
          fontSize: "13px",
          color: "#1d1d1d",
          textDecoration: "none",
          borderBottom: "1px solid rgba(180,140,90,0.35)",
          paddingBottom: "2px",
        }}
      >
        Перейти к учебным модулям →
      </a>
    </div>
  </div>
</section>


        {/* UPDATES */}
        <section style={{ maxWidth: "1100px", margin: "80px auto 0" }}>
          <h2 style={{ fontSize: "26px", marginBottom: "18px", color: "#1d1d1d" }}>Объявления</h2>

          <div
            style={{
              borderRadius: "24px",
              padding: "clamp(16px, 4vw, 28px)",
              background: "rgba(255,255,255,0.8)",
              border: "1px solid rgba(0,0,0,0.08)",
              boxShadow: "0 8px 22px rgba(0,0,0,0.04)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* тонкий орнаментальный акцент */}
            <div
              style={{
                position: "absolute",
                left: "-60px",
                bottom: "-60px",
                width: "180px",
                height: "180px",
                borderRadius: "50%",
                background: "rgba(180, 140, 90, 0.10)",
                filter: "blur(30px)",
              }}
            />

            <ul
  style={{
    margin: 0,
    paddingLeft: "clamp(14px, 4vw, 18px)",
    fontSize: "clamp(14px, 2.8vw, 16px)",
    color: "#444",
    lineHeight: "1.9",
    position: "relative",
  }}
>
  {announcements.length === 0 ? (
    <li style={{ color: "#888" }}>Пока нет объявлений</li>
  ) : (
    announcements.map((item) => (
      <li key={item.id}>{item.text}</li>
    ))
  )}
</ul>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer
        style={{
          marginTop: "70px",
          padding: "clamp(20px, 5vw, 30px) clamp(16px, 6vw, 60px)",
          borderTop: "1px solid rgba(0,0,0,0.08)",
          color: "#555",
          fontSize: "13px",
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 10 px" }}>
          <p style={{ margin: 0 }}>
            © {new Date().getFullYear()} Middle East Study Lab • создано для студентов и исследователей региона
          </p>
        </div>
      </footer>
    </div>
  );
}