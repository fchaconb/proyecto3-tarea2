import { CommonModule } from "@angular/common";
import { Component, inject, ViewChild } from "@angular/core";
import { LoaderComponent } from "../../components/loader/loader.component";
import { PaginationComponent } from "../../components/pagination/pagination.component";
import { ProductListComponent } from "../../components/product/product-list/product-list.component";
import { ProductFormComponent } from "../../components/product/product-form/product-form.component";
import { ModalComponent } from "../../components/modal/modal.component";
import { ProductService } from "../../services/product.service";
import { ModalService } from "../../services/modal.service";
import { FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { ActivatedRoute } from "@angular/router";
import { IProduct } from "../../interfaces";
import { CategoryService } from "../../services/category.service";

@Component({
  selector: "app-product",
  standalone: true,
  imports: [
    CommonModule,
    LoaderComponent,
    PaginationComponent,
    ProductFormComponent,
    ProductListComponent,
    ModalComponent,
  ],
  templateUrl: "./product.component.html",
  styleUrl: "./product.component.scss",
})
export class ProductComponent {
  public productService: ProductService = inject(ProductService);
  public categoryService: CategoryService = inject(CategoryService);
  public modalService: ModalService = inject(ModalService);
  public fb: FormBuilder = inject(FormBuilder);
  @ViewChild("addProductModal") public addProductModal: any;
  public title: string = "Product";
  public productForm = this.fb.group({
    id: [""],
    name: ["", Validators.required],
    description: ["", Validators.required],
    price: ["", [Validators.required, Validators.min(0)]],
    quantity: ["", [Validators.required, Validators.min(0)]],
    categoryId: ["", Validators.required],
  });

  constructor() {
    this.productService.getAll();
    this.categoryService.getAll();
  }

  saveProduct(item: IProduct) {
    this.productService.save(item);
    this.modalService.closeAll();
  }

  callEdition(item: IProduct) {
    this.productForm.patchValue({
      id: item.id ? JSON.stringify(item.id) : "",
      name: item.name ? item.name : "",
      description: item.description ? item.description : "",
      price: item.price ? JSON.stringify(item.price) : "",
      quantity: item.quantity ? JSON.stringify(item.quantity) : "",
    });
    this.modalService.displayModal("md", this.addProductModal);
  }

  updateProduct(item: IProduct) {
    this.productService.update(item);
    this.modalService.closeAll();
  }

  deleteProduct(item: IProduct) {
    this.productService.delete(item);
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
