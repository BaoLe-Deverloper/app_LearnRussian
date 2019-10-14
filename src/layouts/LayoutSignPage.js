import React, { Component } from "react";
import { Navbar, Button, Container, Row } from "shards-react"


class layoutSignPage extends Component {

    render() {
        return (
            <Container style={{backgroundColor:"#fff"}} fluid>
                <Row>
                    <Navbar>
                        <Button onClick={() => { this.props.history.goBack() }}>Go Back</Button>
                    </Navbar>
                </Row>
                {this.props.children}
            </Container>
        );
    }
}


export default layoutSignPage;
