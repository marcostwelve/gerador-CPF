import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gerador-cpf',
  templateUrl: './gerador-cpf.component.html',
  styleUrls: ['./gerador-cpf.component.css']
})
export class GeradorCpfComponent implements OnInit {

  cpf: string = '';
  cpfs: string[] = [];
  mode: 'over' | 'side' = 'side';
  opened: boolean = true;
  
  constructor(private router: Router) { }

  
  ngOnInit(): void {
  }

  @HostListener('window:resize', ['$event']) 
    onresize(event: any) {
      this.ajusteMenu(event.target.innerWidth);
    }

  ajusteMenu(width: number) {
    if (width < 768) {
      this.mode = 'over';
      this.opened = false;
    } else {
      this.mode = 'side';
      this.opened = true;
    }
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }


  gerarCPF() {
    let novoCpf = "";

    do {
      let n = Math.floor(Math.random() * 999999999) + 1;
      let str = n.toString().padStart(9, '0');
      let div1 = this.calcularDV(str, 10);
      let div2 = this.calcularDV(str + div1, 11);
      novoCpf = str + div1 + div2;
      this.cpf  = this.formatarCPF(str + div1 + div2);
    } while (!this.validarCPF(novoCpf));
    
    this.salvarCPF(this.cpf);
  }
  
  calcularDV(numero: string, peso: number): number {
    let total = 0;

    for (let i = 0; i < numero.length; i++) {

      total += parseInt(numero[i]) * peso--;
  }

  let resto = total % 11;
  
  return resto < 2 ? 0 : 11 - resto;
}

formatarCPF(cpf: string): string {
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

copiarCPF() {
  navigator.clipboard.writeText(this.cpf).then(() => {
    alert('CPF copiado com sucesso');
  },
  (error) => {
    alert('Erro ao copiar CPF');
    console.error(error);
  });
}

salvarCPF(cpf: string) {
  this.cpfs.unshift(this.cpf);

  // this.cpfs.push(this.cpf);
}



limparCPFs() {
  this.cpfs = [];
}

exportarCPFs() {
  if (this.cpfs.length === 0) {
    alert('Nenhum CPF para exportar');
    return;
  }

  let conteudo = this.cpfs.join('\n');
  let blob = new Blob([conteudo], { type: 'text/plain' });
  let link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'cpfs.txt';
  link.click();
}

validarCPF(cpf: string): boolean {
    cpf = cpf.replace(/\D/g, '');
    if (cpf.length !== 11) {
      return false;
    }

    let numeros = cpf.substring(0, 9);
    let digitos = cpf.substring(9);

    let primeiroDigito = this.calcularDV(numeros, 10);
    let segundoDigito = this.calcularDV(numeros + primeiroDigito, 11);

    return digitos === `${primeiroDigito.toString()}${segundoDigito.toString()}`;
 }

 removerCPF(index: number) {
    this.cpfs.splice(index, 1);
 }

}


