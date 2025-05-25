import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  alertSuccess(message: string) {
    Swal.fire({
      title: '¡Éxito!',
      text: message,
      icon: 'success',
      confirmButtonText: 'Aceptar'
    });
  }

  alertError(message: string) {
    Swal.fire({
      title: message ,
      text: '¡Error!',
      icon: 'error',
      confirmButtonText: 'Cerrar'
    });
  }

  alertDelete(message: string) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Estas seguro?",
      text: "No podrás revertir esto.!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si, elimina!",
      cancelButtonText: "No, cancela!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire({
          title: "Eliminado!",
          text: "Tu registro fue eliminado.",
          icon: "success"
        });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelado",
          text: "Tu registro está a salvo",
          icon: "error"
        });
      }
    });
  }
}
