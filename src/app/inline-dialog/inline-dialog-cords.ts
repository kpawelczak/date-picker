import { ElementRef } from '@angular/core';

export class InlineDialogCords {
	verticalPosition: number;
	horizontalPosition: number;

	constructor(private element: ElementRef) {
		this.calculateCords(element);
	}

	private calculateCords(element: ElementRef): void {
		const elementRect = element.nativeElement.getBoundingClientRect(),
			elementBottom = elementRect.bottom,
			elementLeft = elementRect.left;

		this.horizontalPosition = window.pageXOffset + elementLeft;
		this.verticalPosition = window.pageYOffset + elementBottom;
	}

	getVerticalPosition(): number {
		return this.verticalPosition;
	}

	getHorizontalPosition(): number {
		return this.horizontalPosition;
	}
}
