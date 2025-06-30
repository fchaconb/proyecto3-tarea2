import { Component, EventEmitter, inject, Input, Output } from "@angular/core";
import { AuthService } from "../../../services/auth.service";
import { ActivatedRoute } from "@angular/router";
import { IProduct } from "../../../interfaces";

@Component({
  selector: "app-product-list",
  standalone: true,
  imports: [],
  templateUrl: "./product-list.component.html",
  styleUrl: "./product-list.component.scss",
})
export class ProductListComponent {
  @Input() title: string = "";
  @Input() productList: IProduct[] = [];
  @Output() callModalAction: EventEmitter<IProduct> =
    new EventEmitter<IProduct>();
  @Output() callDeleteAction: EventEmitter<IProduct> =
    new EventEmitter<IProduct>();

  public authService: AuthService = inject(AuthService);
  public areActionsAvailable: boolean = false;
  public route: ActivatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.authService.getUserAuthorities();
    this.route.data.subscribe((data) => {
      this.areActionsAvailable = this.authService.areActionsAvailable(
        data["authorities"] ? data["authorities"] : []
      );
    });
  }
}
