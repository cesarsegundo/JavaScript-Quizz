import { Button, Slider, Typography } from "@mui/material";
import { useQuestionsStore } from "../store/question.ts";
import { useState } from "react";

export function Start() {

    const [numQuestions, setNumQuestions] = useState(10)

    const fetchQuestion = useQuestionsStore(state => state.fetchQuestion)

    const handleClick = () => {
        fetchQuestion(numQuestions)
    }
    const handleChange = (_event: Event, newValue: number | number[]) => {
        setNumQuestions(newValue as number);
    }
    return (
        <>
            <Typography marginTop={4} variant='h5'>
                Número de preguntas: {numQuestions}
            </Typography>
            <Slider
                aria-label="Questions"
                defaultValue={10}
                valueLabelDisplay="auto"
                step={5}
                marks
                min={5}
                max={49}
                onChange={handleChange}
            />
            <Button style={{ width: '300px'}} onClick={handleClick} variant="contained">
                ¡Empezar!
            </Button>
        </>
    )
}