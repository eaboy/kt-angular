import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "../login/login.component";
import { ArticlesListComponent } from "../articles-list/articles-list.component";

const appRoutes: Routes = [
	{
		path: 'login',
		component: LoginComponent,
    },
    {
		path: 'articles-list',
		component: ArticlesListComponent,
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
