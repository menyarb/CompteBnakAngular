import { Routes } from '@angular/router';

// ui

import { AppListsComponent } from './listsclient/listsclient.component';
import { AppListsCompteComponent } from './listscompte/listscompte.component';
import { AppClientComponent } from './client/client.component';
import { Compte } from './compteBank/compte';
import { ModifeClientComponent } from './modife-client/modife-client.component';
import { ModifeCompteComponent } from './modife-compte/modife-compte.component';

export const UiComponentsRoutes: Routes = [
  {
    path: '',
    children: [
     
    
      {
        path: 'listsclient',
        component: AppListsComponent,
      },
      {
        path: 'listsCompte/:id',
        component: AppListsCompteComponent,
      }, 
      
      {
        path: 'listsCompte',
        component: AppListsCompteComponent,
      }, 
      {
        path: 'ajoute-client',
        component: AppClientComponent,
      },
      {
        path: 'modife-client',
        component: ModifeClientComponent,
      },
      {
        path: 'Compte',
        component: Compte,
      },
      {
        path: 'modife-compte',
        component: ModifeCompteComponent,
      },
    ],
  },
];
