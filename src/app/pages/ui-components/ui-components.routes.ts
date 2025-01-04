import { Routes } from '@angular/router';

// ui

import { AppListsComponent } from './listsclient/listsclient.component';
import { AppListsCompteComponent } from './listscompte/listscompte.component';
import { AppClientComponent } from './client/client.component';
import { Compte } from './compteBank/compte';
import { ModifeClientComponent } from './modife-client/modife-client.component';
import { ModifeCompteComponent } from './modife-compte/modife-compte.component';
import { AjouteCompteComponent } from './ajoute-compte/ajoute-compte.component';

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
        path: 'ajoute-compte',
        component: AjouteCompteComponent,
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
        path: 'modife-client/:id',
        component: ModifeClientComponent,
      },
      {
        path: 'Compte',
        component: Compte,
      },
      {
        path: 'modife-compte/:id',
        component: ModifeCompteComponent,
      },
    ],
  },
];
