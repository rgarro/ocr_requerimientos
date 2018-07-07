import React,{Component} from 'react';


import {Nav,Navbar,NavDropdown,MenuItem,Glyphicon} from 'react-bootstrap';



class Header extends Component {

 tituloNav(){
   return(<span><Glyphicon glyph="tasks" /> Opciones</span>);
 }

  render(){
    return(
        <Navbar>
        <Navbar.Header>
          <Navbar.Brand bsStyle="danger">
            <a href="/"><span style={{color:'#e94949'}}><Glyphicon glyph="star" /></span> OCR-Requirimientos</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav pullRight={true}>
          <NavDropdown eventKey={3} title={this.tituloNav()} id="basic-nav-dropdown">
            <MenuItem eventKey={3.2} href="/New"><Glyphicon glyph="plus"/> Nuevo Requerimiento</MenuItem>
            <MenuItem eventKey={3.3} href="/List"><Glyphicon glyph="th" /> Lista Requerimientos</MenuItem>
            <MenuItem divider />
            <MenuItem eventKey={3.4} href="/"><Glyphicon glyph="home" /> Home</MenuItem>
          </NavDropdown>
        </Nav>
      </Navbar>
    );
  }
}

export default Header;
