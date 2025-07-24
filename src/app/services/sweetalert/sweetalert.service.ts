import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SweetalertService {

  constructor(private _router: Router) { }

  // Parse Error received in an API and show Error if required
  showHttpError(errorObj: any) {
    // Check for network connection
    if (!navigator.onLine) {
      this.showError("No internet connection. Please check your network.");
      return;
    }
    if (errorObj instanceof HttpErrorResponse) {

      let error_status = errorObj.status.toString();
      if (errorObj.error && errorObj.error.errorMessage) {
        if (errorObj.error && errorObj.error.code === 101) {
          this.sessionOut();
        } else {
          this.showError(errorObj.error.errorMessage);
        }
      } else if (error_status.startsWith('4')) {
        this.showError("API not found in request path");
      } else if (errorObj.error.message) {
        this.showError(errorObj.error.message);
      } else if (error_status.startsWith('5')) {
        this.showError("Something went wrong");
      } else {
        this.showError("Something went wrong");
        // this.showError(JSON.stringify(errorObj.error));
      }
    } else {
      this.showError("Something went wrong");
    }
  }

  showError(errorMessage: string) {
    Swal.fire({
      icon: "error",
      text: errorMessage ? errorMessage : " Something want wrong!",
    })
  }

  showSuccess(message: string) {
    Swal.fire({
      icon: "success",
      text: message ? message : "Success",
    })
  }

  sessionOut() {
    Swal.fire({
      text: "Your session has expired. Please login.",
      icon: 'info',
      confirmButtonText: 'OK',
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        this._router.navigate(['/']);
      }
    })
  }

  inputSwal() {
    var self = this;
    return new Promise(function (resolve) {

      Swal.fire({
        icon: 'info',
        title: 'To submit this new change you have to enter a new name',
        input: 'text',
        inputAttributes: {
          autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Add',
        allowOutsideClick: false,
        preConfirm: (name) => {
          if (!name || name.trim() === "") {
            Swal.showValidationMessage("Please enter name");
          }
        }
      }).then((result) => {
        if (result.isConfirmed) {
          return resolve(result);
        }
      });
    })
  }


  showConfirmDialog(options: any) {
    return Swal.fire({
      title: options.title,
      text: options.text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
    });
  }

  warnCallback(text: any) {
    return new Promise(function (resolve) {
      Swal.fire({
        title: 'Are you sure?',
        text: text,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'Cancel',
      }).then((result) => {
        if (result.isConfirmed) {
          resolve(1);
        } else {
          resolve(0);
        }
      })
    })
  }

  wait(text: string = "Your request is under process") {
    var self = this;
    Swal.fire({
      title: "Please Wait...",
      text: text,
    });
  };

}
