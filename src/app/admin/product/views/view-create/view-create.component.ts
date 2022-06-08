import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ProductService } from 'src/app/core/product/product.service';
import { Subscription } from 'rxjs';
import {io} from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-view-create',
  templateUrl: './view-create.component.html',
  styleUrls: ['./view-create.component.scss']
})
export class ViewCreateComponent implements OnInit, OnDestroy {
  validateForm!: FormGroup;
  $subscriptionPostProduct: Subscription | null = null;
  socket=io(environment.socket);
  constructor(private fb: FormBuilder, private _productService: ProductService) { }


  ngOnInit(): void {
    let me = this;
    me.getInitForm();
  }


  getInitForm() {
    this.validateForm = this.fb.group({
      brand: [null, [Validators.required]],
      model: [null, [Validators.required]],
      photo: [null, [Validators.required]],
      price: [1, [Validators.required]],
      size: [8, [Validators.required]],
      color: [null, [Validators.required]],
      description: [null, [Validators.required]],
      serie: [null, [Validators.required]],
    });
  }

  ngOnDestroy(): void {
    let me = this;
    me.$subscriptionPostProduct && me.$subscriptionPostProduct.unsubscribe();
  }


  submitForm(): void {
    let me = this;
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
      me.$subscriptionPostProduct = me._productService.postProduct({ ...this.validateForm.value, idUser: 1 }).subscribe({
        next: (resp) => {
          console.log('[RESPONSE]', resp);
          me.socket.emit('add-product',{ ...this.validateForm.value, idUser: 1 });
          me.getInitForm();
          me.validateForm.reset(me.validateForm.value);
        },
        error: (error) => {
          console.log('[Error]', error);
        },
        complete: () => {
          console.log('[COMPLETE POSTPRODUCT]');
        }
      });
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
