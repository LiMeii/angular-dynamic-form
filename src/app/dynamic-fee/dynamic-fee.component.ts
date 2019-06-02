import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core"


@Component({
    selector: 'dynamic-fee',
    templateUrl: "./dynamic-fee.component.html"
})

export class DynamicFeeComponent implements OnInit {
    @Input() group:any
    @Output() deleteFeeItem: EventEmitter<any> = new EventEmitter<any>();

    ngOnInit() {

    }

    onRemoveItem(){
        this.deleteFeeItem.emit();
    }

}