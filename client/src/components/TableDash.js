import React from 'react';
import {Button} from 'react-bootstrap';

function TableDash() {

// aqui hay que crear la funcion que hace que los modales salgan a preguntar si quiere borrarse la fila de la vacante
function deleteJob () {
    console.log("hola");
}

  return (
  <div>  

{/* falta conectar que cada que agrega el usuario alguna application vayan apareciendo aqui, necesito saber como traerme esa informacion a cada row que se vaya creando */}
    <div class="container table-responsive">
      <h2>Job Applications</h2>
      <p>Check the status of your current applications:</p>            
      <table class="table">
        <thead class="text-center">
          <tr>
            <th>Company</th>
            <th>Position</th>
            <th>Notes</th>
            <th>Status</th>
            <th>......</th>
          </tr>
        </thead>
        <tbody>
            {/* aqui debe entrar una funcion que me traiga la informacion de las vacantes que el usuario haya puesto, de la fila 41 a la 50 se repetira las veces que haya vacantes */}
          <tr>
            <td>1 name</td>
            <td>job name</td>
            <td>notes written by me</td>
            <td>On Interview</td>
            <td><button class="btn-sm btn-warning">Edit</button>
                <Button variant="danger btn-sm" onClick={deleteJob}>Delete
                </Button>
            </td>
          </tr>
          
        </tbody>
      </table>
    </div>
    

{/* <!-- Delete Modal ** falta que cuando se cargue la pagina otra vez ese que estaba delete ya NO aparezca--> */}
<div id="delModal" class="modal fade" role="dialog">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Delete Job Application</h4>
          <button type="button" class="close" data-dismiss="modal">&times;</button>
        </div>
        <div class="modal-body">
          <p>Are you sure you want to delete this job application?</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" id="confirmDel">Yes</button>
          <button type="button" class="btn btn-secondary" id="cancelDel" data-dismiss="modal">No</button>
        </div>
      </div>
    </div>
  </div>
  
</div>

)
}

export default TableDash;