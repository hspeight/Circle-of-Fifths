
let myObject3 = {
  firstName: "Michael",
  age: 20,
  aboutMe: function(){
    setTimeout(function(){
      console.log(this.firstName + " is " + this.age + " years old")
    },5000)
  }
}
myObject3.aboutMe();
