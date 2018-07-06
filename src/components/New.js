import React,{Component} from 'react';
import {Grid,Row,Col} from 'react-bootstrap';


class New extends Component {

  constructor(props){
    super(props);
   
  }

  render(){
    return(<Grid>
        <Row>
        <Col xs={12} md={8} sm={6}>
      New
    </Col>
        </Row>
    </Grid>);
  }
}

export default New;
