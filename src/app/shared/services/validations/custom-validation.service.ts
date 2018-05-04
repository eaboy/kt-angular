import { FormControl, Validators } from '@angular/forms';

// setup simple regex for white listed characters
const validCharacters = /^(ftp|http|https):\/\/[^ "]+$/;

// create your class that extends the angular validator class
export class CustomValidators extends Validators {
  
  // create a static method for your validation
  static validateUrl(control: FormControl) {

    if (control.value && control.value.length > 0) {
      
      const matches = control.value.match(validCharacters);
      return matches && matches.length ? { invalid_characters: matches } : null;
    } else {
      return null;
    }

  }
}