// QuestionsComponent.js
import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { auth, db, signInWithEmailAndPassword } from '../../firebase/firebase.mjs';

const FrageForm = () => {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [selectedCheckbox, setSelectedCheckbox] = useState(null);
    const [feedback, setFeedback] = useState('');
    var correctCheckbox = 0

    const FetchQuestions = async () => {
        try {
            // Anmeldung mit E-Mail und Passwort
            await signInWithEmailAndPassword(auth, "roman.schuller@gmail.com", "Roman12345");

            // Zugriff auf die Sammlung 'Fragenkatalog'
            const querySnapshot = await getDocs(collection(db, "RLFTest"));

            // Extrahieren der Daten aus den Dokumenten
            const questionsList = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
            setQuestions(questionsList);

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
    //var correctCheckbox1 = questions[1].Antwort
    correctCheckbox = 3// correctCheckbox1
    console.log("Ausgabe: Correctcheckbox1: ", correctCheckbox);
      //  console.log("Ausgabe: ", questions[0].Antwort);

    const handleCheckboxChange = (event) => {
        const selectedValue = parseInt(event.target.value, 10);
        setSelectedCheckbox(selectedValue);

        if (selectedValue === correctCheckbox) {
            setFeedback('Richtig');
        } else {
            setFeedback('Falsch');
        }
    };

    useEffect(() => {
        FetchQuestions();
    }, []);

    if (loading) {
        return <div>Laden...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }
    /*
            <h2>Fragenkatalog</h2>
            <ul>
                {questions.map((question) => (
                    <li key={question.id}>
                        <strong>Frage:</strong> {question.Antwort} <br />
                        <strong>Antwort:</strong> {question.Antwort}<br/>
                    </li>
                ))}
            </ul> */

    return (
        <div>
            <p>Wo befindet sich {questions[1].id}?</p>
            <div className="App">
                <h1>Wählen Sie die richtige Checkbox</h1>
                <div className="checkbox-group">
                    {[1, 2, 3, 4, 5, 6].map((number) => (
                        <label key={number}
                               className={`checkbox-label ${selectedCheckbox === number ? (number === correctCheckbox ? 'correct' : 'incorrect') : ''}`}>
                            <input
                                type="checkbox"
                                value={number}
                                checked={selectedCheckbox === number}
                                onChange={handleCheckboxChange}
                            />
                            Checkbox {number}
                        </label>
                    ))}
                </div>
                {feedback && <p>{feedback}</p>}
            </div>
        </div>
    );
    };

    export default FrageForm;
