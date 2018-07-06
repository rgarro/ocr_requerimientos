import React,{Component} from 'react';
import {Grid,Row,Col,FormGroup,ControlLabel,FormControl,Panel,Glyphicon,Form,HelpBlock} from 'react-bootstrap';

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
   
  }

  form(){
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
        <option value="Jason">Jason</option>
        <option value="Rolando">Rolando</option>
      </FormControl>
    </FormGroup>
    <FieldGroup
            id="requerimientoModulo"
            name="requerimiento[modulo]"
            type="text"
            label="Nombre"
            placeholder="Modulo donde se desarrollara"
            required="required"
        />
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
