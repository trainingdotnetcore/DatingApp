import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Input() valuesFromHome: any;
  @Output() cancelRegister = new EventEmitter();
  model: any = {};
  constructor(private authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit(): any {
  }

  register(): any {
     this.authService.register(this.model).subscribe(response => {
    this.alertify.success('register success');
    }, error => {
      this.alertify.error(error);
    });
    // console.log(this.model);
  }

  cancel(): any {
    this.cancelRegister.emit(false);
    this.alertify.warning('cancelled');
  }
}
