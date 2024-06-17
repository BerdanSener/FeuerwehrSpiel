// QuestionsComponent.js
import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { auth, db, signInWithEmailAndPassword } from '../../firebase/firebase.mjs';

const FrageForm = () => {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const FetchQuestions = async () => {
        try {
            // Anmeldung mit E-Mail und Passwort
            await signInWithEmailAndPassword(auth, "roman.schuller@gmail.com", "Roman12345");

            // Zugriff auf die Sammlung 'Fragenkatalog'
            const querySnapshot = await getDocs(collection(db, "RLFTest"));

            // Extrahieren der Daten aus den Dokumenten
            const questionsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setQuestions(questionsList);
            var first= questions[1]
           // console.log(first, first.Antwort[0])
            //console.log("Länge: ", first.Antwort.length)
        } catch (error) {
            console.error("Fehler beim Abrufen der Fragen: ", error);
            setError("Fehler beim Abrufen der Fragen");
        } finally {
            setLoading(false);
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
        </div>
    );
};

export default FrageForm;
