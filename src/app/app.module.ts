import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FabricDatePickerModule } from './date-picker/fabric-date-picker.module';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		FabricDatePickerModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {
}
