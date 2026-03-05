//console.log("Hello,World!");
//console.log("This is a test JavaScript file.");

/*
console.log("Logging some information to the console.")
console.log("Another log entry.")
*/
// String ,Number <Boolean,Object,Array

//String
let fname ="John"; //String
console.log("Name:",fname);
const PI =3.14;//Number
//Number
let age =30; //Number
let hight = 5.9; //Number

fname ="Bob"
console.log("Name:",fname);

fname ="Alice"
console.log("Name:",fname);
console.log("Age:",age);
console.log("Height:",height)



/**
 + =บวก
 - = ลบ
 * = คูณ
 / = หาร
 % = หารเอาเศษ
 */

 /**
  == เท่ากับ
  != ไม่เท่ากับ
  > มากกว่า
  < น้อยกว่า
  >= มากกว่าหรือเท่ากับ
  <= น้อยกว่าหรือเท่ากับ
  */
/**
 Grade
 >=80 เป็น A
 >=70 เป็น B
 >=60 เป็น C
 >=50 เป็น D
 <50 เป็น F
 */
 let score = 75;

 //if - else condition
if(A >=80){ //false
    console.log("Grade is A")
} else if(B >=70){ //true
    console.log("Grade is B")    
} else if(C >=60){
    console.log("Grade C")
} else if(D >=50){
    console.log("Grade D")
} else{
    console.log("Grade F")
}
 let number1 = 10;
  let number2 = 20;
  let condition = number1 <= number2 //Boolean ค่าความจริง true หรือ false
  console.log("condition",condition);

// if - else condition
  if (number1 > number2) {
    console.log("number1 is greater than or equal to number2");
  }else if (number1 == number2){
    console.log('this is else if');
  } else{
       console.log('this is else');
   }


   /**
    *  && และ
    *  || หรือ
    *  ! not หรือ ไม่
    *  
    */

let number1 = 20

if (number1 % 2 ==0){
    console.log("Even")
}
else {
    console.log("Odd")
}


   let number1 = 5
   let number2 = 10

   let condition = (number >0) && (number2 >0) // true && true = true
   console.log("condition1: ",condition1)

   let age = 25
   let gender = "female"
   if(age >=18 && gender =="female"){
    console.log("gender:",gender)
   }
/**
while 
for
 */

let counter =0;
while(counter <= 5){ //true
    //counter = conter +1;
    counter = counter +1;
    console.log("while",counter)
}

for (let i = 0;i<=4;i++){
    console.log("for:",i)
}