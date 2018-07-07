import React,{Component} from 'react';
import {Grid,Row,Col,FormGroup,ControlLabel,FormControl,Panel,Glyphicon,Form,HelpBlock} from 'react-bootstrap';
import firebase from 'firebase';
import {FIREBASE_CONFIG} from './../Config';

function FieldGroup({ id, label, help, ...props }) {
    return (
      <FormGroup controlId={id}>
        <ControlLabel>{label}</ControlLabel>
        <FormControl {...props} />
        {help && <HelpBlock>{help}</HelpBlock>}
      </FormGroup>
    );
  }

class New extends Component {

  constructor(props){
    super(props);
    this.state = {
        clasificaciones:[],
        colaboradores:[]
      };
    this.app = firebase.initializeApp(FIREBASE_CONFIG);
    this.database = this.app.database().ref();
    this.obtenerClasificaciones();
    this.obtenerColaboradores();
  }

  obtenerColaboradores(){
    var res = this.database.child('datos/colaboradores');
    res.once("value").then((function(snapshot){
        this.colaboradoresSnap(snapshot);
    }).bind(this));
  }

  colaboradoresSnap(snapshot){
    this.setState({colaboradores:snapshot.val()});
  }

  obtenerClasificaciones(){
    var res = this.database.child('datos/clasificaciones');
    res.once("value").then((function(snapshot){
        this.clasificasionesSnap(snapshot);
    }).bind(this));
  }

  clasificasionesSnap(snapshot){
    this.setState({clasificaciones:snapshot.val()});
  }

  form(){
      const clasificaciones = this.state.clasificaciones.map((clasificacion) =><option>{clasificacion}</option>);
      const colaboradores = this.state.colaboradores.map((colaborador) =><option>{colaborador}</option>);
      return(<Form id="" horizontal>
        <FieldGroup
            id="requerimientoNombre"
            name="requerimiento[nombre]"
            type="text"
            label="Nombre"
            placeholder="Nombre del Requerimiento"
            required="required"
        />
        <FormGroup controlId="requerimientoCreadoPor">
      <ControlLabel>CreadoPor:</ControlLabel>
      <FormControl componentClass="select" placeholder="select" name="requerimiento[creado_por]">
      {colaboradores}
      </FormControl>
    </FormGroup>
    <FieldGroup
            id="requerimientoModulo"
            name="requerimiento[modulo]"
            type="text"
            label="Modulo"
            placeholder="Modulo donde se desarrollara"
            required="required"
        />
        <FormGroup controlId="requerimientoClasificacion">
      <ControlLabel>Clasificacion:</ControlLabel>
      <FormControl componentClass="select" placeholder="select" name="requerimiento[clasificacion]">
        {clasificaciones}
      </FormControl>
    </FormGroup>
      </Form>);
  }

  render(){
    return(<Grid>
        <Row>
        <Col xs={12} md={8} sm={6}>
        <Panel id="collapsible-panel-example-2" defaultExpanded>
          <Panel.Heading>
            <Panel.Title toggle>
            <Glyphicon glyph="plus"/> Nuevo Requerimiento
            </Panel.Title>
          </Panel.Heading>
          <Panel.Collapse>
            <Panel.Body>
            {this.form()}
            </Panel.Body>
          </Panel.Collapse>
        </Panel>
    </Col>
        </Row>
    </Grid>);
  }
}


export default New;
