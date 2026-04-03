import { useRouter } from "next/router";

export default function Privacy() {
  const router = useRouter();

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        background: "#f8f6f2",
        padding: "20px",
      }}
    >
      <div
        style={{
          maxWidth: "700px",
          width: "100%",
          padding: "40px",
          borderRadius: "28px",
          background: "rgba(255,255,255,0.9)",
          border: "1px solid rgba(0,0,0,0.08)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Восточный акцент */}
        <div
          style={{
            position: "absolute",
            top: "-60px",
            right: "-60px",
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            background: "rgba(180, 140, 90, 0.12)",
            filter: "blur(25px)",
          }}
        />

        {/* Кнопка назад */}
        <button
          onClick={() => router.back()}
          style={{
            marginBottom: "20px",
            padding: "8px 16px",
            borderRadius: "999px",
            border: "1px solid rgba(0,0,0,0.15)",
            background: "transparent",
            cursor: "pointer",
            fontSize: "13px",
          }}
        >
          ← Назад
        </button>

        <h1
          style={{
            marginBottom: "20px",
            fontSize: "26px",
            color: "#1d1d1d",
          }}
        >
          Политика конфиденциальности
        </h1>

        <p style={{ fontSize: "13px", color: "#555", marginBottom: "20px" }}>
          <strong>Дата вступления в силу:</strong> 01.04.2026
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px", fontSize: "14px", color: "#333", lineHeight: "1.6" }}>
          
          <div>
            <h3 style={{ marginBottom: "6px" }}>1. Какие данные мы собираем</h3>
            <p>
              Мы собираем ФИО, адрес электронной почты, а также результаты
              прохождения заданий и активности на сайте.
            </p>
          </div>

          <div>
            <h3 style={{ marginBottom: "6px" }}>2. Цели обработки данных</h3>
            <p>
              Данные используются для регистрации, предоставления доступа к
              сервису, сохранения результатов и улучшения работы сайта.
            </p>
          </div>

          <div>
            <h3 style={{ marginBottom: "6px" }}>3. Хранение и защита данных</h3>
            <p>
              Мы принимаем меры для защиты данных и используем надёжные сторонние
              сервисы для хранения информации.
            </p>
          </div>

          <div>
            <h3 style={{ marginBottom: "6px" }}>4. Передача данных</h3>
            <p>
              Мы не передаём данные третьим лицам, кроме случаев, необходимых для
              работы сервиса или предусмотренных законом.
            </p>
          </div>

          <div>
            <h3 style={{ marginBottom: "6px" }}>5. Срок хранения</h3>
            <p>
              Данные хранятся до удаления аккаунта или по запросу пользователя.
            </p>
          </div>

          <div>
            <h3 style={{ marginBottom: "6px" }}>6. Права пользователя</h3>
            <p>
              Вы можете запросить доступ, изменение или удаление своих данных,
              написав на email: <strong>giulkhar.bayramova@gmail.com</strong>
            </p>
          </div>

          <div>
            <h3 style={{ marginBottom: "6px" }}>7. Cookies</h3>
            <p>
              Сайт может использовать cookies для корректной работы и аналитики.
            </p>
          </div>

          <div>
            <h3 style={{ marginBottom: "6px" }}>8. Контакты</h3>
            <p>
              Email: <strong>giulkhar.bayramova@gmail.com</strong>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}