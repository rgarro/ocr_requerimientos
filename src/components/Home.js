import React,{Component} from 'react';
import {Grid,Row,Col} from 'react-bootstrap';


class Home extends Component {


  render(){
    return(<Grid>
        <Row>
        <Col xs={12} md={8} sm={6}>
      Home
    </Col>
        </Row>
    </Grid>);
  }
}

export default Home;
