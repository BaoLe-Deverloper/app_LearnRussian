import React, { Component } from "react";
import { Container, Row,
         Col, FormInput,
         ListGroupItem,
         ListGroup, 
         CardHeader,
         Alert, 
         Card, 
         FormSelect,
         CardBody, 
         Button, 
         FormGroup, 
         Form, 
         FormCheckbox, 
         InputGroupAddon,
         InputGroup ,
         Badge,
         ButtonGroup} from "shards-react";

import PageTitle from "../components/common/PageTitle";
import { Redirect} from "react-router-dom"
import YouTube from 'react-youtube';
import { Player } from 'video-react';
import toast from 'toasted-notes' 
import UploadFileToFirebase from "./../firebase/uploadFileToFirebase";
import {testActions} from './../Redux/Actions';
import {connect} from "react-redux";
import TimeField from 'react-simple-timefield';
import SweetAlert from 'react-bootstrap-sweetalert';
import axios from "axios";
import { config } from "./../config";

class addVideo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            idTest:'',
            status:true,
            index: -1 ,
            url_video: "",
            type: "",
            lever:"A1",
            coverImage: "",
            questions: [],
            question: "",
            description:"",
            title:"",
            timeTest: '00:15:00',
            answers: [{ answer: "", result: false, id: Math.floor(Math.random() * 100000) }],
        };

    }
    
    componentWillMount = () => {
        const id = this.props.location.state ? this.props.location.state.id : null;
        if (id) {
            const token = localStorage.getItem("accessToken");
            if (token) {
                axios(config.UrlServerBase + "test/getById/" + id, {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8',
                        "Access-Control-Allow-Origin": "*",
                        'Authorization': "Bearer " + token

                    }
                }).then(resp => {

                    if (!resp.data.err) {
                       
                        this.setState(pre => ({
                            ...pre, pageTitle: "изменить тест",
                            text: test.url_media,
                            description: test.description,
                            timeTest: test.timeTest,
                            lever: test.lever,
                            title: test.title,
                            status: test.status,
                            questions: test.questions,
                            idTest: id,
                            type:test.type,
                            url_video: test.url_media,
                            coverImage: test.coverImage
                        }))
                    }

                });
            }

        }
    }

    changeHandle = e => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value
        })

    }
    answerInputHandle = e => {
        const id = e.target.id;
        const answers = this.state.answers;
        answers[id].answer = e.target.value;
        this.setState({ ...this.state, answers });

    }
    checkboxHandle(id) {
        const answers = this.state.answers;
        answers[id].result = !answers[id].result;
        this.setState({ ...this.state, answers });
    }
    getFileUrlVideo = url => {
        this.setState({ ...this.state, url_video: url });
    }
    getFileUrlImage = url => {
        this.setState({ ...this.state, coverImage: url });
    }

    addQuestion = () => {
        const questions = this.state.questions;
        const answers = this.state.answers;
        const question = this.state.question;
        const index =  this.state.index;
        index < 0 ? questions.push({ number: questions.length + 1, question, answers }) : questions[index] = {number:index +1,  question,answers}
        this.setState({...this.state,questions,answers:[],question:'',index:-1})
    }

    addAnswer = ()=>{
        const answers = this.state.answers;
        answers.push({ answer: "", result: false, id: Math.floor(Math.random() * 100000)})
        this.setState({ ...this.state, answers });
    }
    deleteAnswer(id){
        const answers = this.state.answers;
         answers.splice(id,1);
        this.setState({ ...this.state, answers });
    }

    DeleteQuestion(id){
        const questions = this.state.questions;
        questions.splice(id, 1);
        this.setState({...this.state,questions})
    }
    EditQuestion(id){
        const question = this.state.questions[id];
        this.setState({ ...this.state, answers:question.answers,question:question.question,index:id });
       
    }
    Reset = ()=>{
        this.setState({...this.state, question: "",
        answers: [{ answer: "", result: false, id: Math.floor(Math.random() * 100000) }]})
    }
    saveToDatabase = ()=>{
        const { idTest,url_video, questions,lever, coverImage, timeTest, description,  title, type , status} = this.state;
   
        if (!url_video || !questions || !description || !title|| !type){
            toast.notify(()=> <Alert theme= "danger">Пожалуйста, добавьте данные к этому уроку !</Alert>,{position:'top',duration:2000});   
        }else{
            const test = { url_media: url_video, lever, questions, coverImage, timeTest, description, title, type, status} ;
            if (!idTest)
                this.props._addTest(test);
            else {
                test["id"] = idTest;
                this.props._updateTest(test);
            }
        
        }
    }
    resetState = () => {
        if (this.props.test.update_status)
            this.props._resetResult();
    }
    render() {
      
        if (this.props.test.result) {
            toast.notify("Успешно сохранено в базе данных !", { position: 'top', duration: 2000 });
            return <Redirect to={{ pathname: "/send", state: { id: this.props.test.id } }} />
        }
        const _id = this.state.url_video ? this.state.url_video.split("=")[1].split("&")[0] : "";
        return (

            <Container fluid className="main-content-container px-4 pb-4">

                <Row noGutters className="page-header py-4">
                    <PageTitle sm="4" title="Add Video" className="text-sm-left" />
                </Row>
                
                {
                    this.props.test.update_status && <SweetAlert success title="Уведомление" onConfirm={() => this.resetState()}>
                        Успешно сохранено в базе данных !
                       </SweetAlert>

                }
              <Row>
                <Col lg="6" md="12">
                  <FormGroup>
                    <FormInput invalid={this.state.title === ''} className="mb-3" name="title" value={this.state.title} placeholder="Your test title" onChange={this.changeHandle} />
                  </FormGroup>
                  <FormGroup>
                    <FormInput invalid={this.state.description === ''} className="mb-3" name="description" value={this.state.description} placeholder="Your test description" onChange={this.changeHandle} />
                  </FormGroup>
                </Col>
                <Col lg="6" md="12">
                  <ButtonGroup>
                     <label> Время теста (*часы: минуты: секунды) :</label>
                    <TimeField style={{ width: "25%", fontSize:"20px", margin:"0 0 10px 50px" }} showSeconds className="mb-3" name="timeTest" value={this.state.timeTest} onChange={this.changeHandle} />
                   </ButtonGroup>
                  <FormGroup>
                            <FormSelect invalid={this.state.lever === ''} value={this.state.lever} name="lever" onChange={this.changeHandle} >
                      <option value="">choose your lever</option>
                      <option value="A1">Lever A1</option>
                      <option value="A2">Lever A2</option>
                      <option value="B1">Lever B1</option>
                      <option value="B2">Lever B2</option>
                      <option value="C1">Lever C1</option>
                      <option value="C2">Lever C2</option>
                      <option value="D1">Lever D1</option>
                      <option value="D2">Lever D2</option>
                    </FormSelect>
                  </FormGroup>
                </Col>
              </Row>
          <Row>
          
        
             <Col lg="4" md="12">
                        <Card small className="mb-3">
                            <CardHeader className="border-bottom">
                            <h6 className="m-0">Add Link Youtube</h6>
                            <br/>
                         
                                <FormGroup>
                                    <FormSelect name="type" value={this.state.type} onChange={this.changeHandle}>
                                        <option value="">Выберите тип данных </option>
                                        <option value="mp4_or_mp3">Link Video Or Mp3</option>
                                        <option value="youtube">Link Youtube</option>
                                    </FormSelect>
                                </FormGroup>
                                {this.state.type ? <FormGroup>
                                    {
                                        this.state.type === "mp4_or_mp3" ? <UploadFileToFirebase fileName="videoOrAudio" title="Загрузить видео или прослушать файлы" getFileUrl={this.getFileUrlVideo} /> : ""
                                    }

                                    <FormInput placeholder="Ссылка на видео или аудио файл ..." name="url_video" value={this.state.url_video} onChange={this.changeHandle} />
                                </FormGroup> : ""}

                                {this.state.type === "mp4_or_mp3" ? <FormGroup>
                                    <UploadFileToFirebase fileName="images" title="Загрузить изображение обложки" getFileUrl={this.getFileUrlImage} />
                                    <FormInput placeholder="Ссылка на изображение обложки... " value={this.state.coverImage} name="coverImage" onChange={this.changeHandle} />
                                </FormGroup> : ""}
                            </CardHeader>

                            <CardBody className="p-3">
                                {this.state.type === "mp4_or_mp3" ? <Player
                                    playsInline
                                    poster={this.state.coverImage}
                                    src={this.state.url_video}
                                /> : this.state.type === "youtube" ? <YouTube opts={{ width: "100%", height: "300px" }}
                                    videoId={_id}
                                /> : <Alert > Loading ...... </Alert>}
                            </CardBody>
                        </Card>

                    </Col>

                    <Col lg="8" md="12">

                        <Card small className="mb-3">
                            <CardHeader className="border-bottom">
                                <h6 className="m-0">Add questions</h6>
                            </CardHeader>

                            <CardBody className="p-2" style={{ backgroundColor: "#232323" }}>
                                <Form>

                                    <FormGroup>
                                        <FormInput name="question" value={this.state.question} onChange={this.changeHandle} placeholder="Question" />
                                    </FormGroup>
                                    {this.state.answers.map((val, isx) => (
                                        <InputGroup key={isx} className="mb-2">
                                            <InputGroupAddon type="append">
                                                <FormCheckbox checked={val.result} onChange={e => { this.checkboxHandle(isx) }} />
                                            </InputGroupAddon>
                                            <FormInput id={isx} name={val.id} value={val.answer} onChange={this.answerInputHandle} placeholder={'Answer ' + isx} />
                                            <Button onClick= {()=>{this.deleteAnswer(isx)}} style={{marginLeft:"5px"}} outline theme="warning"> <i className="material-icons">delete_outline</i></Button>
                                        </InputGroup>
                                    ))}
                                    <br />
                                    <ListGroupItem className="d-flex px-3 border-0">
                                        <Button outline theme="light" size="sm" onClick={this.addAnswer}>
                                        <i className="material-icons">add</i> Add Answer
                                           
                                        </Button>
                                        <Button theme="warning" outline size="sm" onClick={this.Reset} className="ml-auto">
                                            <i className="material-icons">close</i> Reset
                                        </Button>
                                        <Button theme="accent" outline size="sm" onClick={this.addQuestion} className="ml-auto">
                                            <i className="material-icons">save</i> Save To List
                                        </Button>
                                    </ListGroupItem>
                                   
                                </Form>

                            </CardBody>
                        </Card>
                        <Card small className="mb-4">
                            <CardHeader className="border-bottom">
                                <h6 className="m-0">List questions</h6>
                            </CardHeader>

                            <CardBody className="p-2">
                            <ListGroup className="text-lg-center">
                                {this.state.questions.map((question,i)=>(                    
                                        <ListGroupItem key={i}>
                                        <h5 className="text-left">{question.question}</h5>
                                        {question.answers.map((answer,i)=>(
                                            <Badge key={i} style={{marginRight:"10px"}} theme={answer.result?"success":"dark"}>{answer.answer}</Badge>
                                        ))}
                                        <Button onClick={()=>{this.DeleteQuestion(i)}} style={{position:"absolute",top:"5px", right:"55px"}} outline theme="warning"> <i className="material-icons">delete_outline</i></Button>
                                        <Button onClick={()=>{this.EditQuestion(i)}} outline style={{position:"absolute",top:"5px", right:"5px"}}> <i className="material-icons">edit</i></Button>
                                        </ListGroupItem>
                                ))}
                             </ListGroup>
                                   <ListGroupItem className="d-flex px-3 border-0">
                                    <FormCheckbox
                                        checked={this.state.status}
                                        onChange={() => this.setState({ status: !this.state.status })}
                                    >
                                        Public Test
                                    </FormCheckbox>
                                        <Button theme="accent" onClick={this.saveToDatabase} outline size="sm"  className="ml-auto">
                                            <i className="material-icons">save</i> Save To Database
                                        </Button>
                                    </ListGroupItem>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}
const mapStateToProps = state =>({
    test: state.test
  })
  const mapDispatchToProps = dispatch =>({
    _addTest: test =>{dispatch(testActions.addTest(test))},
      _updateTest: test => { dispatch(testActions.updateTest(test)) },
      _resetResult: () => { dispatch({ type: "RESET_TEST" }) }
  })
  export default connect(mapStateToProps,mapDispatchToProps)(addVideo);

