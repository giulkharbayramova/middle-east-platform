"use client";

export default function AboutPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8f6f2",
        padding: "clamp(30px, 6vw, 80px) 20px",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        {/* Заголовок */}
        <h1
          style={{
            fontSize: "clamp(28px, 4vw, 42px)",
            marginBottom: "20px",
            color: "#1d1d1d",
          }}
        >
          О проекте
        </h1>

        {/* Подзаголовок */}
        <p
          style={{
            fontSize: "clamp(16px, 2.5vw, 18px)",
            color: "#555",
            lineHeight: 1.7,
            marginBottom: "40px",
          }}
        >
          Middle East Study Lab — это образовательная платформа,
          посвящённая изучению стран Ближнего Востока, их политики,
          экономики и культурных особенностей. Кроме того, мы стремимся охватить и другие страны, которые играют немаловажную роль для Ближнего Востока как в религиозном плане, так и в плане геополитики. Наша цель — предоставить студентам и исследователям удобный инструмент для глубокого понимания региона и его динамики.
        </p>

        {/* Карточка */}
        <div
          style={{
            borderRadius: "24px",
            padding: "clamp(20px, 4vw, 30px)",
            background: "rgba(255,255,255,0.8)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(0,0,0,0.08)",
            boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
            marginBottom: "30px",
          }}
        >
          <h2 style={{ marginBottom: "14px" }}>Цель проекта</h2>

          <p style={{ color: "#444", lineHeight: 1.8 }}>
            Создать удобную и современную образовательную среду для студентов,
            интересующихся Ближним Востоком, где теория сочетается с практикой,
            а обучение — с аналитическим мышлением.
          </p>
        </div>

        {/* Карточка */}
        <div
          style={{
            borderRadius: "24px",
            padding: "clamp(20px, 4vw, 30px)",
            background: "rgba(255,255,255,0.8)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(0,0,0,0.08)",
            boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
            marginBottom: "30px",
          }}
        >
          <h2 style={{ marginBottom: "14px" }}>Разделы платформы</h2>

          <ul style={{ paddingLeft: "18px", lineHeight: 1.8 }}>
            <li>Учебные модули с заданиями</li>
            <li>Тесты для проверки знаний</li>
            <li>Библиотека материалов</li>
            <li>Персональный кабинет студента</li>
          </ul>
        </div>

        {/* Карточка */}
        <div
          style={{
            borderRadius: "24px",
            padding: "clamp(20px, 4vw, 30px)",
            background: "rgba(255,255,255,0.8)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(0,0,0,0.08)",
            boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
          }}
        >
          <h2 style={{ marginBottom: "14px" }}>Для кого</h2>

          <p style={{ color: "#444", lineHeight: 1.8 }}>
            Платформа предназначена для студентов, исследователей и всех,
            кто хочет глубже понять регион Ближнего Востока и его роль
            в мировой политике.
          </p>
        </div>
      </div>
    </div>
  );
}