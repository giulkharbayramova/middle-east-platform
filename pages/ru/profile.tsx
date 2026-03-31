import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../lib/supabaseClient";

type AvatarStyle = "sand" | "arch" | "moon" | "tile" | "ink" | "desert";

export default function Profile() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const [username, setUsername] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [groupNumber, setGroupNumber] = useState<string | null>(null);
  const [avatarStyle, setAvatarStyle] = useState<AvatarStyle>("sand");
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
  const [isEditing, setIsEditing] = useState(false);
  const [favorites, setFavorites] = useState<any[]>([]);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("Начинающий советник");
  // Поля редактирования
  const [editUsername, setEditUsername] = useState("");
  const [editGroupNumber, setEditGroupNumber] = useState("1");
  const [editAvatarStyle, setEditAvatarStyle] = useState<AvatarStyle>("sand");

  const avatarThemes: Record<AvatarStyle, { bg: string; border: string }> = {
  sand: {
    bg: "linear-gradient(135deg, #f7efe2, #ead9bf)",
    border: "rgba(190, 150, 95, 0.55)",
  },
  arch: {
    bg: "linear-gradient(135deg, #f5f1ea, #e8dfd2)",
    border: "rgba(180, 140, 90, 0.55)",
  },
  moon: {
    bg: "linear-gradient(135deg, #eef3fb, #d9e3f3)",
    border: "rgba(80, 110, 160, 0.40)",
  },
  tile: {
    bg: "linear-gradient(135deg, #e7f4f0, #cfe6df)",
    border: "rgba(60, 110, 95, 0.50)",
  },
  ink: {
    bg: "linear-gradient(135deg, #f6f6f6, #dedede)",
    border: "rgba(20, 20, 20, 0.20)",
  },
  desert: {
    bg: "linear-gradient(135deg, #fdebd6, #f3cfaa)",
    border: "rgba(175, 110, 65, 0.50)",
  },
};


  const AvatarIcon = ({ type }: { type: AvatarStyle }) => {
    const common = {
      width: "22px",
      height: "22px",
      opacity: 0.8,
    };

    if (type === "arch") {
      return (
        <svg viewBox="0 0 24 24" style={common} fill="none">
          <path
            d="M6 20V11C6 7.686 8.686 5 12 5C15.314 5 18 7.686 18 11V20"
            stroke="rgba(0,0,0,0.65)"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <path
            d="M9 20V12C9 10.343 10.343 9 12 9C13.657 9 15 10.343 15 12V20"
            stroke="rgba(0,0,0,0.55)"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
      );
    }

    if (type === "moon") {
      return (
        <svg viewBox="0 0 24 24" style={common} fill="none">
          <path
            d="M16.5 3.5C12.5 4.2 9.5 7.7 9.5 12C9.5 16.3 12.5 19.8 16.5 20.5C10.8 21.2 6 17 6 12C6 7 10.8 2.8 16.5 3.5Z"
            stroke="rgba(0,0,0,0.65)"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
        </svg>
      );
    }

    if (type === "tile") {
  return (
    <svg viewBox="0 0 24 24" style={common} fill="none">
      <path
        d="M12 4L18 10L12 16L6 10L12 4Z"
        stroke="rgba(0,0,0,0.60)"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <path
        d="M12 8L15 11L12 14L9 11L12 8Z"
        stroke="rgba(0,0,0,0.35)"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path
        d="M6 20H18"
        stroke="rgba(0,0,0,0.20)"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
    </svg>
  );
    }

    if (type === "ink") {
  return (
    <svg viewBox="0 0 24 24" style={common} fill="none">
      {/* книга */}
      <path
        d="M7 6.5C7 5.67 7.67 5 8.5 5H18C18.55 5 19 5.45 19 6V18.5C19 18.78 18.78 19 18.5 19H8.8C7.8 19 7 18.2 7 17.2V6.5Z"
        stroke="rgba(0,0,0,0.70)"
        strokeWidth="1.35"
        strokeLinejoin="round"
      />

      {/* линия корешка */}
      <path
        d="M9.2 5V19"
        stroke="rgba(0,0,0,0.35)"
        strokeWidth="1.2"
        strokeLinecap="round"
      />

      {/* страницы */}
      <path
        d="M11.5 9H16.8"
        stroke="rgba(0,0,0,0.35)"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      <path
        d="M11.5 12H16.8"
        stroke="rgba(0,0,0,0.28)"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      <path
        d="M11.5 15H15.8"
        stroke="rgba(0,0,0,0.22)"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
    </svg>
  );
}

    if (type === "desert") {
  return (
    <svg viewBox="0 0 24 24" style={common} fill="none">
      <path
        d="M15 8C15 6.343 13.657 5 12 5C10.343 5 9 6.343 9 8"
        stroke="rgba(0,0,0,0.55)"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <path
        d="M4 18C7 14.5 10.5 14.5 13.5 18C15.5 20 18.5 20 20 18"
        stroke="rgba(0,0,0,0.65)"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M6 14C8 12.5 10 12.5 12 14"
        stroke="rgba(0,0,0,0.30)"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}


    // sand (default)
return (
  <svg viewBox="0 0 24 24" style={common} fill="none">
    <path
      d="M4 16C7 13 10 13 13 16C15 18 18 18 20 16"
      stroke="rgba(0,0,0,0.62)"
      strokeWidth="1.4"
      strokeLinecap="round"
    />
    <path
      d="M6 12C8 10.5 10 10.5 12 12"
      stroke="rgba(0,0,0,0.35)"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
    <path
      d="M5 18H19"
      stroke="rgba(0,0,0,0.20)"
      strokeWidth="1.1"
      strokeLinecap="round"
    />
  </svg>
);
  };

  useEffect(() => {
    const loadProfile = async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      const session = sessionData.session;

      if (!session) {
        router.push("/ru/login");
        return;
      }

      setEmail(session.user.email ?? null);
      // Загружаем избранные материалы
const { data: favData } = await supabase
  .from("favorites")
  .select(`
    id,
    library_items (
      id,
      title,
      type,
      country,
      description,
      link
    )
  `)
  .eq("user_id", session.user.id);

if (favData) {
  setFavorites(favData);
}
      const { data: profileData, error } = await supabase
        .from("profiles")
        .select("username, group_number, avatar_style")
        .eq("id", session.user.id)
        .single();

      if (error) {
        console.log("Ошибка загрузки профиля:", error.message);
      }

      if (profileData?.username) setUsername(profileData.username);
      if (profileData?.group_number) setGroupNumber(profileData.group_number);

      if (
        profileData?.avatar_style &&
        ["sand", "arch", "moon", "tile", "ink", "desert"].includes(
          profileData.avatar_style
        )
      ) {
        setAvatarStyle(profileData.avatar_style as AvatarStyle);
      }
// загрузка прогресса обучения
const { data: testData } = await supabase
  .from("test_results")
  .select("lesson_id, score")
  .eq("user_id", session.user.id);

if (testData) {
  const passed = testData.filter((t) => t.score >= 60);

  const modulesTotal = 7; // количество модулей
  const percent = Math.round((passed.length / modulesTotal) * 100);

  setProgress(percent);

  if (percent <= 30) {
    setStatus("Помощник дипломата");
  } else if (percent <= 70) {
    setStatus("Начинающий дипломат");
  } else {
    setStatus("Опытный дипломат");
  }
}
      setLoading(false);
    };

    loadProfile();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/ru/login");
  };

  const openEdit = () => {
    setEditUsername(username ?? "");
    setEditGroupNumber(groupNumber ?? "1");
    setEditAvatarStyle(avatarStyle);
    setIsEditing(true);
  };

  const saveProfile = async () => {
    const { data: sessionData } = await supabase.auth.getSession();
    const session = sessionData.session;

    if (!session) return;

    const { error } = await supabase
      .from("profiles")
      .update({
        username: editUsername,
        group_number: editGroupNumber,
        avatar_style: editAvatarStyle,
      })
      .eq("id", session.user.id);

    if (error) {
      alert("Ошибка сохранения: " + error.message);
      return;
    }

    setUsername(editUsername);
    setGroupNumber(editGroupNumber);
    setAvatarStyle(editAvatarStyle);

    setIsEditing(false);
  };

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#f8f6f2",
        }}
      >
        <p style={{ fontSize: "16px", color: "#444" }}>Загрузка...</p>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8f6f2",
        padding: "50px 20px",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        {/* Главная карточка профиля */}
        <div
          style={{
            padding: "34px",
            borderRadius: "28px",
            background: "rgba(255,255,255,0.9)",
            border: "1px solid rgba(0,0,0,0.08)",
            boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
            position: "relative",
            overflow: "hidden",
            marginBottom: "22px",
          }}
        >
          {/* Восточный акцент */}
          <div
            style={{
              position: "absolute",
              top: "-70px",
              right: "-70px",
              width: "200px",
              height: "200px",
              borderRadius: "50%",
              background: "rgba(180, 140, 90, 0.12)",
              filter: "blur(35px)",
            }}
          />

          <p
            style={{
              fontSize: "12px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              opacity: 0.6,
              marginBottom: "10px",
            }}
          >
            Профиль
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: "20px",
              flexWrap: "wrap",
            }}
          >
            <div style={{ display: "flex", gap: "18px", alignItems: "center" }}>
              {/* Аватар */}
              <div
                style={{
                  width: "70px",
                  height: "70px",
                  borderRadius: "999px",
                  border: `1px solid ${avatarThemes[avatarStyle].border}`,
                  background: avatarThemes[avatarStyle].bg,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  boxShadow: "0 10px 22px rgba(0,0,0,0.08)",
                }}
              >
                <AvatarIcon type={avatarStyle} />
              </div>

              <div>
                <h1
                  style={{
                    fontSize: "28px",
                    marginBottom: "6px",
                    color: "#1d1d1d",
                    fontWeight: 600,
                  }}
                >
                  {username ?? "Пользователь"}
                </h1>

                <p style={{ color: "#555", fontSize: "14px", margin: 0 }}>
                  Личный кабинет студента платформы 
                </p>
              </div>
            </div>

            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <button
                onClick={openEdit}
                style={{
                  padding: "12px 18px",
                  borderRadius: "999px",
                  background: "transparent",
                  color: "#1d1d1d",
                  fontSize: "14px",
                  border: "1px solid rgba(0,0,0,0.14)",
                  cursor: "pointer",
                  opacity: 0.9,
                }}
              >
                Редактировать
              </button>

              <button
                onClick={handleLogout}
                style={{
                  padding: "12px 18px",
                  borderRadius: "999px",
                  background: "#1d1d1d",
                  color: "#fff",
                  fontSize: "14px",
                  border: "none",
                  cursor: "pointer",
                  opacity: 0.92,
                }}
              >
                Выйти
              </button>
            </div>
          </div>

          {/* Инфо-плашки */}
          <div
            style={{
              marginTop: "26px",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "14px",
            }}
          >
            <div
              style={{
                padding: "16px 18px",
                borderRadius: "18px",
                border: "1px solid rgba(0,0,0,0.08)",
                background: "rgba(255,255,255,0.7)",
              }}
            >
              <p style={{ fontSize: "12px", color: "#777", marginBottom: "6px" }}>
                Email
              </p>
              <p style={{ fontSize: "15px", color: "#1d1d1d", fontWeight: 600 }}>
                {email ?? "Не найден"}
              </p>
            </div>

            <div
              style={{
                padding: "16px 18px",
                borderRadius: "18px",
                border: "1px solid rgba(0,0,0,0.08)",
                background: "rgba(255,255,255,0.7)",
              }}
            >
              <p style={{ fontSize: "12px", color: "#777", marginBottom: "6px" }}>
                Номер группы
              </p>
              <p style={{ fontSize: "15px", color: "#1d1d1d", fontWeight: 600 }}>
                {groupNumber ?? "Не указано"}
              </p>
            </div>

            <div
              style={{
                padding: "16px 18px",
                borderRadius: "18px",
                border: "1px solid rgba(0,0,0,0.08)",
                background: "rgba(255,255,255,0.7)",
              }}
            >
              <p style={{ fontSize: "12px", color: "#777", marginBottom: "6px" }}>
                Статус обучения
              </p>
              <p style={{ fontSize: "15px", color: "#1d1d1d", fontWeight: 600 }}>
                {status}
              </p>
            </div>
          </div>
        </div>

        {/* Нижние секции */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "18px",
          }}
        >
          {/* Прогресс */}
          <div
            style={{
              padding: "24px",
              borderRadius: "24px",
              background: "rgba(255,255,255,0.85)",
              border: "1px solid rgba(0,0,0,0.08)",
              boxShadow: "0 10px 25px rgba(0,0,0,0.04)",
            }}
          >
            <h2 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "10px" }}>
              Прогресс обучения
            </h2>

            <p style={{ fontSize: "14px", opacity: 0.7, lineHeight: 1.6 }}>
              Здесь будет отображаться общий прогресс по модулям.
            </p>

            <div style={{ marginTop: "18px" }}>
              <div
                style={{
                  height: "8px",
                  width: "100%",
                  borderRadius: "999px",
                  background: "rgba(0,0,0,0.08)",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: progress + "%",
                    borderRadius: "999px",
                    background: "rgba(180, 140, 90, 0.85)",
                  }}
                />
              </div>

              <p style={{ fontSize: "12px", opacity: 0.55, marginTop: "10px" }}>
                {progress}% курса завершено
              </p>
            </div>
          </div>

          {/* Избранное */}
<div
  style={{
    padding: "24px",
    borderRadius: "24px",
    background: "rgba(255,255,255,0.85)",
    border: "1px solid rgba(0,0,0,0.08)",
    boxShadow: "0 10px 25px rgba(0,0,0,0.04)",
  }}
>
  <h2 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "14px" }}>
    Избранные материалы
  </h2>

  {favorites.length === 0 && (
    <p style={{ fontSize: "14px", opacity: 0.6 }}>
      У вас пока нет избранных материалов.
    </p>
  )}

  <div
    style={{
      marginTop: "12px",
      display: "grid",
      gap: "14px",
    }}
  >
    {favorites.map((fav) => {
      const item = fav.library_items;
      if (!item) return null;

      return (
        <div
          key={item.id}
          style={{
            padding: "16px",
            borderRadius: "18px",
            border: "1px solid rgba(0,0,0,0.08)",
            background: "rgba(255,255,255,0.75)",
            transition: "0.25s ease",
            cursor: "default",
          }}
        >
          <div
            style={{
              fontSize: "12px",
              opacity: 0.6,
              marginBottom: "6px",
              letterSpacing: "0.03em",
            }}
          >
            {item.type} • {item.country}
          </div>

          <div
            style={{
              fontSize: "15px",
              fontWeight: 600,
              marginBottom: item.description ? "6px" : "0px",
              color: "#1d1d1d",
            }}
          >
            {item.title}
          </div>

          {item.description && (
            <div
              style={{
                fontSize: "13px",
                opacity: 0.75,
                lineHeight: 1.5,
                marginBottom: "8px",
              }}
            >
              {item.description.length > 120
                ? item.description.slice(0, 120) + "..."
                : item.description}
            </div>
          )}

          {item.link && (
            <a
              href={item.link}
              target="_blank"
              rel="noreferrer"
              style={{
                fontSize: "13px",
                color: "#6b5a44",
                textDecoration: "none",
                fontWeight: 500,
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

          {/* Группа */}
          <div
  style={{
    padding: "24px",
    borderRadius: "24px",
    background: "rgba(255,255,255,0.85)",
    border: "1px solid rgba(0,0,0,0.08)",
    boxShadow: "0 10px 25px rgba(0,0,0,0.04)",
  }}
>
  <h2 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "14px" }}>
    Объявления 
  </h2>

  {announcements.length === 0 ? (
    <p style={{ color: "#888" }}>Пока нет объявлений</p>
  ) : (
    <ul style={{ paddingLeft: "18px" }}>
      {announcements.map((item) => (
        <li key={item.id} style={{ marginBottom: "6px" }}>
          {item.text}
        </li>
      ))}
    </ul>
  )}
</div>
        </div>

        <div style={{ marginTop: "70px", textAlign: "center", opacity: 0.6 }}>
          <p style={{ fontSize: "13px" }}>
            Платформа находится на этапе тестирования.
          </p>
        </div>
      </div>

      {/* Модалка редактирования */}
      {isEditing && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.35)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
            zIndex: 999,
          }}
          onClick={() => setIsEditing(false)}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "520px",
              borderRadius: "24px",
              background: "rgba(255,255,255,0.95)",
              border: "1px solid rgba(0,0,0,0.08)",
              padding: "26px",
              boxShadow: "0 18px 40px rgba(0,0,0,0.18)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ fontSize: "20px", fontWeight: 600, marginBottom: "18px" }}>
              Редактировать профиль
            </h2>

            {/* Имя */}
            <div style={{ marginBottom: "16px" }}>
              <label style={{ fontSize: "13px", opacity: 0.7 }}>
                Имя пользователя
              </label>
              <input
                value={editUsername}
                onChange={(e) => setEditUsername(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  marginTop: "6px",
                  borderRadius: "14px",
                  border: "1px solid rgba(0,0,0,0.12)",
                  outline: "none",
                  fontSize: "14px",
                }}
              />
            </div>

            {/* Группа */}
            <div style={{ marginBottom: "16px" }}>
              <label style={{ fontSize: "13px", opacity: 0.7 }}>
                Номер группы
              </label>

              <select
                value={editGroupNumber}
                onChange={(e) => setEditGroupNumber(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  marginTop: "6px",
                  borderRadius: "14px",
                  border: "1px solid rgba(0,0,0,0.12)",
                  outline: "none",
                  fontSize: "14px",
                  background: "white",
                }}
              >
                <option value="Востоковедение. Группа 1">Востоковедение. Группа 1</option>
                <option value="Востоковедение. Группа 2">Востоковедение. Группа 2</option>
                <option value="Востоковедение. Группа 3">Востоковедение. Группа 3</option>
                <option value="Востоковедение. Группа 4">Востоковедение. Группа 4</option>
                <option value="Востоковедение. Группа 5 ">Востоковедение. Группа 5 </option>
                <option value="Востоковедение. Группа 6 ">Востоковедение. Группа 6 </option>
                <option value="Майнор. Группа 1">Майнор. Группа 1 </option>
                <option value="Майнор. Группа 2">Майнор. Группа 2 </option>
                <option value="Любитель Ближнего Востока">Любитель Ближнего Востока</option>
              </select>
            </div>

            {/* Аватар */}
            <div style={{ marginBottom: "18px" }}>
              <label style={{ fontSize: "13px", opacity: 0.7 }}>
                Выбор аватара
              </label>

              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  flexWrap: "wrap",
                  marginTop: "10px",
                }}
              >
                {(
                  ["sand", "arch", "moon", "tile", "ink", "desert"] as AvatarStyle[]
                ).map((key) => (
                  <button
                    key={key}
                    onClick={() => setEditAvatarStyle(key)}
                    style={{
                      width: "56px",
                      height: "56px",
                      borderRadius: "999px",
                      border:
                        editAvatarStyle === key
                          ? "1px solid rgba(180, 140, 90, 0.95)"
                          : "1px solid rgba(0,0,0,0.12)",
                      background: avatarThemes[key].bg,
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      boxShadow:
                        editAvatarStyle === key
                          ? "0 0 0 3px rgba(180, 140, 90, 0.20)"
                          : "none",
                    }}
                    title={key}
                  >
                    <AvatarIcon type={key} />
                  </button>
                ))}
              </div>
            </div>

            {/* Кнопки */}
            <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
              <button
                onClick={() => setIsEditing(false)}
                style={{
                  padding: "12px 16px",
                  borderRadius: "999px",
                  background: "transparent",
                  border: "1px solid rgba(0,0,0,0.14)",
                  cursor: "pointer",
                  fontSize: "14px",
                  opacity: 0.9,
                }}
              >
                Отмена
              </button>

              <button
                onClick={saveProfile}
                style={{
                  padding: "12px 16px",
                  borderRadius: "999px",
                  background: "#1d1d1d",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "14px",
                  color: "white",
                }}
              >
                Сохранить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
