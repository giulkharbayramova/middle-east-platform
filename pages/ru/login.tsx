import { useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../lib/supabaseClient";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    if (data.user) {
      router.push("/ru/profile");
    }

    setLoading(false);
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
          Вход
        </h1>

        <form
          style={{ display: "flex", flexDirection: "column", gap: "18px" }}
          onSubmit={handleLogin}
        >
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
            {loading ? "Входим..." : "Войти"}
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
          Нет аккаунта?{" "}
          <a
            href="/ru/register"
            style={{ color: "#1d1d1d", textDecoration: "underline" }}
          >
            Зарегистрироваться
          </a>
        </p>
      </div>
    </div>
  );
}
