// QuestionsComponent.js
import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { auth, db, signInWithEmailAndPassword } from '../../firebase/firebase.mjs';
import './FormSheet.css'

const FrageForm = () => {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [correctCheckbox, setCorrectCheckbox] = useState(0);
    const [selectedCheckbox, setSelectedCheckbox] = useState(null);
    const [feedback, setFeedback] = useState('');
    const [shuffledNumbers, setShuffledNumbers] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [num, setNum] = useState(0);
    const vehicles = ["RLFTest"] //["KLF", "RLF", "MTF", "VF"]

    const randomNumberInRange = (min, max) => {
        return Math.floor(Math.random()
            * (max - min + 1)) + min;
    };


    console.log("Vehicles", vehicles[num])

    const FetchQuestions = async () => {
        try {
            // Anmeldung mit E-Mail und Passwort
            await signInWithEmailAndPassword(auth, "roman.schuller@gmail.com", "Roman12345");

            // Zugriff auf die Sammlung 'Fragenkatalog'
            const querySnapshot = await getDocs(collection(db, vehicles[num]));

            // Extrahieren der Daten aus den Dokumenten
            const questionsList = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
            setQuestions(questionsList);


            if (questionsList.length > 1) {
                setCorrectCheckbox(parseInt(questionsList[1].Antwort, 10));
            }
            //   correctCheckbox = questions[1].Antwort
            console.log("Ausgabe: Correctcheckbox: ", correctCheckbox);
         //   var first = questions[1].Antwort
           //  console.log(first)
            //console.log("Länge: ", first.Antwort.length)
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
            setNum(randomNumberInRange(0, vehicles.length-1))
        } else {
            alert('Sie haben alle Fragen beantwortet!');
        }
    };


    useEffect(() => {
        FetchQuestions();
        // Random den Index anlegen:



        // Zahlen mischen
        const numbers = [1, 2, 3, 4, 5, 6];
        for (let i = numbers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
        }

        setShuffledNumbers(numbers)
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
    console.log("Frage: ", currentQuestionIndex)
    return (
        <div>
            <h3>Fahrzeug: {vehicles[num]}</h3>
            <h1>Wo befindet sich {questions[1].id}?</h1>
            <h3>Wählen Sie die richtige Checkbox</h3>
            <div className="checkbox-group">
                {shuffledNumbers.map((number) => (
                    <label key={number}
                           className={`checkbox-label ${selectedCheckbox === number ? (number === correctCheckbox ? 'correct' : 'incorrect') : ''}`}>
                        <input
                            type="checkbox"
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
