import React,{Component} from 'react';
import ReactDOM from 'react-dom'; 
import {Grid,Row,Col} from 'react-bootstrap';

const createjs = require('createjs');

class Home extends Component {
  
  componentDidMount(){
    var canvas = ReactDOM.findDOMNode(this.refs.canvas);
    this.stage = new createjs.Stage(canvas);
    var circle = new createjs.Shape();
    circle.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 50);
    circle.x = 100;
    circle.y = 100;
    this.stage.addChild(circle);
    this.stage.update();
   }

  render(){
    return(<Grid>
        <Row>
        <Col xs={12} md={8} sm={6}>
      Home
      <canvas ref="canvas" width="500" height="300"></canvas>
    </Col>
        </Row>
    </Grid>);
  }
}

export default Home;
