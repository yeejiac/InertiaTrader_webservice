console.log('Client-side code running');

const button = document.getElementById('myButton1');

button.addEventListener('click', function(e) {
  console.log('button was clicked');
	  //do something...
    e.preventDefault()
});

