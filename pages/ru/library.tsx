"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

type LibraryItem = {
  id: string;
  title: string;
  type: string;
  country: string;
  description: string;
  link: string | null;
};

const countryRuMap: Record<string, string> = {
  Islam: "Ислам",
  "All countries": "Ближний Восток",
  "Saudi Arabia": "Саудовская Аравия",
  "United Arab Emirates": "ОАЭ",
  Egypt: "Египет",
  Iran: "Иран",
  Iraq: "Ирак",
  Syria: "Сирия",
  Jordan: "Иордания",
  Lebanon: "Ливан",
  Qatar: "Катар",
  Kuwait: "Кувейт",
  Oman: "Оман",
  Yemen: "Йемен",
  Turkey: "Турция",
  Israel: "Израиль",
  Palestine: "Палестина",
  Bahrain: "Бахрейн",
};

export default function LibraryPage() {
  const [items, setItems] = useState<LibraryItem[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    getUser();
    fetchLibrary();
  }, [selectedCountry, selectedType]);

  async function getUser() {
    const { data } = await supabase.auth.getUser();
    if (data.user) {
      setUserId(data.user.id);
      fetchFavorites(data.user.id);
    }
  }

  async function fetchLibrary() {
    let query = supabase.from("library_items").select("*");

if (selectedCountry) {
  query = query.eq("country", selectedCountry);
}

if (selectedType) {
  query = query.eq("type", selectedType);
}

    const { data } = await query.order("created_at", {
      ascending: false,
    });

    if (data) setItems(data);
  }

  async function fetchFavorites(uid: string) {
    const { data } = await supabase
      .from("favorites")
      .select("library_item_id")
      .eq("user_id", uid);

    if (data) {
      setFavorites(data.map((f) => f.library_item_id));
    }
  }

  async function toggleFavorite(itemId: string) {
    if (!userId) return;

    if (favorites.includes(itemId)) {
      await supabase
        .from("favorites")
        .delete()
        .eq("library_item_id", itemId)
        .eq("user_id", userId);

      setFavorites(favorites.filter((id) => id !== itemId));
    } else {
      await supabase.from("favorites").insert({
        user_id: userId,
        library_item_id: itemId,
      });

      setFavorites([...favorites, itemId]);
    }
  }

  return (
    <div style={{ background: "#f8f6f2", minHeight: "100vh", padding: "60px 20px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "36px", marginBottom: "30px" }}>
          Библиотека
        </h1>

        {/* Фильтр */}
        <select
          onChange={(e) =>
            setSelectedCountry(e.target.value || null)
          }
          style={{
            padding: "12px 20px",
            borderRadius: "12px",
            marginBottom: "40px",
            border: "1px solid #ddd",
          }}
        >
          <option value="">Выбрать</option>
          {Object.entries(countryRuMap).map(([eng, ru]) => (
            <option key={eng} value={eng}>
              {ru}
            </option>
          ))}
        </select>
        <div style={{ marginBottom: "26px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
  {[
    { label: "Все", value: null },
    { label: "Книга", value: "Книга" },
    { label: "Статья", value: "Статья" },
    { label: "Фильм", value: "Фильм" },
    { label: "Электронный журнал", value: "Электронный журнал" },
    { label: "Комикс", value: "Комикс" }
  ].map((type) => (
    <button
      key={type.label}
      onClick={() => setSelectedType(type.value)}
      style={{
        padding: "8px 14px",
        borderRadius: "999px",
        border: "1px solid rgba(0,0,0,0.15)",
        background:
          selectedType === type.value ? "#1d1d1d" : "transparent",
        color:
          selectedType === type.value ? "white" : "#1d1d1d",
        cursor: "pointer",
        fontSize: "13px",
        transition: "0.2s"
      }}
    >
      {type.label}
    </button>
  ))}
</div>

        {/* Сетка карточек */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "24px",
          }}
        >
          {items.map((item) => {
            const isFav = favorites.includes(item.id);

            return (
              <div
                key={item.id}
                style={{
                  padding: "24px",
                  borderRadius: "24px",
                  background: "white",
                  transition: "0.3s",
                  boxShadow: "0 6px 18px rgba(0,0,0,0.05)",
                  position: "relative",
                }}
              >
                {/* Избранное */}
                <button
                  onClick={() => toggleFavorite(item.id)}
                  style={{
                    position: "absolute",
                    top: "14px",
                    right: "16px",
                    background: "none",
                    border: "none",
                    fontSize: "18px",
                    cursor: "pointer",
                  }}
                >
                  {isFav ? "⭐" : "☆"}
                </button>

                <div style={{ fontSize: "12px", color: "#888" }}>
                  {item.type} • {countryRuMap[item.country]}
                </div>

                <h3 style={{ margin: "10px 0 12px" }}>
                  {item.title}
                </h3>

                <p style={{ fontSize: "14px", color: "#555" }}>
                  {item.description}
                </p>

                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: "inline-block",
                      marginTop: "14px",
                      fontSize: "14px",
                      color: "#6b5a44",
                    }}
                  >
                    Открыть →
                  </a>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}