import { Component, OnInit } from '@angular/core';
import { MoviesService, Movie } from '../movies.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-movie-edit',
  templateUrl: './movie-edit.component.html',
  styleUrls: ['./movie-edit.component.scss']
})
export class MovieEditComponent implements OnInit {
  movie: Movie | undefined;
  originalMovie: Movie | undefined;
  movieId: number | undefined; // Adicionando uma variável para armazenar o ID do filme

  constructor(
    private moviesService: MoviesService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.movieId = params['id']; // Obtendo o ID do filme da URL
      if (this.movieId) {
        this.loadMovie(this.movieId); // Carregando os dados do filme com base no ID
      }
    });
  }

  loadMovie(id: number): void {
    this.moviesService.get(id).subscribe(movie => {
      this.movie = movie;
      this.originalMovie = { ...movie };
    });
  }

  saveMovie(): void {
    if (this.movie) {
      this.moviesService.addMovie(this.movie).subscribe(() => {
        alert('Filme salvo com sucesso!');
      });
    }
  }

  deleteMovie(): void {
    if (this.movieId && confirm('Tem certeza de que deseja deletar este filme?')) {
      this.moviesService.deleteMovie(this.movieId).subscribe(() => {
        alert('Filme deletado com sucesso!');
        this.router.navigate(['/movie-list']);
      });
    }
  }

  clearForm(): void {
    if (this.movie && this.originalMovie) {
      this.movie = { ...this.originalMovie };
    }
  }
}

