import React from 'react';

import classnames from 'classnames';
import axios from 'axios';
import cellEditFactory from 'react-bootstrap-table2-editor';
 import BootstrapTable from 'react-bootstrap-table-next';
import { Container,Alert,Nav,NavItem,FormGroup,Label, Badge,Row,Col,Card,CardHeader,FormText,CardBlock,Button,Modal, ModalHeader, ModalBody, ModalFooter,Input, InputGroup, InputGroupAddon } from "reactstrap";
import { EditingState } from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableEditRow,
  TableEditColumn,
} from '@devexpress/dx-react-grid-bootstrap4';

const CommandButton = ({
  onExecute, icon, text, hint, color,
}) => (
  <button
    type="button"
    className="btn btn-link"
    style={{ padding: 11 }}
    onClick={(e) => {
      onExecute();
      e.stopPropagation();
    }}
    title={hint}
  >
    <span className={color || 'undefined'}>

      {text}
    </span>
  </button>
);

const AddButton = ({ onExecute }) => (
  <CommandButton icon="plus" text="Add" hint="Create new row" onExecute={onExecute} />
);

const EditButton = ({ onExecute }) => (
  <CommandButton icon="pencil" text="Correct" hint="Edit row" color="text-warning" onExecute={onExecute} />
);

const DeleteButton = ({ onExecute }) => (
  <CommandButton
    icon="trash"
    hint="Delete row"
    color="text-danger"
    text="Delete"
    onExecute={() => {
      // eslint-disable-next-line
      if (window.confirm('Are you sure you want to delete this row?')) {
        onExecute();
      }
    }}
  />
);

const CommitButton = ({ onExecute }) => (
  <CommandButton icon="check" text="Save" hint="Save changes" color="text-success" onExecute={onExecute} />
);

const CancelButton = ({ onExecute }) => (
  <CommandButton icon="x" text="Cancel" hint="Cancel changes" color="text-danger" onExecute={onExecute} />
);

const commandComponents = {
  add: AddButton,
  edit: EditButton,
  delete: DeleteButton,
  commit: CommitButton,
  cancel: CancelButton,
};

const editCommand = ({ id, onExecute }) => {
  const ButtonComponent = commandComponents[id];
  return (
    <ButtonComponent
      onExecute={onExecute}
    />
  );
};
const getRowId = row => row.id;

export default class MM extends React.Component {
    constructor(props) {
    super(props);

    this.state = {
      activeTab: '1',
      displayTable:false,
      displayAdvanceNoticeTable:false,
      products:[
      {
         'id':1,
         'name':'laptiop',
         'price':12.5
      },
      {
         'id':2,
         'name':'laptiop2',
         'price':14.5
      }


      ],
      columns: [
        { name: 'id', title: 'ID' },
        { name: 'name', title: 'Name' },
        { name: 'sex', title: 'Sex' },
        { name: 'city', title: 'City' },
        { name: 'car', title: 'Car' },
      ],
      columnWidths: [
      
      ],

      tableColumnExtensions: [
      

      ],
      rows:[
      {
         'id':1,
         'name':'laptiop',
         'sex':'M',
         'city':'vij',
         'car':'car'
      },
     {
         'id':2,
         'name':'laptiop',
         'sex':'M',
         'city':'vij',
         'car':'car456'
      },
      {
         'id':3,
         'name':'laptiop',
         'sex':'F',
         'city':'v456ij',
         'car':'car456'
      }


      ],
      editingRowIds: [],
      addedRows: [],
      rowChanges: {}
    };
   this.mm={
       market:'',
       sloc:''
   }
   this.adavanceShipNotice =[];
    
    this.handleChange = this.handleChange.bind(this);
    this.showTables = this.showTables.bind(this);
    this.saveAsDefault = this.saveAsDefault.bind(this);
   // this.afterSaveCell = this.afterSaveCell.bind(this);
       this.changeAddedRows = this.changeAddedRows.bind(this);
    this.changeEditingRowIds = this.changeEditingRowIds.bind(this);
    this.changeRowChanges = this.changeRowChanges.bind(this);
    this.commitChanges = this.commitChanges.bind(this);
   
  }
 
 handleChange(event){
     this.mm[event.target.name] = event.target.value;
     this.setState(this.mm);
      this.setState({
                    displayTable: false
                });
 }

   saveAsDefault(){
       
   }

changeAddedRows(addedRows) {
    const initialized = addedRows.map(row => (Object.keys(row).length ? row : { city: 'Tokio' }));
    this.setState({ addedRows: initialized });
  }

  changeEditingRowIds(editingRowIds) {
    this.setState({ editingRowIds });
  }

  changeRowChanges(rowChanges) {
    this.setState({ rowChanges });
  }

  commitChanges({ added, changed, deleted }) {
    let { rows } = this.state;

    console.log(added);
  
    if (added) {
      const startingAddedId = rows.length > 0 ? rows[rows.length - 1].id + 1 : 0;
      rows = [
        ...rows,
        ...added.map((row, index) => ({
          id: startingAddedId + index,
          ...row,
        })),
      ];
    }
     console.log(changed);
    if (changed) {
      rows = rows.map(row => (changed[row.id] ? { ...row, ...changed[row.id] } : row));
      console.log(rows);
    }
    if (deleted) {
      const deletedSet = new Set(deleted);
      rows = rows.filter(row => !deletedSet.has(row.id));
    }
    this.setState({ rows });
  }
 showTables(event){
   event.preventDefault();
   if(this.mm.market!='' || this.mm.sloc!=''){
         this.setState({
                    displayTable: true
                });
       this.data = {};
   this.data.plant = this.mm.market;
   this.data.sloc = this.mm.sloc; 
   axios.get("https://jsonplaceholder.typicode.com/posts?userId=1").then((response) => {
     /*if(response.statusMessage=="Success"){
          if(response.goodsReceiptGetResponse.length>0){
               this.setState({
                   displayAdvanceNoticeTable:true
               })
          }
           this.adavanceShipNotice = response.goodsReceiptGetResponse;

     }*/
   

    });
   }

  
   console.log(this.mm.market);

 }
 onAfterSaveCell(value, name){
   console.log(value);
   console.log(name);
 }

  render() {
  const {
      rows, columns, tableColumnExtensions, editingRowIds, rowChanges, addedRows,
    } = this.state;

const selectRow = {
  mode: 'checkbox',
  clickToSelect: true,
  clickToEdit: true  // Click to edit cell also
};

const cellEdit = {
  mode: 'click'
};
    return (
  <div > 
     <Row className="test">
                       <Col md="2">
                           <Label for="exampleEmail" >Market :</Label>
                        </Col> 
                        <Col md="4">
                            <InputGroup>
                            <Input type="select" className="w-100" value={this.mm.market} name="market" onChange={this.handleChange} id="ccmonth">
                               <option value="">Select </option>
                               <option value="6">6</option>
                                <option value="8">8</option>
                                <option value="12">12</option>
                            </Input>
                            
                            </InputGroup>
                        </Col>     
                        <span id="passwordLengthErr" className="colorvalidation"> </span>
                        <Col md="2">
                            <Button color="primary" style={{backgroundColor: '#a70606', borderColor: '#a70606'}} onClick={this.saveAsDefault}  >Save as Default</Button>
                        </Col> 
                    </Row>
                    <Row>
                       <Col md="2">
                           <Label for="exampleEmail" className="pt-1">Plant/Sloc :</Label>
                        </Col> 
                        <Col md="4">
                            <InputGroup>
                            <Input type="select" className="w-100" value={this.mm.sloc} name="sloc" onChange={this.handleChange} id="ccmonth">
                               <option value="">Select </option>
                               <option value="6">6</option>
                                <option value="8">8</option>
                                <option value="12">12</option>
                            </Input>
                            
                            </InputGroup>
                        </Col>     
                        <span id="passwordLengthErr" className="colorvalidation"> </span>
                        <Col md="2">
                                <Button  color="primary" style={{backgroundColor: '#a70606', borderColor: '#a70606'}}  className="save_button" onClick={this.showTables}>Save</Button>
                            
                        </Col> 
                    </Row>
          <div>
              <Grid
          rows={rows}
          columns={columns}
        >
         
          <Table
            columnExtensions={tableColumnExtensions}
          />

          <TableHeaderRow />
        </Grid>
  </div>

   <div>
              <Grid
          rows={rows}
          columns={columns}
        >
         
          <Table
            columnExtensions={tableColumnExtensions}
          />

          <TableHeaderRow />
        </Grid>
  </div>







          <div className="card">
        <Grid
          rows={rows}
          columns={columns}
          getRowId={getRowId}
        >
          <EditingState
            editingRowIds={editingRowIds}
            onEditingRowIdsChange={this.changeEditingRowIds}
            rowChanges={rowChanges}
            onRowChangesChange={this.changeRowChanges}
            onCommitChanges={this.commitChanges}
          />
          <Table
            columnExtensions={tableColumnExtensions}
          />
          <TableHeaderRow />
          <TableEditRow />
          <TableEditColumn
            showEditCommand
             commandComponent={editCommand}
          />
        </Grid>
      </div>
                  




  </div>
    );
  }
}
