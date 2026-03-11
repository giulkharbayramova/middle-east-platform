"use client";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";

type Question = {
  id: string;
  lesson_id: number;
  question: string;
  options: string[];
  correct_option: number;
};

export default function TestPage() {

  const router = useRouter();
  const { lesson } = router.query;

  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState<number | null>(null);

  useEffect(() => {
    if (!lesson) return;
    fetchQuestions();
  }, [lesson]);

  async function fetchQuestions() {

    const { data, error } = await supabase
      .from("test_questions")
      .select("*")
      .eq("lesson_id", Number(lesson));

    if (error) {
      console.error("Ошибка загрузки теста:", error);
      setLoading(false);
      return;
    }

    if (data) {
      setQuestions(data);
    }

    setLoading(false);
  }

  function selectAnswer(questionId: string, optionIndex: number) {

    if (score !== null) return;

    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  }

  async function finishTest() {

    let correct = 0;

    questions.forEach((q) => {
      if (answers[q.id] === q.correct_option) {
        correct++;
      }
    });

    const result = Math.round((correct / questions.length) * 100);

    setScore(result);

    const { data: userData } = await supabase.auth.getUser();

    if (!userData.user) return;

    await supabase.from("test_results").insert({
      user_id: userData.user.id,
      lesson_id: Number(lesson),
      score: result
    });

  }

  if (loading) {
    return (
      <div style={styles.center}>
        Загрузка теста...
      </div>
    );
  }

  if (!questions.length) {
    return (
      <div style={styles.center}>
        Тест не найден
      </div>
    );
  }

  return (

    <div style={styles.page}>
      <div style={styles.container}>

        <h1 style={styles.title}>
          Тест по занятию {lesson}
        </h1>

        {questions.map((q, index) => (

          <div key={q.id} style={styles.card}>

            <h3 style={styles.question}>
              {index + 1}. {q.question}
            </h3>

            <div style={styles.options}>

              {(q.options ?? []).map((option, i) => (

                <button
                  key={i}
                  onClick={() => selectAnswer(q.id, i)}
                  style={{
                    ...styles.option,

                    ...(score !== null && i === q.correct_option
                      ? styles.correct
                      : {}),

                    ...(score !== null &&
                    answers[q.id] === i &&
                    i !== q.correct_option
                      ? styles.wrong
                      : {}),

                    ...(score === null &&
                    answers[q.id] === i
                      ? styles.optionActive
                      : {})
                  }}
                >
                  {option}

                </button>

              ))}

            </div>

          </div>

        ))}

        {score === null && (

          <button
            onClick={finishTest}
            style={styles.submit}
          >
            Проверить тест
          </button>

        )}

        {score !== null && (

          <div style={styles.result}>

            <h2>Ваш результат</h2>

            <div style={styles.score}>
              {score}%
            </div>

            <button
              style={styles.back}
              onClick={() => router.push("/ru/modules")}
            >
              Вернуться к модулям
            </button>

          </div>

        )}

      </div>
    </div>

  );

}

const styles: any = {

  page: {
    background: "#f8f6f2",
    minHeight: "100vh",
    padding: "60px 20px"
  },

  container: {
    maxWidth: "760px",
    margin: "0 auto"
  },

  title: {
    fontSize: "32px",
    marginBottom: "40px"
  },

  card: {
    background: "white",
    borderRadius: "20px",
    padding: "26px",
    marginBottom: "24px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.05)"
  },

  question: {
    marginBottom: "18px",
    fontSize: "18px"
  },

  options: {
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },

  option: {
    padding: "14px 16px",
    borderRadius: "12px",
    border: "1px solid #ddd",
    background: "white",
    cursor: "pointer",
    textAlign: "left",
    fontSize: "14px",
    transition: "all 0.15s"
  },

  optionActive: {
    border: "2px solid #1d1d1d",
    background: "#f1efe9"
  },

  correct: {
    border: "2px solid #3bb273",
    background: "#e8f7ef"
  },

  wrong: {
    border: "2px solid #e05656",
    background: "#fdecec"
  },

  submit: {
    marginTop: "20px",
    padding: "16px 24px",
    borderRadius: "14px",
    border: "none",
    background: "#1d1d1d",
    color: "white",
    fontSize: "15px",
    cursor: "pointer"
  },

  result: {
    marginTop: "40px",
    background: "white",
    padding: "36px",
    borderRadius: "22px",
    textAlign: "center",
    boxShadow: "0 10px 30px rgba(0,0,0,0.06)"
  },

  score: {
    fontSize: "48px",
    fontWeight: "bold",
    margin: "20px 0"
  },

  back: {
    padding: "14px 24px",
    borderRadius: "12px",
    border: "none",
    background: "#1d1d1d",
    color: "white",
    cursor: "pointer"
  },

  center: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f8f6f2"
  }

};