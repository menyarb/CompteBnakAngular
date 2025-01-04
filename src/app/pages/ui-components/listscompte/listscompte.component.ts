import { ConfirmDialogComponent } from "src/app/confirm-dialog/confirm-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { CompteService } from "src/app/services/compte.service";
import { MatListModule } from "@angular/material/list";
import { MatCardModule } from "@angular/material/card";
import { DatePipe } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
import { MatTableModule } from "@angular/material/table";
import { MaterialModule } from "src/app/material.module";
import { Component, OnInit } from "@angular/core";
import { Compte } from "src/app/models/compte.model";

@Component({
  selector: 'app-lists-compte',
  standalone: true,
  imports: [MatListModule, MatCardModule, DatePipe, MatIconModule, MatTableModule, MaterialModule],
  templateUrl: './listscompte.component.html',
})
export class AppListsCompteComponent implements OnInit {
  comptes: Compte[] = [];
  displayedColumns: string[] = ['nom', 'rib', 'solde', 'actions'];
  isLoading: boolean = false;
  errorMessage: string = '';
  clientId: number | null = null; // Variable pour stocker l'ID client

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private compteService: CompteService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.clientId = idParam ? Number(idParam) : null;
    console.log('ID:', this.clientId);
    
    this.fetchComptes();
    
  }

  // Ajouter un compte
  ajouterCompte(): void {
    this.router.navigate(['/ui-components/ajoute-copmte']);
  }

  // Modifier un compte
  modifierCompte(compte: Compte): void {
    this.router.navigate(['/ui-components/modife-compte']);
  }

  // Supprimer un compte avec confirmation
  supprimerCompte(compte: Compte): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: { message: 'Êtes-vous sûr de vouloir supprimer ce compte ?' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Compte supprimé :', compte);
        this.comptes = this.comptes.filter((c) => c !== compte);
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
