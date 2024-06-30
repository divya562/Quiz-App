import React, { useState, useEffect } from 'react';

const Question = ({ question, currentQuestionIndex, totalQuestions, onNext, onPrevious, onOptionChange }) => {
  const [selectedOption, setSelectedOption] = useState(question.selectedOption);

  const handleOptionClick = (optionIndex) => {
    const selectedOption = (optionIndex + 1).toString(); 
    setSelectedOption(selectedOption);
    onOptionChange(question._id, selectedOption);
  };

  useEffect(() => {
    setSelectedOption(question.selectedOption);
  }, [question]);

  return (
    <div className="mb-4">
      <h3 className="text-2xl font-semibold mb-4">{`Question ${currentQuestionIndex + 1} of ${totalQuestions}`}</h3>
      <p className="text-lg mb-6">{question.question}</p>
      {question.options.map((option, optionIndex) => (
        <div
          key={optionIndex}
          className={`mb-2 p-2 rounded cursor-pointer ${
            selectedOption === (optionIndex + 1).toString() ? 'bg-green-500 text-white' : 'bg-white text-black border border-gray-300'
          }`}
          onClick={() => handleOptionClick(optionIndex)}
        >
          {option}
        </div>
      ))}
      <div className="flex justify-between mt-6">
        <button
          onClick={onPrevious}
          disabled={currentQuestionIndex === 0}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
        >
          Previous
        </button>
        <button
          onClick={onNext}
          disabled={currentQuestionIndex === totalQuestions - 1}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Question;
