import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import s from "./KnowledgeMaze.module.scss";

const allQuestions = [
    { question: "Столица Франции?", options: ["Берлин", "Мадрид", "Париж", "Рим"], answer: "Париж" },
    { question: "Сколько планет в Солнечной системе?", options: ["7", "9", "8", "11"], answer: "8" },
    { question: "Кто написал 'Война и мир'?", options: ["Достоевский", "Толстой", "Пушкин", "Чехов"], answer: "Толстой" },
    { question: "Какой элемент обозначается как 'O' в таблице Менделеева?", options: ["Кислород", "Золото", "Олово", "Осмий"], answer: "Кислород" },
    { question: "Сколько океанов на Земле?", options: ["4", "3", "7", "5"], answer: "5" },
    { question: "Какая самая высокая гора в мире?", options: ["Килиманджаро", "Эльбрус", "Эверест", "Мак-Кинли"], answer: "Эверест" },
    { question: "Как называется столица Японии?", options: ["Токио", "Сеул", "Пекин", "Бангкок"], answer: "Токио" },
    { question: "Какая планета ближе всего к Солнцу?", options: ["Венера", "Марс", "Меркурий", "Юпитер"], answer: "Меркурий" },
    { question: "Какой газ люди вдыхают в основном?", options: ["Кислород", "Азот", "Углекислый газ", "Водород"], answer: "Азот" },
    { question: "Какой орган отвечает за фильтрацию крови?", options: ["Почки", "Печень", "Лёгкие", "Сердце"], answer: "Почки" },
    { question: "Какой язык программирования используется в веб-разработке?", options: ["Python", "C++", "JavaScript", "Java"], answer: "JavaScript" },
    { question: "Сколько континентов на Земле?", options: ["5", "7", "6", "8"], answer: "7" },
    { question: "Как называется самый большой океан?", options: ["Атлантический", "Северный Ледовитый", "Индийский", "Тихий"], answer: "Тихий" },
    { question: "Какая самая длинная река в мире?", options: ["Амазонка", "Нил", "Янцзы", "Миссисипи"], answer: "Нил" },
    { question: "Какое самое быстрое наземное животное?", options: ["Гепард", "Лев", "Антилопа", "Лошадь"], answer: "Гепард" }
];

export default function KnowledgeMaze() {
    const [questions, setQuestions] = useState([]);
    const [level, setLevel] = useState(0);
    const [selected, setSelected] = useState(null);
    const [score, setScore] = useState(0);
    const [attempts, setAttempts] = useState(2);
    const navigate = useNavigate();
  
    useEffect(() => {
      const shuffled = allQuestions.sort(() => 0.5 - Math.random()).slice(0, 8);
      setQuestions(shuffled);
    }, []);
  
    const handleAnswer = (option) => {
      setSelected(option);
      if (option === questions[level].answer) {
        setTimeout(() => {
          setScore(score + 1);
          setLevel(level + 1);
          setSelected(null);
          setAttempts(2);
        }, 1000);
      } else {
        if (attempts > 1) {
          setTimeout(() => {
            setSelected(null);
            setAttempts(attempts - 1);
          }, 1000);
        } else {
          setTimeout(() => {
            setLevel(level + 1);
            setSelected(null);
            setAttempts(2);
          }, 1000);
        }
      }
    };

  return (
    <div className={s.container}>
      {level < questions.length ? (
        <div className={s.card}>
          <motion.h2
            className={s.question}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {questions[level].question}
          </motion.h2>
          <p className={s.attempts}>Попытки: {attempts}</p>
          <div className={s.optionsContainer}>
            {questions[level].options.map((option, index) => (
              <button
                key={index}
                className={
                  `${s.option} ${selected === option ? (option === questions[level].answer ? s.correct : s.wrong) : ''}`
                }
                onClick={() => handleAnswer(option)}
                disabled={selected !== null}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className={s.card} style={{height: "300px"}}>
          <h2 className={s.gameOver}>Игра завершена!</h2>
          <p className={s.score}>Ваш счёт: {score}/{questions.length}</p>
            <button className={s.backButton} onClick={() => navigate('/Games')}>
                <svg height="16" width="16" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024"><path d="M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z"></path></svg>
                <span>Назад</span>
            </button>
        </div>
      )}
    </div>
  );
}
