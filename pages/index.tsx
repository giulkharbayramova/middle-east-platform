export default function Home() {
  return (
    <div style={{ background: "#f8f6f2", minHeight: "100vh" }}>

      {/* HERO */}
      <main style={{ padding: "70px 60px" }}>
        <section
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            padding: "70px 60px",
            borderRadius: "28px",
            backgroundImage: "url('/hero-bg.png')",
backgroundSize: "cover",
backgroundPosition: "center",
            border: "1px solid rgba(0,0,0,0.08)",
            boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
            position: "relative",
            overflow: "hidden"
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
              filter: "blur(30px)"
            }}
          />

          <div style={{ position: "relative", zIndex: 2 }}>
            <p style={{ fontSize: "13px", letterSpacing: "1px", textTransform: "uppercase", color: "#6b5a44" }}>
              образовательная платформа
            </p>

            <h1 style={{ fontSize: "46px", margin: "18px 0", lineHeight: "1.15", color: "#1d1d1d" }}>
              Ближний Восток: бизнес, культура и дипломатия
            </h1>

            <p style={{ fontSize: "18px", maxWidth: "650px", color: "#444", lineHeight: "1.6" }}>
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
                  fontSize: "14px"
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
                  fontSize: "14px"
                }}
              >
                Посмотреть разделы
              </a>
            </div>
          </div>
        </section>

        {/* SECTIONS */}
        <section id="sections" style={{ maxWidth: "1100px", margin: "60px auto 0" }}>
          <h2 style={{ fontSize: "26px", marginBottom: "22px", color: "#1d1d1d" }}>
            Разделы платформы
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "18px"
            }}
          >
            {[
              { title: "📚 Библиотека", desc: "Книги, статьи и подборки по странам региона." },
              { title: "🧠 Квизы", desc: "Проверяй знания по культуре, политике и экономике." },
              { title: "🗺️ Карта региона", desc: "Интерактивное изучение стран и ключевых понятий." },
              { title: "✨ Факты дня", desc: "Небольшие факты, которые делают понимание глубже." }
            ].map((item) => (
              <div
                key={item.title}
                style={{
                  padding: "22px",
                  borderRadius: "20px",
                  background: "rgba(255,255,255,0.8)",
                  border: "1px solid rgba(0,0,0,0.08)",
                  boxShadow: "0 6px 18px rgba(0,0,0,0.04)"
                }}
              >
                <h3 style={{ fontSize: "18px", marginBottom: "10px", color: "#1d1d1d" }}>
                  {item.title}
                </h3>
                <p style={{ margin: 0, fontSize: "14px", color: "#555", lineHeight: "1.5" }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* UPDATES */}
        <section style={{ maxWidth: "1100px", margin: "70px auto 0" }}>
          <h2 style={{ fontSize: "26px", marginBottom: "18px", color: "#1d1d1d" }}>
            Что нового
          </h2>

          <div
            style={{
              borderRadius: "22px",
              padding: "26px",
              background: "rgba(255,255,255,0.8)",
              border: "1px solid rgba(0,0,0,0.08)"
            }}
          >
            <ul style={{ margin: 0, paddingLeft: "18px", color: "#444", lineHeight: "1.8" }}>
              <li>Добавлен квиз: «Деловая культура ОАЭ»</li>
              <li>Обновлена подборка литературы по Gulf Studies</li>
              <li>Новый раздел: «Термины дипломатического языка»</li>
            </ul>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer
        style={{
          marginTop: "70px",
          padding: "30px 60px",
          borderTop: "1px solid rgba(0,0,0,0.08)",
          color: "#555",
          fontSize: "13px"
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <p style={{ margin: 0 }}>
            © {new Date().getFullYear()} Middle East Study Lab • создано для студентов и исследователей региона
          </p>
        </div>
      </footer>
    </div>
  );
}
