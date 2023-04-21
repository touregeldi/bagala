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
import {useSession} from "next-auth/react";

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

const Header = styled.div`
    display: flex;
    justify-content: space-between;
`
const Name = styled.div`
    font-size: 16px;
  font-weight: 700;
`

const LocalName = styled.div`
  background: #CCE9FE;
  padding: 8px;
    border-radius: 8px;
`


export const getStaticPaths = async () => ({
    paths: [],
    fallback: 'blocking',
})

export const getStaticProps = async ({ params }) => {
    return {
        props: {
        }
    }
}

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

    const session = useSession();

    const handleUpvote = (answerId) => {
        if (session.status === "authenticated") {
            const userId = session.data.user.id;

            const updatedAnswers = answers.map((answer) => {
                if (answer.id === answerId) {
                    const previousVote = answer?.voters?.[userId] || 0;

                    let newUpvote = answer.upvote;
                    let newDifference = answer.difference;

                    if (previousVote === 1) {
                        newUpvote -= 1;
                        newDifference -= 1;
                    } else {
                        newUpvote += 1;
                        newDifference += 1;
                        if (previousVote === -1) {
                            newDifference += 1;
                        }
                    }

                    return {
                        ...answer,
                        upvote: newUpvote,
                        difference: newDifference,
                        voters: {
                            ...answer.voters,
                            [userId]: previousVote === 1 ? 0 : 1,
                        },
                    };
                }
                return answer;
            });

            setAnswers(updatedAnswers);
            updateLocalStorage(updatedAnswers);
        } else {
            signIn();
        }
    };

    const handleDownvote = (answerId) => {
        if (session.status === "authenticated") {
            const userId = session.data.user.id;

            const updatedAnswers = answers.map((answer) => {
                if (answer.id === answerId) {
                    const previousVote = answer?.voters?.[userId] || 0;

                    let newDownvote = answer.downvote;
                    let newDifference = answer.difference;

                    if (previousVote === -1) {
                        newDownvote -= 1;
                        newDifference += 1;
                    } else {
                        newDownvote += 1;
                        newDifference -= 1;
                        if (previousVote === 1) {
                            newDifference -= 1;
                        }
                    }

                    return {
                        ...answer,
                        downvote: newDownvote,
                        difference: newDifference,
                        voters: {
                            ...answer.voters,
                            [userId]: previousVote === -1 ? 0 : -1,
                        },
                    };
                }
                return answer;
            });

            setAnswers(updatedAnswers);
            updateLocalStorage(updatedAnswers);
        } else {
            signIn();
        }
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

            const newStoredAnswered = [...updatedQuestions];
            if (!newStoredAnswered.some((q) => q.id === question.id)) {
                newStoredAnswered.push(question);
            }
            setStoredAnswered(newStoredAnswered);
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
            author: session.data.user.name
        };

        const updatedAnswers = [...answers, newAnswer];
        setAnswers(updatedAnswers);
        updateLocalStorage(updatedAnswers);
        setAnswerTitle("");
        setAnswerDescription("");

        // Move question from storedNew to storedAnswered
        const foundQuestionIndex = storedNew.findIndex((item) => item.id == id);
        if (foundQuestionIndex > -1) {
            const foundQuestion = storedNew[foundQuestionIndex];
            const updatedNewQuestions = [...storedNew];
            updatedNewQuestions.splice(foundQuestionIndex, 1);
            setStoredNew(updatedNewQuestions);

            const updatedAnsweredQuestions = [...storedAnswered, { ...foundQuestion, answers: updatedAnswers }];
            setStoredAnswered(updatedAnsweredQuestions);
        }
    };

    return question ? <Layout active={1}>
        <Header>
            <StyledTitle>{question.name}</StyledTitle>
            <Name><LocalName>{question.author}</LocalName></Name>
        </Header>

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
                    author={answer.author}
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
}

export default QuestionDetails;
