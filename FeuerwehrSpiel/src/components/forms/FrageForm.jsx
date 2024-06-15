// src/FormSheet.js
import React, { useState } from 'react';
import './FormSheet.css';

const FormSheet = () => {
    const [selectedOptions, setSelectedOptions] = useState([]);


    const options = [
        { id: 'option1', label: '1' },
        { id: 'option2', label: '2' },
        { id: 'option3', label: '3' },
        { id: 'option1', label: '4' },
        { id: 'option2', label: '5' },
        { id: 'option3', label: '6' },
        { id: 'option1', label: '7' },
        { id: 'option2', label: '8' },
    ];

    const handleCheckboxChange = (event) => {
        const { id, checked } = event.target;
        setSelectedOptions((prevSelectedOptions) =>
            checked
                ? [...prevSelectedOptions, id]
                : prevSelectedOptions.filter((option) => option !== id)
        );
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Selected Multiple Options:', selectedOptions);
        console.log('Selected Single Option:', singleOption);
    };

    return (
        <div className="form-container">
            <h1>Formblatt</h1>
            <p>Bitte wählen Sie die Optionen aus:</p>
            <form onSubmit={handleSubmit}>
                <div className="form-section">
                    <h2>Multiple Choice</h2>
                    {options.map((option) => (
                        <div key={option.id}>
                            <input
                                type="checkbox"
                                id={option.id}
                                onChange={handleCheckboxChange}
                            />
                            <label htmlFor={option.id}>{option.label}</label>
                        </div>
                    ))}
                </div>

                <button type="submit" className="submit-button">Absenden</button>
            </form>
        </div>
    );
};

export default FormSheet;
