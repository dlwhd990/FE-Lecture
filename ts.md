# TypeScript

> <br>
> TS는 JS에 새로운 기능들과 장점을 추가해주는 역할을 한다. (superset of JS)
> <br><br>
> 하지만 브라우저는 이를 실행하지 못한다 (이해 불가)
> <br><br>
> 따라서 TS는 코드를 JS로 변환해서 실행해야 한다.
> <br><br>
> 개발자에게 코드가 실행되어 런타임에서 에러가 발생하기 이전에 코드에서 에러가 발생한다는 것을 미리 확인할 수 있게 해준다.
> <br><br> <b>New Features + Extra Error Checking</b><br>
> <br>

<br>

> 실행 : npx tsc 파일명.ts

---

<br>

JS 코드가 있다. <br>

```js
const button = document.querySelector("button");
const input1 = document.getElementById("num1");
const input2 = document.getElementById("num2");

function add(num1, num2) {
  return num1 + num2;
}

button.addEventListener("click", function () {
  console.log(add(input1.value, input2.value));
});
```

여기서 이전에는 크게 신경쓰지 않았던 문제점들이 보이게 되었다. <br>

1. add function에서 num1, num2가 Number type이 아닐 경우? => 의도치 않은 동작이 발생<br>
   그렇기 때문에 Number type이 아닌 경우에는 함수 통과조차 시키지 못하게 하는 것이 확실하다.
   <br>
   <br>
2. 코드 최하단 부분의 input1.value, input2.value에서 만약 input1,2가 value라는 프로퍼티를 가지고 있지 않다면 => 에러 발생<br>
   하지만 당연히 가지고 있을 것이라고 생각하여 (그렇게 의도하고 코드 작성했으니까)따로 검사하는 과정이 없음<br>
   => 확실하게 value가 있는 경우에만 코드 실행되도록 하고싶음
   <br>
   <br>
3. 최상단의 querySelector, getElementById에서 만약 null이 return 되었다면? (즉 엘리먼트를 찾지 못했다면?)

 <br>

이러한 잠재적인 에러/의도치 않은 동작을 막기 위해 확실하게 체크가 가능한 코드를 작성하고 싶다 => TS

<br>

---

## 기초 문법

 <br>

```ts
const input1 = document.getElementById("num1")! as HTMLInputElement;
```

앞서 말했던 querySelector등이 null을 return할 경우에 대비하는 방법이다.
TS는 HTML파일을 읽지 않기 때문에 num1이라는 selector에 해당되는 엘리먼트가 반드시 있을 지 없을 지 알 수 없다.<br>
<br>
이 때 맨 뒤에 !를 붙여준다. 이것의 의미는 "해당되는 엘리먼트가 반드시 존재한다" 이다.
<br>
<br>
그리고 그 뒤의 as HTMLInputElement 부분은 typecasting이라고 부르는 syntax인데 이는 num1 selector로 찾은 엘리먼트가 반드시 HTML의 input element일 것이라고 말해주는 것이다.
<br>
<br>
이것이 중요한 점은 앞서 말했던 input1.value에서 value라는 프로퍼티가 input1에 있는 지 없는 지 알 수 없다는 점을 해결할 수 있기 때문이다. HTML input element는 value 프로퍼티가 존재하는 엘리먼트이기 때문에 이로 인한 에러가 발생하지 않도록 할 수 있다.

<br>

---

<br>

```ts
function add(num1: number, num2: number) {
  return num1 + num2;
}
```

기존의 JS 코드에서는 num1, num2 파라미터 부분에 어떠한 타입도 들어갈 수 있게 되어있다.
<br>왜냐하면 JS에서는 타입을 지정하지 않기 때문이다.<br><br>
TS에서는 위와 같이 파라미터 명 오른쪽에 <b>: number</b>와 같은 타입 지정을 해주어서 해당 타입의 파라미터만 함수를 통과할 수 있도록 한다.

<br>

---

<br>

```ts
let number1 = 5; // 5라는 값이 주어졌기 때문에 ts compiler는 이것이 number 타입임을 알 수 있음 (변할 순 있지만)

let number1: number = 5; // 사용해도 되지만 위에서 말했듯이 number 타입임을 알기 때문에 굳이 필요없음

let number1: number; // 변수 선언 시에 값을 넣어주지 않아 어떤 타입일 지 모를 때는 타입 지정 써주면 좋다.

let str = "Hi Hi"; // str은 string값으로 초기화되었기 때문에 string타입이 됨
str = 5; // Error : 이미 초기화 값 때문에 string 타입이 되었는데 number 타입의 값을 넣어서 ts compiler에서 에러 발생
```

<br>

### Type Alias

```ts
type Cominable = number | string; // union 형태의 타입을 미리 저장해놓고 여러번 사용가능
type User = { name: string; age: number }; // union 아니어도 이렇게 저장 가능

// 이렇게 타입 대신에 Combinable 넣는다.
function combine(
  input1: Combinable,
  input2: Combinable,
  resultConversion: string
) {
  // 함수 내용
}

// User을 함수의 타입 지정으로 넣는다. (user 파라미터의 프로퍼티 타입 지정을 미리 해놓고 이것을 사용)
function greet(user: User) {
  console.log("Hi, I am " + user.name);
}
```

<br>

### Function Return Type

- 파라미터의 type만큼 return값의 타입도 중요하다.

```ts
// add 함수의 return값의 타입을 number로 지정
// 아래의 경우에는 파라미터들의 타입과 연산 등을 고려하여
// number값이 return되는 것을 TS가 추론했기 때문에 빨간 밑줄이 생기지 않음

function add(num1: number, num2: number): number {
  return num1 + num2;
}

// 마찬가지로 TS의 타입 추론에 의해 함수의 return 값의 타입이 number임을 추론하였는데
// return 값의 타입을 string으로 명시해주었기 때문에 밑줄 + 컴파일 시 에러 발생

function add(num1: number, num2: number): string {
  return num1 + num2;
}
```

<br>

### Function Type

- 함수는 변수에 저장될 수 있다. 그렇기 때문에 let으로 선언된 함수가 들어있는 변수는 후에 다른 타입으로 변경될 수 있다. 이 경우에 에러가 발생하기 때문에 이에 대한 처리도 필요하다.

```ts
function add(input1: number, input2: number) {
  const result = input1 + input2;
  return result;
}

let combine = add; // combine변수는 add와 같은 함수가 됨
combine = 5; // 값이 5로 바뀜

combine(10, 8); // combine은 함수가 아닌 5의 값을 갖고있기 때문에 에러 발생

// 위와 같은 문제에 대비하기 위해 다음과 같이 작성한다.
let combine: Function = add; // combine변수에 Function타입 명시
combine = 5; // 위의 타입 명시에 의해 빨간줄

// 하지만 위의 경우에도 이런 문제는 발생할 수 있다.
function printResult(num: number) {
  console.log("Result is: " + num);
}

let combine: Function = add;
combine = printResult; // printResult도 함수이기 때문에 tsc에서 에러는 발생하지 않지만 파라미터의 개수가 맞지 않아 undefined 출력됨

// 위의 문제 해결법 => Function 타입 지정
let combine: (a: number, b: number) => number; // arrow function 형태로 타입 지정한다.
combine = printResult; // 에러 발생
```

<br>

### Callback Function Type

```ts
function addHandle(n1: number, n2: number, cb: (num: number) => void) {
  const result = n1 + n2;
  cb(result);
}

addHandle(10, 20, (result) => {
  console.log(result);
});

//위의 코드에서 콜백함수 파라미터에 타입 지정을 함으로써 얻을 수 있는 이점은
// 콜백함수 자체에 타입 지정을 안해주어도 result 파라미터가 number 타입일 것을 미리 추론하고 동작할 수 있기 때문이다.

// 위에서 파라미터 1개임을 명시하였으므로 에러 발생
addHandle(10, 20, (result, b) => {
  console.log(result);
});

// addHandle함수에서 콜백함수의 return 타입은 void라고 명시해주었다. 하지만 콜백함수는 return을 사용하여 result를 return하였다. 그런데 에러는 발생하지 않는다.

//그 이유는 콜백함수의 return 타입이 void라고 한 것은 addHandle함수가 콜백함수의 return값을 가지고 어떠한 일도 하지 않는다고 한것과 같아서 아예 신경을 쓰지 않기 때문이다.

// 그렇기 때문에 return을 하는 것 자체는 전혀 문제가 되지 않으며 그 return된 값을 addHandle함수에서 사용하도록 하면 에러가 발생하게 된다.
addHandle(10, 20, (result) => {
  console.log(result);
  return result; // 에러 발생안함
});
```

<br>

## Class

<br>

### This

```ts
class Department {
  name: string;

  constructor(n: string) {
    this.name = n;
  }

  describe() {
    console.log("Department: " + this.name);
  }
}

// object 생성
const accounting = new Department("Accounting");

accounting.describe(); // Department: Accounting

const copy = { describe: accounting.describe };

copy.describe(); // Department: undefined
```

메소드는 자신을 호출한 object가 this에 바인딩 되기 때문에 undefined가 발생한다.<br>
하지만 tsc에서는 에러가 발생하지 않았다. 이러한 에러가 뜨게 하기 위해 이렇게 할 수 있다.

```ts
describe(this:Department) {
  console.log("Department: " + this.name);
} //copy.describe에서 컴파일 에러 발생한다.
```

<br>

### Private

```ts
class Department {
  name: string;
  employee: string[] = [];

  constructor(n: string) {
    this.name = n;
  }

  describe(this: Department) {
    console.log("Department: " + this.name);
  }

  addEmployee(employee) {
    this.employee.push(employee);
  }

  printEmployeeInformation() {
    console.log(this.employees);
  }
}

// object 생성
const accounting = new Department("Accounting");

// employees에 추가
accounting.addEmployee("MAX");

// employees에 추가하는 또 다른 방법
accounting.employees[1] = "MANU"; // 외부에서 메소드 없이 조작 가능
```

위와 같이 조작하게 되면 조작법이 통일되지 않음 그래서 외부 조작을 막고싶음

```ts
class Department {
  name: string;
  private employees: string[] = []; // private keyword 추가
  ...
}
```

private 키워드를 추가해주면 해당 변수는 외부에서 조작하려하면 컴파일 에러가 발생한다.<br>
반대로 public키워드도 있지만 default이기 때문에 굳이 적지 않아도 된다.

<br>

### 약식초기화

```ts
class Department {
  private name: string;
  private id: number;

  constructor(name: string, id: number) {
    this.name = name;
    this.id = id;
  }
}
```

위의 코드는 필드를 선언하고 constructor에서 초기화를 시켜주는 과정이다.<br>
이는 약식 초기화로 코드를 짧게 만들 수 있다.

```ts
class Department {
  constructor(private name: string, private id: number) {
    // 여기에도 기존 코드 사용할 필요가 없어짐
  }
}
```

<br>

### Readonly

- 초기화 후에 값이 변경되지 않아야하는 필드에 readonly를 붙여준다.

```ts
class Department {
  private readonly id: number;
  ...
}
```

<br>

---

<br>

## Type

<br>

### 1. number

- TS에도 JS처럼 int, float등은 존재하지 않고 모두 number 타입이다.

<br>

### 2. string

- JS와 같이 모든 text가 string 타입이다.

<br>

### 3. boolean

- JS와 같이 true, false 두 가지 만이 존재한다. 하지만 큰 차이점은 TS에는 truthy, falsy가 없다는 것이다. 예를 들어 JS에서는 if문에서 0이 false로 인식된다. 하지만 TS에는 그런게 없다.

<br>

### 4. Object

- 객체 타입 => 키, 타입 쌍

```ts
const person = {
  name: "maximilian",
  age: 30,
};

// 위의 객체의 객체 타입
const person: {
  name: string; //세미 콜론
  age: number;
};

// 타입 명시
const person : {
  name: string;
  age: number;
} = {
  name: string;
  age: number;
};

```

<br>

### 5. Array

- array에는 모든 타입의 값들이 들어갈 수 있다.

```ts
let favoriteActivities: string[]; // string타입 값들이 들어가는 배열임을 명시
let favoriteActivities = "sports"; // 배열 아니므로 tsc에서 에러
let favoriteActivities = ["sports", 1]; // 1은 string이 아니므로 tsc에러

// 위와 같이 혼합된 타입의 값들이 들어가는 배열을 원한다면
let favoriteActivities = any[];

// 타입 추론
const person = {
  name: string,
  age: number,
  hobbies: ["sports","cooking"]
};

for (const hobby of person.hobbies) {
  console.log(hobby.toUpperCase()); // tsc 에러 발생하지 않음!
}
// toUpperCase는 string타입의 method이지만 hobby는 string이 아닐 수도 있음
// 그렇다면 왜 에러가 발생하지 않는가?
// person.hobbies = ["sports","cooking"] 이기 때문에 이 배열의 모든 원소는 string 타입이고
// tsc에서 이를 통해 배열의 타입이 string[]일 것이라고 추론했기 때문이다.
// 반대로 hobby.map을 사용했다면 에러가 발생한다. string의 method가 아니기 때문이다.
// Flexible!!
```

<br>

### 6. Tuple

- JS에는 튜플이 없다.

- [1,2]와 같은 형태인데 이것은 array같이 생겼는데 <b>길이가 제한된</b> array이다.
- 길이 뿐만 아니라 타입도 제한되었다.
- 타입 => 첫 번째 원소 : number 식별자, 두 번째 원소: string 식별자

```ts
// role 프로퍼티 위에 마우스 hover 하면 아래 주석과 같은 타입이 나온다 (Union)
const person = {
  role: [2, "author"], // (property) role: (string | number)[]
};

person.role.push("hi"); // 길이가 제한되었으니 이것은 실행되면 안됨
person.role[1] = 10; // 두 번째 원소는 string 타입이어야 하기 때문에 실행되면 안됨

//하지만 이 둘은 모두 실행 된다. 실행을 막으려면 아래와 같이 한다.
const person: {
  role: [number, string]; // 첫 원소 number타입, 두 번째 원소 string타입으로 명시
} = {
  role: [2, "author"],
};

// 원소 변경은 타입이 맞지 않아 에러가 발생했지만 push는 막지 못함 (원래 못막는다함)
person.role.push("hi"); // 정상적으로 실행됨
person.role[1] = 10; // tsc 에러

person.role = [1, "hi"]; // 정상 작동
person.role = [1]; // 타입 명시에서 원소 두개를 명시했으므로 에러 발생
person.role = [1, "hi", "hihi"]; // 타입 명시에서 원소 두개를 명시했으므로 에러 발생
```

 <br>

### 7. Enum

- JS에는 없다.
- Label 붙여주는 것이라고 생각 (인간이 읽을 수 있는 식별자 )

사용 이유

1. 관리자 = 0, 읽기 전용 사용자 = 1, 수정 권한 사용자 = 2 라고 권한 구분을 했을 때, 만약 시간이 오래 지났다면 어떤 권한이 몇번인지 기억하기 힘듬

2. 이것을 string 타입의 이름을 붙여서 진행한다고 해도 if (person.role === "READ_ONLY") 이런 식으로 if문을 통해 string의 값을 직접 비교해야 할텐데 이 경우에 READ_ONLY였는지 READONLY였는지 등 헷갈릴 수 있음
   <br><br>

위의 두 가지 경우에 완벽하게 대응할 수 있는 타입이 enum이다.
1번의 경우 label로 관리되기 때문에 이름만 보고 몇 번이 어떤 권한의 사용자인지 바로 알 수 있다.
<br><br>
2번의 경우에는 실제 값은 default로 첫 원소부터 0,1,2, ...의 number가 순차적으로 붙은 값이 되기 때문에 label만 보고 번호로 비교를 할 수 있게 된다. 또는 enum의 원소에 마우스 hover하면 몇 번인지 알려주기도 한다.

```ts
enum Role {
  ADMIN,
  READ_ONLY,
  AUTHOR,
} // 첫 원소부터 차례로 0, 1, 2값이 부여됨

// 원소의 값을 명시해줄 수도 있다.

// 첫 번째 원소의 값을 5로 넣어주었다. 이 경우 차례대로 5, 6, 7이 된다.
enum Role {
  ADMIN = 5,
  READ_ONLY,
  AUTHOR,
}

// 여러개의 원소의 값을 명시해줄 수도 있다.
enum Role {
  ADMIN = 5,
  READ_ONLY = 100,
  AUTHOR = 20,
}

// 값은 숫자가 아니어도 된다. (혼합 가능)
enum Role {
  ADMIN = "admin",
  READ_ONLY = 33,
  AUTHOR = "author",
}
```

<br>

### 8. Any

- 가장 유연한 타입 (flexible), 하지만 그렇기에 TS의 장점을 살리지 못함

- TS에게 어떤 것도 이해시키지 않는다. (모든 종류의 값이 가능하기 때문에 이해할 필요가 없다)

- 모든 타입이 가능하도록 하는 것이기 때문에 의도한 타입이 아님에 따른 에러 발생이 되지 않아 vanilla JS와 다를 것이 없음 (TS 쓰는 이유 없어짐)

- run-time check시에 사용한다. (즉 테스트용) 그 외에는 사용하지 않는 것이 좋다.

```ts
// 아래의 코드는 에러를 발생시키지 않는다.
let inputValue: any;
let inputString: string;

inputValue = 5;
inputString = inputValue;
```

any 타입의 변수 값을 string타입의 변수에 넣는데도 에러가 발생하지 않는다. 그 이유는 any 타입을 사용하는 것은 TS에게 모든 type checking을 하지 않게 만든다. 이는 TS에게 모든 것을 포기하게 만드는 것과 같다.

<br>

### 9. Union

```ts
function combine(input1: number, input2: number) {
  const result = input1 + input2;
  return result;
}

const combinedAges = combine(30, 26); // 정상 작동
const combinedNames = combine("Max", "Anna"); //tsc 에러 발생

//combine함수에서는 number, string 두 타입 모두의 + 연산을 한 결과를 return 하고 싶음
// 그렇기 때문에 두 가지 타입의 명시가 필요함 => union 사용

// Union으로 해결
function combine(input1: number | string, input2: number | string) {
  const result = input1 + input2;
  return result;
}

const combinedAges = combine(30, 26); // 정상 작동
const combinedNames = combine("Max", "Anna"); //정상 작동
```

위의 코드는 에러가 발생하지 않지만 IDE상에서 const result = input1 + input2 부분에 빨간 밑줄이 발생한다.<br><br>
이를 마우스 hover하여 읽어보면 number | string 타입은 + 연산을 할 수 없다고 나온다. 이는 틀린 말이다.
<br>
<br>
이런 현상이 발생하는 이유는 TS는 union 타입을 union 타입 그 자체로만 이해할 수 있고 그 내부에 어떤 타입들이 들어있는지는 알 수 없기 때문이다.<br><br>
여러 타입이 들어갔을테니 + 연산자를 사용할 수 없는 타입이 있을지도 모른다는 뜻으로 이해하면 된다.
<br><br>
그런데 실제로 + 연산자를 사용할 수 없는 타입이 들어갈 수도 있는 등의 타입에 따른 문제가 발생할 수 있기 때문에 이를 처리하는 코드가 필요한 경우가 종종 있다.

```ts
// 위의 코드와 같은 내용이지만 파라미터들의 타입을 union으로 두 가지 타입을 주었기 때문에 각각의 타입인 경우의 처리 방법을 코드로 추가 작성한 것이다.

function combine(input1: number | string, input2: number | string) {
  let result;
  if (typeof input1 === "number" && typeof input2 === "number") {
    result = input1 + input2;
  } else {
    result = input1.toString() + input2.toString();
  }
  return result;
}
```

<br>

### 10. Literal

- 변수나 매개변수가 아니고 숫자, 문자열도 아니다. 정확한 값을 가지는 타입이다.

```ts
// 마우스 hover하여 타입 보면 <const num: 2.8> 나옴
// 원래는 2.8 자리에 타입이 들어가있어야 하는데 특정 값이 들어있는 것임
// 2.8은 분명한 number타입인데 타입 대신 2.8이 들어가있는 이유는 "불변한 값" 이기 때문이다.

const num = 2.8;
```

<br>

### 11. Void

- 함수에 return 연산자가 없을 때 함수의 return값의 타입은 void가 됨

- 함수의 return 값의 타입을 void로 지정하였을 때, undefined가 return되면 에러가 발생한다. (void !== undefined)

- 또한 함수의 return값의 타입을 undefined로 지정하고 return 연산자가 없다면 에러가 발생한다.

- 그러나 return 값의 타입이 void (즉 return 없을 때)일 때 실제 return값을 출력해보면 undefined나옴

<br>

### 12. Undefined

- TS에서는 undefined가 타입임

- 타입이지만 값 자체도 undefined만을 가짐 (불변,고정)

<br>

### 13. Unknown

- any와는 다르다.

- 아직은 사용자가 마지막에 어떤 타입을 입력할 지 모르는 상태에서 사용한다.

```ts
// Case 1 : Any
let userInput: any;
let userName: string;
userInput = 5;
userName = userInput; // any는 type checking을 포기하도록 만들기 때문에 userInput의 타입이 string임이 보장되지 않았음에도 에러가 발생하지 않음

// Case 2 : Unknown
let userInput: unknown;
let userName: string;
userInput = 5;
userInput = "MAX";
userName = userInput; // 에러 발생

//userInput의 값이 5여도 MAX여도 둘 다 에러 발생한다. 그 이유는 unknown 타입의 변수이기 때문에 이것이 string타입임이 보장되지 않기 때문이다.

// 사용 예
let userInput: unknown;
let userName: string;
userInput = 5;
userInput = "MAX";
if (typeof userInput === "string") {
  userName = userInput; // 에러 발생하지 않음 (TS는 이 if문을 통해 이것이 문제를 일으키지 않을 것임을 추론함)
}

// unknown은 위와같이 일단 어떤 값이 들어갈 지 모르기 떄문에 unknown으로 타입을 지정해놓고 위의 if문과 같은 조건을 통과했을 때 사용가능하도록 할 수 있다. 이는 any와는 분명히 다르다고 할 수 있다.
//(unknown은 타입 체크를 포기하도록 만들지 않기 때문)
```

<br>

### 14. Never

- 함수의 return 타입 지정에 사용한다.

- 함수가 절대로 어떤 값도 return하지 않는다고 하고 싶을 때 사용한다. (make it clear that this function never returns anything)

- code quality 관점에서 봤을 때, 어떠한 값도 return하지 않는다는 의도를 명확하게 보여줄 수 있기 때문에 좋다. (다른 사람이 읽을 때 의도파악 가능)

<br>

---
