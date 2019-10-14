import React,{Component} from "react";

import {Container, Row, Col,CardBody,Card,Button, FormInput,FormGroup,FormTextarea} from "shards-react";
import PageTitle from "../../components/common/PageTitle";
import axios from "axios";
import {config} from "./../../config";
import toast from 'toasted-notes' 
class sendTest extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            students:JSON.parse(sessionStorage.getItem("_manageStudents")),
            message:"",
            idTest:props.location.state ? props.location.state.id:"",
            token :localStorage.getItem("accessToken")
        }
    }
     
      handleOnSubmit=e=>{
          e.preventDefault();
          let data= {idTest:this.state.idTest,receivers:[{idReceiver:e.target[0].value,email:e.target[1].value}],message:e.target[2].value}
         this.sendMail(data)
          
      }
      handleOnSubmitAll= e=>{
        e.preventDefault();
        let data= {idTest:this.state.idTest,receivers:this.state.students.map(val=>{
            return {idReceiver:val._id,email:val.email}
        }),message:e.target[0].value}
        this.sendMail(data);
      }

      sendMail(data){
        const  {token} = this.state;
        if (token) {
           
            axios(config.UrlServerBase + "exam/sendTest", {
              method:"post",
              data: data,
              headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
                'Authorization': "Bearer " + token
              
            }}).then(resp => {
              if(resp.data==="success")
                toast.notify("Отправить успешно !" ,{position:'top',duration:2000}); 
            })
          }
      }
    render(){
      
        return (
            <Container>
               <Row noGutters className="page-header py-4">
               <PageTitle sm="4"  style={{color:"#fff"}} title="Send Test To Students" subtitle="*******" className="text-sm-left" />
             </Row>
            
                <Row>
            {this.state.students.map((student, idx) => (
              <Col lg="4" key={idx}>
                <Card small className="card-post mb-4">
                  <CardBody>
                    <div className="card-post__author d-flex">
                      <div
                      
                        className="card-post__author-avatar card-post__author-avatar--small"
                        style={{ backgroundImage: `url('${student.urlAvatar?student.urlAvatar: require("./../../images/avatars/userAvatar.png")}')` }}
                      >
                       
                      </div>
                      <div className="d-flex flex-column justify-content-center ml-3">
                        <span className="card-post__author-name">
                          {student.name}
                        </span>
                        <span className="card-post__author-name">
                          {student.email}
                        </span>
                        <small className="text-muted">{new Date(student.date_create).toGMTString() }</small>
                      </div>
                    </div>
                    <hr/>
                    <form onSubmit={this.handleOnSubmit}>
                           
                            <input type="hidden" value={student._id}/>
                            <input type="hidden" value={student.email}/>
                            <FormGroup>
                                <FormInput  name="message" placeholder="Message....."/>
                            </FormGroup>
                            <div className="my-auto ml-auto">
                            <Button type="submit" size="sm" theme="white">
                                <i className="far fa-send mr-1" /> Send
                            </Button>
                            </div>
                    </form>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
          <Row style={{marginTop:"40px",marginBottom:"60px", backgroundColor:"#454545", padding:" 15px 15px 60px 15px" ,position:"relative"}}>
          <form style={{width:"100%"}} onSubmit={this.handleOnSubmitAll}>
                <FormTextarea  placeholder="Message" name="message_All" onChange={this.handleChange} />
                <br/>
                <Button style={{position:"absolute", bottom:"10px", right:"20px"}} pill theme="secondary"> Send To All</Button>
             </form>
             </Row>
            </Container>
            
        );
    }
}

export default  sendTest;