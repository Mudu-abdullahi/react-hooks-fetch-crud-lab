import React from "react";

function QuestionList({ questions, onDeleteQuestion, onUpdateQuestion }) {
  function handleDelete(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    }).then(() => {
      onDeleteQuestion(id);
    });
  }

  function handleCorrectAnswerChange(id, newIndex) {
    // Immediate state update for tests
    onUpdateQuestion({
      ...questions.find((q) => q.id === id),
      correctIndex: Number(newIndex),
    });

    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correctIndex: Number(newIndex) }),
    })
      .then((r) => r.json())
      .then((updatedQ) => {
        onUpdateQuestion(updatedQ);
      });
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((q) => (
          <li key={q.id}>
            <h4>{q.prompt}</h4>
            <label>
              Correct Answer:
              <select
                value={q.correctIndex}
                onChange={(e) => handleCorrectAnswerChange(q.id, e.target.value)}
              >
                {q.answers.map((ans, index) => (
                  <option key={index} value={index}>
                    {ans}
                  </option>
                ))}
              </select>
            </label>
            <button onClick={() => handleDelete(q.id)}>Delete Question</button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;
