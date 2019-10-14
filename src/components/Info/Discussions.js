import React ,{Component}from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  ButtonGroup,
  Button,
  Row,
  Col,
  FormInput
} from "shards-react";

class Discussions extends Component {
  render(){
    return (
      <Card small className="blog-comments">
        <CardHeader className="border-bottom">
          <h5 className="m-0">MANAGE STUDENT</h5>
          <ButtonGroup style={{width:"100%",marginTop:"10px"}}>
              <FormInput  name="message" placeholder="Search ID....."/>
              <Button > Search </Button>
          </ButtonGroup>
        </CardHeader>
    
        <CardBody className="p-0">
          {this.props.students && this.props.students.map((student, idx) => (
            <div key={idx} className="blog-comments__item d-flex p-3">
              {/* Avatar */}
              <div className="blog-comments__avatar mr-3">
                <img src={student.urlAvatar?student.urlAvatar:require("./../../images/avatars/userAvatar.png")} alt={student.name} />
              </div>
    
              {/* Content */}
              <div className="blog-comments__content">
                {/* Content :: Title */}
                <div className="blog-comments__meta text-mutes">
                  <h3>{student.name}</h3>
                  <a className="text-secondary" href={student._id}>
                  {student.email}
                  </a>{" "}
                  on{" "}
                  <span className="text-mutes">- {new Date(student.date_create).toGMTString()}</span>
                </div>
    
                {/* Content :: Body */}
                <p className="m-0 my-1 mb-2 text-muted">{"abc"}</p>
    
                {/* Content :: Actions */}
                <div className="blog-comments__actions">
                  <ButtonGroup size="sm">
                    <Button theme="white">
                      <span className="text-success">
                        <i className="material-icons">check</i>
                      </span>{" "}
                      Approve
                    </Button>
                    <Button theme="white">
                      <span className="text-danger">
                        <i className="material-icons">clear</i>
                      </span>{" "}
                      Reject
                    </Button>
                    <Button theme="white">
                      <span className="text-light">
                        <i className="material-icons">more_vert</i>
                      </span>{" "}
                      Edit
                    </Button>
                  </ButtonGroup>
                </div>
              </div>
            </div>
          ))}
        </CardBody>
    
        <CardFooter className="border-top">
          <Row>
            <Col className="text-center view-report">
              <Button theme="white" type="submit">
                View All Comments
              </Button>
            </Col>
          </Row>
        </CardFooter>
      </Card>
    );
  }
} 


export default Discussions;
