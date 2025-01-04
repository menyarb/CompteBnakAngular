import { ConfirmDialogComponent } from "src/app/confirm-dialog/confirm-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { CompteService } from "src/app/services/compte.service";
import { MatListModule } from "@angular/material/list";
import { MatCardModule } from "@angular/material/card";
import { CommonModule, DatePipe } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
import { MatTableModule } from "@angular/material/table";
import { MaterialModule } from "src/app/material.module";
import { Component, OnInit } from "@angular/core";
import { Compte } from "src/app/models/compte.model";
import { ClientService } from "src/app/services/client.service";

@Component({
  selector: 'app-lists-compte',
  standalone: true,
  imports: [MatListModule, MatCardModule, DatePipe,RouterModule,CommonModule, MatIconModule, MatTableModule, MaterialModule],
  templateUrl: './listscompte.component.html',
})
export class AppListsCompteComponent implements OnInit {
  comptes: Compte[] = [];
  displayedColumns: string[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';
  clientId: number | null = null; 
  clientName: string | null;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private compteService: CompteService,
    private clientService: ClientService,
    private route: ActivatedRoute

  ) {}

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.clientId = idParam ? Number(idParam) : null;
    console.log('ID:', this.clientId);
    this.updateDisplayedColumns();
    this.fetchComptes();
    
  }
  updateDisplayedColumns(): void {
    // Ajouter les colonnes de base
    this.displayedColumns = ['rib', 'solde', 'actions'];

    if (this.clientId == null) {
      this.displayedColumns.unshift('nomClient');
    }else{
      this.clientService.getClientById(this.clientId).subscribe(client=>this.clientName=client.prenom+" "+client.nom);
    }
  }

  // Ajouter un compte
  ajouterCompte(): void {
    this.router.navigate(['/ui-components/ajoute-compte']);
  }

  // Modifier un compte
  modifierCompte(compte: Compte): void {
    this.router.navigate(['/ui-components/modife-compte/'+compte.rib]);
  }

  // Supprimer un compte avec confirmation
  supprimerCompte(compte: Compte): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: { message: 'Êtes-vous sûr de vouloir supprimer ce compte ?' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.compteService.deleteCompte(compte.rib).subscribe(()=>this.fetchComptes())
      } else {
        console.log('Suppression annulée');
      }
    });
  }

  // Charger les comptes pour un client spécifique
  fetchComptes(): void {
    this.isLoading = true;
    if (this.clientId) {
      this.compteService.getCompteByIdClient(this.clientId).subscribe(
        (data) => {
          this.comptes = data;
          this.isLoading = false;
        },
        (error) => {
          this.errorMessage = 'Erreur lors du chargement des comptes.';
          this.isLoading = false;
        }
      );
    } else {
      this.compteService.getAllComptes().subscribe(
        (data) => {
          this.comptes = data;
          this.isLoading = false;
        },
        (error) => {
          this.errorMessage = 'Erreur lors du chargement des comptes.';
          this.isLoading = false;
        }
      );
    }
  }
}
