import {
	ApplicationRef,
	ComponentFactoryResolver,
	ComponentRef,
	ElementRef,
	EmbeddedViewRef,
	Injectable,
	Injector,
	OnDestroy,
	Type
} from '@angular/core';
import { FabricInlineDialogComponent } from './fabric-inline-dialog.component';
import { Observable, Subject } from 'rxjs';
import { InlineDialogCords } from './inline-dialog-cords';


@Injectable()
export class FabricInlineDialogService implements OnDestroy {

	inlineDialogRef: ComponentRef<any> = null;

	private inlineDialogState$ = new Subject<InlineDialogCords>();

	constructor(private componentFactoryResolver: ComponentFactoryResolver,
				private applicationRef: ApplicationRef,
				private injector: Injector) {
	}

	ngOnDestroy() {
		this.removeInlineDialog();
	}

	open(element: ElementRef, component: Type<any>): void {
		event.stopPropagation();
		if (!this.inlineDialogRef) {
			this.appendInlineDialogToElement(component);
			this.getInlineDialogCords(element);
		}
	}

	close(): void {
		this.removeInlineDialog();
	}

	observeInlineDialogCords(): Observable<InlineDialogCords> {
		return this.inlineDialogState$.asObservable();
	}

	private appendInlineDialogToElement(component: any): void {
		const componentRef = this.componentFactoryResolver
								 .resolveComponentFactory(FabricInlineDialogComponent)
								 .create(this.injector);

		componentRef.instance.inlineDialogNestedComponent = component;
		componentRef.changeDetectorRef.detectChanges();

		this.applicationRef.attachView(componentRef.hostView);

		const domDialogElement = (componentRef.hostView as EmbeddedViewRef<any>)
			.rootNodes[0] as HTMLElement;

		document.body.appendChild(domDialogElement);

		this.inlineDialogRef = componentRef;
	}

	private removeInlineDialog(): void {
		if (this.inlineDialogRef) {
			this.applicationRef.detachView(this.inlineDialogRef.hostView);
			this.inlineDialogRef.destroy();
			this.inlineDialogRef = null;
		}
	}

	private getInlineDialogCords(element: ElementRef): void {
		const inlineDialogCords = new InlineDialogCords(element);

		this.inlineDialogState$.next(inlineDialogCords);
	}

}
