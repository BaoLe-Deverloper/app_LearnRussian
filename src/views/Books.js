/* eslint jsx-a11y/anchor-is-valid: 0 */
import { Grid, GridItem } from "react-masonry-grid";
import React from "react";
import {
  Container,
  Row,
  Card,
  CardBody,
  ListGroupItem,
  Button
} from "shards-react";
import { Redirect } from 'react-router-dom';
import axios from "axios";
import PageTitle from "../components/common/PageTitle";
import {config} from "./../config";

class book extends React.Component {
  constructor(props) {
    super(props);
   
    this.state = {
      books:[]
    };
  }
  componentWillMount(){
    this.mapDataToState();
  }
  mapDataToState=()=>{
    const books = JSON.parse(sessionStorage.getItem("books")) ;
    if(!books){
      const token = localStorage.getItem("accessToken");
      if (token) {
        axios(config.UrlServerBase + "book", {
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
            'Authorization': "Bearer " + token

          }
        }).then(resp => {

          if (!resp.data.err) {
            sessionStorage.setItem("books", JSON.stringify(resp.data));
            this.setState({ books: resp.data});
          }

        });
      }
    }else{
      this.setState({ books})
    }
   
  }

 viewBook(url){
   window.open(url, "Books", 'width=1200,height=800,left=200,top=200');
 }
  render() {

 

    return (
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle sm="4" title="Books" subtitle="*********" className="text-sm-left" />
        </Row>
        {this.state.result && <Redirect to="/vocabularies" />}
        <Row>
          <Grid gutter={10} columnWidth={300} rowHeight={10}>


            {this.state.books.map((book, idx) => (

              <GridItem lg="4" md="6" sm="12" className="mb-4" key={idx}>
                <Card small className="card-post card-post--1">
                  <img src={book.urlImg} alt="img" style={{width:"100%", height:"auto", borderRadius:"10px"}}/>
                  <CardBody>
                    <h5 className="card-title">
                      {book.name}
                    </h5>
                    <p className="card-text d-inline-block mb-3">{book.description}</p>
                    <ListGroupItem className="d-flex px-3 border-0">
                      
                      <Button theme="accent" outline pill size="sm" onClick={() => this.viewBook(book.url)} className="ml-auto">
                        <i className="material-icons">remove_red_eye</i> View
                      </Button>
                    </ListGroupItem>
                  </CardBody>
                </Card>
              </GridItem>
            ))}
          </Grid>
        </Row>


      </Container>
    );
  }
}



export default book;
