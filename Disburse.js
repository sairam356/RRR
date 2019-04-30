import React from 'react';

import classnames from 'classnames';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Container,Alert,Nav,NavItem,FormGroup,Label, Badge,Row,Col,Card,CardHeader,FormText,CardBlock,Table,Button,Modal, ModalHeader, ModalBody, ModalFooter,Input, InputGroup, InputGroupAddon } from "reactstrap";
export default class Disburse extends React.Component {
    constructor(props) {
    super(props);
     this.disburse={
         market:'',
         plant:'',
         sloc:'',
         matid:'',
         reel:''

     }
     this.dateObject={
          toDate:'',
         fromDate:''
     }
     this.state={
         displayTable: false
     }

     this.handleChangeToDate = this.handleChangeToDate.bind(this);
     this.handleChangeFromDate  = this.handleChangeFromDate.bind(this);
     this.handleSubmit = this.handleSubmit.bind(this);
     this.handleChange = this.handleChange.bind(this);
   }
    handleChangeToDate(date){
        this.dateObject.toDate =date;
        this.setState(this.dateObject);
   }
   handleChangeFromDate(date){
       this.dateObject.fromDate =date;
       this.setState(this.dateObject); 
   }
 
   handleChange(event){
       this.disburse[event.target.name] = event.target.value;
      this.setState(this.disburse);
   }

   handleSubmit(event){
      event.preventDefault();
   if(this.disburse.market!='' || this.disburse.sloc!='' || this.dateObject.fromDate!='' || this.dateObject.toDate!=''){
         this.setState({
                    displayTable: true
                });
   }
   
   }
  render() {
    return (
  <div className="disburse_width mm_bottom"> 

<p className="test" style={{textAlign: 'left',marginLeft: '3rem',color: '#a60606'}}> <b> Search</b> </p>
      <Row className="test">
           
            <Col md="4">
               <InputGroup>
                   <div style={{width: '140px'}} className="text-right mr-3">Market: </div>                                         
                   <Input className="" style={{marginLeft: '20px'}} type="text"  value={this.disburse.market} onChange={this.handleChange} name="market" placeholder="" id="1"/>                               
                 </InputGroup>
            </Col> 
            <Col md="4">
               <InputGroup>
                   <div style={{width: '140px'}} className="text-right mr-3">Plant: </div>                                         
                   <Input className="" style={{marginLeft: '20px'}} type="text"  value={this.disburse.plant} onChange={this.handleChange} name="plant" placeholder="" id="2"/>                               
                 </InputGroup>
            </Col> 
            <Col md="4">
               <InputGroup>
                   <div style={{width: '140px'}} className="text-right mr-3">Sloc: </div>                                         
                   <Input className="" style={{marginLeft: '20px'}} type="text"  value={this.disburse.sloc} onChange={this.handleChange} name="sloc" placeholder="" id="3"/>                               
                 </InputGroup>
            </Col>     
            
        </Row>
        <Row className="test">
           
            <Col md="4">
               <InputGroup>
                   <div style={{width: '140px'}} className="text-right mr-3">Reel: </div>                                         
                   <Input className="" style={{marginLeft: '20px'}} type="text"  value={this.disburse.reel} onChange={this.handleChange} name="reel" placeholder="" id="4"/>                               
                 </InputGroup>
            </Col> 
            <Col md="4">
               <InputGroup>
                   <div style={{width: '140px'}} className="text-right mr-3">MatID: </div>                                         
                   <Input className="" style={{marginLeft: '20px'}} type="text"  value={this.disburse.matid} onChange={this.handleChange} name="matid" placeholder="" id="5"/>                               
                 </InputGroup>
            </Col> 
                
            
        </Row>
        <Row className="test">
            <Col md="4">
                <Row >
                    <Col md="3">
                       <div style={{width: '165px'}} className="text-right mr-3">Start Date : </div> 
                    </Col>
                    <Col md="3" style={{paddingLeft: '35px'}}>
                        <DatePicker 
                        selected={this.dateObject.toDate}
                        onChange={this.handleChangeToDate}
                        placeholderText="MM-DD-YYYY"
                       /> 

                     </Col>
                 </Row>                                       
            </Col> 
            <Col md="4">
                <Row >
                    <Col md="3">
                       <div style={{width: '160px'}} className="text-right mr-3">End Date : </div> 
                    </Col>
                    <Col md="3" style={{paddingLeft: '35px'}}>
                        <DatePicker 
                          selected={this.dateObject.fromDate}
                          onChange={this.handleChangeFromDate}
                          placeholderText="MM-DD-YYYY"
                          /> 
                     </Col>
                 </Row>                                       
            </Col>
        </Row>
 <Row className="test">
            <Col md="2" style={{textAlign: 'left',paddingLeft: '6.5rem'}}>
                <p>Show Status</p>

            </Col>
            <Col md="6" style={{textAlign: 'left',marginLeft: '-100px'}}>
                <FormGroup tag="fieldset">
          
          <FormGroup check>
            <Label check>
              <Input type="radio" name="radio1" />{' '}
               Success
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type="radio" name="radio2" />{' '}
               Error 
            </Label>
          </FormGroup>
          <FormGroup check disabled>
            <Label check>
              <Input type="radio" name="radio3" />{' '}
               Both
            </Label>
          </FormGroup>
        </FormGroup>

            </Col>
            </Row>

       { /*<Col md="12" style={{textAlign: 'right'}}>
                   <Button  color="primary"   onClick={this.handleSubmit}>Search</Button>
                                   
               </Col>*/}
        <Col md="4" style={{marginTop: '2rem'}}>
       <Button style={{marginRight: '20px', backgroundColor:'#a70606',borderColor: '#a70606'}} color="primary"   className="save_button" onClick={this.handleSubmit}>Search</Button>
        <Button  color="primary"  style={{backgroundColor: '#b1aeae', borderColor: '#b1aeae'}} className="save_button" onClick={this.handleSubmit}>Clear</Button>
        </Col>
        
    <hr style={{width: '105%'}}/>
        {this.state.displayTable ? <div><p className="test" style={{textAlign: 'left',marginLeft: '3rem',color: '#a60606'}}> <b> List  of Disbursements</b> </p>
                     <Table bordered style={{marginLeft: '3rem'}}>
                                <thead style={{backgroundColor: '#e2e1e1'}}>
                                  <tr>
                                    <th>#</th>
                                    <th>Disbursement1</th>
                                    <th>Disbursement2</th>
                                    <th>Disbursement3</th>
                                    <th>Disbursement4</th>
                                    <th>Disbursement5</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <th scope="row">1</th>
                                    <td>1253</td>
                                    <td>145239</td>
                                    <td>22/09/2018</td>
                                    <td>145239</td>
                                    <td>145239</td>
                                  </tr>
                                  <tr>
                                    <th scope="row">2</th>
                                      <td>1253</td>
                                    <td>145239</td>
                                    <td>22/09/2018</td>
                                    <td>145239</td>
                                    <td>145239</td>
                                  </tr>
                                  <tr>
                                    <th scope="row">3</th>
                                      <td>1253</td>
                                    <td>145239</td>
                                    <td>22/09/2018</td>
                                    <td>145239</td>
                                    <td>145239</td>
                                  </tr>
                                  <tr>
                                    <th scope="row">4</th>
                                      <td>1253</td>
                                    <td>145239</td>
                                    <td>22/09/2018</td>
                                    <td>145239</td>
                                    <td>145239</td>
                                  </tr>
                                  <tr>
                                    <th scope="row">5</th>
                                      <td>1253</td>
                                    <td>145239</td>
                                    <td>22/09/2018</td>
                                    <td>145239</td>
                                    <td>145239</td>
                                  </tr>
                                </tbody>
                              </Table> </div>:''}

  </div>
    );
  }
}


