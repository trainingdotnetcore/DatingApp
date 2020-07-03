import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Input() valuesFromHome: any;
  @Output() cancelRegister = new EventEmitter();
  model: any = {};
  constructor(private authService: AuthService) { }

  ngOnInit(): any {
  }

  register(): any {
     this.authService.register(this.model).subscribe(response => {
    console.log('register success');
    }, error => {
      console.log('error');
    });
    //console.log(this.model);
  }

  cancel(): any {
    this.cancelRegister.emit(false);
    console.log('cancelled');
  }
}
