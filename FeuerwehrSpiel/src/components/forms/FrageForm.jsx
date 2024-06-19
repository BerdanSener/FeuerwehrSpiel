import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { auth, db, signInWithEmailAndPassword } from '../../firebase/firebase.mjs';
import './FormSheet.css';

const FrageForm = () => {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [correctCheckboxes, setCorrectCheckboxes] = useState([]);
    const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
    const [feedback, setFeedback] = useState('');
    const [shuffledNumbers, setShuffledNumbers] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [num, setNum] = useState(0);
    const [questionNum, setQuestionNum] = useState(0);
    const [isSingleChoice, setIsSingleChoice] = useState(true);
    const [vehicleIndex, setVehicleIndex] = useState(null);
    const vehicles = ["KLF", "RLF", "VF"]

    const randomNumberInRange = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    console.log("Vehicles", vehicles[num]);

    const FetchQuestions = async (vehicleIndex) => {
        setLoading(true)
        try {
            await signInWithEmailAndPassword(auth, "roman.schuller@gmail.com", "Roman12345");
            const querySnapshot = await getDocs(collection(db, vehicles[vehicleIndex]));
            const questionsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setQuestions(questionsList);

            if (questionsList.length > 0) {
                const firstQuestion = questionsList[questionNum];
                setIsSingleChoice(firstQuestion.Antwort.length === 1);
                setCorrectCheckboxes(firstQuestion.Antwort.map(ans => parseInt(ans, 10)));
            }
        } catch (error) {
            console.error("Fehler beim Abrufen der Fragen: ", error);
            setError("Fehler beim Abrufen der Fragen");
        } finally {
            setLoading(false);
        }
    };

    const setupQuestion = (question) => {
        setCorrectCheckboxes(question.Antwort.map(ans => parseInt(ans, 10)));

        const numbers = [1, 2, 3, 4, 5, 6];
        for (let i = numbers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
        }
        setShuffledNumbers(numbers);
        setSelectedCheckboxes([]);
        setFeedback('');
    };

    const handleCheckboxChange = (event) => {
        const selectedValue = parseInt(event.target.value, 10);
        if (isSingleChoice) {
            setSelectedCheckboxes([selectedValue]);
        } else {
            setSelectedCheckboxes(prevState =>
                prevState.includes(selectedValue)
                    ? prevState.filter(val => val !== selectedValue)
                    : [...prevState, selectedValue]
            );
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

    const handleVehicleSelection = (event) => {
        const selectedVehicleIndex = parseInt(event.target.value, 10);
        setVehicleIndex(selectedVehicleIndex);
        FetchQuestions(selectedVehicleIndex);
    };

    const handleBackToVehicleSelection = () => {
        setVehicleIndex(null);
        setQuestions([]);
        setCurrentQuestionIndex(0);
        setCorrectCheckboxes([]);
        setSelectedCheckboxes([]);
        setFeedback('');
    };

    useEffect(() => {
       // FetchQuestions();
        const numbers = [1, 2, 3, 4, 5, 6];
        for (let i = numbers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
        }
        setShuffledNumbers(numbers);
    }, []);

    useEffect(() => {
        if (selectedCheckboxes.length > 0) {
            const isCorrect = selectedCheckboxes.every(val => correctCheckboxes.includes(val)) && correctCheckboxes.every(val => selectedCheckboxes.includes(val));
            setFeedback(isCorrect ? 'Richtig' : 'Falsch');
        } else {
            setFeedback('');
        }
    }, [selectedCheckboxes, correctCheckboxes]);

    if (loading) {
        return <div>Laden...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (currentQuestionIndex >= 10) {
        return <div>Sie haben alle 10 Fragen beantwortet!</div>;
    }

    console.log("Ausgabe: Correctcheckboxes: ", correctCheckboxes);
    console.log("Frage: ", currentQuestionIndex);
    console.log("Questions: ", questions.length);
    console.log("Ausgabe QuestNum: ", questionNum);
    console.log("Ausgbe Fahrzeug: ", questions)

    if (vehicleIndex === null) {
        return (
            <div>
                <h3>Um mit dem Fragebogen zu beginnen, wählen Sie bitte ein Fahrzeug:</h3>
                <select onChange={handleVehicleSelection} defaultValue="">
                    <option value="" disabled>Fahrzeug auswählen</option>
                    {vehicles.map((vehicle, index) => (
                        <option key={index} value={index}>
                            {vehicle}
                        </option>
                    ))}
                </select>
            </div>
        );
    }
    return (
        <div>
            <h3>Fahrzeug: {vehicles[vehicleIndex]}</h3>
            <h1>Wo befindet sich {questions[currentQuestionIndex].id}?</h1>
            <h3>{isSingleChoice ? "Wählen Sie die richtige Antwort" : "Wählen Sie die richtigen Antworten"}</h3>
            <div className="checkbox-group">
                {shuffledNumbers.map((number) => (
                    <label key={number}
                           className={`checkbox-label ${selectedCheckboxes.includes(number) ? (correctCheckboxes.includes(number) ? 'correct' : 'incorrect') : ''}`}>
                        <input
                            type={isSingleChoice ? "radio" : "checkbox"}
                            value={number}
                            checked={selectedCheckboxes.includes(number)}
                            onChange={handleCheckboxChange}
                        />
                        Laderaum {number}
                    </label>
                ))}
            </div>
            {feedback && <p>{feedback}</p>}
            <div className="button-group">
            <button onClick={handleNextQuestion}>Weiter</button>
                <button onClick={handleBackToVehicleSelection}> Zurück zur Fahrzeugauswahl </button>
            </div>
        </div>
    );
};

export default FrageForm;
