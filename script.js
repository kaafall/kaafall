setTimeout(function(){

document.getElementById("splash").style.display="none";
document.getElementById("main-content").style.display="block";

},2500);

// -------------------------------------------------------------------------------------
// contact us page form submission

document.getElementById("contactForm").addEventListener("submit",function(e){

e.preventDefault();

alert("Message Sent Successfully!");

});

// -------------------------------------------------------------------------------------