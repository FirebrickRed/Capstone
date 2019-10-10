import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  { 
    path: 'new-item-modal',
    canActivate: [AuthGuard],
    loadChildren: () => import('./new-item-modal/new-item-modal.component') 
  },
  { 
    path: 'signup', 
    loadChildren: () => import('./signup/signup.module').then(m => m.SignupPageModule)
  },
  { 
    path: 'login', 
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule) 
  },
  { 
    path: 'character-creation', 
    loadChildren: () => import('./character-creation/character-creation.module').then(m => m.CharacterCreationPageModule) //'./character-creation/character-creation.module#CharacterCreationPageModule' 
  },
  
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
