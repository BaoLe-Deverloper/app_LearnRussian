/* eslint jsx-a11y/anchor-is-valid: 0 */
import { Grid, GridItem } from "react-masonry-grid";
import React from "react";
import {
  Container,
  Row,
  Card,
  CardBody,
  Button,
  CardFooter,
  ListGroupItem
} from "shards-react";
import {connect} from "react-redux";
import PageTitle from "../components/common/PageTitle";


class vocabulary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  async componentWillUnmount() {
    this.props._reset();
  }
  Speech(text) {
    window.responsiveVoice.speak(text, "Russian Male", { pitch: 1, rate: 1, volume: 1.2 });
  }
  render() {



    return (
      <Container style={{ minHeight:"800px" }} fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle sm="4" style={{ color: "#fff" }} title="Словарные слова" subtitle={"Тема: " +this.props.nameTopic} className="text-sm-left" />
        </Row>
<br/>
        <Row>
          <Grid gutter={10} columnWidth={300} rowHeight={10}>


            {this.props.vocabularies.map((vocabulary, idx) => (

              <GridItem lg="4" md="6" sm="12" className="mb-4" key={idx}>
                <Card small className="card-post card-post--1">
                  <div
                    className="card-post__image"
                    style={{ backgroundImage: `url(${vocabulary.urlImg})` }}
                  >
                  </div>
                  <CardBody>
                    <h4 className="card-title">
                      {vocabulary.word}
                    </h4>
                    <p className="card-text d-inline-block mb-3">{vocabulary.description}  </p>   

                  </CardBody>

                  <CardFooter>
                  <ListGroupItem className="d-flex px-3 border-0">
                    <Button outline pill theme="info" onClick={() => this.Speech(vocabulary.word)}><i className="material-icons">
                      volume_up
                    </i> Listen</Button>
                    <Button outline pill theme="info" onClick={() => this.Speech( vocabulary.description)}  className="ml-auto"><i className="material-icons">
                      volume_up
                    </i> Listen more</Button>
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
  vocabularies: state.vocabulary.vocabularies,
  nameTopic:state.vocabulary.name
})
const mapDispatchToProps = dispatch => ({
  _reset: () => { dispatch({type:"RESET_VOCABULARY"}) }
})
export default connect(mapStateToProps, mapDispatchToProps)(vocabulary);
