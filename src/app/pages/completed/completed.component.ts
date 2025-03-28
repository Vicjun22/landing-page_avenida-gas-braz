import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-completed',
  imports: [RouterModule],
  templateUrl: './completed.component.html',
  styleUrl: './completed.component.scss'
})
export class CompletedComponent implements OnInit, OnDestroy {

  private timeoutId: any;

  public constructor(public router: Router) { }

  public ngOnInit():void {
    this.timeoutId = setTimeout(() => this.router.navigate(['/']), 3000);
  }

  public ngOnDestroy(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }
}
