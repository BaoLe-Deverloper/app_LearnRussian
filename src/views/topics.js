/* eslint jsx-a11y/anchor-is-valid: 0 */
import { Grid, GridItem } from "react-masonry-grid";
import React from "react";
import {
  Container,
  Row,
  Card,
  CardBody,
ListGroupItem,
  Button,
  CardFooter
} from "shards-react";
import { Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import PageTitle from "../components/common/PageTitle";
import { vocabularyActions} from "./../Redux/Actions"

class vocabulary extends React.Component {
  constructor(props) {
    super(props);
    props._getTopics();
    this.state = {
      result:false
    };
  }

  Speech(text) {
    window.responsiveVoice.speak(text, "Russian Male", { pitch: 1, rate: 1, volume: 1.2 });
  }
  GotoVocabulary(id,name) {
    this.props._getVocabulary(id, name);
    this.setState({result:true})
  }
  render() {
   
    console.log(this.props);
    
    return (
      <Container  fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle sm="4"  title="Tемы" subtitle="*********" className="text-sm-left" />
        </Row>
        {this.state.result && <Redirect to="/vocabularies" />}
        <Row>
          <Grid gutter={10} columnWidth={300} rowHeight={10}>


            {this.props.topics.map((topic, idx) => (

              <GridItem lg="4" md="6" sm="12" className="mb-4" key={idx}>
                <Card small className="card-post card-post--1">
                  <div
                    className="card-post__image"
                    style={{ backgroundImage: `url(${topic.urlImg})` }}
                  >
                  </div>
                  <CardBody>
                    <h3 className="card-title">
                      {topic.name}
                    </h3>
                    <p className="card-text d-inline-block mb-3">{topic.description}</p>

                  </CardBody>

                  <CardFooter>
                       <ListGroupItem className="d-flex px-3 border-0">
                    <Button outline pill theme="info" onClick={() => this.Speech(topic.name)}><i className="material-icons">
                      volume_up
                    </i> Listen</Button>
                    <Button theme="accent" outline pill size="sm" onClick={()=>this.GotoVocabulary(topic._id,topic.name)} className="ml-auto">
                      <i className="material-icons">send</i> Goto
                                        </Button>
                      </ListGroupItem>
                  </CardFooter>
                </Card>
              </GridItem>
            ))}
          </Grid>
        </Row>


      </Container>
    );
  }
}


const mapStateToProps = state => ({
  topics: state.vocabulary.topics
})
const mapDispatchToProps = dispatch => ({
  _getTopics:()=>{dispatch(vocabularyActions.getTopics())},
  _getVocabulary: (idTopic,name) => { dispatch(vocabularyActions.getVocabularies(idTopic,name)) }
})
export default connect(mapStateToProps, mapDispatchToProps)(vocabulary);
