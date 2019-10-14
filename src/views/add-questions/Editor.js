import React, { Component } from "react";
import ReactQuill from "react-quill";
import {
  Card, CardBody, Form, FormInput,
  FormSelect, FormGroup, Container,
  ButtonGroup,
  Row, Col
} from "shards-react";
import UploadFileToFirebase from "./../../firebase/uploadFileToFirebase"
import "react-quill/dist/quill.snow.css";
import "../../assets/quill.css";
import TimeField from 'react-simple-timefield';

class editor extends Component {
  state = {
    openPicker: false
  }
  modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],

      ['clean']
    ],
  }

  formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ]

  render() {

    return (
      <Card small className="mb-3">
        <CardBody>


          <Form className="add-new-post">
            <Container>
              <Row>
                <Col lg="6" md="12">
                  <FormGroup>
                    <FormInput invalid={this.props.data.title === ''} className="mb-3" name="title" value={this.props.data.title} placeholder="Your test title" onChange={this.props.handleChange} />
                  </FormGroup>
                  <FormGroup>
                    <FormInput invalid={this.props.data.description === ''} className="mb-3" name="description" value={this.props.data.description} placeholder="Your test description" onChange={this.props.handleChange} />
                  </FormGroup>
                </Col>
                <Col lg="6" md="12">
                  <ButtonGroup>
                    <label> Время теста (*часы: минуты: секунды)</label>
                    <TimeField name="timeTest" style={{ width: "25%", fontSize:"20px", margin:"0 0 10px 10px" }} showSeconds value={this.props.data.timeTest} onChange={this.props.handleChange} />
                   </ButtonGroup>
                  <FormGroup>
                    <FormSelect invalid={this.props.data.lever === ''} value={this.props.data.lever} name="lever" onChange={this.props.handleChange} >
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
            </Container>

            <UploadFileToFirebase fileName="Images_Test" title="Загрузить изображение" getFileUrl={this.props.getFileUrlImage} />
            <ReactQuill style={{height:"900px"}} modules={this.modules}
              formats={this.formats} theme="snow" name="text" value={this.props.data.text} onChange={this.props.handleChangeText} className="add-new-post__editor mb-1" />
          </Form>
        </CardBody>
      </Card>
    );

  }
}

export default editor;
