import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { LoginService } from "../service/login.service";
//O AuthGuard serve para proteger rotas que devem ser acessadas apenas por usuários autenticados.
//Ele intercepta a navegação antes que a rota seja carregada.
export const authGuard: CanActivateFn = (route, state) => {

    const loginService = inject(LoginService);
    const router = inject(Router);

    if(loginService.getToken()){
        return true;
    } else {
        router.navigate(["login"]);
        return false;
    }
}
