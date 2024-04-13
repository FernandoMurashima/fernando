import { Component } from '@angular/core';
import { MoviesService, Movie } from '../movies.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  isAdmin: boolean = true; // Defina se o usuário é um administrador ou não
  newMovie: Movie = { id: 0, title: '', year: 0, cover: '', description: '', midia: '', isFavorite: false }; // Objeto para armazenar os dados do novo filme

  constructor(private movieService: MoviesService) {}

  onSubmit() {
    // Adicione o novo filme usando o serviço
    this.movieService.addMovie(this.newMovie).subscribe(() => {
      // Limpe os campos do formulário após adicionar o filme com sucesso
      this.newMovie = { id: 0, title: '', year: 0, cover: '', description: '', midia: '', isFavorite: false };
    });
  }
}