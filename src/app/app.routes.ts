import { Routes } from "@angular/router";
import { LoginComponent } from "./pages/auth/login/login.component";
import { AppLayoutComponent } from "./components/app-layout/app-layout.component";
import { SigUpComponent } from "./pages/auth/sign-up/signup.component";
import { UsersComponent } from "./pages/users/users.component";
import { AuthGuard } from "./guards/auth.guard";
import { AccessDeniedComponent } from "./pages/access-denied/access-denied.component";
import { AdminRoleGuard } from "./guards/admin-role.guard";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { GuestGuard } from "./guards/guest.guard";
import { IRoleType } from "./interfaces";
import { ProfileComponent } from "./pages/profile/profile.component";
import { OrdersComponent } from "./pages/orders/orders.component";
import { PreferenceListPageComponent } from "./pages/preferenceList/preference-list.component";
import { SportTeamComponent } from "./pages/sport-team/sport-team.component";
import { CategoryComponent } from "./pages/category/category.component";
import { ProductComponent } from "./pages/product/product.component";

export const routes: Routes = [
  {
    path: "login",
    component: LoginComponent,
    canActivate: [GuestGuard],
  },
  {
    path: "signup",
    component: SigUpComponent,
    canActivate: [GuestGuard],
  },
  {
    path: "access-denied",
    component: AccessDeniedComponent,
  },
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full",
  },
  {
    path: "app",
    component: AppLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "app",
        redirectTo: "users",
        pathMatch: "full",
      },
      {
        path: "users",
        component: UsersComponent,
        canActivate: [AdminRoleGuard],
        data: {
          authorities: [IRoleType.superAdmin],
          name: "Users",
          showInSidebar: true,
        },
      },
      {
        path: "dashboard",
        component: DashboardComponent,
        data: {
          authorities: [IRoleType.superAdmin, IRoleType.user],
          name: "Dashboard",
          showInSidebar: true,
        },
      },
      {
        path: "profile",
        component: ProfileComponent,
        data: {
          authorities: [IRoleType.superAdmin, IRoleType.user],
          name: "profile",
          showInSidebar: false,
        },
      },
      {
        path: "orders",
        component: OrdersComponent,
        data: {
          authorities: [IRoleType.superAdmin, IRoleType.user],
          name: "orders",
          showInSidebar: true,
        },
      },
      {
        path: "preference-list",
        component: PreferenceListPageComponent,
        data: {
          authorities: [IRoleType.superAdmin, IRoleType.user],
          name: "preference list",
          showInSidebar: true,
        },
      },
      {
        path: "sport-team",
        component: SportTeamComponent,
        data: {
          authorities: [IRoleType.superAdmin, IRoleType.user],
          name: "Sport Team",
          showInSidebar: true,
        },
      },
      {
        path: "category",
        component: CategoryComponent,
        data: {
          authorities: [IRoleType.superAdmin, IRoleType.user],
          name: "Category",
          showInSidebar: true,
        },
      },
      {
        path: "product",
        component: ProductComponent,
        data: {
          authorities: [IRoleType.superAdmin, IRoleType.user],
          name: "Product",
          showInSidebar: true,
        },
      },
    ],
  },
];
