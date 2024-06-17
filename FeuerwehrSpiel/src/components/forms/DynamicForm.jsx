import React, { useState } from 'react';

const formContents = [
    { id: 1, content: 'Inhalt für Formular 1' },
    { id: 2, content: 'Inhalt für Formular 2' },
    { id: 3, content: 'Inhalt für Formular 3' },
    // Füge alle 10 Formulare hier hinzu
    { id: 10, content: 'Inhalt für Formular 10' },
];

const DynamicForm = () => {
    const [currentFormIndex, setCurrentFormIndex] = useState(0);

    const handleNext = () => {
        if (currentFormIndex < formContents.length - 1) {
            setCurrentFormIndex(currentFormIndex + 1);
        } else {
            alert('Alle Formulare wurden ausgefüllt!');
            // Hier kannst du zusätzliche Logik einfügen, z.B. Weiterleitung oder Abschluss der Aktion
        }
    };

    const currentFormContent = formContents[currentFormIndex].content;

    return (
        <div>
            <h1>Formular {currentFormIndex + 1}</h1>
            <p>{currentFormContent}</p>
            {/* Hier kannst du deine Formularelemente hinzufügen */}
            <button onClick={handleNext}>Weiter</button>
        </div>
    );
};

export default DynamicForm;