import { Component, inject, ViewChild } from "@angular/core";
import { CategoryService } from "../../services/category.service";
import { ModalService } from "../../services/modal.service";
import { FormBuilder, Validators } from "@angular/forms";
import { ICategory } from "../../interfaces";
import { CommonModule } from "@angular/common";
import { LoaderComponent } from "../../components/loader/loader.component";
import { PaginationComponent } from "../../components/pagination/pagination.component";
import { CategoryListComponent } from "../../components/category/category-list/category-list.component";
import { ModalComponent } from "../../components/modal/modal.component";
import { CategoryFormComponent } from "../../components/category/category-form/category-form.component";
import { AuthService } from "../../services/auth.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-category",
  standalone: true,
  imports: [
    CommonModule,
    LoaderComponent,
    PaginationComponent,
    CategoryListComponent,
    ModalComponent,
    CategoryFormComponent,
  ],
  templateUrl: "./category.component.html",
  styleUrl: "./category.component.scss",
})
export class CategoryComponent {
  public categoryService: CategoryService = inject(CategoryService);
  public modalService: ModalService = inject(ModalService);
  public fb: FormBuilder = inject(FormBuilder);
  @ViewChild("addCategoryModal") public addCategoryModal: any;
  public title: string = "Category";
  public categoryForm = this.fb.group({
    id: [""],
    name: ["", Validators.required],
    description: ["", Validators.required],
    products: [[]],
  });

  constructor() {
    this.categoryService.getAll();
  }

  saveCategory(item: ICategory) {
    this.categoryService.save(item);
    this.modalService.closeAll();
  }

  updateCategory(item: ICategory) {
    this.categoryService.update(item);
    this.modalService.closeAll();
  }

  callEdition(item: ICategory) {
    this.categoryForm.patchValue({
      id: item.id ? JSON.stringify(item.id) : "",
      name: item.name ? item.name : "",
      description: item.description ? item.description : "",
      products: (item.products as any) || [],
    });
    this.modalService.displayModal("md", this.addCategoryModal);
  }

  deleteCategory(item: ICategory) {
    this.categoryService.delete(item);
  }

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
