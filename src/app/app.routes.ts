import { Routes } from '@angular/router';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';

export const routes: Routes = [
    {
        path: '',
        component: CadastroComponent,
        title: 'Avenida Gás Braz'
    },
    {
        path: 'teste/cadastro/cliente',
        component: SignUpComponent,
        title: 'Avenida Gás Braz'
    }
];
