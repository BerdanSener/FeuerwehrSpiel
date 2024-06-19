import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { auth, db, signInWithEmailAndPassword } from '../../firebase/firebase.mjs';
import './FormSheet.css';

const FrageForm = () => {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [correctCheckbox, setCorrectCheckbox] = useState([]);
    const [selectedCheckbox, setSelectedCheckbox] = useState(null);
    const [feedback, setFeedback] = useState('');
    const [shuffledNumbers, setShuffledNumbers] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [num, setNum] = useState(0);
    const [questionNum, setQuestionNum] = useState(0);
    const [isSingleChoice, setIsSingleChoice] = useState(true);
    const vehicles = ["KLF"]; // ["KLF", "RLF", "MTF", "VF"]

    const randomNumberInRange = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    console.log("Vehicles", vehicles[num]);

    const FetchQuestions = async () => {
        try {
            await signInWithEmailAndPassword(auth, "roman.schuller@gmail.com", "Roman12345");
            const querySnapshot = await getDocs(collection(db, vehicles[num]));
            const questionsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setQuestions(questionsList);

            if (questionsList.length > 0) {
                const firstQuestion = questionsList[0];
                setIsSingleChoice(firstQuestion.Antwort.length === 1);
                setCorrectCheckbox(parseInt(firstQuestion.Antwort, 10));
            }
        } catch (error) {
            console.error("Fehler beim Abrufen der Fragen: ", error);
            setError("Fehler beim Abrufen der Fragen");
        } finally {
            setLoading(false);
        }
    };

    const setupQuestion = (question) => {
        const correctAnswer = parseInt(question.Antwort, 10);
        setCorrectCheckbox(correctAnswer);

        const numbers = [1, 2, 3, 4, 5, 6];
        for (let i = numbers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
        }
        setShuffledNumbers(numbers);
        setSelectedCheckbox(null);
        setFeedback('');
    };

    const handleCheckboxChange = (event) => {
        const selectedValue = parseInt(event.target.value, 10);
        setSelectedCheckbox(selectedValue);

        if (selectedValue === correctCheckbox) {
            setFeedback('Richtig');
        } else {
            setFeedback('Falsch');
        }
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < 9) {
            const nextIndex = currentQuestionIndex + 1;
            setCurrentQuestionIndex(nextIndex);
            setupQuestion(questions[nextIndex]);
            setIsSingleChoice(questions[nextIndex].Antwort.length === 1);
            setNum(randomNumberInRange(0, vehicles.length - 1));
            setQuestionNum(randomNumberInRange(0, questions.length - 1));
        } else {
            alert('Sie haben alle Fragen beantwortet!');
        }
    };

    useEffect(() => {
        FetchQuestions();
        const numbers = [1, 2, 3, 4, 5, 6];
        for (let i = numbers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
        }
        setShuffledNumbers(numbers);
    }, []);

    if (loading) {
        return <div>Laden...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (currentQuestionIndex >= 10) {
        return <div>Sie haben alle 10 Fragen beantwortet!</div>;
    }

    console.log("Ausgabe: Correctcheckbox: ", correctCheckbox);
    console.log("Frage: ", currentQuestionIndex);
    console.log("Questions: ", questions.length);
    console.log("Ausgabe QuestNum: ", questionNum);
    console.log("Ausgabe Länge von Array: ", questions[0].Antwort.length)

    return (
        <div>
            <h3>Fahrzeug: {vehicles[num]}</h3>
            <h1>Wo befindet sich {questions[questionNum].id}?</h1>
            <h3>{isSingleChoice ? "Wählen Sie die richtige Antwort" : "Wählen Sie die richtigen Antworten"}</h3>
            <div className="checkbox-group">
                {shuffledNumbers.map((number) => (
                    <label key={number}
                           className={`checkbox-label ${selectedCheckbox === number ? (number === correctCheckbox ? 'correct' : 'incorrect') : ''}`}>
                        <input
                            type={isSingleChoice ? "radio" : "checkbox"}
                            value={number}
                            checked={selectedCheckbox === number}
                            onChange={handleCheckboxChange}
                        />
                        Laderaum {number}
                    </label>
                ))}
            </div>
            {feedback && <p>{feedback}</p>}
            <button onClick={handleNextQuestion}>Weiter</button>
        </div>
    );
};

export default FrageForm;
