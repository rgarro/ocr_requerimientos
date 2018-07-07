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
    var event = new Date();

    this.state = {
        clasificaciones:[],
        colaboradores:[],
        modulos:[],
        fecha:event.toLocaleString('es-CR')
      };
    this.app = firebase.initializeApp(FIREBASE_CONFIG);
    this.database = this.app.database().ref();
    this.obtenerClasificaciones();
    this.obtenerColaboradores();
    this.obtenerModulos();
  }

  obtenerModulos(){
    var res = this.database.child('datos/modulos');
    res.once("value").then((function(snapshot){
        this.modulosSnap(snapshot);
    }).bind(this));
  }

  modulosSnap(snapshot){
    this.setState({modulos:snapshot.val()});
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
      const modulos = this.state.modulos.map((modulo) =><option>{modulo}</option>);
      return(<Form id="" horizontal>
        <FormGroup controlId="requerimientoCreadoPor">
      <ControlLabel><Glyphicon glyph="calendar" /> Fecha Creacion: {this.state.fecha}</ControlLabel>
      <input type="hidden" value={this.state.fecha} name="requerimiento[fecha_creacion]"/>
    </FormGroup>
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
    
    
    <FormGroup controlId="requerimientoModulo">
      <ControlLabel>Modulo:</ControlLabel>
      <FormControl componentClass="select" placeholder="select" name="requerimiento[modulo]">
      {modulos}
      </FormControl>
    </FormGroup>

<FieldGroup
            id="requerimientoFuentes"
            name="requerimiento[fuentes]"
            type="text"
            label="Fuentes"
            placeholder="tecnicas que se aplicaron para recolectar informacion"
            required="required"
        />
        <FieldGroup
            id="requerimientoActores"
            name="requerimiento[actores]"
            type="text"
            label="Actores"
            placeholder="Actores del Proyecto que Intervienen Requerimiento"
            required="required"
        />
      <FieldGroup
            id="requerimientoObjetivo"
            name="requerimiento[objetivo]"
            type="text"
            label="Objetivo"
            placeholder="Objetivo/Meta del Requerimiento"
            required="required"
        />
        <FieldGroup
            id="requerimientoDescripcion"
            name="requerimiento[descripcion]"
            type="text"
            label="Descripcion"
            placeholder="Descripcion del Requerimiento"
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
