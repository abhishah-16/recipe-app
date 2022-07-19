import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isloginMode = true
  isLoading = false
  error: string = ''
  constructor(private authservice: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    console.log('auth')
  }

  onHandleError() {
    this.error = null
  }

  private showAlertError(message: string) {
  }

  onSwitchMode() {
    this.isloginMode = !this.isloginMode
  }

  onSubmit(form: NgForm) {
    const email = form.value.email
    const password = form.value.password
    let authObs: Observable<object>
    this.isLoading = true
    if (this.isloginMode) {
      authObs = this.authservice.logIn(email, password)
    } else {
      authObs = this.authservice.signUp(email, password)
    }

    authObs.subscribe(response => {
      this.isLoading = false
      this.router.navigate(['recipes'])
    }, error => {
      this.error = error
      console.log(error)
      this.isLoading = false
      this.showAlertError(error)
    })
    form.reset()
  }
}
