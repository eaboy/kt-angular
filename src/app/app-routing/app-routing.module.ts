import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "@components/login/login.component";
import { ArticlesListComponent } from "@components/articles-list/articles-list.component";
import { ArticleComponent } from "@components/article/article.component";
import { AuthService } from '@services/auth/auth.service';
import { AppComponent } from '../app.component';
import { UserComponent } from '@components/user/user.component';
import { LogoutComponent } from "@components/logout/logout.component";

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
		path: 'logout',
		component: LogoutComponent
    },    
    {
		path: 'articles-list',
        component: ArticlesListComponent,
        canActivate: [AuthService]
    },
    {
		path: 'article',
        component: ArticleComponent,
        canActivate: [AuthService]
    },
    {
		path: 'article/:postId',
		component: ArticleComponent,
        canActivate: [AuthService]
    },
    {
        path: 'user',
        component: UserComponent,
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
