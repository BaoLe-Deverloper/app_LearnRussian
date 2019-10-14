import React, { Component } from 'react';
import {
    Container, Row, Badge,
    Button, Col, Card, CardBody, 
    CardTitle,CardFooter } from "shards-react";
import PageTitle from "../components/common/PageTitle";
import { Grid, GridItem } from "react-masonry-grid";
import { Link } from 'react-router-dom';
import YouTube from 'react-youtube';
import { config } from "../config";
import axios from "axios";
import { mediaActions } from "./../Redux/Actions"
import { connect } from 'react-redux';
class home extends Component {

    constructor(){
        super();
        this.state={
            list_Yt : []
        }
    }
    async componentWillMount () {
        this.props._getPosts();
        const list_Yt =JSON.parse(sessionStorage.getItem("list_Yt"));
        if (!list_Yt || list_Yt.Get_time > new Date().getHours+1){
           await axios(config.urlApi_Youtube).then(resp => {
                const data = { data: resp.data.items, Get_time: new Date().getHours }
                this.setState(() => ({ list_Yt: resp.data.items }));
                sessionStorage.setItem("list_Yt", JSON.stringify(data));

            })
        }else{
            this.setState(() => ({ list_Yt:list_Yt.data }));
        }
       

    }

   
    Speech(text) {
        window.responsiveVoice.speak(text, "Russian Male", { pitch: 1, rate: 1, volume: 1.2 });
    }
    
    render() {
     
        const media_video = this.state.list_Yt.map((val, i) => {
          
            return (
                <Col key={i} sm="12" md="8" lg="4">
                    <Card style={{ margin: "5px 0" }}>
                        <YouTube host ='https://www.youtube.com' playerVars={{ 'origin':'https://youthful-easley-2870f7.netlify.com' }} opts={{ width: "100%", height: "300px" }} videoId={val.snippet.resourceId.videoId} />
                        <CardBody>
                           
                            <CardTitle>{val.snippet.title}</CardTitle>
                            <span>{val.snippet.channelTitle}</span> 
                        </CardBody>
                        <CardFooter>
                            {new Date(val.snippet.publishedAt).toGMTString() }
                        </CardFooter>
                    </Card>
                   
                </Col>
              
            )


        })




        return (
            <Container fluid className="main-content-container px-4">
                <Row noGutters className="page-header py-4">
                    <PageTitle sm="4" title="Новости сегодня " subtitle="россия 24" className="text-sm-left" />
                </Row>
                <Row>
                    {media_video}
                </Row>
                <Row noGutters className="page-header py-4">
                    <PageTitle sm="4"  title="Новые газеты сегодня" subtitle="Today" className="text-sm-left" />
                </Row>

                
                <br />
                <Row>
                    <Grid gutter={10} columnWidth={300} rowHeight={10}>


                        {this.props.post.Posts.map((post, idx) => (

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
                                        <h5 className="card-title text-fiord-blue">

                                                {post.title}
                                       
                                        </h5>
                                        <p className="card-text d-inline-block mb-3">{post.description}     <Link to="/" name={post.url} target="_blank" onClick={(event) => { event.preventDefault(); window.open(event.target.name); }} > View more</Link></p>
                                        <br /><span className="text-muted">{new Date(post.publishedAt).toGMTString()}</span>
                                    </CardBody>

                                    <CardFooter>
                                        <Button outline pill theme="info" onClick={() => this.Speech(post.title + ". " + post.description)}><i className="material-icons">
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
const mapStateToProps = state => ({
    post: state.post
})
const mapDispatchToProps = dispatch => ({
    _getPosts: () => { dispatch(mediaActions.getListPost()) }
})
export default connect(mapStateToProps, mapDispatchToProps)(home)
