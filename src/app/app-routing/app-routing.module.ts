import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "@components/login/login.component";
import { ArticlesListComponent } from "@components/articles-list/articles-list.component";
import { ArticleComponent } from "@components/article/article.component";

const appRoutes: Routes = [
    
    {
        path: '',
        pathMatch: 'full',
		redirectTo: 'login',
    },
    
    {
		path: 'login',
		component: LoginComponent
    },
    {
		path: 'articles-list',
		component: ArticlesListComponent,
    },
    {
		path: 'article',
		component: ArticleComponent,
    },
    {
		path: 'article/:postId',
		component: ArticleComponent,
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
