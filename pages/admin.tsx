"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { isAdmin } from "../lib/isAdmin";

export default function AdminPage() {
  const [user, setUser] = useState<any>(null);
  const [allowed, setAllowed] = useState(false);

  const [tests, setTests] = useState<any[]>([]);
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [newText, setNewText] = useState("");

  useEffect(() => {
    checkUser();
    fetchTests();
    fetchAnnouncements();
  }, []);

  async function checkUser() {
    const { data } = await supabase.auth.getUser();
    setUser(data.user);

    if (isAdmin(data.user?.email)) {
      setAllowed(true);
    }
  }

  // 📊 тесты
  async function fetchTests() {
    const { data } = await supabase
      .from("test_results")
      .select("*");

    if (data) setTests(data);
  }

  // 📢 объявления
  async function fetchAnnouncements() {
    const { data } = await supabase
      .from("announcements")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) setAnnouncements(data);
  }

  async function addAnnouncement() {
    if (!newText) return;

    await supabase.from("announcements").insert({
      text: newText,
    });

    setNewText("");
    fetchAnnouncements();
  }

  async function deleteAnnouncement(id: number) {
    await supabase
      .from("announcements")
      .delete()
      .eq("id", id);

    fetchAnnouncements();
  }

  if (!allowed) {
    return <p style={{ padding: "40px" }}>Нет доступа</p>;
  }

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "70px 20px" }}>
      
      <h1>Админ-панель</h1>

      {/* 📊 ТЕСТЫ */}
      <section style={{ marginTop: "40px" }}>
        <h2>Результаты студентов</h2>

        {tests.map((t) => (
          <div key={t.id} style={{ marginBottom: "10px" }}>
            Пользователь: {t.user_id} | Урок: {t.lesson_id} | Балл: {t.score}
          </div>
        ))}
      </section>

      {/* 📢 ОБЪЯВЛЕНИЯ */}
      <section style={{ marginTop: "50px" }}>
        <h2>Объявления</h2>

        <div style={{ marginBottom: "20px" }}>
          <input
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            placeholder="Новое объявление"
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
            }}
          />

          <button onClick={addAnnouncement}>
            Добавить
          </button>
        </div>

        {announcements.map((a) => (
          <div
            key={a.id}
            style={{
              padding: "12px",
              border: "1px solid #ddd",
              marginBottom: "10px",
            }}
          >
            {a.text}

            <button
              onClick={() => deleteAnnouncement(a.id)}
              style={{ marginLeft: "10px" }}
            >
              удалить
            </button>
          </div>
        ))}
      </section>
    </div>
  );
}