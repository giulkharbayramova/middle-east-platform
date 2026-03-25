"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import Link from "next/link";

type Module = {
  id: number;
  title: string;
  homework: string;
  literature: string;
};

type Material = {
  id: number;
  title: string;
  link: string | null;
  module_id: number;
};

const modules: Module[] = [
  {
    id: 1,
    title: "Эхо империй: Историческое развитие и поиск идентичности",
    homework:
      "Влияние торговых путей и морских коммуникаций на экономическую жизнь" +
      "Распространение религий до ислама: иудаизм, христианство, зороастризм" +
      "Социальная и политическая структура племен Аравийского полуострова перед исламизацией" +
      "Формирование культурного наследия и обычаев, влияющих на современную деловую этику",
    literature:
      "Rogan E. 'The Arabs', Cleveland W. 'A History of the Modern Middle East'",
  },
  {
    id: 2,
    title: "Исламский код: Религия как операционная система общества",
    homework:
      "Возникновение ислама и его влияние на социальные" +
      "Основные принципы шариата и их отражение в повседневной жизни" +
      "Роль религии в формировании норм поведения, доверия и обязательств в бизнесе" +
      "Влияние исламских праздников и обычаев на рабочий ритм и деловые встречи",
    literature:
      "Ходжсон М. 'История ислама', Льюис Б. 'Что пошло не так?'",
  },
  {
    id: 3,
    title: "Саудовская Аравия: Хранитель традиций и автор реформ",
    homework:
      "Исторический контекст формирования современного государства Саудовская Аравия" +
      "Социальная структура, племенные традиции и влияние на бизнес" +
      "Эволюция роли женщин и современных социальных реформ" +
      "Vision 2030 и его влияние на бизнес-культуру и инвестиционный климат" +
      "Формы ведения переговоров и корпоративная этика в Саудовской Аравии",
    literature:
      "Madawi Al-Rasheed — 'A History of Saudi Arabia'",
  },
  {
    id: 4,
    title: "ОАЭ: Бизнес-хаб XXI века",
    homework:
      "История формирования ОАЭ и роль эмиратов в экономическом развитии" + 
      "Мультикультурное общество и его влияние на деловые практики" +
      "Структура компаний, свободные зоны и законодательство для инвесторов" +
      "Этикет деловых встреч, корпоративные стандарты и особенности ведения переговоров" +
      "Развитие финансового, туристического и логистического секторов и их влияние на бизнес-культуру",
    literature:
      "Christopher Davidson — 'Dubai: The Vulnerability of Success'",
  },
  {
    id: 5,
    title: "Катар и Кувейт: Балансирование между гигантами",
    homework:
      "Политическая и экономическая структура государств и их роль на международной арене"+ 
      "Влияние нефтяной экономики и инвестиций на социальные нормы" +
      "Корпоративная культура и стандарты ведения бизнеса" +
      "Особенности дипломатических отношений и переговоров с иностранными партнёрами" +
      "Сравнение деловой этики Кувейта и Катара с Саудовской Аравией и ОАЭ",
    literature:
      "Mehran Kamrava — 'Qatar: Small State, Big Politics'",
  },
  {
    id: 6,
    title: "Левант и Египет: Египет, Иордания, Ливан",
    homework:
      "Исторический контекст Леванта и Египта: влияние античных цивилизаций" +
      "Социальные нормы, роль семьи и кланов в бизнес-отношениях" +
      "Политическая ситуация и её влияние на корпоративную культуру" +
      "Особенности ведения переговоров и принятия решений в компаниях региона" +
      "Культурные различия между Египтом, Ливаном и Иорданией в бизнес-практиках",
    literature:
      "Fawaz Gerges — 'Making the Arab World'",
  },
  {
    id: 7,
    title: "Малайзия и Индонезия",
    homework:
      "История и культура исламских стран Юго-Восточной Азии" +
      "Религиозные нормы и их влияние на социальные и деловые отношения" +
      "Корпоративная культура, стиль управления и ведение переговоров" +
      "Сравнение бизнес-культуры Малайзии и Индонезии с ближневосточными странами" +
      "Глобализация и адаптация традиционных ценностей в современных деловых процессах",
    literature:
      "Vedi Hadiz — 'Islamic Populism in Indonesia'",
  },
];
export default function ModulesPage() {
  const [open, setOpen] = useState<number | null>(null);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [completedTests, setCompletedTests] = useState<number[]>([]);
  const [testScores, setTestScores] = useState<Record<number, number>>({});
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    fetchMaterials();
    fetchProgress();
  }, []);

  async function fetchMaterials() {
    const { data } = await supabase
      .from("library_items")
      .select("*")
      .not("module_id", "is", null);

    if (data) setMaterials(data);
  }

  async function fetchProgress() {
    const { data: userData } = await supabase.auth.getUser();

    if (!userData.user) return;

    const { data } = await supabase
      .from("test_results")
      .select("lesson_id, score")
      .eq("user_id", userData.user.id);

    if (!data) return;

    const passed = data
      .filter((t) => t.score >= 60)
      .map((t) => t.lesson_id);

    setCompletedTests(passed);
    const scores: Record<number, number> = {};

data.forEach((t) => {
  scores[t.lesson_id] = t.score;
});

setTestScores(scores);
    const percent = Math.round((passed.length / modules.length) * 100);

    setProgress(percent);
  }

  const toggle = (id: number) => {
    setOpen(open === id ? null : id);
  };

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "70px 20px",
      }}
    >
      <h1 style={{ fontSize: "34px", marginBottom: "30px" }}>
        Учебные модули
      </h1>

      {/* Прогресс курса */}

      <div
        style={{
          background: "#faf7f2",
          padding: "20px",
          borderRadius: "16px",
          marginBottom: "40px",
        }}
      >
        <h3>Прогресс курса</h3>

        <div
          style={{
            height: "10px",
            background: "#eee",
            borderRadius: "20px",
            overflow: "hidden",
            marginTop: "10px",
          }}
        >
          <div
            style={{
              height: "100%",
              width: progress + "%",
              background: "#1d1d1d",
            }}
          />
        </div>

        <p style={{ marginTop: "8px" }}>{progress}% курса завершено</p>
      </div>

      {modules.map((module) => {
        const moduleMaterials = materials.filter(
          (m) => m.module_id === module.id
        );
        const isLocked =
  module.id !== 1 && !completedTests.includes(module.id - 1);
        return (
          <div
            key={module.id}
            style={{
              marginBottom: "20px",
              border: "1px solid rgba(0,0,0,0.08)",
              borderRadius: "18px",
              padding: "20px",
              background: "white",
              boxShadow: "0 8px 24px rgba(0,0,0,0.05)",
            }}
          >
            <div
  onClick={() => {
    if (!isLocked) toggle(module.id);
  }}
              style={{
                cursor: "pointer",
                fontWeight: 600,
                fontSize: "18px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
             <span>
  Занятие {module.id}. {module.title}
{testScores[module.id] && (
  <span
    style={{
      marginLeft: "10px",
      fontSize: "14px",
      color: "#666",
    }}
  >
    {testScores[module.id]}%
  </span>
)}
  {completedTests.includes(module.id) && (
    <span style={{ marginLeft: "10px", color: "#3bb273" }}>
      ✓
    </span>
  )}

  {isLocked && (
    <span style={{ marginLeft: "10px", color: "#999" }}>
      🔒
    </span>
  )}
</span>

              <span>{open === module.id ? "−" : "+"}</span>
            </div>

            {open === module.id && !isLocked && (
              <div style={{ marginTop: "20px", display: "grid", gap: "18px" }}>
                
                {/* Домашнее задание */}

                <div
                  style={{
                    padding: "16px",
                    borderRadius: "12px",
                    background: "#faf7f2",
                  }}
                >
                  <b>📝 Домашнее задание</b>
                  <p style={{ marginTop: "6px" }}>{module.homework}</p>
                </div>

                {/* Литература */}

                <div
                  style={{
                    padding: "16px",
                    borderRadius: "12px",
                    background: "#f5f5f5",
                  }}
                >
                  <b>📚 Рекомендуемая литература</b>
                  <p style={{ marginTop: "6px" }}>{module.literature}</p>
                </div>

                {/* Материалы */}

                <div
                  style={{
                    padding: "16px",
                    borderRadius: "12px",
                    background: "#eef2f5",
                  }}
                >
                  <b>🔗 Материалы из библиотеки</b>

                  {moduleMaterials.length === 0 ? (
                    <p style={{ marginTop: "8px", color: "#666" }}>
                      Материалов пока нет
                    </p>
                  ) : (
                    <ul style={{ marginTop: "10px", paddingLeft: "18px" }}>
                      {moduleMaterials.map((mat) => (
                        <li key={mat.id}>
                          <a
                            href={mat.link || "#"}
                            target="_blank"
                            style={{
                              color: "#1d1d1d",
                              textDecoration: "underline",
                            }}
                          >
                            {mat.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Тест */}

                <div
                  style={{
                    padding: "16px",
                    borderRadius: "14px",
                    background: "rgba(0,0,0,0.03)",
                  }}
                >
                  <b>📊 Тест по занятию</b>
{testScores[module.id] && (
  <p
    style={{
      marginTop: "6px",
      fontSize: "14px",
      color: testScores[module.id] >= 60 ? "#3bb273" : "#d64545",
    }}
  >
    {testScores[module.id] >= 60
      ? "✓ Тест пройден"
      : "✗ Тест не пройден"}
  </p>
)}
                  <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
  <Link
    href={`/ru/tests/${module.id}`}
    style={{
      padding: "10px 16px",
      borderRadius: "999px",
      background: "#1d1d1d",
      color: "white",
      textDecoration: "none",
      fontSize: "14px",
    }}
  >
    {testScores[module.id] ? "Пройти снова" : "Пройти тест"}
  </Link>
</div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}