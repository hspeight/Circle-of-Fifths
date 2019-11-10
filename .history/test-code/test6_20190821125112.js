
function varDeclaration(){
    let a =10;
    console.log(a);  // output 10
    if(true){
        let a=20;
        console.log(a); // output 20
    }
    console.log(a);  // output 10
}

varDeclaration();