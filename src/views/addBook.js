import React, { Component } from "react";
import { Form, FormGroup, FormInput, Container, Row, Button } from 'shards-react';
import UploadFileToFirebase from "./../firebase/uploadFileToFirebase";
import PageTitle from "../components/common/PageTitle";
import axios from "axios";
import { config } from './../config';
import SweetAlert from 'react-bootstrap-sweetalert';
class addBook extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      urlImg: '',
      description: "",
      url: '',
      result: false
    }
  }
 
  getFileUrlImage = url => {
    this.setState({ urlImg: url });
  }
  changeHandle = e => {
    const target = e.target;
    this.setState({ [target.name]: target.value });
  }

  saveToDatabase = () => {

    const token = localStorage.getItem("accessToken");
    if (token) {
      const { name, description, urlImg, url } = this.state;
      axios(config.UrlServerBase + "book", {
        method: "POST",
        data: { name, description, urlImg, url },
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          "Access-Control-Allow-Origin": "*",
          'Authorization': "Bearer " + token
        }
      }).then(resp => {
        if (!resp.data.err) {
          this.setState({ result: true });
        }
      });
    }
  }
  resetState = () => {
    this.setState({
      name: "",
      urlImg: '',
      description: "",
      url: '',
      result: false
    })
  }
  render() {
    console.log(this.state)
    return (
      <Container>
        <Row noGutters className="page-header py-4">
          <PageTitle sm="4" title="Add Books" className="text-sm-left" />
        </Row>
        {
          this.state.result && <SweetAlert success title="Уведомление" onConfirm={() => this.resetState()}>
            Успешно сохранено в базе данных !
            </SweetAlert>
        }
        <Row>
          <Form style={{ width: "80%", margin: "40px auto" }}>

            <FormGroup>
              <UploadFileToFirebase fileName="images" title="Загрузить изображение обложки" getFileUrl={this.getFileUrlImage} />
              {this.state
                .urlImg && <img alt="img" src={this.state.urlImg} style={{ width: "300px", height: "auto", margin: "20px" }} />}
            </FormGroup>
            <FormGroup>
              <label htmlFor="#I1">Книги и документы должны быть доступны с Google Drive</label>
              <FormInput value={this.state.url} id="#I1" name="url" placeholder="Google Drive Path" onChange={this.changeHandle} />
            </FormGroup>
            <FormGroup>
              <label htmlFor="#I1">Название книги или документа</label>
              <FormInput value={this.state.name} id="#I1" name="name" placeholder="Название книги или документа" onChange={this.changeHandle} />
            </FormGroup>
            <FormGroup>
              <label htmlFor="#I2">Введение :</label>
              <FormInput value={this.state.description} type="text" id="#I2" name="description" placeholder="Введение" onChange={this.changeHandle} />
            </FormGroup>
            <Button theme="accent" disabled={this.state.name === '' || this.state.urlImg === ''||this.state.url===""} onClick={this.saveToDatabase} outline size="sm" className="ml-auto">
              <i className="material-icons">save</i> Save To Database</Button>
          </Form>
        </Row>
      </Container>
    )
  }
}

export default addBook;