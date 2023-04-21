import { useEffect, useState } from "react";
import { mocksAnswered, mocksNew } from "@/data";
import { useRouter } from 'next/router';
import useLocalStorage from "@/hooks/useLocalStorage";
import Layout from "@/components/Layout";
import WhitePaper from "@/components/WhitePaper";
import SingleQuestion from "@/components/SingleQuestion";
import styled from "styled-components";
import SingleAnswer from "@/components/SingleAnswer";
import {generateRandomId} from "@/pages/questions";
import {Modal} from "antd";

const StyledTitle = styled.div`
  font-size: 24px;
    font-weight: 700;
  margin-bottom: 16px;
`

const MainWrapper = styled.div`
    display: flex;
    flex-direction: column;
  gap: 16px;
`

const Form = styled.div`
    display: flex;
    flex-direction: column;
  gap: 8px;
`

const StyledTextarea = styled.textarea`
    border: 1px solid #D1D1D1;
    border-radius: 8px;
    padding: 14px 16px 14px 16px;
`

const StyledInput = styled.input`
  border: 1px solid #D1D1D1;
    border-radius: 8px;
    padding: 14px 16px 14px 16px;
`

const StyledButton = styled.button`
    background: #0D8BFF;
  color: #fff;
    border-radius: 8px;
  width: 60%;
  margin: 0 auto;
    padding: 14px 16px 14px 16px;
  cursor: pointer;
`

export const getStaticPaths = async () => ({
    paths: [],
    fallback: 'blocking',
})

function QuestionDetails() {
    const router = useRouter();
    const { id } = router.query;
    const [question, setQuestion] = useState();
    const [answers, setAnswers] = useState([]);
    const [newAnswer, setNewAnswer] = useState("");
    const [storedNew, setStoredNew] = useLocalStorage(
        "mocksNew",
        mocksNew
    );

    const [storedAnswered, setStoredAnswered] = useLocalStorage(
        "mocksAnswered",
        mocksAnswered
    );


    useEffect(() => {
        if (id) {
            const foundQuestion = [
                ...storedNew,
                ...storedAnswered
            ].find((item) => item.id == id);

            setQuestion(foundQuestion);
            if (foundQuestion && foundQuestion.answers) {
                setAnswers(sortByDifference(foundQuestion.answers));
            }
        }
    }, [id, storedNew, storedAnswered]);

    const sortByDifference = (answers) => {
        return answers.sort((a, b) => b.difference - a.difference);
    };

    const handleUpvote = (answerId) => {
        const updatedAnswers = answers.map((answer) => {
            if (answer.id === answerId) {
                return {
                    ...answer,
                    upvote: answer.upvote + 1,
                    difference: answer.difference + 1,
                };
            }
            return answer;
        });

        setAnswers(updatedAnswers);

        updateLocalStorage(updatedAnswers);
    };

    const handleDownvote = (answerId) => {
        const updatedAnswers = answers.map((answer) => {
            if (answer.id === answerId) {
                return {
                    ...answer,
                    downvote: answer.downvote + 1,
                    difference: answer.difference - 1,
                };
            }
            return answer;
        });

        setAnswers(updatedAnswers);

        updateLocalStorage(updatedAnswers);
    };

    const updateLocalStorage = (updatedAnswers) => {
        const sortedAnswers = sortByDifference(updatedAnswers);

        if (storedNew.some((q) => q.id === question.id)) {
            const updatedQuestions = storedNew.map((storedQuestion) => {
                if (storedQuestion.id === question.id) {
                    return {
                        ...storedQuestion,
                        answers: sortedAnswers,
                    };
                }
                return storedQuestion;
            });

            setStoredNew(updatedQuestions);
        } else {
            const updatedQuestions = storedAnswered.map((storedQuestion) => {
                if (storedQuestion.id === question.id) {
                    return {
                        ...storedQuestion,
                        answers: sortedAnswers,
                    };
                }
                return storedQuestion;
            });

            setStoredAnswered(updatedQuestions);
        }
    };


    const [answerTitle, setAnswerTitle] = useState("");
    const [answerDescription, setAnswerDescription] = useState("");

    const error = () => {
        Modal.error({
            title: 'Error',
            content: 'Fill all the fields',
        })
    }

    const addAnswer = () => {
        if (answerTitle === "" || answerDescription === "") {
            error();
            return;
        }
        const newAnswer = {
            id: generateRandomId(),
            title: answerTitle,
            description: answerDescription,
            upvote: 0,
            downvote: 0,
            difference: 0,
        };

        const updatedAnswers = [...answers, newAnswer];
        setAnswers(updatedAnswers);
        updateLocalStorage(updatedAnswers);
        setAnswerTitle("");
        setAnswerDescription("");
    };


    return question ? <Layout active={1}>
        <StyledTitle>{question.name}</StyledTitle>
        <WhitePaper
            header={
                <SingleQuestion description={question.description} />
            }
        >
            <MainWrapper>
                {answers.map((answer) => (<SingleAnswer
                    key={answer.id }
                    name={answer.title}
                    description={answer.description}
                    number={answer.difference}
                    handleDownVote={() => handleDownvote(answer.id)}
                    handleUpVote={() => handleUpvote(answer.id)}
                />))}

                <Form>
                    {/* ... (rest of the code) */}
                    <StyledTitle>Add an answer</StyledTitle>
                    <StyledInput
                        type="text"
                        placeholder="Title"
                        value={answerTitle}
                        onChange={(e) => setAnswerTitle(e.target.value)}
                    />
                    <StyledTextarea
                        placeholder="Description"
                        value={answerDescription}
                        onChange={(e) => setAnswerDescription(e.target.value)}
                    ></StyledTextarea>
                    <StyledButton onClick={addAnswer}>Submit</StyledButton>
                </Form>
            </MainWrapper>
        </WhitePaper>
    </Layout> : 'loading'

    // return (
    //     <div>
    //         {question && (
    //             <>
    //                 <h1>{question.name}</h1>
    //                 <p>{question.description}</p>
    //                 <h2>Answers</h2>
    //                 {answers.map((answer) => (
    //                     <div key={answer.id}>
    //                         <h3>{answer.title}</h3>
    //                         <p>{answer.description}</p>
    //                         <p>Upvotes: {answer.upvote}</p>
    //                         <p>Downvotes: {answer.downvote}</p>
    //                         <p>Difference: {answer.difference}</p>
    //                         <button onClick={() => handleUpvote(answer.id)}>Upvote</button>
    //                         <button onClick={() => handleDownvote(answer.id)}>Downvote</button>
    //                     </div>
    //                 ))}
    //                 <form onSubmit={handleSubmit}>
    //                     <label htmlFor="newAnswer">Add an answer:</label>
    //                     <textarea
    //                         id="newAnswer"
    //                         value={newAnswer}
    //                         onChange={(e) => setNewAnswer(e.target.value)}
    //                         required
    //                     />
    //                     <button type="submit">Submit</button>
    //                 </form>
    //             </>
    //         )}
    //     </div>
    // );
}

export default QuestionDetails;
