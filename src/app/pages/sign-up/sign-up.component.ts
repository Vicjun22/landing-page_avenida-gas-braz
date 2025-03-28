import { CommonModule, DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, SecurityContext } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { DomSanitizer } from '@angular/platform-browser';
import { Router, RouterModule } from '@angular/router';
import { NgxMaskDirective } from 'ngx-mask';
import { finalize, Observable, Subject, take, takeUntil } from 'rxjs';
import { BrasilApiService } from '../../services/brasilapi.service';
import { NotificationService } from '../../services/notification.service';
import { CepResponse } from '../../types/cep-response.type';
import { SignUpRequest } from '../../types/sign-up-request.type';
import { cpfValidation } from '../../utils/cpf-validation';
import { telefoneValidation } from '../../utils/telefone-validation';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatProgressSpinnerModule, MatFormFieldModule, NgxMaskDirective, RouterModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent implements OnInit {
  
  private document: Document = inject(DOCUMENT);
  public destroy$ = new Subject<boolean>();
  public form: FormGroup;
  public isSubmitted = false;
  public loading = false;
  public loadingCep = false;
  public errorType = { 'emptyField': false, 'incorrectField': false };
  
  public constructor(private formBuilder: FormBuilder, private http: HttpClient, public sanitizer: DomSanitizer,
    public notification: NotificationService, public brasilapi: BrasilApiService, public router: Router) {
    this.form = this.formBuilder.group({
      nome:             ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      sobrenome:        ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      cpf:              ['', [Validators.required, Validators.minLength(11), Validators.maxLength(15)]],
      telefone:         ['', [Validators.required, Validators.minLength(11), Validators.maxLength(16)]],
      cep:              ['', [Validators.required, Validators.minLength(8), Validators.maxLength(9)]],
      estado:           ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
      cidade:           ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      bairro:           ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      rua:              ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      numeroResidencia: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      complemento:      ['', [Validators.maxLength(30)]]
    });
  }

  public ngOnInit(): void {
    this.handleChanges();
  }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  public handleChanges(): void {
    this.form.get('nome')?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe({
      next: (value) => this.form.get('nome')?.patchValue(value, { emitEvent: false })
    });

    this.form.get('sobrenome')?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe({
      next: (value) => this.form.get('sobrenome')?.patchValue(value, { emitEvent: false })
    });

    this.form.get('cpf')?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe({
      next: () => {
        const isValidValue = cpfValidation(this.formField('cpf')?.value);
        !isValidValue && this.formField('cpf')?.setErrors(() => this.errorType.incorrectField = true);
      },
      error: () => this.errorType.incorrectField = true
    });

    this.form.get('telefone')?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe({
      next: () => {
        const isValidValue = telefoneValidation(this.formField('telefone')?.value);
        !isValidValue && this.formField('telefone')?.setErrors(() => this.errorType.incorrectField = true);
      },
      error: () => this.errorType.incorrectField = true
    });
    
    this.form.get('cep')?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe({
      next: (value) => {
        this.form.get('cep')?.patchValue(value, { emitEvent: false });
        if (value.length === 8) {
          this.formField('estado')?.disable();
          this.formField('cidade')?.disable();
          this.formField('bairro')?.disable();
          this.formField('rua')?.disable();
          this.handleGetCep(value);
        }
      }
    });

    this.form.get('estado')?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe({
      next: (value) => this.form.get('estado')?.patchValue(value, { emitEvent: false })
    });

    this.form.get('cidade')?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe({
      next: (value) => this.form.get('cidade')?.patchValue(value, { emitEvent: false })
    });

    this.form.get('bairro')?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe({
      next: (value) => this.form.get('bairro')?.patchValue(value, { emitEvent: false })
    });
    
    this.form.get('rua')?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe({
      next: (value) => this.form.get('rua')?.patchValue(value, { emitEvent: false })
    });

    this.form.get('numeroResidencia')?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe({
      next: (value) => this.form.get('numeroResidencia')?.patchValue(value, { emitEvent: false })
    });
    
    this.form.get('complemento')?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe({
      next: (value) => this.form.get('complemento')?.patchValue(value, { emitEvent: false })
    });
  }

  public onSubmit(): void {
    this.loading = true;
    this.isSubmitted = true;
    this.errorType = { ...this.errorType, 'emptyField': false, 'incorrectField': false };

    if (this.form.valid) {
      const nomeCompleto: string = this.formField("nome")?.value + " " + this.formField("sobrenome")?.value;

      let formData: SignUpRequest = {
        nome: nomeCompleto,
        cpf: this.formField("cpf")?.value,
        telefone: this.formField("telefone")?.value,
        cep: this.formField("cep")?.value,
        estado: this.formField("estado")?.value,
        cidade: this.formField("cidade")?.value,
        bairro: this.formField("bairro")?.value,
        rua: this.formField("rua")?.value,
        numeroResidencia: this.formField("numeroResidencia")?.value,
        complemento: this.formField("complemento")?.value
      }

      this.handleSendDataToGoogleSheets(formData)
        .pipe(take(1), finalize(() => this.loading = false))
        .subscribe({
          next: () => this.router.navigate([this.sanitizeUrl('/')]),
          error: () => this.notification.error("Ocorreu um erro realizar seu cadastro.")
        })

    } else {
      this.notification.error("Preencha os campos corretamente.");
      this.loading = false;
      this.errorType.emptyField = true;
    }
  }

  public isInvalidField(fieldName: string): boolean {
    const field = this.formField(fieldName);

    this.errorType = { ...this.errorType, 'emptyField': false, 'incorrectField': false };

    if (field?.invalid && (field.touched || this.isSubmitted)) {
      if (field?.value.length === 0) {
        this.errorType.emptyField = true;
        return true;
      }

      this.errorType.incorrectField = true;
      return true;
    }
    return false;
  }

  public formField(fieldName: string): AbstractControl | null {
    return this.form.get(fieldName);
  }

  public handleGetCep(cep: number) {
    this.loadingCep = true;

    this.brasilapi.getCEP(cep).pipe(take(1), finalize(() => this.loadingCep = false))
      .subscribe({
        next: (value: CepResponse) => {
           this.formField('estado')?.patchValue(value.state, { emitValue: false});
           this.formField('cidade')?.patchValue(value.city, { emitValue: false});
           this.formField('bairro')?.patchValue(value.neighborhood, { emitValue: false});
           this.formField('rua')?.patchValue(value.street, { emitValue: false});
        },
        error: () => this.formField('cep')?.setErrors(() => this.errorType.incorrectField = true)
      })
  }

  public handleSendDataToGoogleSheets(data: any): Observable<any> {
    const url: string = 'https://script.google.com/macros/s/AKfycbyb7VAm9_hlrkt7qInc8gQH6lNf-7d_94YNxNNksPJ1VC0sqqgH6-_sA9PKK64sRMHv/exec';
    return this.http.post(url, JSON.stringify(data));
  }

  public sanitizeUrl(url: string): any {
    return this.sanitizer.sanitize(SecurityContext.URL, url);
  }

  public sanitizeInput(value: string | null): any {
    let sanitizedValue: any = this.sanitizer.sanitize(SecurityContext.HTML, value);
    return this.decodeEntities(sanitizedValue);
  }

  private decodeEntities(encodedString: string): string {
    let textArea = this.document.createElement('textarea');
    textArea.innerHTML = encodedString;
    return textArea.value;
  }
}