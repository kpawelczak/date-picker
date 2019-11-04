import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable()
export class FabricDatePickerService {

	private dateMonth$ = new Subject<number>();
	private dateYear$ = new Subject<number>();

	private initialDate = new Date();
	private selectedDate$ = new BehaviorSubject(this.initialDate);

	observeDateMonth(): Observable<number> {
		return this.dateMonth$.asObservable();
	}

	observeDateYear(): Observable<number> {
		return this.dateYear$.asObservable();
	}

	observeSelectedDate(): Observable<Date> {
		return this.selectedDate$.asObservable();
	}

	dateSelected(date: Date): void {
		this.selectedDate$.next(date);
	}

	nextMonth(year: number, month: number) {
		if (month === 11) {
			this.dateYear$.next(year + 1);
			this.dateMonth$.next(0);
		} else {
			this.dateMonth$.next(month + 1);
		}
	}

	prevMonth(year: number, month: number) {
		if (month === 0) {
			this.dateYear$.next(year - 1);
			this.dateMonth$.next(11);
		} else {
			this.dateMonth$.next(month - 1);
		}
	}

}
