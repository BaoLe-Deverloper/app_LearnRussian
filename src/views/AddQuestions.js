import React, { Component } from "react";
import { Container, 
  Row, 
  Col,
  Card,
  CardHeader,
  CardBody,
  ListGroup,
  ListGroupItem,
  Button,
  FormCheckbox,
  FormInput,
  FormSelect,
  ButtonGroup,
  Badge, } from "shards-react";
import PageTitle from "../components/common/PageTitle";
import Editor from "./add-questions/Editor";
// import TableAnswers from "./add-questions/TableAnswers";
import axios from "axios";
import { config } from "./../config";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { testActions } from './../Redux/Actions'
import toast from 'toasted-notes' 
import SweetAlert from 'react-bootstrap-sweetalert';
class addQuestions extends Component {

  constructor(props) {
    super(props);
    
    this.state = {   
      pageTitle:"Добавить тест",
      text: '',
      lever:"",
      title:"",
      description:"",
      timeTest:'00:30:00',
      //******************************** */
      index: 0,
      numberDefault: 0,
      currentNumber: 1,
      idTest: "",
      // test: {
      //   title: '',
      //   type: "test",
      //   lever: "A1",
      //   description: "",
      //   url_media: "",
      //   questions: [],
      //   timeTest: ""
      // },
      answers: [],
      number: 1,
      type: "АБВГДЕ",
      questions:[],
      status:true
    } ;
   
  }
  componentWillMount = ()=>{
    const id = this.props.location.state ? this.props.location.state.id : null;
    if(id){
      const token = localStorage.getItem("accessToken");
      if (token) {
        axios(config.UrlServerBase + "test/getById/" + id, {
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
            'Authorization': "Bearer " + token

          }
        }).then(resp => {

          if (!resp.data.err){
            const test = resp.data;
            this.setState(pre => ({ ...pre, pageTitle: "изменить тест",
             text: test.url_media, 
             description: test.description,
             timeTest: test.timeTest,
             lever:test.lever,
             title:test.title,
             status:test.status,
             questions: test.questions,
              number: test.questions.length + 1 ,
             currentNumber: test.questions.length +1 ,
             idTest:id
          }))
          }
         
        });
      }
     
    }
  }

  
 
  handleChangeText = val =>{
    this.setState({...this.state,text:val});
  }

  getFileUrlImage= url=>{
    var text = this.state.text;
    text +=`<img src=${url} style="width=100%;height:auto;position=absolute;margin:5px;"/>`;
    this.setState({...this.state,text})
  }
  // **************************************** //

  changeHandle = e => {
    const target = e.target;
    this.setState({ ...this.state, [target.name]: target.value });
  }
  plus = () => {
    const num = this.state.numberDefault;

    if (num < 6) {
      const { answers, type } = this.state;
      const i = answers.length;
      answers.push({ answer: type.slice(i, i + 1), result: false, id: Math.floor(Math.random() * 100000) })
      this.setState({ ...this.state, answers, numberDefault: num + 1 })
    }
  }

  minus = () => {
    const num = this.state.numberDefault;
    const answers = this.state.answers;

    answers.pop();
    if (num > 0)
      this.setState({ ...this.state, answers, numberDefault: num - 1 })
  }

  answerHandle(id) {
    const answers = this.state.answers;
    answers[id].result = !answers[id].result;
    this.setState({ ...this.state, answers });
  }

  addToList = () => {
    var { index, number, currentNumber, numberDefault, type, answers, questions } = this.state;
    if (index > 0) {
      questions[index] = { number: number, answers }
      number = currentNumber;
    }

    else {
      questions.push({ number: number, answers });
      currentNumber++;
      number++;
    }
    answers = [];
    for (let i = 0; i < numberDefault; i++) {
      answers.push({ answer: type.slice(i, i + 1), result: false, id: Math.floor(Math.random() * 100000) })
    }

    this.setState({ ...this.state, questions, number, currentNumber, answers, index: 0 });

  }
  DeleteQuestion(id) {
    const questions = this.state.questions;
    questions.splice(id,1);
    this.setState({ ...this.state, questions });
  }
  EditQuestion(id) {
    const question = this.state.questions[id];
    this.setState({ ...this.state, answers: question.answers, number: question.number, index: id, numberDefault: question.answers.length });
  }

  saveToDatabase = () => {
    const { title, lever, description, text, questions, timeTest, status,idTest} = this.state;
    const test = {
      title,
      type: "test",
      lever,
      description,
      url_media: text,
      questions,
      timeTest,
      status
      }
    if (!idTest)
      this.props._addTest(test);
    else{
      test["id"] = idTest;
      this.props._updateTest(test); 
    }
       
  }
  reset = () => {
    if (this.props.test.update_status)
      this.props._resetResult();
  }
// ************************************************** //
  render() {
    const { title, url_media, description,questions } = this.state;
    if (this.props.test.result) {
      toast.notify("Успешно сохранено в базе данных !", { position: 'top', duration: 2000 });
      return <Redirect to={{ pathname: "/send", state: { id: this.props.test.id } }} />
    }
    console.log(this.state)
    return (
      <Container fluid className="main-content-container px-4 pb-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle sm="4" title={this.state.pageTitle} className="text-sm-left" />
        </Row>
        {
          this.props.test.update_status && <SweetAlert success title="Уведомление" onConfirm={() => this.reset()}>
            Успешно сохранено в базе данных !
                       </SweetAlert>

        }
        <Row>
      
          <Col lg="8" md="12">
            
            <Editor data={this.state} getFileUrlImage={this.getFileUrlImage} handleChangeText={this.handleChangeText} handleChange={this.changeHandle} />
          </Col>

        
          <Col lg="4" md="12">
              {/* <TableAnswers  data= {this.state}/> */}
            <Card small className="mb-3">
              <CardHeader className="border-bottom">
                <h6 className="m-0">Add Answer</h6>
              </CardHeader>
              <CardBody className="p-0">
                <ListGroup flush>
                  <ListGroupItem className="px-3 pb-2">
                    <label>Номер вопроса </label>
                    <ButtonGroup size="sm" style={{ margin: "6px" }} className="ml-auto">
                      <FormInput disabled  style={{ marginLeft: "10px" }} value={this.state.number} type="number" name="number" min="0" onChange={this.changeHandle} />

                    </ButtonGroup>
                    <label>количество ответов</label>
                    <ButtonGroup size="sm" className="ml-auto">
                      <FormSelect value={this.state.type} name="type" onChange={this.changeHandle}   >
                        <option value="АБВГДЕ">АБВГДЕ</option>
                        <option value="ABCDEF">ABCDEF</option>
                        <option value="123456">123456</option>
                      </FormSelect>
                      <FormInput type="number" disabled style={{ width: "30%" }} value={this.state.numberDefault} name="numberDefault" onChange={this.changeHandle} max="6" min="0" />
                      <Button size="sm" onClick={this.plus}> <i className="material-icons">add</i></Button>
                      <Button size="sm" onClick={this.minus}> <i className="material-icons">remove</i></Button>
                    </ButtonGroup>
                  </ListGroupItem>
                  <ListGroupItem className="px-3 pb-2">
                    {this.state.answers.map((val, i) => (
                      <FormCheckbox checked={val.result} onChange={() => { this.answerHandle(i) }} inline key={i} size="lg">
                        {val.answer}
                      </FormCheckbox>
                    ))}


                  </ListGroupItem>
                  <ListGroupItem className="px-3 pb-2">

                  </ListGroupItem>
                  <ListGroupItem className="d-flex px-3 border-0">
                    <Button disabled={this.state.numberDefault === 0} outline theme="accent" size="sm" onClick={this.addToList}>
                      <i className="material-icons">save</i> Save List
              </Button>

                  </ListGroupItem>
                </ListGroup>
              </CardBody>
            </Card>

            <Card small className="mb-3">
              <CardHeader className="border-bottom">
                <h6 className="m-0">Table Answers</h6>
              </CardHeader>
              <CardBody className="p-0">
                <ListGroup flush>
                  {questions.map((val, i) => (
                    <ListGroupItem className="d-flex px-3 border-0" key={i}>
                      {"№ " + val.number + ":"} &nbsp;&nbsp; {val.answers.map((answer, i) => (
                        <Badge key={i} style={{ marginRight: "10px" }} theme={answer.result ? "success" : "dark"}>{answer.answer}</Badge>
                      ))}
                      <ButtonGroup size="sm" style={{ position: "absolute", top: "5px", right: "5px" }} className="ml-auto">
                        <Button onClick={() => { this.DeleteQuestion(i) }} outline theme="warning"> <i className="material-icons">delete_outline</i></Button>
                        <Button onClick={() => { this.EditQuestion(i) }} outline > <i className="material-icons">edit</i></Button>
                      </ButtonGroup>
                    </ListGroupItem>
                  ))}
                  <ListGroupItem className="d-flex px-3 border-0">
                    <FormCheckbox
                      checked={this.state.status}
                      onChange={() => this.setState({status:!this.state.status})}
                    >
                      Public Test
                    </FormCheckbox>
                    <Button disabled={url_media === "" || title === "" || description === ""} theme="accent" onClick={this.saveToDatabase} outline size="sm" className="ml-auto">
                      <i className="material-icons">save</i> Save To Database
                                        </Button>
                  </ListGroupItem>
                </ListGroup>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}
const mapStateToProps = state => ({
  test: state.test
})
const mapDispatchToProps = dispatch => ({
  _addTest: test => { dispatch(testActions.addTest(test)) },
  _updateTest: test => { dispatch(testActions.updateTest(test))},
  _resetResult: () => { dispatch({ type: "RESET_TEST" }) }
})
export default connect(mapStateToProps, mapDispatchToProps)(addQuestions);
