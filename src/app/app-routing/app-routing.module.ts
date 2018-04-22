import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "@components/login/login.component";
import { ArticlesListComponent } from "@components/articles-list/articles-list.component";
import { AuthService } from '@services/auth/auth.service';
import { AppComponent } from '../app.component';

const appRoutes: Routes = [

    {
		path: '',
        component: AppComponent,
        canActivate: [AuthService]
    },    
    {
		path: 'login',
		component: LoginComponent
    },
    {
		path: 'articles-list',
        component: ArticlesListComponent,
        canActivate: [AuthService]
	}
]

@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes
        )
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
