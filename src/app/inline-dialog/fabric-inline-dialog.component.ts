import {
	AfterViewInit,
	ChangeDetectorRef,
	Component,
	ComponentFactoryResolver,
	ElementRef,
	forwardRef,
	Inject,
	OnInit,
	Type,
	ViewChild,
	ViewContainerRef
} from '@angular/core';
import { FabricInlineDialogService } from './fabric-inline-dialog.service';
import { Subscription } from 'rxjs';


@Component({
	templateUrl: 'fabric-inline-dialog.component.html',
	styleUrls: ['./fabric-inline-dialog.scss']
})
export class FabricInlineDialogComponent implements OnInit, AfterViewInit {

	@ViewChild('container', { read: ViewContainerRef })
	container: ViewContainerRef;

	inlineDialogNestedComponent: Type<any>;

	dialogTopAttribute: number;
	dialogLeftAttribute: number;

	private inlineDialogCordsSubscription: Subscription;

	private readonly spaceBetweenElementAndInlineDialog: number = 8;

	constructor(private componentFactoryResolver: ComponentFactoryResolver,
				private changeDetectorRef: ChangeDetectorRef,
				@Inject(forwardRef(() => FabricInlineDialogService)) private inlineDialogService: FabricInlineDialogService,
				private elementRef: ElementRef) {
	}

	ngOnInit() {
		this.inlineDialogCordsSubscription =
			this.inlineDialogService.observeInlineDialogCords()
				.subscribe((inlineDialogCords) => {
					this.dialogTopAttribute = inlineDialogCords.getVerticalPosition() + this.spaceBetweenElementAndInlineDialog;
					this.dialogLeftAttribute = inlineDialogCords.getHorizontalPosition();
				});
	}

	ngOnDestroy() {
		if (this.inlineDialogCordsSubscription) {
			this.inlineDialogCordsSubscription.unsubscribe();
		}
	}

	ngAfterViewInit() {
		this.createNestedComponent(this.inlineDialogNestedComponent);
		this.changeDetectorRef.detectChanges();
	}

	clickOutside(event: any): void {
		if (this.isContainerClicked(event)) {
			this.inlineDialogService.close();
		}
	}

	private isContainerClicked(event: any): boolean {
		return !this.elementRef.nativeElement.contains(event.target);
	}

	private createNestedComponent(component: Type<any>): void {
		const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);

		this.container.createComponent(componentFactory);
	}
}
