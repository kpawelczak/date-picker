import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { FabricDatePickerComponent } from './fabric-date-picker.component';
import { FabricDatePickerCalendarComponent } from './calendar/fabric-date-picker-calendar.component';
import { FabricDatePickerService } from './fabric-date-picker.service';
import { FabricDatePickerWeeks } from './calendar/weeks/fabric-date-picker.weeks';
import { FabricDatePickerYears } from './calendar/years/fabric-date-picker.years';
import { FabricInlineDialogModule } from '../inline-dialog/fabric-inline-dialog.module';

// import './fabric-date-picker.scss';
// import './calendar/fabric-date-picker-calendar.scss';


@NgModule({
	imports: [
		CommonModule,
		FabricInlineDialogModule,
		ReactiveFormsModule
	],
	declarations: [
		FabricDatePickerCalendarComponent,
		FabricDatePickerComponent
	],
	exports: [
		FabricDatePickerCalendarComponent,
		FabricDatePickerComponent
	],
	entryComponents: [
		FabricDatePickerCalendarComponent
	],
	providers: [
		FabricDatePickerService,
		FabricDatePickerWeeks,
		FabricDatePickerYears
	]
})
export class FabricDatePickerModule {

}
