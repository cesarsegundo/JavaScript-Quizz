import { Stack, Typography } from '@mui/material'
import { JavaSCriptLogo } from './JavaScriptLogo'
import { Start } from './componets/Start'
import { useQuestionsStore } from './store/question'
import { Game } from './componets/Game'
import './App.css'

function App() {

  const questions = useQuestionsStore(store => store.questions)

  return (
    <main>
      <Stack direction='row' gap={2} alignItems='center' justifyContent='center'>
        <JavaSCriptLogo />
        <Typography variant='h2' component='h1'>
          JavaScript Quizz
        </Typography>
      </Stack>
      { questions.length === 0 && <Start />}
      {questions.length > 0 && <Game />}
    </main>
  )
}

export default App
