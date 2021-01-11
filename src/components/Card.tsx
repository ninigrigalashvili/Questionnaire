import React  from 'react';
import { RadioGroup, Button, Radio } from '@material-ui/core';
import { FormControlLabel, FormHelperText } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import ProgressBar from './ProgressBar';
import Loader from './Loader';
interface Props {
    question: string,
    questionNum: number,
    totalQuestions: number,
    answers: string[],
    nextQuestion: any,
    prevQuestion: any
    handleSubmit:any,
    handleChange:any,
    error: Boolean,
    errorText:string

}


const Card: React.FC<Props> = ({
    question,
    questionNum,
    totalQuestions,
    answers,
    nextQuestion,
    handleSubmit,
    prevQuestion,
    handleChange,
    error,
    errorText
}) => {

    return (
        <div className="card">
           {
               question && answers ? (
                <>
                <ProgressBar percentRange={questionNum}/>
                <div className="card__questionNum">Question: {questionNum} / {totalQuestions}</div>
                <div className="card__question">{question}</div>
                        <RadioGroup aria-label="quiz" name="quiz" className="radio" onChange={(e) => { handleChange(e) }}>
                            {
                                answers && answers.map(answer => (
                                    <FormControlLabel
                                        key={answer}
                                        value={answer}
                                        control={<Radio color="primary" />}
                                        label={answer} />
                                ))
                            }
                        </RadioGroup>
                       {
                         error &&  <FormHelperText>{errorText}</FormHelperText>
                       } 
                        <div className="button__container">
                       { 
                       !!!error &&
                       questionNum > 1 && questionNum !== totalQuestions && (
                        <Button  onClick={prevQuestion} variant="outlined" color="primary">
                         <ArrowBackIosIcon style={{fontSize: '11px', marginRight: '10px'}}/>
                            Prev Question
                        </Button>
                       )}
                       {
                       !!!error &&
                        <Button onClick={questionNum === totalQuestions ? handleSubmit : nextQuestion} variant="outlined" color="primary">
                            {questionNum === totalQuestions ? 'Submit' : 'Next Question'}
                         {questionNum !== totalQuestions && <ArrowForwardIosIcon style={{fontSize: '11px', marginLeft: '10px'}}/>}
                        </Button>
                            }
                           </div>
                </>
               )
               :
               (
                   <Loader />
               )
           }
        </div>
    )
}

export default Card;