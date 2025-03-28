import { HttpClient } from "@angular/common/http";
import { Injectable, SecurityContext } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class BrasilApiService {

    private readonly API: string = 'https://brasilapi.com.br/api';

    constructor(public httpClient: HttpClient, public sanitizer: DomSanitizer) { }

    public getCEP(cep: number): Observable<any> {
        const url: string = `${this.API}/cep/v2/${cep}`;
        return this.httpClient.get<any>(this.sanitizeUrl(url), {});
    }

    public sanitizeUrl(url: string): any {
        return this.sanitizer.sanitize(SecurityContext.URL, url);
    }

}