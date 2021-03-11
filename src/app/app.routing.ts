import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register';

const appRoutes: Routes = [
    { path: 'register', component: RegisterComponent },
    // otherwise redirect to register
    { path: '**', redirectTo: 'register' }
];

export const routing = RouterModule.forRoot(appRoutes);