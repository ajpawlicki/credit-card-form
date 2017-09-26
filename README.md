# Credit-card-form
A credit card form.<br>

## Comments

### Technologies
* JQuery
* Bootstrap

### Timeline
In order to best approach the problem, I spent the first 30 minutes outlining some basic user stories:
* As a user, I would want to see a specific error message if there was a problem with one of my inputs.
* As a user, I want to see a clean, user-friendly interface.
* As a user, I do not want to be able to type letters where only numbers would be valid.
* As a user, I would want to use a dropdown menu to select the expiration date, so I don't have to type anything extra.
* As a user, I would want some sort of indication from the interface that I am typing a correct (or incorrect) number.

I briefly did some due diligence on Amazon's credit card form, and Amazon's design seemed very much in line with the user stories I came up with. Then, I started building the form using an iterative approach. I started with the basics and added features as I got further along. I spent roughly 4 hours working on the actual building.

### Features
I built out most of the features I brainstormed. Most importantly, I wanted to make it clear to the user when there was an error on submitting and give specific information about the error. I think minimizing the user's confusion is key when working on the client-side, so it's important to have loud, informative error messages. 

Also, it's critical to prevent user mistakes by restricting these mistakes in the first place. It doesn't make sense for a user to be able to type letters in the credit card input field. Also, I limited the number of characters a user could input in the cc and cvv fields.

Lastly, I built a few indicators to help improve UI. The CC icons fade out if the number being typed is not applicable. E.g. if a user starts typing "34" then the Visa logo will become transparent so the user knows they are typing in an AmEx number. Also, I used bootstrap's "has-error" and "has-success" classes to indicate to users when they have typed in a valid cc or cvv number.

### Form submission
First, I would ensure all these fields are valid before I sent them over to the server. Then, I would store all the input fields in an object in appropriate key value pairs and send them to the server in an http post request. For any validation errors in the response, I would make sure to let the user know the type of error and if it's necessary for them to resubmit their credit card information. I would also append some sort of error message to the html in the error callback. If the post request is successful, I would append a success message to the html in the success callback.

### Testing
I would test that specific features are working for both Visa and AmEx numbers:
* On a key press in the cc and cvv fields, prevent default is called when typing in letters.
* Necessary keys such as "delete" and "tab" are functional in the input fields.
* When typing "34" or "37" into the credit card field, the "transparent" class is added to the Visa logo.
* While typing an invalid cc number, the "has-error" class is added to the input field and it will highlight red.
* When finished typing a valid cc number, the "has-error" class is removed and the "has-success" class is added to the input field. It will highlight green.
* If submitting with an empty field, then the error message visibility attribute is toggled to visible and an error-specific span is added to the message.
* On submitting, an error message will become visible if the expiration date is the current month of this year or before.

### Styling
Some considerations I took into account were that the UI looks clean and easy to use. I used bootstrap's native containers, rows, and cols to ensure that everything was even and mapped out in a pleasant appearance. Also, when resizing the page, nothing funny happens to the UI. I made sure the fields are all visible on one page, but if the page is resized, I can scroll up and down to view inputs. Lastly, I made sure that the error message is clearly visible at the top of the page on an incorrect submit.

### Things to improve
* More specific details on error messages
* Make max length dynamic for AmEx and Visa
* Spaces between numbers for AmEx and Visa (e.g. 4 by 4 for Visa, 4-6-5 for AmEx)