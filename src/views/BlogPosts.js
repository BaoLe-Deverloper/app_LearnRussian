/* eslint jsx-a11y/anchor-is-valid: 0 */
import{Grid,GridItem } from "react-masonry-grid";
import React from "react";
import {
  Container,
  Row,
  Card,
  CardBody,
  Badge,
  Button,
  CardFooter
} from "shards-react";
import {Link} from 'react-router-dom';

import PageTitle from "../components/common/PageTitle";
import {mediaActions} from "./../Redux/Actions"
import {connect} from 'react-redux';
class BlogPosts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
   
    };
  }
 
 async componentWillMount() {
   this.props._getPosts();
 }
Speech  (text){
  window.responsiveVoice.speak(text, "Russian Male", {pitch:1 ,rate: 1,volume:1.2});
}
render() {

  console.log(this.props.post);

    return (
      <Container style={{backgroundColor:"#606060"}} fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle sm="4"  style={{color:"#fff"}} title="News Posts" subtitle="Today" className="text-sm-left" />
        </Row>

        {/* First Row of Posts */}
        <br/>
        <Row>
        <Grid gutter={10} columnWidth={300} rowHeight={10}>
        
     
          { this.props.post.Posts.map((post, idx) => (
           
            <GridItem lg="4" md="6" sm="12" className="mb-4" key={idx}>
              <Card small className="card-post card-post--1">
                <div
                  className="card-post__image"
                  style={{ backgroundImage: `url(${post.urlToImage})` }}
                >
                  <Badge
                    pill
                    className={`card-post__category`}
                    theme="warning"
                  >
                    {post.source.name}
                  </Badge>
                 
                </div>
                <CardBody>
                  <h5 className="card-title">
                    <a href="#" className="text-fiord-blue">
                      {post.title}
                    </a>
                  </h5>
                  <p className="card-text d-inline-block mb-3">{post.description}     <Link to="/" name={post.url} target="_blank" onClick={(event) => { event.preventDefault(); window.open(event.target.name);}} > View more</Link></p>
                  <br/><span className="text-muted">{new Date(post.publishedAt).toGMTString() }</span>
                </CardBody>
              
             <CardFooter>
             <Button outline pill theme="info" onClick={()=>this.Speech(post.title +". "+ post.description)}><i class="material-icons">
volume_up
</i> Listen</Button>
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


const mapStateToProps = state =>({
  post: state.post
})
const mapDispatchToProps = dispatch =>({
  _getPosts: () => {dispatch(mediaActions.getListPost())}
})
export default connect(mapStateToProps,mapDispatchToProps) (BlogPosts);
