import { Component, OnInit, Input , ViewChild, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DishService } from '../services/dish.service';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comment} from '../shared/comment';
import { trigger, state, style, animate, transition } from '@angular/animations';





// Task 2.1 Add Dish data Object to file
@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  animations: [
    trigger('visibility', [
        state('shown', style({
            transform: 'scale(1.0)',
            opacity: 1
        })),
        state('hidden', style({
            transform: 'scale(0.5)',
            opacity: 0
        })),
        transition('* => *', animate('0.5s ease-in-out'))
    ])
  ]

})

export class DishdetailComponent implements OnInit {

  errMess: string[];
  dish: Dish;
  dishIds: string[];
  prev: string;
  next: string;
  @ViewChild('fform')userpostFormDirective;
  comment: Comment;
  commentForm: FormGroup;
  dishcopy: Dish;
  visibility = 'shown';



  //userpostForm:FormGroup;
  //userpost: Userpost;


  //simple js obejct to contain all errors for form
  formErrors = {
  'author': '',
  'comment': ''
};
//TODO: ValidationMessage object
validationMessages = {
  'author': {
    'required':' Author name is required.',
    'minlength': 'Authors must be at least 2 characters long.'
  },
 'comment': {
   'required': 'Your comment is required.'

  }
}

  constructor(private dishService: DishService,
                private route: ActivatedRoute,
                private location: Location,
                private fb: FormBuilder,
                @Inject('BaseURL') private BaseURL) { }

                ngOnInit() {
	this.createForm();

//    let id = this.route.snapshot.params['id'];
    //this.dish = this.dishService.getDish(id);

    //handle with the promise
    // this.dishService.getDish(id).subscribe(
    // dish => this.dish = dish);

  this.dishService.getDishIds().subscribe(dishIds => this.dishIds = dishIds);

  this.route.params.pipe(switchMap((params: Params) => {this.visibility = 'hidden';return this.dishService.getDish(params['id']);})).subscribe(dish => {this.dish = dish; this.dishcopy = dish; this.setPrevNext(dish.id); this.visibility = 'shown'; }, errmess => this.errMess = <any>errmess);

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
       this.commentForm = this.fb.group({
      author: ['',[ Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      rating: [''],
      comment: ['', [Validators.required,Validators.minLength(2),Validators.maxLength(25)]],
      date: ['']
    });

 this.commentForm.valueChanges.subscribe(data => this.onValueChanged(data));
 this.onValueChanged(); //reset validation messages now
}

/**
 *
 * @param data
 * angular.io form validation
 */
onValueChanged(data?: any){
  if (!this.commentForm) { return;}
  const form = this.commentForm;
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
  this.comment = this.commentForm.value;
  this.comment.date = new Date().toISOString();
  console.log(this.comment);
  this.dishcopy.comments.push(this.comment);
  console.log(this.dishcopy.comments);
  this.dishService.putDish(this.dishcopy).subscribe(dish => {
	this.dish = dish;this.dishcopy = dish;
	}, errmess => {this.dish = null; this.dishcopy = null; this.errMess  = <any>errmess;});

  this.commentForm.reset({
   author: '',
   rating:'',
   comment: '',
   date: ''
  });
  }

}
