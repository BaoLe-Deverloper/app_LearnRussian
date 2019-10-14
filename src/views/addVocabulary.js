import React, {Component} from "react";
import { Form, FormGroup, FormInput, Container, Row, FormSelect,Button} from 'shards-react';
import UploadFileToFirebase from "./../firebase/uploadFileToFirebase";
import PageTitle from "../components/common/PageTitle";
import axios from "axios";
import {config} from './../config';
import SweetAlert from 'react-bootstrap-sweetalert';
class addVocabulary extends Component {
  constructor(){
    super();
    this.state={
      word:"",
      urlImg:'',
      description:"",
      _idTopic:'',
      arrTopic:[],
      result:false
    }
  }
  componentWillMount(){
    this.getTopic();
  }
  getTopic=()=>{
    const topics = JSON.parse(sessionStorage.getItem('topics'));
   
    if (!topics){
      const token = localStorage.getItem("accessToken");
      if (token) {
        axios(config.UrlServerBase + "topic/getName" , {
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
            'Authorization': "Bearer " + token
          }
        }).then(resp => {
          if (!resp.data.err) {
          
            sessionStorage.setItem("topics", JSON.stringify(resp.data));
            this.setState({ arrTopic: resp.data });
          }
        });
      }
    } else this.setState({ arrTopic: topics});
    
  }

  getFileUrlImage = url=>{
   this.setState({urlImg:url});
  }
  changeHandle= e=>{
    const target = e.target ;
    this.setState({[target.name]:target.value});
  }

  saveToDatabase=()=>{
    
    const token = localStorage.getItem("accessToken");
    if (token) {
      const {word,description,urlImg, _idTopic} = this.state;
      axios(config.UrlServerBase + "vocabulary", {
        method:"POST",
        data: { word, description, urlImg, _idTopic },
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          "Access-Control-Allow-Origin": "*",
          'Authorization': "Bearer " + token
        }
      }).then(resp => {
        if (!resp.data.err) {
         this.setState({result:true})  ;
        }
      });
    }
  }
  resetState=()=>{
    this.setState({
      word: "",
      urlImg: '',
      description: "",
      _idTopic: '',
      result: false
    })
  }
  render(){
    console.log(this.state)
    return(
      <Container>
        <Row noGutters className="page-header py-4">
          <PageTitle sm="4" title="Add Vocabulary" className="text-sm-left" />
        </Row>
        {
          this.state.result && <SweetAlert success title="Уведомление" onConfirm={() => this.resetState()}>
            Успешно сохранено в базе данных !
            </SweetAlert>
        }
        <Row>
          <Form style={{width:"80%",margin:"40px auto"}}>
            
            <FormGroup>
              <UploadFileToFirebase fileName="images_vocabularies" title="Загрузить изображение обложки" getFileUrl={this.getFileUrlImage} />
              {this.state
                .urlImg && <img src={this.state.urlImg} alt="img" style={{ width: "300px", height: "auto", margin: "20px" }} />}
            </FormGroup>
            <FormGroup>
              <label htmlFor="#I1">Новое слово</label>
              <FormSelect invalid={this.state._idTopic === ''} value={this.state._idTopic} name="_idTopic" onChange={this.changeHandle} >
                <option disabled value="">Выберите тему</option>
               {this.state.arrTopic.map((val,i)=>(
                 <option key={i} value={val._id}>{val.name}</option>
               ))}
               
              </FormSelect>
            </FormGroup>
            <FormGroup>
              <label htmlFor="#I1">Новое слово</label>
              <FormInput value={this.state.word} id="#I1" name="word" placeholder="Новое слово" onChange={this.changeHandle} />
            </FormGroup>
            <FormGroup>
              <label htmlFor="#I2">Опишите значение слов</label>
              <FormInput value={this.state.description} type="text" id="#I2" name="description" placeholder="Опишите значение слов" onChange={this.changeHandle} />
            </FormGroup>
            <Button theme="accent" disabled={this.state.word===''||this.state.urlImg===''} onClick={this.saveToDatabase} outline size="sm" className="ml-auto">
            <i className="material-icons">save</i> Save To Database</Button>
          </Form>
        </Row>
      </Container>
    )
  }
}

export default addVocabulary;