import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type Country = {
  code: string;
  nameRu: string;
  mapName: string;
  population: string;
  religion: string;
  government: string;
  leader: string;
  capital: string;
  economyType: string;
  industrializationStage: string;
};

const countries: Country[] = [
  {
    code: "SA",
    nameRu: "Саудовская Аравия",
    mapName: "Saudi Arabia",
    population: "≈ 36 млн",
    religion: "Ислам",
    government: "Абсолютная монархия",
    leader: "Король Салман бин Абдул-Азиз",
    capital: "Эр-Рияд",
    economyType: "Сырьевая / смешанная",
    industrializationStage: "Индустриальная",
  },
  {
    code: "AE",
    nameRu: "ОАЭ",
    mapName: "United Arab Emirates",
    population: "≈ 10 млн",
    religion: "Ислам",
    government: "Федеративная монархия",
    leader: "Мухаммад бин Заид Аль Нахайян",
    capital: "Абу-Даби",
    economyType: "Смешанная",
    industrializationStage: "Постиндустриальная",
  },
  {
    code: "QA",
    nameRu: "Катар",
    mapName: "Qatar",
    population: "≈ 2.7 млн",
    religion: "Ислам",
    government: "Абсолютная монархия",
    leader: "Тамим бин Хамад Аль Тани",
    capital: "Доха",
    economyType: "Сырьевая / высокодоходная",
    industrializationStage: "Индустриальная",
  },
  {
    code: "KW",
    nameRu: "Кувейт",
    mapName: "Kuwait",
    population: "≈ 4.3 млн",
    religion: "Ислам",
    government: "Конституционная монархия",
    leader: "Эмир Мишааль аль-Ахмад аль-Джабер",
    capital: "Эль-Кувейт",
    economyType: "Сырьевая / смешанная",
    industrializationStage: "Индустриальная",
  },
  {
    code: "OM",
    nameRu: "Оман",
    mapName: "Oman",
    population: "≈ 5.4 млн",
    religion: "Ислам",
    government: "Абсолютная монархия",
    leader: "Султан Хайсам бин Тарик",
    capital: "Маскат",
    economyType: "Смешанная",
    industrializationStage: "Индустриальная",
  },
  {
    code: "BH",
    nameRu: "Бахрейн",
    mapName: "Bahrain",
    population: "≈ 1.5 млн",
    religion: "Ислам",
    government: "Конституционная монархия",
    leader: "Король Хамад бин Иса",
    capital: "Манама",
    economyType: "Смешанная",
    industrializationStage: "Индустриальная",
  },
  {
    code: "YE",
    nameRu: "Йемен",
    mapName: "Yemen",
    population: "≈ 34 млн",
    religion: "Ислам",
    government: "Республика (нестабильная)",
    leader: "Политически разделён",
    capital: "Сана / Аден",
    economyType: "Слаборазвитая",
    industrializationStage: "Доиндустриальная",
  },
  {
    code: "IQ",
    nameRu: "Ирак",
    mapName: "Iraq",
    population: "≈ 44 млн",
    religion: "Ислам",
    government: "Парламентская республика",
    leader: "Президент Абдул Латиф Рашид",
    capital: "Багдад",
    economyType: "Сырьевая / смешанная",
    industrializationStage: "Индустриальная",
  },
  {
    code: "SY",
    nameRu: "Сирия",
    mapName: "Syria",
    population: "≈ 22 млн",
    religion: "Ислам / Христианство",
    government: "Республика",
    leader: "Башар Асад",
    capital: "Дамаск",
    economyType: "Смешанная (кризисная)",
    industrializationStage: "Индустриальная (в упадке)",
  },
  {
    code: "JO",
    nameRu: "Иордания",
    mapName: "Jordan",
    population: "≈ 11 млн",
    religion: "Ислам",
    government: "Конституционная монархия",
    leader: "Король Абдалла II",
    capital: "Амман",
    economyType: "Смешанная",
    industrializationStage: "Индустриальная",
  },
  {
    code: "LB",
    nameRu: "Ливан",
    mapName: "Lebanon",
    population: "≈ 5.5 млн",
    religion: "Ислам / Христианство",
    government: "Парламентская республика",
    leader: "Политически нестабилен",
    capital: "Бейрут",
    economyType: "Сервисная",
    industrializationStage: "Постиндустриальная",
  },
  {
    code: "IL",
    nameRu: "Израиль",
    mapName: "Israel",
    population: "≈ 9.8 млн",
    religion: "Иудаизм / Ислам / Христианство",
    government: "Парламентская республика",
    leader: "Биньямин Нетаньяху",
    capital: "Иерусалим",
    economyType: "Высокотехнологичная",
    industrializationStage: "Постиндустриальная",
  },
  {
    code: "PS",
    nameRu: "Палестина",
    mapName: "Palestine",
    population: "≈ 5.2 млн",
    religion: "Ислам / Христианство",
    government: "Автономия",
    leader: "Махмуд Аббас",
    capital: "Рамалла (де-факто)",
    economyType: "Развивающаяся",
    industrializationStage: "Доиндустриальная/индустриальная",
  },
  {
    code: "IR",
    nameRu: "Иран",
    mapName: "Iran",
    population: "≈ 89 млн",
    religion: "Ислам",
    government: "Исламская республика",
    leader: "Не избран",
    capital: "Тегеран",
    economyType: "Смешанная",
    industrializationStage: "Индустриальная",
  },
  {
    code: "TR",
    nameRu: "Турция",
    mapName: "Turkey",
    population: "≈ 85 млн",
    religion: "Ислам",
    government: "Президентская республика",
    leader: "Реджеп Тайип Эрдоган",
    capital: "Анкара",
    economyType: "Смешанная",
    industrializationStage: "Индустриальная",
  },
  {
    code: "EG",
    nameRu: "Египет",
    mapName: "Egypt",
    population: "≈ 112 млн",
    religion: "Ислам / Христианство",
    government: "Президентская республика",
    leader: "Абдель Фаттах ас-Сиси",
    capital: "Каир",
    economyType: "Смешанная",
    industrializationStage: "Индустриальная",
  },
];

export default function CountriesPage() {
  const router = useRouter();
  const { country } = router.query;

  const [focusedCountry, setFocusedCountry] = useState<Country | null>(null);

  useEffect(() => {
    if (!country || typeof country !== "string") return;

    const found = countries.find(
      (c) => c.mapName.toLowerCase() === country.toLowerCase()
    );

    if (found) {
      setFocusedCountry(found);
    }
  }, [country]);

  const closeModal = () => {
    setFocusedCountry(null);
    router.replace("/ru/countries", undefined, { shallow: true });
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f8f6f2", padding: "70px 20px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "30px", marginBottom: "12px", color: "#1d1d1d" }}>
          Страны региона
        </h1>

        <p style={{ fontSize: "15px", color: "#555", marginBottom: "34px", maxWidth: "720px", lineHeight: "1.6" }}>
          Нажмите на карточку страны, чтобы открыть информацию и перейти к материалам.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "18px",
          }}
        >
          {countries.map((c) => (
            <div
              key={c.code}
              onClick={() => setFocusedCountry(c)}
              style={{
                padding: "20px",
                borderRadius: "22px",
                border: "1px solid rgba(0,0,0,0.08)",
                background: "rgba(255,255,255,0.85)",
                boxShadow: "0 6px 18px rgba(0,0,0,0.04)",
                cursor: "pointer",
                transition: "all 0.25s ease",
              }}
            >
              <h3 style={{ fontSize: "17px", marginBottom: "10px", color: "#1d1d1d" }}>
                {c.nameRu}
              </h3>

              <p style={{ fontSize: "13px", color: "#555", margin: "0 0 6px" }}>
                <strong>Столица:</strong> {c.capital}
              </p>

              <p style={{ fontSize: "13px", color: "#555", margin: 0 }}>
                <strong>Экономика:</strong> {c.economyType}
              </p>

              <p style={{ fontSize: "12px", color: "#777", marginTop: "10px" }}>
                Нажмите для подробностей →
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL OVERLAY */}
      {focusedCountry && (
        <div
          onClick={closeModal}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.55)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
            zIndex: 9999,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: "720px",
              borderRadius: "28px",
              background: "rgba(255,255,255,0.92)",
              border: "1px solid rgba(255,255,255,0.35)",
              boxShadow: "0 25px 60px rgba(0,0,0,0.25)",
              padding: "34px",
              position: "relative",
              animation: "fadeInScale 0.25s ease",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "-60px",
                right: "-60px",
                width: "220px",
                height: "220px",
                borderRadius: "50%",
                background: "rgba(180,140,90,0.16)",
                filter: "blur(40px)",
              }}
            />

            <h2 style={{ fontSize: "26px", marginBottom: "10px", color: "#1d1d1d" }}>
              {focusedCountry.nameRu}
            </h2>

            <p style={{ fontSize: "14px", color: "#555", marginBottom: "26px", lineHeight: "1.6" }}>
              Справка о стране и ключевые характеристики.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "14px",
                marginBottom: "26px",
              }}
            >
              {[
                { label: "Население", value: focusedCountry.population },
                { label: "Религия", value: focusedCountry.religion },
                { label: "Форма правления", value: focusedCountry.government },
                { label: "Руководитель", value: focusedCountry.leader },
                { label: "Столица", value: focusedCountry.capital },
                { label: "Экономика", value: focusedCountry.economyType },
                { label: "Индустриализация", value: focusedCountry.industrializationStage },
              ].map((item) => (
                <div
                  key={item.label}
                  style={{
                    padding: "14px 16px",
                    borderRadius: "18px",
                    border: "1px solid rgba(0,0,0,0.08)",
                    background: "rgba(255,255,255,0.75)",
                  }}
                >
                  <p style={{ fontSize: "12px", color: "#777", margin: 0 }}>
                    {item.label}
                  </p>
                  <p style={{ fontSize: "14px", color: "#1d1d1d", margin: "6px 0 0", fontWeight: 600 }}>
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: "12px", justifyContent: "space-between" }}>
              <button
                onClick={closeModal}
                style={{
                  padding: "12px 16px",
                  borderRadius: "999px",
                  border: "1px solid rgba(0,0,0,0.18)",
                  background: "transparent",
                  cursor: "pointer",
                  fontSize: "13px",
                  color: "#1d1d1d",
                }}
              >
                Закрыть
              </button>

              <a
    href={`/ru/library?country=${encodeURIComponent(focusedCountry.mapName)}`}
    style={{
      padding: "12px 16px",
      borderRadius: "999px",
      background: "#1d1d1d",
      color: "#fff",
      textDecoration: "none",
      fontSize: "14px",
      fontWeight: 500,
    }}
  >
    Перейти к материалам →
  </a>
            </div>
          </div>

          <style jsx>{`
            @keyframes fadeInScale {
              from {
                opacity: 0;
                transform: scale(0.96);
              }
              to {
                opacity: 1;
                transform: scale(1);
              }
            }
          `}</style>
        </div>
      )}
    </div>
  );
}
