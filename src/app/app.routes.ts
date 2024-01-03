import { Routes } from '@angular/router';
import {TodoListComponent} from "./components/todo-list/todo-list.component";
import {authGuard} from "./guards/auth.guard";
import {NotFoundComponent} from "./components/not-found/not-found.component";
import {SignInComponent} from "./components/sign-in/sign-in.component";
import {SignUpComponent} from "./components/sign-up/sign-up.component";
import {UnauthorizedComponent} from "./components/unauthorized/unauthorized/unauthorized.component";
import {ContactComponent} from "./components/contact/contact.component";
import {AboutComponent} from "./components/about/about.component";

export const routes: Routes = [
  {
    path: 'signin',
    title: 'Log in',
    component: SignInComponent
  },
  {
    path: 'signup',
    title: 'Register',
    component: SignUpComponent
  },
  {
    path: 'todolist',
    title: 'To Do List',
    component: TodoListComponent,
    canActivate: [authGuard]
  },
  {
    path: 'contact',
    title: 'Contact',
    component: ContactComponent,
    canActivate: [authGuard]
  },
  {
    path: 'about',
    title: 'About',
    component: AboutComponent,
    canActivate: [authGuard]
  },
  {
    path: 'not-found',
    title: 'Not Found',
    component: NotFoundComponent,
    canActivate: [authGuard]
  },
  {
    path: 'unauthorized',
    title: 'Unauthorized',
    component: UnauthorizedComponent
  },
  {
    path: '', redirectTo: '/todolist', pathMatch: 'full'
  },
  {
    path: '**',
    component: NotFoundComponent,
    canActivate: [authGuard]
  }
];
