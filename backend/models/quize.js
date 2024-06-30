import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    options: [{
        type: String,
        required: true
    }],
    correctAnswer: {
        type: String,
        required: true
    }
});

const QuizSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    timer: {
        type: Number,
        required: true
    },
    questions: [QuestionSchema] 
});

const Quiz = mongoose.model('Quiz', QuizSchema);

export default Quiz;
