// QuestionsComponent.js
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { auth, db, signInWithEmailAndPassword } from '../../firebase/firebase.mjs';
import './FormSheet.css'

const FrageForm = () => {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [correctCheckboxes, setCorrectCheckboxes] = useState([]);
    const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
    const [feedback, setFeedback] = useState('');
    const [shuffledNumbers, setShuffledNumbers] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [num, setNum] = useState(0);
    const vehicles = ["KLF"] //["KLF", "RLF", "MTF", "VF"]

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
                setCorrectCheckboxes(parseInt(questionsList[1].Antwort, 10));
            }
            //   correctCheckbox = questions[1].Antwort
            console.log("Ausgabe: Correctcheckbox: ", correctCheckboxes);
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
        const correctAnswers = question.Antwort.map(answer => parseInt(answer, 10));
        setCorrectCheckboxes(correctAnswers);

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
        let updatedSelectedCheckboxes = [...selectedCheckboxes];

        if (updatedSelectedCheckboxes.includes(selectedValue)) {
            updatedSelectedCheckboxes = updatedSelectedCheckboxes.filter(value => value !== selectedValue);
        } else {
            updatedSelectedCheckboxes.push(selectedValue);
        }

        setSelectedCheckboxes(updatedSelectedCheckboxes);

        if (updatedSelectedCheckboxes.length === correctCheckboxes.length &&
            updatedSelectedCheckboxes.every(value => correctCheckboxes.includes(value))) {
            setFeedback('Richtig');
        } else {
            setFeedback('Falsch');
        }
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length-1) {
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

    console.log("Ausgabe: Correctcheckbox: ", correctCheckboxes);
    console.log("Frage: ", currentQuestionIndex)
    return (
        <div>
            <h3>Fahrzeug: {vehicles[num]}</h3>
            <h1>Wo befindet sich {questions[1].id}?</h1>
            <h3>Wählen Sie die richtige Checkbox</h3>
            <div className="checkbox-group">
                {shuffledNumbers.map((number) => (
                    <label key={number}
                           className={`checkbox-label ${selectedCheckboxes.includes(number) ? (correctCheckboxes.includes(number) ? 'correct' : 'incorrect') : ''}`}>
                        <input
                            type="checkbox"
                            value={number}
                            checked={selectedCheckboxes.includes(number)}
                            onChange={handleCheckboxChange}
                        />
                        Laderaum {number}
                    </label>
                ))}
            </div>
            {feedback && <p>{feedback}</p>}
            <button onClick={handleNextQuestion}>Nächste Frage</button>

        </div>
    );
};

export default FrageForm;
