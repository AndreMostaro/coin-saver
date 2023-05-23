import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { AuthenticationRequestDto } from 'src/app/dtos/transactions/request/authentication.request.dto';
import { ClientsService } from 'src/app/services/clients/clients.service';

@Component({
  selector: 'app-modal-redefinir-senha',
  templateUrl: './modal-redefinir-senha.component.html',
  styleUrls: ['./modal-redefinir-senha.component.css']
})
export class ModalRedefinirSenhaComponent {

  constructor(
    private clientsService: ClientsService,
    private messageService: MessageService,
    public router: Router,
    public ref: DynamicDialogRef,
  ) {}

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  email: string | undefined;

  authenticationRequestDto: AuthenticationRequestDto = {
    email: undefined,
    password: undefined,
  };

  redefinirSenha(authenticationRequestDto: AuthenticationRequestDto) {

    this.email = authenticationRequestDto.email;

    this.clientsService.recoverPassword(this.email).subscribe(
      (res) => {

        console.log(res)

        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'EMAIL enviado com sucesso. Verifique sua caixa de entrada.' });
        setTimeout(() => {
          this.cleanObjectAuthenticationRequestDto();
          this.fecharModal();
          this.retornaLoginPage();
        }, 1500);
      },
      (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Erro ao tentar redefinir senha.' });
      }
    );
  }

  cleanObjectAuthenticationRequestDto() {
    this.authenticationRequestDto = {
      email: undefined,
      password: undefined,
    }
  }

  fecharModal() {
    this.ref.close();
  }

  retornaLoginPage() {
    this.router.navigateByUrl('login-page', {
      state: {
        data: {},
      },
    });
  }
}
