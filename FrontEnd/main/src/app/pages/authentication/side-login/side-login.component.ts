import { Component,OnInit  } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/services'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-side-login',
    imports: [
      MatCardModule,
      FormsModule,
      ReactiveFormsModule,
      MatFormFieldModule,
      MatInputModule,
      MatCheckboxModule,
      CommonModule,
      RouterModule,
      MaterialModule
    ],
  templateUrl: './side-login.component.html',
})
export class AppSideLoginComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService)  { }
  
  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/']);
    }
  }

  form = new FormGroup({
    uname: new FormControl('', [Validators.required, Validators.minLength(6)]),
    password: new FormControl('', [Validators.required]),
    rememberMe:  new FormControl(false)
  });


  // Getter pour accéder facilement aux contrôles du formulaire
  get f() {
    return this.form.controls;
  }

  // Méthode pour soumettre le formulaire et vérifier les informations de connexion
  submit() {
    if (this.form.invalid) {
      return; // Ne rien faire si le formulaire est invalide
    }

    const { uname, password } = this.form.value;

    // Appel au service d'authentification
    this.authService.login(uname ?? '', password ?? '', true);

    if (this.authService.isLoggedIn()) {
      // Si l'utilisateur est authentifié, on le redirige vers la page d'accueil
      this.router.navigate(['/']);
    } else {
      // Si l'authentification échoue, tu peux afficher un message d'erreur ici
      alert('Nom d\'utilisateur ou mot de passe incorrect');
    }
  }

  goToRegister() {
    this.router.navigate(['/authentication/register']); // Redirection vers la page d'enregistrement
  }
}
