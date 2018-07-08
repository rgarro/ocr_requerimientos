import React,{Component} from 'react';
import {Grid,Row,Col,Glyphicon} from 'react-bootstrap';
import firebase from 'firebase';
import {FIREBASE_CONFIG} from './../Config';

const $ = require('jquery');
$.DataTable = require('datatables.net');
$.dtBtn = require('datatables.net-buttons');

class List extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      requerimientos:[],
      search:'',
      dtData:[],
      dtNotStarted:true
    };
    this.app = firebase.initializeApp(FIREBASE_CONFIG);
    this.database = this.app.database().ref();
    this.obtenerTodosLosRequerimientos()
  }

  componentDidUpdate(){
    if(this.state.dtNotStarted){
      $('#reqsTable').DataTable({
        searching: true,
        columnDefs: [ {
          "targets": 'no-sort',
          "orderable": false
        }]
  });
      //this.setState({dtNotStarted:false});
    }
  }

  obtenerTodosLosRequerimientos(){
    var res = this.database.child('datos/requerimientos');
    res.once("value").then((function(snapshot){
        this.requerimientosSnap(snapshot);
    }).bind(this));
  }

  requerimientosSnap(snapshot){
    var resObj = snapshot.val();
    var tmpArr = [];
    for (var prop in resObj) {
      tmpArr.push(resObj[prop]);
    }
    this.setState({requerimientos:tmpArr});
  }

  dataTable(){
    var requerimientosItems = this.state.requerimientos.map(req=>(
      <tr id={'req' + req.requerimiento.requerimiento_id} key={'req' + req.requerimiento.requerimiento_id}>
        <td>{req.requerimiento.requerimiento_id}</td>
        <td>{req.requerimiento.nombre}</td>
        <td>{req.requerimiento.fecha_creacion}</td>
        <td>{req.requerimiento.modulo}</td>
        <td>{req.requerimiento.clasificacion}</td>
        <td>{req.requerimiento.descripcion}</td>
        <td>
        {req.requerimiento.objetivo}
        </td>
        <td>
          btn
				</td>
      </tr>
    ));
    return(<table id="reqsTable" className="table table-hover table-striped table-bordered colvis-data-table dataTable">
    <thead>
      <tr role="row">
        <th>Id</th>
        <th>Nombre</th>
        <th>Creacion</th>
        <th>Modulo</th>
        <th>Clasificacion</th>
        <th>Descripcion</th>
        <th className="no-sort"><Glyphicon glyph="road" /> Objetivo</th>
        <th className="no-sort">&nbsp;</th>
      </tr>
    </thead>
    <tbody>
         {requerimientosItems}                              
    </tbody>
    </table>);
  }

  render(){
    return(<Grid>
        <Row>
        <Col xs={12} md={8} sm={6}>
      <h4><Glyphicon glyph="plane" /> Lista de Requerimientos</h4>
      {this.dataTable()}
    </Col>
        </Row>
    </Grid>);
  }
}

export default List;
