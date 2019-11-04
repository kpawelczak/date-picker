import { ChangeDetectionStrategy, Component, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';

import { daysOfTheWeek } from '../data/days-of-the-week';
import { months } from '../data/months';
import { quarters } from '../data/quarters';
import { FabricDatePickerService } from '../fabric-date-picker.service';
import { FabricDatePickerWeeks } from './weeks/fabric-date-picker.weeks';
import { FabricDatePickerYears } from './years/fabric-date-picker.years';


@Component({
	selector: 'gui-date-picker-toggle',
	templateUrl: 'fabric-date-picker-calendar.component.html',
	styleUrls: ['./fabric-date-picker-calendar.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	host: {
		'[class.gui-date-picker-calendar]': 'true'
	}
})
export class FabricDatePickerCalendarComponent implements OnChanges, OnInit, OnDestroy {

	currentDay: Date = new Date();
	daysOfTheWeek = daysOfTheWeek;
	weeks: Array<Array<Date>>;
	quarters: Array<Array<any>> = quarters;
	years: Array<Array<number>>;

	selectDate: Date;
	selectedMonth: number = new Date().getMonth() + 1;
	selectedMonthName: string;
	selectedYear: number;

	private selectedDateSubscription: Subscription;
	private monthSubscription: Subscription;
	private yearSubscription: Subscription;

	private enableMonthSelection: boolean = false;
	private enableYearSelection: boolean = false;

	constructor(private datePickerService: FabricDatePickerService,
				private datePickerWeeks: FabricDatePickerWeeks,
				private datePickerYears: FabricDatePickerYears) {
	}

	ngOnChanges(changes: SimpleChanges) {

		if (changes.minYear || changes.maxYear) {
			this.years = this.datePickerYears.getYears(this.selectedYear);
		}

		if (changes.selectDate) {
			this.calculateDatePickerData();
		}

	}

	ngOnInit() {
		this.monthSubscription =
			this.datePickerService.observeDateMonth().subscribe((month) => this.selectedMonth = month);

		this.yearSubscription =
			this.datePickerService.observeDateYear().subscribe((year) => this.selectedYear = year);

		this.selectedDateSubscription =
			this.datePickerService.observeSelectedDate().subscribe((date) => {
				this.selectDate = date;
				this.selectedYear = date.getFullYear();
				this.selectedMonth = date.getMonth();
			});

		this.calculateDatePickerData();
	}

	ngOnDestroy() {
		this.monthSubscription.unsubscribe();
		this.yearSubscription.unsubscribe();
		this.selectedDateSubscription.unsubscribe();
	}

	calculateDatePickerData() {
		this.selectedMonthName = months[this.selectedMonth];
		this.weeks = this.datePickerWeeks.getDaysInMonths(this.selectedYear, this.selectedMonth);
		this.years = this.datePickerYears.getYears(this.selectedYear);
	}

	prevCard() {
		if (!this.enableMonthSelection && !this.enableYearSelection) {
			this.datePickerService.prevMonth(this.selectedYear, this.selectedMonth);
			this.calculateDatePickerData();
		}

		if (this.enableMonthSelection && this.selectedYear) {
			this.selectedYear = this.selectedYear - 1;
		}

		if (this.enableYearSelection) {
			this.years = this.datePickerYears.prevYearRange();
		}
	}

	nextCard() {
		if (!this.enableMonthSelection && !this.enableYearSelection) {
			this.datePickerService.nextMonth(this.selectedYear, this.selectedMonth);
			this.calculateDatePickerData();
		}

		if (this.enableMonthSelection && this.selectedYear) {
			this.selectedYear = this.selectedYear + 1;
		}

		if (this.enableYearSelection) {
			this.years = this.datePickerYears.nextYearRange();
		}
	}

	onSelect(date: Date): void {
		this.datePickerService.dateSelected(date);
		this.selectDate = date;
	}

	switchViewedList() {
		event.stopPropagation();

		if (this.enableMonthSelection) {
			return 'monthList';
		}
		if (this.enableYearSelection) {
			return 'yearsList';
		}
		if (!this.enableMonthSelection && !this.enableYearSelection) {
			return 'daysList';
		}

	}

	private displayMonthDays(day: number): boolean {
		return day === this.selectedMonth;
	}

	private isDateSelected(day: Date): boolean {
		if (this.selectDate) {
			return day.getDate() === this.selectDate.getDate() &&
				day.getMonth() === this.selectDate.getMonth() &&
				day.getFullYear() === this.selectDate.getFullYear();
		}
	}

	private isCurrentDay(day: Date): boolean {
		return day.getDate() === this.currentDay.getDate() &&
			day.getMonth() === this.currentDay.getMonth() &&
			day.getFullYear() === this.currentDay.getFullYear();
	}

	private isCurrentMonth(month: number): boolean {
		return month === this.currentDay.getMonth() &&
			this.selectedYear === this.currentDay.getFullYear();
	}

	private isSelectedMonth(month: number): boolean {
		if (this.selectDate) {
			return this.selectDate.getMonth() === month &&
				this.selectDate.getFullYear() === this.selectedYear;
		}
	}

	private isYearSelected(year: number): boolean {
		if (this.selectDate) {
			return year === this.selectedYear;
		}
	}

	private isCurrentYear(year: number): boolean {
		return this.currentDay.getFullYear() === year;
	}

	private selectYear(year: number): void {
		this.selectedYear = year;
		this.enableYearSelection = false;
		this.enableMonthSelection = true;
		this.calculateDatePickerData();
	}

	private selectMonth(month: number): void {
		this.selectedMonth = month;
		this.enableMonthSelection = false;
		this.calculateDatePickerData();
	}

	private showMonthsList(): void {
		this.enableMonthSelection = !this.enableMonthSelection;
	}

	private showYearsList(): void {
		this.enableMonthSelection = false;
		this.enableYearSelection = !this.enableYearSelection;
	}

	private getDisplayedYearRange(): string {
		return this.years[0][0].toString() + '-' + this.years[4][this.years[4].length - 1].toString();
	}

}
