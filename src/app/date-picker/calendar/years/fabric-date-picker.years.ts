import { Injectable } from '@angular/core';

@Injectable()
export class FabricDatePickerYears {
	private rowsForDisplay: Array<Array<number>>;
	private minYear: number;
	private maxYear: number;
	private year: number = new Date().getFullYear();
	private readonly inc: number = 10;

	getYears(selectedYear: number): Array<Array<number>> {
		this.minYear = selectedYear - 50;
		this.maxYear = selectedYear + 50;

		let yearsRange: number = this.maxYear - this.minYear,
			years: Array<number> = [],
			rows: Array<Array<number>> = [];

		years = this.createYearsPool(this.minYear, yearsRange, years);

		rows = this.divideYearsPool(years, rows);

		return this.rowsForDisplay = this.createRowsForDisplay(rows, selectedYear);

	}

	prevYearRange() {
		if (this.year > this.minYear) {
			this.year -= this.inc;
		}

		if (this.year > this.minYear) {
			return this.getYears(this.year);
		} else {
			return this.rowsForDisplay;
		}

	}

	nextYearRange() {
		if (this.year < this.maxYear) {
			this.year += this.inc;
		}

		if (this.year < this.maxYear) {
			return this.getYears(this.year);
		} else {
			return this.rowsForDisplay;
		}

	}

	private createYearsPool(minYear: number, yearsRange: number, years: Array<number>): Array<number> {
		for (let i = 0; i <= yearsRange; i++) {
			years.push(minYear + i);
		}
		return years;
	}

	private divideYearsPool(years: Array<number>, rows: Array<Array<number>>): Array<Array<number>> {
		for (let i = 0; i < years.length; i += 5) {
			rows.push(years.slice(i, i + 5));
		}
		return rows;
	}

	private createRowsForDisplay(rows: Array<Array<number>>, selectedYear: number): Array<Array<number>> {
		if (selectedYear >= this.minYear || selectedYear <= this.maxYear) {

			for (let i = 0; i < rows.length; i++) {

				if (rows[i].indexOf(selectedYear) > -1) {

					if (!rows[i - 1]) {
						return [rows[i], rows[i + 1], rows[i + 2], rows[i + 3], rows[i + 4]];
					}

					if (!rows[i - 2]) {
						return [rows[i - 1], rows[i], rows[i + 1], rows[i + 2], rows[i + 3]];
					}

					if (!rows[i + 1]) {
						return [rows[i - 4], rows[i - 3], rows[i - 2], rows[i - 1], rows[i]];
					}

					if (!rows[i + 2]) {
						return [rows[i - 3], rows[i - 2], rows[i - 1], rows[i], rows[i + 1]];
					}

					return this.rowsForDisplay = [rows[i - 2], rows[i - 1], rows[i], rows[i + 1], rows[i + 2]];
				}
			}
		}
	}

}
