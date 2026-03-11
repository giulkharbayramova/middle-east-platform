import { useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../lib/supabaseClient";

export default function Register() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [groupNumber, setGroupNumber] = useState("1");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Регистрация пользователя через Supabase v2
      const { data, error } = await supabase.auth.signUp({
  email,
  password,
});

if (error) {
  setError(error.message);
  setLoading(false);
  return;
}

if (data.user) {
  const { error: profileError } = await supabase.from("profiles").insert({
    id: data.user.id,
    username,
    group_number: groupNumber,
  });

  if (profileError) {
    console.log("Ошибка вставки в profiles:", profileError);
    setError("Profiles error: " + profileError.message);
    setLoading(false);
    return;
  }

  router.push("/ru/login");
      }
    } catch (err) {
      setError("Произошла ошибка регистрации.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f8f6f2",
        padding: "20px",
      }}
    >
      <div
        style={{
          maxWidth: "420px",
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

        <h1
          style={{
            marginBottom: "24px",
            fontSize: "28px",
            color: "#1d1d1d",
            textAlign: "center",
          }}
        >
          Регистрация
        </h1>

        <form
          style={{ display: "flex", flexDirection: "column", gap: "18px" }}
          onSubmit={handleRegister}
        >
          <input
            type="text"
            placeholder="ФИО"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              padding: "12px 14px",
              borderRadius: "12px",
              border: "1px solid rgba(0,0,0,0.15)",
              fontSize: "14px",
            }}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              padding: "12px 14px",
              borderRadius: "12px",
              border: "1px solid rgba(0,0,0,0.15)",
              fontSize: "14px",
            }}
            required
          />
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              padding: "12px 14px",
              borderRadius: "12px",
              border: "1px solid rgba(0,0,0,0.15)",
              fontSize: "14px",
            }}
            required
          />
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
  <label style={{ fontSize: "13px", opacity: 0.7 }}>Номер группы</label>

  <select
    value={groupNumber}
    onChange={(e) => setGroupNumber(e.target.value)}
    style={{
      padding: "12px 14px",
      borderRadius: "12px",
      border: "1px solid rgba(0,0,0,0.12)",
      fontSize: "12px",
      outline: "none",
      background: "white",
    }}
  >
    <option value="1">Востоковедение. Группа 1</option>
    <option value="2">Востоковедение. Группа 2</option>
    <option value="3">Востоковедение. Группа 3</option>
    <option value="4">Востоковедение. Группа 4</option>
    <option value="5">Востоковедение. Группа 5</option>
    <option value="6">Востоковедение. Группа 6</option>
    <option value="7">Майнор. Группа 1</option>
    <option value="8">Майнор. Группа 2</option>
  </select>
</div>

          <button
            type="submit"
            disabled={loading}
            style={{
              padding: "12px 0",
              borderRadius: "999px",
              background: "#1d1d1d",
              color: "#fff",
              fontSize: "16px",
              border: "none",
              cursor: "pointer",
              marginTop: "8px",
            }}
          >
            {loading ? "Регистрация..." : "Зарегистрироваться"}
          </button>
        </form>

        {error && (
          <p
            style={{
              color: "red",
              marginTop: "14px",
              fontSize: "14px",
              textAlign: "center",
            }}
          >
            {error}
          </p>
        )}

        <p
          style={{
            marginTop: "18px",
            textAlign: "center",
            fontSize: "13px",
            color: "#555",
          }}
        >
          Уже есть аккаунт?{" "}
          <a
            href="/ru/login"
            style={{ color: "#1d1d1d", textDecoration: "underline" }}
          >
            Войти
          </a>
        </p>
      </div>
    </div>
  );
}
