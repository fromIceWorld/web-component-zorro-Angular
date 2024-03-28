import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, Injector, OnInit } from '@angular/core';

@Component({
  selector: 'app-angular',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  injector;
  constructor(
    private cd: ChangeDetectorRef,
    private parentInjector: Injector,
    private http: HttpClient
  ) {
    this.injector = Injector.create({
      providers: [
        { provide: 'http', useValue: this.http, deps: [] },
        { provide: 'cd', useValue: this.cd, deps: [] },
        { provide: HttpClient, useValue: this.http, deps: [] },
      ],
      parent: this.parentInjector,
    });
    //@ts-ignore
    window.injector = this.injector;
  }
  ngOnInit(): void {}
}
