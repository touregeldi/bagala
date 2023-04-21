import Layout from "@/components/Layout";
import SingleItem from "@/components/SingleItem";
import WhitePaper from "@/components/WhitePaper";
import styled from "styled-components";
import {useEffect, useState} from "react";
import {Dropdown, Modal} from "antd";
import {DownOutlined} from "@ant-design/icons";
import {
    ButtonNewFile,
    HeaderWrapper,
    ModalWrapper,
    ModalHeader,
    NameInputWrapper,
    NameInput, StyledSpace
} from "@/pages/course-details/[id]";
import {mocksAnswered, mocksNew} from "@/data";
import useLocalStorage from "@/hooks/useLocalStorage";
import {useRouter} from "next/router";

const Header = styled.div`
  display: flex;
  gap: 32px;;
`

const School = styled.div`
  font-size: 16px;
  color: rgba(17, 20, 45, 0.5);
  font-weight: 700;
  ${({ active }) => active ? `
  color: #11142D;
  ` :``}
  cursor: pointer;
`

const MainWrapper = styled.div`
    display: flex;
    flex-direction: column;
  gap: 16px;
`

const NameTextArea = styled.textarea`
  width: 100%;
  height: 200px;
  left: 0px;
  top: 28px;
  border-radius: 8px;
  padding: 14px 16px 14px 16px;
  border: 1px solid #D1D1D1;
`

const categories = ['Answered questions', 'Unanswered questions']

export function generateRandomId() {
    const min = 1;
    const max = 10000;

    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function Questions() {
    const [activeCategories, setActiveCategories] = useState(0)
    const router = useRouter()


    const [storedNew, setStoredNew] = useLocalStorage(
        "mocksNew",
        mocksNew
    );

    const [storedAnswered, setStoredAnswered] = useLocalStorage(
        "mocksAnswered",
        mocksAnswered
    );

    const mocks = activeCategories ? storedNew : storedAnswered

    const onItemClick = (id) => {
        router.push(`/question-details/${id}`)
    }

    useEffect(() => {
        const handleRouteChange = () => {
            // This function will run when the route changes.
            setStoredNew(JSON.parse(localStorage.getItem("mocksNew")));
            setStoredAnswered(JSON.parse(localStorage.getItem("mocksAnswered")));
        };

        // Listen for route change events.
        router.events.on("routeChangeComplete", handleRouteChange);

        // Clean up the listener when the component is unmounted.
        return () => {
            router.events.off("routeChangeComplete", handleRouteChange);
        };
    }, []);

    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('');
    const [modalDescription, setModalDescription] = useState('');

    const showModal = () => {
        setOpen(true);
    };

    const handleOk = () => {
        if (modalText === '' || modalDescription === '') {
            error();
            return;
        }
        setConfirmLoading(true);
        setTimeout(() => {
            setConfirmLoading(false);
            setStoredNew([...storedNew, {
                "name": modalText,
                "description": modalDescription,
                "id": generateRandomId(),
                "answers": []
            }])
            setOpen(false);
        }, 2000);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    const error = () => {
        Modal.error({
            title: 'Error',
            content: 'Fill all the fields',
        })
    }

    return (
        <Layout active={1}>
            <WhitePaper header={
                    <HeaderWrapper>
                        <Header>
                            {
                                categories.map((school, index) =>
                                    <School
                                        key={school}
                                        onClick={() => setActiveCategories(index)}
                                        active={index === activeCategories}
                                    >{school}</School>)
                            }
                        </Header>
                        <ButtonNewFile data-toggle="modal" onClick={showModal}>
                            New question
                        </ButtonNewFile>
                        <Modal
                            title=""
                            open={open}
                            onOk={handleOk}
                            confirmLoading={confirmLoading}
                            onCancel={handleCancel}
                        >
                            <ModalHeader>
                                Add your question
                            </ModalHeader>
                            <ModalWrapper>
                                <NameInputWrapper>
                                    <label>Write the title of the question</label>
                                    <NameInput type={'text'} placeholder={'Title'} value={modalText} onChange={(e) =>setModalText(e.target.value) }/>
                                </NameInputWrapper>
                                <NameInputWrapper>
                                    <label>Describe your question</label>
                                    <NameTextArea type={'text'} placeholder={'Description'} value={modalDescription} onChange={(e) =>setModalDescription(e.target.value) }/>
                                </NameInputWrapper>
                            </ModalWrapper>
                        </Modal>
                    </HeaderWrapper>
            }>
                <MainWrapper>
                    {
                        mocks.map((course, index) => <SingleItem key={index} {...course} onClick={() => onItemClick(course.id)}/>)
                    }
                </MainWrapper>

            </WhitePaper>
        </Layout>
    );
}

export default Questions;