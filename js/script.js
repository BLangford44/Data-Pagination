let list = data;
const header = document.querySelector('.header');
const studentHeadline = document.querySelector('.header h2'); // 'Student' text in header
const studentUL = document.querySelector(".student-list");

/*
Function:

Create a search bar
*/

function displaySearchBar() {

   const label = document.createElement('label');
   label.htmlFor = 'search';
   label.className = 'student-search';

   const span = document.createElement('span');
   span.textContent = "Search by name";

   const input = document.createElement('input');
   input.id = 'search';
   input.placeholder = 'Search by name...';

   // Create Search Button
   const button = document.createElement('button');
   button.type = 'button';
   const img = document.createElement('img');
   img.src = 'img/icn-search.svg';
   img.alt = 'Search icon';
   button.appendChild(img);

   // Inseart HTML for search bar
   label.append(span, input, button);
   header.appendChild(label);
}

// Call search bar function
displaySearchBar();

/*
Click Event:

Search Feature
*/

const searchBarParent = document.querySelector('.student-search');

searchBarParent.addEventListener('click', (e) => {

   if (e.target.tagName === 'IMG' ||
      e.target.tagName === 'BUTTON') {

      const searchTerm = document.querySelector('#search').value; // Get value from search bar
      const regexObject = new RegExp(`${searchTerm}`, 'i'); // Create regex to 'test' first/last names
      let resultsArr = []; // Empty array to store Regex Matches

      // Search array for First/Last Name Matches
      for (let f = 0; f < data.length; f++) {

         let student = data[f];
         let studentFirst = student.name.first;
         let studentLast = student.name.last;

         if (regexObject.test(studentFirst) ||
            regexObject.test(studentLast)) {

            // Add to results array
            resultsArr.push(student);

         }; // End If Statement
      }; // End for loop

      list = resultsArr; // Overwrite 'list' variable w/ resultsArray

      // Call Functions | Create Student Cards and Pagination
      showPage(resultsArr, page = 1);
      addPagination(resultsArr);
   };  // End Button Test If Statement
});

/*
Click Event:

- Reset list to Data by clicking "Student" h2
- Clear search input field
*/

studentHeadline.addEventListener('click', () => {
   list = data;

   // Call Functions | Create Student Cards and Pagination
   showPage(list, page = 1);
   addPagination(list);
});

/* Function:

- This function will create the indiviual student list items for the loop contained in the showPage function

@param {object} - Individual student data object
*/
function createStudentCards(studentData) {

   // Create List Item Element
   const li = document.createElement('li');
   li.className = "student-item cf";

   // Create Student Detail Div
   const studentDetailsDiv = document.createElement('div');
   studentDetailsDiv.className = "student-details";

   const img = document.createElement('img');
   img.className = "avatar";
   img.src = studentData.picture.large;
   img.alt = "Profile Picture";

   const h3 = document.createElement('h3');
   h3.textContent = `${studentData.name.first} ${studentData.name.last}`;

   const span = document.createElement('span');
   span.className = "email";
   span.textContent = studentData.email;

   studentDetailsDiv.append(img, h3, span);

   // Create Join Date Information Div
   const joinedDetailsDiv = document.createElement('div');
   joinedDetailsDiv.className = "joined-details";

   const dateJoined = document.createElement('span');
   dateJoined.className = "date";
   dateJoined.textContent = `Joined ${studentData.registered.date}`;

   joinedDetailsDiv.appendChild(dateJoined);

   // Format List Item
   li.append(studentDetailsDiv, joinedDetailsDiv);

   // Append List Item to UL
   studentUL.appendChild(li);
}

/*
Create the `showPage` function
- This function will create and insert/append the elements needed to display a "page" of nine students

@param {array} - Array of objects contained in data.js
@param {number} - The page number of the results the user wants to display
*/

function showPage(list, page) {

   const endIndex = (page * 9);
   const startIndex = endIndex - 9;

   // Clear old student list items
   studentUL.innerHTML = '';

   // Clear No Results Page if appropriate
   const noResultsMessage = document.querySelector('.no-results');
   if (noResultsMessage !== null) { noResultsMessage.remove() };

   if (list.length > 0) { // Run if there are students to display

      for (let i = 0; i < list.length; i++) { // Loop through students to display

         if (i >= startIndex && i < endIndex) { // Make sure the students are in the appropriate range to display

            let studentData = list[i];
            createStudentCards(studentData); // Create student list items
         } // End if statement
      }; // End for loop
   } else { // Run if there are no items in 'list' = 'No results'
      // Display "No results"
      header.insertAdjacentHTML('afterend', '<h2 class="no-results">No results</h2>');
   };
}

/*
Click Event:

- Change 'active' pagination button.
- Change page output based on page button clicked.
*/
const linkList = document.querySelector('.link-list');
linkList.addEventListener('click', (e) => {

   const buttonClicked = e.target;
   const value = buttonClicked.textContent;

   if (buttonClicked.tagName === 'BUTTON') {

      // Remove Active Class from Previous Button
      document.querySelector('.active').classList.remove('active'); // Remove 'active' class from previously active button


      const page = parseInt(value); // Convert string value of button to a number to be passed to the showPage function
      buttonClicked.className = 'active'; // Change selected button class to 'active'

      showPage(list, page); //Display appropriate students page
   }
});


/*
Function:

- This function will create and insert/append the elements needed for the pagination buttons

@param {array} - array of student objects}
*/

function addPagination(list) {

   const pageNumbers = Math.ceil(list.length / 9); // Calculate pages based on length of list
   linkList.innerHTML = ''; // Clear previous pagination display

   if (pageNumbers > 0) { // Only run if there is at least one page to display
      for (let i = 1; i <= pageNumbers; i++) {
         const li = document.createElement('li');

         // Build Pagination Buttons
         const button = document.createElement('button');
         button.type = 'button';
         button.textContent = `${i}`;

         // Build HTML
         li.appendChild(button);
         linkList.appendChild(li);
      }; // End For Loop

      // give the first pagination button a class of "active"
      linkList.firstElementChild.firstElementChild.classList.add('active');
   }; // End if statement
};

// Call FUnctions | Load initial display
showPage(list, page = 1);
addPagination(list);