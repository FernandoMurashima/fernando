import { Component, OnInit } from '@angular/core';
import { MoviesService, Movie } from '../movies.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-movie-edit',
  templateUrl: './movie-edit.component.html',
  styleUrls: ['./movie-edit.component.scss']
})
export class MovieEditComponent implements OnInit {
  isAdmin: boolean = true;
  movie: Movie | undefined;
  originalMovie: Movie | undefined;
  movieId: number | undefined;
  errorMessage: string | undefined;

  constructor(
    private moviesService: MoviesService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.movieId = params['id'];
      if (this.movieId) {
        this.loadMovie(this.movieId);
      }
    });
  }

  loadMovie(id: number): void {
    this.moviesService.get(id).subscribe(
      movie => {
        this.movie = movie;
        this.originalMovie = { ...movie };
        this.errorMessage = undefined; // Clear error message if movie is found
      },
      error => {
        console.error('Filme não encontrado');
        this.movie = undefined;
        this.originalMovie = undefined;
        this.errorMessage = 'Filme não encontrado'; // Set error message
      }
    );
  }

  saveMovie(): void {
    if (this.movie) {
      if (this.originalMovie && this.movieId) {
        this.moviesService.updateMovie(this.movieId, this.movie).subscribe(() => {
          alert('Filme atualizado com sucesso!');
        });
      } else {
        console.error('Nenhum filme encontrado para atualizar');
      }
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