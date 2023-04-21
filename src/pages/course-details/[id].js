import Layout from "@/components/Layout";
import {useRouter} from "next/router";
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import {getBaseUrl} from "@/pages";
import { DownOutlined } from '@ant-design/icons';
import Breadcrumb from "@/components/Breadcrumb";
import WhitePaper from "@/components/WhitePaper";
import SingleItem from "@/components/SingleItem";
import styled from "styled-components";
import {Dropdown, Modal, Space} from "antd";
import { getPageFiles } from "next/dist/server/get-page-files";

const Header = styled.div`
  display: flex;
  gap: 32px;;
`

const MainWrapper = styled.div`
    display: flex;
    flex-direction: column;
  gap: 16px;
`

const mocks = [
    {
        "name": "Syllabus123.pdf",
        "parent_course": 1,
        "parent_course_category": 0,
        "id": 2,
        "content": "/media/staticfiles/asdads.jpg",
        "date_uploaded": "2000-09-23"
    },
    {
        "name": "Syllabus123.pdf",
        "parent_course": 1,
        "parent_course_category": 0,
        "id": 2,
        "content": "/media/staticfiles/asdads.jpg",
        "date_uploaded": "2000-09-23"
    },
    {
        "name": "Syllabus123.pdf",
        "parent_course": 1,
        "parent_course_category": 1,
        "id": 2,
        "content": "/media/staticfiles/asdads.jpg",
        "date_uploaded": "2000-09-23"
    },
    {
        "name": "Syllabus123.pdf",
        "parent_course": 1,
        "parent_course_category": 2,
        "id": 2,
        "content": "/media/staticfiles/asdads.jpg",
        "date_uploaded": "2000-09-23"
    },
    {
        "name": "Syllabus123.pdf",
        "parent_course": 1,
        "parent_course_category": 3,
        "id": 2,
        "content": "/media/staticfiles/asdads.jpg",
        "date_uploaded": "2000-09-23"
    }
]

const categories = ['Syllabus', 'Lectures', 'Quizzes/Exams', 'Assignments', 'Additional Materials']

const School = styled.div`
  font-size: 16px;
  color: rgba(17, 20, 45, 0.5);
  font-weight: 700;
  ${({ active }) => active ? `
  color: #11142D;
  ` :``}
  cursor: pointer;
`

export const ButtonNewFile = styled.div`
  width: 115px;
  font-size: 16px;
  background: #0D8BFF;
  color: #FFFFFF;
  padding: 12px 0;
  margin: -16px 0;
  border-radius: 8px;
  display: flex;
    justify-content: center;
    align-items: center;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
    align-items: center;
`

export const StyledSpace = styled(Space)`
    width: 100%;
  border: 1px solid #D1D1D1;
  height: 44px;
  left: 0px;
  top: 28px;
  border-radius: 8px;
  padding: 14px 16px 14px 16px;
  display: flex;
    justify-content: space-between;
`

export const ModalWrapper = styled.div`
    display: flex;
    flex-direction: column;
  gap: 16px;
`

export const FileSelectWrapper = styled.div`
  width: 100%;
  display: flex;
    justify-content: center;
    align-items: center;
  border: 1px solid #D1D1D1;
  height: 100px;
    border-radius: 8px;
`

export const FileSelectContainer = styled.div`
  border: 1px solid #ccc;
  display: inline-block;
  padding: 6px 12px;
  cursor: pointer;
    border-radius: 8px;
  background: #0D8BFF;
  color: white;
`

export const FileSelect = styled.input`
  display: none;
`

export const NameInput = styled.input`
    width: 100%;
  height: 44px;
  left: 0px;
  top: 28px;
  border-radius: 8px;
  padding: 14px 16px 14px 16px;
  border: 1px solid #D1D1D1;
`

export const NameInputWrapper = styled.div`
    
`

export const ModalHeader = styled.div`
  font-size: 20px;
  font-weight: 600;
  line-height: 24px;
  letter-spacing: 0em;
  text-align: left;
  margin-bottom: 16px;

`

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

function Questions() {
    const router = useRouter()
    const { id, schoolName } = router.query
    const [activeCategory, setActiveCategory] = useState(0)
    const [data, setData] = useState()
    const courseName = schoolName
    const breadcrumbItems = [
        { label: 'Courses', link: '/' },
        { label: courseName, link: `/course-details/${id}` },
    ];
    const [formActiveCategory, setFormActiveCategory] = useState(0)
    const items = categories.map((category , index)=> ({
        label: <a onClick={() => setFormActiveCategory(index)}>{category}</a>,
        key: index
    }))
    const inputRef = useRef()
    const filename = useRef()
    const handleFileSelect = () => {
        inputRef.current.click()
    }

    useEffect(() => {
        if(!id && id!==0) return
        axios.get(`${getBaseUrl()}/courses/course/${id}`).
            then(res => {
                 setData(res.data)
                console.log('res', res.data)
            })
        console.log('id from effect: ', id)
    }, [id])

    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState();

    const showModal = () => {
        setOpen(true);
    };

    const handleOk = () => {
        if (inputRef.current.files.length === 0 || !modalText) {
            error()
            return
        }
    function download_file(id) {
       axios.get(`${getBaseUrl()}/courses/course/${id}`, { params: { file_id: id } }).then((res => Response.blob()));

    }



    const formData = new FormData();
    const file = inputRef.current.files[0]

    formData.append("content", file);
    formData.append("name", modalText)
    formData.append("date_uploaded", formatDate('Sun May 11,2014') )
    formData.append("parent_course", id )
    formData.append("parent_course_category", formActiveCategory )


    axios.post(`${getBaseUrl()}/courses/upload_file`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
}).then(() =>


    axios.get(`${getBaseUrl()}/courses/course/${id}`).
    then(res => {
     setData(res.data)
    console.log('res', res.data)
}))




        setOpen(false);
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };

    const error = () => {
        Modal.error({
            title: 'Error',
            content: 'Fill all the fields',
        });
    };

    return (
        <Layout active={0}>
            <Breadcrumb items={breadcrumbItems} />
            <WhitePaper header={
                <HeaderWrapper>
                    <Header>
                        {
                            categories.map((school, index) =>
                                <School
                                    key={school}
                                    onClick={() => setActiveCategory(index)}
                                    active={index === activeCategory}
                                >{school}</School>)
                        }
                    </Header>
                    <ButtonNewFile data-toggle="modal" onClick={showModal}>
                        New File
                    </ButtonNewFile>
                    <Modal
                        title=""
                        open={open}
                        onOk={handleOk}
                        confirmLoading={confirmLoading}
                        onCancel={handleCancel}
                    >
                        <ModalHeader>
                            Add your file
                        </ModalHeader>
                        <ModalWrapper>
                            <NameInputWrapper>
                                <label>Write the name of the file</label>
                                <NameInput type={'text'} ref = {filename} placeholder={'File Name'} value={modalText} onChange={(e) =>setModalText(e.target.value) }/>
                            </NameInputWrapper>

                            <div>
                                <label>Choose category</label>
                                <Dropdown
                                    menu={{
                                        items,
                                    }}
                                    trigger={['click']}
                                >
                                    <a onClick={(e) => {
                                        e.preventDefault()
                                        console.log('click', e)
                                    }}>
                                        <StyledSpace>
                                            {categories[formActiveCategory]}
                                            <DownOutlined />
                                        </StyledSpace>
                                    </a>
                                </Dropdown>
                            </div>

                            <div>
                                <label>Choose file</label>
                                <FileSelectWrapper>
                                    <FileSelectContainer onClick={handleFileSelect}>
                                        <FileSelect type={'file'} ref={inputRef}/>
                                        Choose File
                                    </FileSelectContainer>
                                </FileSelectWrapper>
                            </div>

                        </ModalWrapper>

                    </Modal>
                </HeaderWrapper>
            }>
                <MainWrapper>
                    {
                       data ?  data.filter(item => item.parent_course_category === activeCategory).map((course, index) => <SingleItem key={index} {...course} description={course.date_uploaded} onClick={download_file}/>) : 'loading'
                    }
                </MainWrapper>

            </WhitePaper>
        </Layout>
    );
}

export default Questions;