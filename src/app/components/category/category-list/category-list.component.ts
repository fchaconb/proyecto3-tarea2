import { Component, EventEmitter, inject, Input, Output } from "@angular/core";
import { ICategory } from "../../../interfaces";
import { AuthService } from "../../../services/auth.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-category-list",
  standalone: true,
  imports: [],
  templateUrl: "./category-list.component.html",
  styleUrl: "./category-list.component.scss",
})
export class CategoryListComponent {
  @Input() title: string = "";
  @Input() categoryList: ICategory[] = [];
  @Output() callModalAction: EventEmitter<ICategory> =
    new EventEmitter<ICategory>();
  @Output() callDeleteAction: EventEmitter<ICategory> =
    new EventEmitter<ICategory>();

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
