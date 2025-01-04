import { Injectable } from '@angular/core';
import { ApiService } from './api.service'; // Importez ApiService
import { Observable } from 'rxjs';
import { Client } from '../models/client.model'; // Modèle Client

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiUrl = 'clients'; // URL relative pour les clients, ApiService gère l'URL de base

  constructor(private apiService: ApiService) {}

  // Méthode pour créer un client
  createClient(client: Client): Observable<Client> {
    return this.apiService.request('post', `${this.apiUrl}/create`, client);
  }

  // Méthode pour obtenir un client par son ID
  getClientById(id: number): Observable<Client> {
    return this.apiService.request('get', `${this.apiUrl}/${id}`);
  }

  // Méthode pour obtenir tous les clients
  getAllClients(): Observable<Client[]> {
    return this.apiService.request('get', this.apiUrl);
  }
  updateClient(id: number, client: any): Observable<any> {
    return this.apiService.request('put',`${this.apiUrl}/update/${id}`, client);
  }
  // Méthode pour supprimer un client
  deleteClient(id: number): Observable<void> {
    return this.apiService.request('delete', `${this.apiUrl}/${id}`);
  }
}
