import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { debounceTime, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { MessageService } from './app.message-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'angular-dynamic-form';
  feeForm: FormGroup;
  isSubmitted: boolean = false;

  constructor(private fb: FormBuilder, private messageService: MessageService) { }

  ngOnInit() {
    this.feeForm = this.fb.group({
      feeArray: this.fb.array([])

    });
    this.addFeeItem();


    this.feeForm.valueChanges.pipe(
      tap(() => {
        console.log('set testFlag to false')
      }),
      debounceTime(3000),
      switchMap(() => {
        console.log('switch map called');
        return of({ success: true })
      })
    ).subscribe((response) => {
      // Handle API response here
      console.log(JSON.stringify(response))
      console.log('API call sucess')
    });
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
    this.isSubmitted = true
    this.messageService.sendIsFeeItemsSubmit(this.isSubmitted);
    if (this.feeForm.valid) {
      console.log(this.feeForm.controls.feeArray);
    }
  }
}
