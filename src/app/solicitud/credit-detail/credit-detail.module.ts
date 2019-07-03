import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { CreditDetailsComponent } from './credit-details.component';
import { ApplicationComponent } from './application/application.component';
import { EvaluationComponent } from './evaluation/evaluation.component';
import { GeneralComponent } from './general/general.component';
import { LoanComponent } from './loan/loan.component';

import { SolicitudCreditoService } from '../solicitud-credito.service';
import { SharedModule } from '../../shared/shared.module';

const routes: Routes = [
  { path: '', component: CreditDetailsComponent, children: [
      { path: 'general', component: GeneralComponent },      
      { path: 'application', component: ApplicationComponent },
      { path: 'evaluation', component: EvaluationComponent },
      { path: 'loan', component: LoanComponent }
  ]
}];

@NgModule({
  declarations: [ CreditDetailsComponent, GeneralComponent, ApplicationComponent, 
                  EvaluationComponent, LoanComponent ],
  imports: [ CommonModule, RouterModule.forChild(routes), SharedModule ],
  exports: [ RouterModule ],
  providers: [ SolicitudCreditoService ]
})
export class CreditDetailModule { }
