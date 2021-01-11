import axios from 'axios';

export interface Question {
    question: string,
    incorrect_answers: string[];
    correct_answer: string;
    
    
}

export type QuestionsState = Question & { answers: string[] };

export const fetchQuestionnaire = async(questionNum:number):Promise<QuestionsState[]> => {
    return await axios.get(`https://opentdb.com/api.php?amount=${questionNum}&type=multiple`)
    .then(res =>  {
        // console.log( "data", res.data.results.map((question: Question) => ({
        //     question: question.question,
        //     answers: [...question.incorrect_answers, question.correct_answer]
        // })));
      
        return  res.data.results.map((question: Question) => ({
            // ...question,
            question: question.question,
            answers: [...question.incorrect_answers, question.correct_answer]
        }))
    }
        
    )
}



