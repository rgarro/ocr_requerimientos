import React,{Component} from 'react';
import {ButtonToolbar,Button,Grid,Row,Col,FormGroup,ControlLabel,FormControl,Panel,Glyphicon,Form,HelpBlock} from 'react-bootstrap';
import firebase from 'firebase';
import {FIREBASE_CONFIG} from './../Config';

function FieldGroup({ id, label, help, ...props }) {
    return (
      <FormGroup controlId={id}>
       <Col componentClass={ControlLabel} sm={2}>
          {label}
        </Col>
        <Col sm={10}>
          <FormControl {...props} />
          {help && <HelpBlock>{help}</HelpBlock>}
        </Col>
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
        prioridades:[],
        fecha:event.toLocaleString('es-CR')
      };
    this.app = firebase.initializeApp(FIREBASE_CONFIG);
    this.database = this.app.database().ref();
    this.obtenerClasificaciones();
    this.obtenerColaboradores();
    this.obtenerModulos();
    this.obtenerPrioridades();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    console.log('A name was submitted: ');
    console.log(event);
    event.preventDefault();
  }

  obtenerPrioridades(){
    var res = this.database.child('datos/prioridades');
    res.once("value").then((function(snapshot){
        this.prioridadesSnap(snapshot);
    }).bind(this));
  }

  prioridadesSnap(snapshot){
    this.setState({prioridades:snapshot.val()});
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
      const prioridades = this.state.prioridades.map((prioridad) =><option>{prioridad}</option>);
      return(<Form onSubmit={this.handleSubmit} id="" horizontal>
        <FormGroup controlId="requerimientoCreadoPor">
        <Col componentClass={ControlLabel} sm={6}><Glyphicon glyph="calendar" /> Fecha Creacion: {this.state.fecha}</Col>
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
        <Col componentClass={ControlLabel} sm={2}>CreadoPor:</Col>
        <Col sm={10}>
      <FormControl componentClass="select" placeholder="select" name="requerimiento[creado_por]">
      {colaboradores}
      </FormControl>
      </Col>
    </FormGroup>
    <FormGroup controlId="requerimientoModulo">
    <Col componentClass={ControlLabel} sm={2}>Modulo:</Col>
    <Col sm={10}>
      <FormControl componentClass="select" placeholder="select" name="requerimiento[modulo]">
      {modulos}
      </FormControl>
      </Col>
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
        <Col componentClass={ControlLabel} sm={2}>Clasificacion:</Col>
        <Col sm={10}>
      <FormControl componentClass="select" placeholder="select" name="requerimiento[clasificacion]">
        {clasificaciones}
      </FormControl></Col>
    </FormGroup>
    <FormGroup controlId="requerimientoPrioridad">
        <Col componentClass={ControlLabel} sm={2}>Prioridad:</Col>
        <Col sm={10}>
      <FormControl componentClass="select" placeholder="select" name="requerimiento[prioridad]">
        {prioridades}
      </FormControl></Col>
    </FormGroup>
    <FieldGroup
            id="requerimientoEntrada"
            name="requerimiento[entrada]"
            type="text"
            label="Entrada"
            placeholder="El sistema debe solicitar la siguiente info"
            required="required"
        />
        <FieldGroup
            id="requerimientoResultado"
            name="requerimiento[resultado]"
            type="text"
            label="Resultado"
            placeholder="El sistema debe desplegar la siguiente info"
            required="required"
        />
        <FieldGroup
            id="requerimientoSupuestos"
            name="requerimiento[supuestos]"
            type="text"
            label="Restricciones y Supuestos"
            placeholder="Limitaciones de los Requerimientos"
            required="required"
        />
        <FieldGroup
            id="requerimientoValidadoPor"
            name="requerimiento[validado_por]"
            type="text"
            label="Validado Por"
            placeholder="Joe Doe"
            required="required"
        />
        <FieldGroup
            id="requerimientoComentarios"
            name="requerimiento[comentarios]"
            type="text"
            label="Comentarios"
            placeholder="comentarios del requerimiento"
            required="required"
        />
        <ButtonToolbar>
  <Button type="submit" bsStyle="primary" bsSize="small" active>
    Agregar
  </Button>
  <Button type="reset" bsSize="small" active>
    Reset
  </Button>
</ButtonToolbar>
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
