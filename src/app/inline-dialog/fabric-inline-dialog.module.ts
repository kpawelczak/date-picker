import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FabricInlineDialogComponent } from './fabric-inline-dialog.component';
import { FabricInlineDialogService } from './fabric-inline-dialog.service';

// import './fabric-inline-dialog.scss';


@NgModule({
	imports: [
		CommonModule
	],
	declarations: [
		FabricInlineDialogComponent
	],
	providers: [
		FabricInlineDialogService
	],
	entryComponents: [
		FabricInlineDialogComponent
	]
})
export class FabricInlineDialogModule {
}
