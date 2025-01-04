import { CdkScrollable } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { CompteService } from 'src/app/services/compte.service';

@Component({
  selector: 'app-ajoute-compte',
  standalone: true,
  imports: [MatFormFieldModule,
        MatSelectModule,
        FormsModule,
        ReactiveFormsModule,
        CdkScrollable,
        MatButtonModule,
        MatTooltipModule, MatCardModule, MatInputModule, MatCheckboxModule,CommonModule],
  templateUrl: './ajoute-compte.component.html',
  styleUrl: './ajoute-compte.component.scss'
})
export class AjouteCompteComponent {
  compteForm!: FormGroup;
  clients: any[] = [];

  constructor(
    private fb: FormBuilder,
    private compteService: CompteService,
    private clientService: ClientService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Initialiser le formulaire avec validations
    this.compteForm = this.fb.group({
      solde: ['', [Validators.required, Validators.min(0)]], // Solde obligatoire et positif
      clientId: ['', Validators.required] // Client obligatoire
    });
  
    // Charger la liste des clients
    this.clientService.getAllClients().subscribe({
      next: (clients) => {
        this.clients = clients;
        console.log("Clients chargés :", this.clients);
      },
      error: (err) => {
        console.error("Erreur lors du chargement des clients :", err);
      }
    });
  }
  

  // Soumettre le formulaire pour ajouter un compte
  onSubmit(): void {
    if (this.compteForm.valid) {
      this.compteService.createCompte(this.compteForm.value).subscribe({
        next: () => {
          alert('Compte ajouté avec succès!');
          this.router.navigate(['/ui-components/listsCompte']);
        },
        error: (err) => {
          console.error('Erreur lors de l\'ajout du compte:', err);
          alert('Une erreur est survenue.');
        }
      });
    } else {
      alert('Veuillez remplir correctement le formulaire.');
    }
  }
}
