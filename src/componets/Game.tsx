import ShadesOfPurple from 'react-syntax-highlighter'
import { shadesOfPurple } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { Card, IconButton, List, ListItem, ListItemButton, ListItemText, Stack, Typography } from "@mui/material"
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import { useQuestionsStore } from "../store/question"
import { type Question as QuestionType } from "../types"
import { Footer } from './Footer';

export function Question({ info }:{ info : QuestionType}) {

    const selectAnswer = useQuestionsStore(store => store.selectAnswer)

    const getBackroundColor = (index: number) => {
        const { userSelectedAnswer, correctAnswer } = info
        if(userSelectedAnswer == null) return 'transparent'

        if(index !== correctAnswer && index !== userSelectedAnswer) return 'transparent'

        if(index == correctAnswer) return 'green'

        if(index == userSelectedAnswer) return 'red'
        
        return 'transaparent'
    }

    return (
        <>
            <Card variant='outlined' sx={{ bgcolor: '#222', p: 2, textAlign: 'left', marginTop: 4, maxWidth: '100%' }}>
                <Typography variant='h5'>
                    {info.question}
                </Typography>
                <ShadesOfPurple language="javascript" style={shadesOfPurple}>
                    {info.code}
                </ShadesOfPurple>
                <List sx={{ backgroundColor: '#333' }} disablePadding>
                    {info.answers.map((answer, index) => (
                        <ListItem key={index} disablePadding divider>
                            <ListItemButton
                                disabled = {info.userSelectedAnswer != null}
                                onClick={() => selectAnswer(info.id, index)}
                                sx={{ backgroundColor: getBackroundColor(index)}}
                            >
                                <ListItemText sx={{ textAlign: 'center' }}>{answer}</ListItemText>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                
            </Card>
        </>
    )
}

export function Game() {
    const questions = useQuestionsStore(store => store.questions)
    const currentQuestion = useQuestionsStore(store => store.currentQuestion)
    const goNextQuestion = useQuestionsStore(store => store.goNextQuestion)
    const goPreviosQuestion = useQuestionsStore(store => store.goPreviosQuestion)

    const questionInfo = questions[currentQuestion]
    return (
        <>
            <Stack marginTop={4} direction='row' gap={2} alignItems='center' justifyContent='center'>
                <IconButton disabled={currentQuestion <= 0} onClick={goPreviosQuestion}>
                    <ArrowBackIosNewIcon />
                </IconButton>
                {currentQuestion + 1} / {questions.length}
                <IconButton disabled={currentQuestion + 1 == questions.length} onClick={goNextQuestion}>
                    <ArrowForwardIosIcon />
                </IconButton>
            </Stack>
            <Question info={questionInfo} />
            <Footer />
        </>
    )
}