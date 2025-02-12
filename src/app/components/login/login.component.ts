import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string = '';
  errorMessage: string = '';
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    if (this.username.trim() === 'admin') {
      var encodedUser = btoa(this.username);
      localStorage.setItem('username', encodedUser);
      this.router.navigate(['/gerador-cpf']);
    } else {
      this.errorMessage = 'Usuário inválido!';
    }
  }

}
