"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

type Term = {
  id: number;
  term: string;
  definition: string;
};

export default function DictionaryPage() {
  const [terms, setTerms] = useState<Term[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchTerms();
  }, []);

  async function fetchTerms() {
    const { data } = await supabase
      .from("dictionary")
      .select("*");

    if (data) setTerms(data);
  }

  // 🔍 фильтрация + сортировка
  const filtered = terms
    .filter((t) =>
      t.term.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => a.term.localeCompare(b.term, "ru"));

  // 🔠 группировка по буквам
  const grouped = filtered.reduce((acc: Record<string, Term[]>, item) => {
    const letter = item.term[0].toUpperCase();

    if (!acc[letter]) {
      acc[letter] = [];
    }

    acc[letter].push(item);

    return acc;
  }, {});

  return (
    <div style={{ background: "#f8f6f2", minHeight: "100vh" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "70px 20px" }}>
        
        <h1 style={{ fontSize: "34px", marginBottom: "20px" }}>
          Словарь терминов
        </h1>

        {/* Поиск */}
        <input
          placeholder="Поиск термина..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "14px",
            border: "1px solid rgba(0,0,0,0.1)",
            marginBottom: "40px",
            fontSize: "15px",
            background: "white",
          }}
        />

        {/* Словарь */}
        {Object.keys(grouped).length === 0 && (
          <p style={{ color: "#666" }}>Ничего не найдено</p>
        )}

        {Object.keys(grouped).map((letter) => (
          <div key={letter} style={{ marginBottom: "40px" }}>
            
            {/* Буква */}
            <h2
              style={{
                fontSize: "22px",
                marginBottom: "16px",
                color: "#6b5a44",
                borderBottom: "1px solid rgba(0,0,0,0.08)",
                paddingBottom: "6px",
                position: "sticky",
                top: "70px",
                background: "#f8f6f2",
                zIndex: 5,
              }}
            >
              {letter}
            </h2>

            {/* Карточки */}
            <div style={{ display: "grid", gap: "14px" }}>
              {grouped[letter].map((item) => (
                <div
                  key={item.id}
                  style={{
                    padding: "18px",
                    borderRadius: "16px",
                    background: "white",
                    border: "1px solid rgba(0,0,0,0.06)",
                    boxShadow: "0 4px 14px rgba(0,0,0,0.04)",
                    transition: "0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-3px)";
                    e.currentTarget.style.boxShadow =
                      "0 8px 20px rgba(0,0,0,0.08)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 14px rgba(0,0,0,0.04)";
                  }}
                >
                  <h3 style={{ margin: "0 0 6px", fontSize: "16px" }}>
                    {item.term}
                  </h3>

                  <p style={{ margin: 0, fontSize: "14px", color: "#555", lineHeight: "1.6" }}>
                    {item.definition}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}