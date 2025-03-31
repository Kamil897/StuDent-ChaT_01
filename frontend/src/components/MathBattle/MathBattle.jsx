import { useState, useEffect } from "react";
import s from "./MathBattle.module.scss";
import { useNavigate } from "react-router-dom";

export default function MathBattle() {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [playerHealth, setPlayerHealth] = useState(100);
    const [botHealth, setBotHealth] = useState(100);
    const [message, setMessage] = useState("");
    const [startTime, setStartTime] = useState(null);
    const navigate = useNavigate();
  
    useEffect(() => {
        generateQuestion();
      }, []);
    
      const generateQuestion = () => {
        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        const operations = ['+', '-', '*', '/'];
        const operation = operations[Math.floor(Math.random() * operations.length)];
        const formattedQuestion = operation === '/' ? `${num1 * num2} / ${num1}` : `${num1} ${operation} ${num2}`;
        setQuestion(formattedQuestion);
        setStartTime(Date.now());
      };
  
    const handleSubmit = () => {
      if (playerHealth === 0 || botHealth === 0) return;
      
      const correctAnswer = eval(question);
      const timeTaken = (Date.now() - startTime) / 1000;
      let damage = 10;
  
      if (parseInt(answer) === correctAnswer) {
        if (timeTaken < 3) damage = 20;
        setBotHealth((prev) => Math.max(0, prev - damage));
        setMessage(`Ты попал! Нанесено ${damage} урона.`);
      } else {
        setPlayerHealth((prev) => Math.max(0, prev - 25));
        setMessage("Промах! Бот атакует тебя на 25 урона.");
      }
  
      setAnswer("");
      generateQuestion();
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
          handleSubmit();
        }
      };

  return (
    <div className={s.container}>
      {(playerHealth === 0 || botHealth === 0) && (
        <div className={s.gameOverScreen}>
          <h2 className={s.gameOver}>{playerHealth === 0 ? "Ты проиграл!" : "Ты победил!"}</h2>
        
            <button className={s.backButton} onClick={() => navigate('/Games')}>
              <svg height="16" width="16" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024"><path d="M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z"></path></svg>
              <span>Назад</span>
            </button>
        </div>
      )}

      <h1>Математический бой</h1>
      <p>Реши пример как можно быстрее!</p>
      <p className={s.health}>Твое здоровье: {playerHealth} | Здоровье бота: {botHealth}</p>
      <h2 className={s.question}>{question} = ?</h2>
      <input 
        type="number" 
        value={answer} 
        onChange={(e) => setAnswer(e.target.value)} 
        onKeyDown={handleKeyDown}
        className={s.input}
        disabled={playerHealth === 0 || botHealth === 0}
      />
      <button 
        onClick={handleSubmit} 
        className={s.button}
        disabled={playerHealth === 0 || botHealth === 0}
      >
        Атаковать
      </button>

      <p className={s.message}>{message}</p>
    </div>
  );
}
