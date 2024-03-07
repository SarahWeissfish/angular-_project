import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { UserService } from "./user.service";
import { LogOutComponent } from './log-out/log-out.component';


@NgModule({
   declarations:[LoginComponent,RegisterComponent, LogOutComponent],
   imports:[CommonModule,FormsModule,ReactiveFormsModule,HttpClientModule,RouterModule],
   providers:[UserService],
   exports:[LoginComponent,RegisterComponent,LogOutComponent]
})

export class UserModule{

}