$(document).ready(function(){
  $("#header").load("header.html");
  $("#docs").load("document.html");
});

if(sessionStorage.getItem('key')){
  document.location.href = '/developer';
}
