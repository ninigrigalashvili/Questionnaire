import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Card from '../components/Card';
import { fetchQuestionnaire, QuestionsState } from '../services/index';

const TOTAL_QUESTIONS = 10;



const Questionnaire: React.FC = () => {
    const [questions, setQuestions] = useState<QuestionsState[]>([]);
    const [number, setNumber] = useState(0);
    const [endOfQuestions, setEndOfQuestions] = useState(false);
    const [error, setError] = useState(false);
    const [errorText, setErrorText] = useState('');
    const [clickedAnswer, setclickedAnswer] = useState<string>('');

    useEffect(() => {
        fetchData();
    }, [])


    const fetchData = async () => {
        const fetchedData = await fetchQuestionnaire(TOTAL_QUESTIONS);
        setQuestions(fetchedData);
    }

    const nextQuestion = () => {
        const nextQuestion = number + 1;
        setclickedAnswer('');
        if (!clickedAnswer) {
            setErrorText('Please select an option.');
            setError(true);
        } else {

            if (nextQuestion === TOTAL_QUESTIONS) {
                setEndOfQuestions(true)
            } else {
                setNumber(nextQuestion);
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setNumber(0);
        setEndOfQuestions(false);
    }

    const prevQuestion = () => {
        const prevQuestion = number - 1;
        setNumber(prevQuestion);

    }

    const handleChange = (event) => {
        setclickedAnswer(event.target.value)
        setErrorText('');
        setError(false);

    }
    return (
        <div>
            <Header />
            {
                !endOfQuestions && questions && (
                    <div className="card__container">
                        <Card
                            question={questions && questions[number] && questions[number].question}
                            answers={questions && questions[number] && questions[number].answers}
                            questionNum={number + 1}
                            totalQuestions={TOTAL_QUESTIONS}
                            nextQuestion={nextQuestion}
                            handleSubmit={handleSubmit}
                            prevQuestion={prevQuestion}
                            handleChange={handleChange}
                            error={error}
                            errorText={errorText}
                        />
                    </div>
                )

            }
        </div>
    )
}

export default Questionnaire;