import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'angular-dynamic-form';
  feeForm: FormGroup;
  constructor(private fb: FormBuilder) { }

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
        userlevel: [],
        tierMin: [],
        tierMax: [],
        amount: []
      })
    )
  }

  removeFeeItem() {
    this.feeArray.removeAt(this.feeArray.length - 1);
  }

  onSubmit(){
    console.log(this.feeForm.controls.feeArray);
  }
}
