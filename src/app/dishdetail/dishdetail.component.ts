import { Component, OnInit, Input , ViewChild } from '@angular/core';
import { Dish } from '../shared/dish';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DishService } from '../services/dish.service';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


import { Feedback, ContactType } from '../shared/feedback';
import { Userpost } from '../shared/userpost';





// Task 2.1 Add Dish data Object to file
@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})

export class DishdetailComponent implements OnInit {

  dish: Dish;
  dishIds: string[];
  prev: string;
  next: string;

  @ViewChild('fform')userpostFormDirective;
  userpostForm:FormGroup;
  userpost: Feedback;

  //simple js obejct to contain all errors for form
  formErrors = {
  'name': '',
  'rating': '',
  'message': '',
  'date': ''
};
//TODO: ValidationMessage object
validationMessages = {
  'name': {
    'required':'First Name is required.',
    'minlength': 'First Name must be at least 2 characters long.',
    'maxlength': 'FirstName cannot be more than 25 characters long.'
 },
 'rating': {
    'required': 'rating is required.',
    'minlength': 'Last Name must be at least 2 characters long. ',
    'maxlength': 'Last Name cannot be more than 25 characters long.'
 },

 'message': {
   'required': 'Your feed back is required.',
 }
}

  constructor(private dishService: DishService,
                private route: ActivatedRoute,
                private location: Location,
                private fb: FormBuilder
                ) {
                  this.createForm();
                 }
  ngOnInit() {

    let id = this.route.snapshot.params['id'];
    //this.dish = this.dishService.getDish(id);

    //handle with the promise
    this.dishService.getDish(id).subscribe(
    dish => this.dish = dish);

	this.dishService.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
	this.route.params.pipe(switchMap((params: Params) => this.dishService.getDish(params['id']))).subscribe(dish => {this.dish = dish; this.setPrevNext(dish.id); });
}



setPrevNext(dishId: string) {
	const index = this.dishIds.indexOf(dishId);
	this.prev = this.dishIds[(this.dishIds.length + index - 1 ) % this.dishIds.length];
	this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];

}

    goBack(): void {
        this.location.back()
    }

    //share function
    share(): void {
      // do something
      console.log('share function called');
    }

    createForm(): void {
      this.userpostForm = this.fb.group({
        //fields need to closely mirror userpost.ts class

        name: '',
        rating: '',
        message: '',
        date: ''



      });


 this.userpostForm.valueChanges.subscribe(data => this.onValueChanged(data));

 this.onValueChanged(); //reset validation messages now


}

/**
 *
 * @param data
 * angular.io form validation
 */
onValueChanged(data?: any){
  if (!this.userpostForm) { return;}
  const form = this.userpostForm;
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
  this.userpost = this.userpostForm.value;
  console.log(this.userpost);
  this.userpostForm.reset({
   name: '',
   rating:'',
   message: '',
   date: ''

  });
  //this.userpostFormDirective.resetForm();
}



}
