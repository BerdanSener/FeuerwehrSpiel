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
    const [shuffledNumbers, setShuffledNumbers] = useState([]);

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
 //  var correctCheckbox1 =  questions[0].Antwort[1] // correctCheckbox1
    var correctCheckbox = 4

   /* if(correctCheckbox1 === correctCheckbox){
        console.log("if:", true);
    } else {
        console.log("false")
    }*/

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
    /*
            <h2>Fragenkatalog</h2>
            <ul>
                {questions.map((question) => (
                    <li key={question.id}>
                        <strong>Frage:</strong> {question.Antwort} <br />
                        <strong>Antwort:</strong> {question.Antwort}<br/>
                    </li>
                ))}
            </ul>
                         //
              */

    return (
        <div>
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

        </div>
    );
    };

    export default FrageForm;
