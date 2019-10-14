import React, { Component } from "react";
import {Redirect} from "react-router-dom";
import {
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
  Badge,
  

} from "shards-react";
import {connect} from "react-redux";
import {testActions} from './../../Redux/Actions'
import toast from 'toasted-notes' 


class tableAnswers extends Component {
  constructor() {
    super();
    this.state = {
      index: 0,
      numberDefault: 0,
      currentNumber:1,
      idTest:"",
      test:{
        title:'',
        type:"test",
        lever:"A1",
        description:"",
        url_media:"",
        questions:[], 
        timeTest:""
      },
      answers: [],
      number: 1,
      type: "АБВГДЕ"
    }
  }
  
  componentDidMount = () =>{
      console.log(this.props.data);
  
  }
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
    var { index, number,currentNumber,numberDefault,type, answers, test } = this.state;
    if (index > 0){
      test.questions[index] = { number: number, answers }
      number = currentNumber;
    }
   
    else{
      test.questions.push({ number:number, answers });
      currentNumber++;
      number++;
    }
    answers=[];
    for (let i = 0; i < numberDefault; i++) {
      answers.push({ answer: type.slice(i, i + 1), result: false, id: Math.floor(Math.random() * 100000) })
    }

    this.setState({ ...this.state, test, number,currentNumber, answers, index: 0 });
  
  }
  DeleteQuestion(id) {
    const test = this.state.test;
    delete test.questions[id];
    this.setState({ ...this.state, test });
  }
  EditQuestion(id) {
    const question = this.state.test.questions[id];
    this.setState({ ...this.state, answers: question.answers, number: question.number, index: id });
  }
  
  saveToDatabase=()=>{
    const test = this.state.test;
    test.title = this.props.data.title;
    test.timeTest = this.props.data.timeTest;
    test.description = this.props.data.description;
    test.lever = this.props.data.lever;
    test.url_media = this.props.data.text;
    this.props._addTest(test);
  }

  render() {

    const {title,url_media,description} = this.props.data;
    if (this.props.test.result){
      toast.notify("Успешно сохранено в базе данных !" ,{position:'top',duration:2000}); 
      return <Redirect to={{pathname:"/send", state :{id:this.props.test.id}}}  />
    }
      
    return (
      <div>
      
        <Card small className="mb-3">
          <CardHeader className="border-bottom">
            <h6 className="m-0">Add Answer</h6>
          </CardHeader>
          <CardBody className="p-0">
            <ListGroup flush>
              <ListGroupItem className="px-3 pb-2">
                <label>Номер вопроса </label>
                <ButtonGroup size="sm" style={{ margin: "6px" }} className="ml-auto">
                  <FormInput style={{ marginLeft: "10px" }} value={this.state.number} type="number" name="number" min="0" onChange={this.changeHandle} />

                </ButtonGroup>
                <label>количество ответов</label>
                <ButtonGroup size="sm" className="ml-auto">
                  <FormSelect value={this.state.type} name="type" onChange={this.changeHandle}   >
                    <option value="АБВГДЕ">АБВГДЕ</option>
                    <option value="ABCDEF">ABCDEF</option>
                    <option value="123456">123456</option>
                  </FormSelect>
                  <FormInput type="number" disabled  style={{ width: "30%" }} value={this.state.numberDefault} name="numberDefault" onChange={this.changeHandle} max="6" min="0" />
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
                <Button disabled={this.state.numberDefault===0} outline theme="accent" size="sm" onClick={this.addToList}>
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
              {this.state.test.questions.map((val, i) => (
                <ListGroupItem className="d-flex px-3 border-0" key={i}>
                  {"№ " + val.question + ":"} &nbsp;&nbsp; {val.answers.map((answer, i) => (
                    <Badge key={i} style={{ marginRight: "10px" }} theme={answer.result ? "success" : "dark"}>{answer.answer}</Badge>
                  ))}
                  <ButtonGroup size="sm" style={{ position: "absolute", top: "5px", right: "5px" }} className="ml-auto">
                    <Button onClick={() => { this.DeleteQuestion(i) }} outline theme="warning"> <i className="material-icons">delete_outline</i></Button>
                    <Button onClick={() => { this.EditQuestion(i) }} outline > <i className="material-icons">edit</i></Button>
                  </ButtonGroup>
                </ListGroupItem>
              ))}
              <ListGroupItem className="d-flex px-3 border-0">
              
                <Button disabled={url_media===""||title===""||description===""} theme="accent" onClick={this.saveToDatabase} outline size="sm" className="ml-auto">
                  <i className="material-icons">save</i> Save To Database
                                        </Button>
              </ListGroupItem>
            </ListGroup>
          </CardBody>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state =>({
  test: state.test
})
const mapDispatchToProps = dispatch =>({
  _addTest: test =>{dispatch(testActions.addTest(test))}
})
export default connect(mapStateToProps,mapDispatchToProps)(tableAnswers);
