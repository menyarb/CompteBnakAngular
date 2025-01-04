
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {DatePipe} from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { Router, RouterModule } from '@angular/router';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ClientService } from 'src/app/services/client.service';
import { Client } from 'src/app/models/client.model';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-lists',
  standalone: true,
  imports: [MatListModule, MatCardModule, DatePipe,MatIconModule, MaterialModule,CommonModule,RouterModule ],
  templateUrl: './listsclient.component.html',
})
export class AppListsComponent {
  clients: Client[] = []; 
  displayedColumns: string[] = ['nom', 'prenom', 'actions']; 
  isLoading: boolean = false; 
  errorMessage: string = ''; 

  constructor(
    private clientService: ClientService, 
    private dialog: MatDialog, 
    private router: Router 
  ) {}

  ngOnInit(): void {
    this.fetchClients(); 
  }

 
  fetchClients(): void {
    this.isLoading = true; 
    this.clientService.getAllClients().subscribe(
      (data) => {
        this.clients = data;
        this.isLoading = false; 
      },
      (error) => {
        this.errorMessage = 'Erreur lors du chargement des clients.';
        this.isLoading = false;
      }
    );
  }

  // Méthode pour naviguer vers la page d'ajout de client
  ajouterClient(): void {
    this.router.navigate(['/ui-components/ajoute-client']);
  }

  // Méthode pour naviguer vers la page de modification d'un client
  modifierClient(client: Client): void {
    this.router.navigate(['/ui-components/modife-compte'], { state: { client } });
  }

  // Méthode pour supprimer un client
  supprimerClient(client: Client): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: { message: 'Êtes-vous sûr de vouloir supprimer ce client ?' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.clientService.deleteClient(client.id).subscribe(
          () => {
            this.clients = this.clients.filter((c) => c.id !== client.id);
          },
          (error) => {
            this.errorMessage = 'Erreur lors de la suppression du client.';
          }
        );
      }
    });
  }
}
