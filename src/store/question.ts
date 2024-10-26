import { create } from "zustand";
import { type Question } from "../types";
import confetti from "canvas-confetti";
import { persist } from "zustand/middleware";

interface State {
    questions: Question[],
    currentQuestion: number,
    fetchQuestion: (limit: number) => Promise<void>,
    selectAnswer: (questionId: number, answerIndex: number) => void,
    goNextQuestion: () => void,
    goPreviosQuestion: () => void
    resetGame: () => void
}

export const useQuestionsStore = create<State>()(persist((set, get) => {
    return {
        questions: [],
        currentQuestion: 0,
        fetchQuestion: async (limit: number) => {
            fetch('http://localhost:5173/data.json')
                .then(data => data.json())
                .then(results => {
                    const questions = results.sort(() => Math.random() - 0.5).slice(0, limit)
                    set({ questions })
                })
        },

        selectAnswer: (questionId: number, answerIndex: number) => {
            const { questions } = get()
            const newQuestions = structuredClone(questions)
            const questionIndex = newQuestions.findIndex(question => question.id === questionId)
            const questionInfo = newQuestions[questionIndex]
            const isCorrectUserAnswer = questionInfo.correctAnswer === answerIndex

            if(isCorrectUserAnswer) confetti()

            // Update state
            newQuestions[questionIndex] = {
                ...questionInfo,
                isCorrectUserAnswer,
                userSelectedAnswer: answerIndex
            }

            set({ questions: newQuestions })
        },

        goNextQuestion: () => {
            const { currentQuestion, questions } = get()
            const nextQuestion = currentQuestion + 1
            
            if(nextQuestion < questions.length) {
                set({ currentQuestion: nextQuestion })
            }
        },

        goPreviosQuestion: () => {
            const { currentQuestion } = get()
            const previusQuestion = currentQuestion - 1
            if(previusQuestion >= 0) {
                set({ currentQuestion: previusQuestion})
            }
        },

        resetGame: () => {
            set({ currentQuestion:0, questions: []})
        }

    }
}, {
    name: 'question'
}))