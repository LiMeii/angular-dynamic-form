import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';

import { MessageService } from './app.message-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'angular-dynamic-form';
  feeForm: FormGroup;
  constructor(private fb: FormBuilder, private messageService: MessageService) { }

  ngOnInit() {
    this.feeForm = this.fb.group({
      feeArray: this.fb.array([])

    });
    this.addFeeItem();
  }

  get feeArray() {
    return <FormArray>this.feeForm.get('feeArray');
  }

  addFeeItem() {
    this.feeArray.push(
      this.fb.group({
        userlevel: ['', Validators.required],
        tierMin: ['', Validators.required],
        tierMax: ['', Validators.required],
        amount: ['', Validators.required]
      })
    )
  }

  removeFeeItem() {
    this.feeArray.removeAt(this.feeArray.length - 1);
  }

  onSubmit() {
    this.messageService.sendIsFeeItemsSubmit(true);
    console.log(this.feeForm.controls.feeArray);
  }
}
