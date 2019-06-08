import { Injectable } from "@angular/core";
import { Subject, Observable } from 'rxjs';


@Injectable()
export class MessageService {
    private isFeeItemsSubmit: Subject<any> = new Subject<any>();

    sendIsFeeItemsSubmit(val: boolean) {
        this.isFeeItemsSubmit.next(val);
    }

    getIsFeeItemsSubmit(): Observable<boolean> {
        return this.isFeeItemsSubmit.asObservable();
    }
}