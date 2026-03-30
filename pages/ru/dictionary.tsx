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
      .select("*")
      .order("term", { ascending: true });

    if (data) setTerms(data);
  }

  const filtered = terms.filter((t) =>
    t.term.toLowerCase().includes(search.toLowerCase())
  );

  return (
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
          borderRadius: "12px",
          border: "1px solid #ddd",
          marginBottom: "30px",
        }}
      />

      {/* Список */}
      <div style={{ display: "grid", gap: "14px" }}>
        {filtered.map((item) => (
          <div
            key={item.id}
            style={{
              padding: "18px",
              borderRadius: "16px",
              background: "white",
              border: "1px solid rgba(0,0,0,0.08)",
            }}
          >
            <h3 style={{ margin: "0 0 6px" }}>{item.term}</h3>
            <p style={{ margin: 0, color: "#555" }}>
              {item.definition}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}