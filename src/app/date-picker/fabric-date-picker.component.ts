import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FabricInlineDialogService } from '../inline-dialog/fabric-inline-dialog.service';
import { FabricDatePickerCalendarComponent } from './calendar/fabric-date-picker-calendar.component';
import { FabricDatePickerService } from './fabric-date-picker.service';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';


@Component({
	selector: 'gui-date-picker',
	templateUrl: './fabric-date-picker.component.html',
	styleUrls: ['./fabric-date-picker.scss'],
})
export class FabricDatePickerComponent implements OnInit, OnDestroy {
	@ViewChild('datePicker')
	datePickerRef: ElementRef;

	@Input()
	selectDate: Date;

	@Output()
	dateSelected = new EventEmitter();

	datePickerForm: FormGroup;

	pickedDate: Date;

	datePickerSubscription: Subscription;
	datePickerDaySubscription: Subscription;

	constructor(private inlineDialogService: FabricInlineDialogService,
				private datePickerService: FabricDatePickerService,
				private formBuilder: FormBuilder) {

		this.datePickerForm = formBuilder.group({
				'date': ['']
			}
		);
	}

	ngOnChanges(changes: SimpleChanges) {
		if (changes.selectDate) {
			this.datePickerService.dateSelected(this.selectDate);
		}
	}

	ngOnInit() {
		this.datePickerSubscription =
			this.datePickerService.observeSelectedDate()
				.pipe(distinctUntilChanged())
				.subscribe(
					(date: Date) => {
						this.pickedDate = date;
						this.dateSelected.emit(date);
						this.inlineDialogService.close();
					}
				);

		this.observeDayChanges();
	}

	ngOnDestroy() {
		this.datePickerSubscription.unsubscribe();
		this.datePickerDaySubscription.unsubscribe();
	}


	openDatePicker() {
		this.inlineDialogService.open(this.datePickerRef, FabricDatePickerCalendarComponent);
	}

	private observeDayChanges(): void {
		this.datePickerDaySubscription =
			this.datePickerForm.controls['date'].valueChanges
												.pipe(distinctUntilChanged(),
													debounceTime(1000),
													map((day: string) => this.parse(day)))
												.subscribe(
													(day: Date) => {
														this.datePickerService.dateSelected(day);
													});
	}

	private parse(value: string): Date {
		if ((typeof value === 'string') && (value.includes('/'))) {
			const str = value.split('/');

			const year = +str[2],
				month = +str[1] - 1,
				date = +str[0];

			return new Date(year, month, date);
		} else {
			return this.pickedDate;
		}
	}

}

