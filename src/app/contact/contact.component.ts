import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback, ContactType } from '../shared/feedback';
import { flyInOut } from '../animations/app.animation';
import { FeedbackService } from '../services/feedback.service';
import { switchMap } from 'rxjs/operators';
import { Params, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      flyInOut()
    ]
})

export class ContactComponent implements OnInit {

  @ViewChild('fform')feedbackFormDirective;
  feedbackForm:FormGroup;
  feedback: Feedback;
  fbCopy: Feedback;
  contactType = ContactType;
  errMess: string[];


//simple js object to contain all errors for form
formErrors = {
  'firstname': '',
  'lastname': '',
  'telnum': '',
  'email': ''
};

//read docs on angular.io
validationMessages = {
  'firstname': {
    'required':'First Name is required.',
    'minlength': 'First Name must be at least 2 characters long.',
    'maxlength': 'FirstName cannot be more than 25 characters long.'
 },
 'lastname': {
    'required': 'Last Name is required.',
    'minlength': 'Last Name must be at least 2 characters long. ',
    'maxlength': 'Last Name cannot be more than 25 characters long.'
 },
  'telnum': {
   'required': 'Tel. number is required.',
   'pattern': 'Tel. number must contain only numbers.'
 },
 'email': {
   'required': 'Tel. number is required.',
   'pattern': 'Tel. number must contain only numbers.'
 }
}

  constructor(private fb: FormBuilder,
              private feedbackService: FeedbackService,private route: ActivatedRoute,
              @Inject('BaseURL') private BaseURL

    ) {
    this.createForm();
   }

  ngOnInit() {
  }

  createForm(): void {
    this.feedbackForm = this.fb.group({
      firstname: ['',[ Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      lastname: ['', [Validators.required,Validators.minLength(2),Validators.maxLength(25)]],
      telnum: ['', [Validators.required,Validators.pattern] ],
      email: ['', [Validators.required, Validators.email] ],
      agree: false,
      contacttype: 'None',
      message: ''
    });


 this.feedbackForm.valueChanges.subscribe(data => this.onValueChanged(data));

 this.onValueChanged(); //reset validation messages now

 }
/**
 * @param data
 * angular.io form validation
 */
onValueChanged(data?: any){
  if (!this.feedbackForm) { return;}
  const form = this.feedbackForm;
  for (const field in this.formErrors){
   if (this.formErrors.hasOwnProperty(field)) {
	  this.formErrors[field] = '';
        const control = form.get(field);
        // clear previous error message (if any)
        if (control && control.dirty && !control.valid){
        const messages = this.validationMessages[field];
	    for(const key in control.errors){
         if(control.errors.hasOwnProperty(key)){
         this.formErrors[field] += messages[key] + ' ';
        }
       }
      }
     }
   }
}
  onSubmit() {
    this.feedback = this.feedbackForm.value;
    console.log(this.feedback);
    //create a copy
    //this.fbCopy.push(this.feedback);// no comments array to hold such string
    this.fbCopy = this.feedback;
    this.feedbackService.putFeedback(this.fbCopy).subscribe(feedback => {
      this.feedback = feedback; this.fbCopy = feedback;
      }, errmess => {this.feedback = null; this.fbCopy = null; this.errMess  = <any>errmess;});

    this.feedbackForm.reset({
     firstname: '',
     lastname: '',
     telnum: '',
     email: '',
     agree:false,
     contacttype: 'None',
     message: ''
    });
    this.feedbackFormDirective.resetForm();
  }


}
