import { Button, Stack } from "@mui/material";
import { useQuestionsStore } from "../store/question"
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';

export function Footer() {
    const questions = useQuestionsStore(store => store.questions)
    const resetGame = useQuestionsStore(store => store.resetGame)

    let corrects = 0
    let incorrects = 0
    questions.forEach(question => {
        const { userSelectedAnswer, isCorrectUserAnswer } = question
        if(isCorrectUserAnswer) corrects++
        if(!isCorrectUserAnswer && userSelectedAnswer != null) incorrects++
    })
    return (
        <footer>
            <Stack marginTop={2} fontSize={20} direction='row' justifyContent='center' justifyItems='center' alignItems='center' gap={1}>
                <ThumbUpOffAltIcon fontSize="large" color="success" /> {corrects} 
                <ThumbDownOffAltIcon fontSize="large" sx={{ color: 'red'}} /> {incorrects} 
            </Stack>
            <div style={{ marginTop: '16px'}}>
                <Button variant="outlined" onClick={resetGame}>Resetear Juego</Button>
            </div>
        </footer>
    )
}

