import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from '../core/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  validateForm!: FormGroup;
  $subscriptionPostLogin: Subscription | null = null;
  constructor(private fb: FormBuilder, private _userService: UserService,private router:Router) { }


  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
      /*   remember: [true] */
    });
  }


  ngOnDestroy(): void {
    let me = this;
    me.$subscriptionPostLogin && me.$subscriptionPostLogin.unsubscribe();
  }



  submitForm(): void {
    let me = this;
    if (this.validateForm.valid) {
      console.log('[FORM LOGIN]', this.validateForm.value);
      const data = me.validateForm.value;
      me.$subscriptionPostLogin = me._userService.postLogin(data).subscribe({
        next: (resp) => {
          console.log('[RESPONSE POST LOGIN]', resp);
          localStorage.setItem('TOKEN',resp.token);
          me.router.navigate(['admin']);
        },
        error: (error) => {
          console.log('[ERROR POST LOGIN]', error);
        },
        complete: () => {
          console.log('[COMPLETE POST LOGIN]');
        }
      });

    } else {
      Object.values(this.validateForm.controls).forEach((control: any) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

}
