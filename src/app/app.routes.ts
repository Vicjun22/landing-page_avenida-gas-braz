import { Routes } from '@angular/router';
import { CompletedComponent } from './pages/completed/completed.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';

export const routes: Routes = [
    {
        path: '',
        component: SignUpComponent,
        title: 'Avenida Gás Braz'
    },
    {
        path: 'done',
        component: CompletedComponent,
        title: 'Avenida Gás Braz'
    }
];
