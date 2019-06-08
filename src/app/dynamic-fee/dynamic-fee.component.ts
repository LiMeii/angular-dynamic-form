import { Component, OnInit, Output, EventEmitter, Input, AfterContentChecked, OnDestroy } from "@angular/core"
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

import { MessageService } from '../app.message-service';

export interface FeeItemErrors {
    userlevel: string,
    tierMin: string,
    tierMax: string,
    amount: string
}

@Component({
    selector: 'dynamic-fee',
    templateUrl: "./dynamic-fee.component.html"
})

export class DynamicFeeComponent implements OnInit, AfterContentChecked, OnDestroy {
    @Input() group: FormGroup
    @Output() deleteFeeItem: EventEmitter<any> = new EventEmitter<any>();

    feeItemErrors: FeeItemErrors;
    feeItemErrorsMessage: any;
    isSubmitted: boolean = false;
    subcription: Subscription;

    constructor(private messageService: MessageService) {
        this.subcription = this.messageService.getIsFeeItemsSubmit().subscribe((val) => {
            this.isSubmitted = val ? true : false;
            if (this.isSubmitted) {
                this.onValidate();
            }
        });
    }

    ngOnInit() {
        this.initFormError();
    }

    initFormError() {
        this.resetFormError();
        this.feeItemErrorsMessage = {
            userlevel: {
                required: 'required'
            },
            tierMin: {
                required: 'required'
            },
            tierMax: {
                required: 'required'
            },
            amount: {
                required: 'required'
            }
        }
    }

    resetFormError() {
        this.feeItemErrors = {
            userlevel: '',
            tierMin: '',
            tierMax: '',
            amount: ''
        }
    }

    onValidate() {
        if (this.isSubmitted) {
            const form = this.group;
            for (const field in this.feeItemErrors) {
                if (form.get(field).errors) {
                    const error = Object.keys(form.get(field).errors);
                    this.feeItemErrors[field] = this.feeItemErrorsMessage[field][error[0]];

                } else {
                    this.feeItemErrors[field] = null;
                }
            }
        }
    }

    onRemoveItem() {
        this.deleteFeeItem.emit();
    }

    ngAfterContentChecked() {
        if (this.isSubmitted) {
            this.onValidate();
        }
    }

    ngOnDestroy() {
        this.subcription.unsubscribe();
    }
}