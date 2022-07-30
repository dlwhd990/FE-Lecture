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

```js
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

```js
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

```js
let number1 = 5; // 5라는 값이 주어졌기 때문에 ts compiler는 이것이 number 타입임을 알 수 있음 (변할 순 있지만)

let number1: number = 5; // 사용해도 되지만 위에서 말했듯이 number 타입임을 알기 때문에 굳이 필요없음

let number1: number; // 변수 선언 시에 값을 넣어주지 않아 어떤 타입일 지 모를 때는 타입 지정 써주면 좋다.

let str = "Hi Hi"; // str은 string값으로 초기화되었기 때문에 string타입이 됨
str = 5; // Error : 이미 초기화 값 때문에 string 타입이 되었는데 number 타입의 값을 넣어서 ts compiler에서 에러 발생
```

<br>

### Type Alias

```js
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

```js
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

```js
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

```js
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

```js
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

```js
describe(this:Department) {
  console.log("Department: " + this.name);
} //copy.describe에서 컴파일 에러 발생한다.
```

<br>

### Private

```js
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

```js
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

```js
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

```js
class Department {
  constructor(private name: string, private id: number) {
    // 여기에도 기존 코드 사용할 필요가 없어짐
  }
}
```

<br>

### Readonly

- 초기화 후에 값이 변경되지 않아야하는 필드에 readonly를 붙여준다.

```js
class Department {
  private readonly id: number;
  ...
}
```

<br>

### Inheritance

- 클래스는 다른 클래스를 상속할 수 있다.
- 상속이라 함은 상속 해주는 클래스의 모든 내용을 상속 받은 클래스가 사용 가능하도록 하는 것이다.

```js
// 상속해줄 클래스
class Department {
  protected name: string; // private사용하면 자식 클래스에서도 사용을 하지 못한다. 따라서 protected 사용한다.
  protected id: number; // protected는 private와 같은 역할을 하지만 자식 클래스는 사용가능하게 해준다.

  constructor(name: string, id: number) {
    this.name = name;
    this.id = id;
  }

  print() {
    console.log(this.name, this.id);
  }
}

const accounting = new Department("이종혁", 990);
accounting.print(); // 이종혁 990

// 상속 받을 클래스
class ITDepartment extends Department {
  private part: string; // 부모 클래스에서 part라는 프로퍼티를 하나 추가

  constructor(name: string, id: number, part: string) {
    super(name, id); // 부모 클래스의 프로퍼티를 그대로 사용, super에 arguments 넣어서 초기화
    this.part = part; // 새로 추가된 프로퍼티는 초기화를 해줌
  }

  itPrint() {
    console.log(this.name, this.id, this.part); // 만약 부모 class의 name, id가 private이라면 컴파일에러 발생
  }
}

const newAccounting = new ITDepartment("이종", 9990, "프론트엔드");
newAccounting.itPrint(); // 이종 9990 프론트엔드
```

<br>

### Getter & Setter

- Getter => 메소드 앞에 get붙여야 하며 반드시 무언가를 return해야 한다.

```js
class Test {
  private lastReport: string;
  constructor(report: string) {
    this.lastReport = report;
  }
  get mostRecentReport() {
    if (this.lastReport) {
      return this.lastReport;
    }
    throw new Error("No Report found");
  }
}

const test = new Test("신고 들어왔습니다.");

console.log(test.mostRecentReport); // 신고 들어왔습니다.
```

위의 코드에서 mostRecentReport Getter가 하는 일은 결국 lastReport필드가 존재할 때 이것을 return하고 없으면 error를 throw하는 것이다.

일반적인 메소드 사용하는 것과는 달리 괄호를 붙이지 않아도 된다. return이 반드시 있어야하는 이유는 이것 때문이다 (test.mostRecentReport 자체가 getter의 return값 또는 throw new Error 이 되는 것)

<br>

- Setter는 arguments로 넘길 값이 필요하다.

```js
class Test {
  private lastReport: string;

  constructor(report: string) {
    this.lastReport = report;
  }

  addReport(report: string) {
    this.lastReport = report;
  }

  get mostRecentReport() {
    if (this.lastReport) {
      return this.lastReport;
    }
    throw new Error("No Report found");
  }

  set mostRecentReport(value: string) {
    if (!value) {
      throw new Error("Value not found");
    }
    this.addReport(value);
  }
}

const test = new Test("신고 들어왔습니다.");
test.mostRecentReport = "새로운 신고입니다."; //메소드와 달리 괄호 필요없이 =으로 값 넘김 (setter)
console.log(test.mostRecentReport); // 새로운 신고입니다 (getter)
```

<br>

### Static property & methods

- 예를들어 Math 클래스가 있다.
- Math.PI 는 파이 값이 있고 Math.pow는 제곱을 계산해준다.

```js
class Department {
  static fiscalYear = 2020;

  static createEmployee(name: string) {
    return { name: name };
  }
}
```

위와같이 메소드나 프로퍼티의 앞에 static을 붙여주면 static으로 사용할 수 있다. 이것의 특징은 new 키워드를 사용해서 새로운 인스턴스를 생성하지 않아도 Department.fiscalYear, Department.createEmployee(name) 처럼 클래스에서 바로 사용할 수 있다.

그리고 또 다른 특징은 이를 this로 사용할 수 없다는 것이다. 그렇기 때문에 만약 Department 클래스에서 fiscalYear 프로퍼티를 사용하고 싶다면 this가 아닌 Department.fiscalYear로 사용해야한다.

Class를 grouping mechanism으로 사용할 수 있다. (마치 Math와 같이)

<br>

### Abstract

```js
// 추상 클래스 만들기, 추상 클래스의 추상 메소드 앞에는 abstract를 붙여야 하며 이것을 사용하는 클래스의 앞에도 abstract를 붙여야 한다.
abstract class Jong {
  constructor(protected id: number) {}
  abstract describe(): void;
}

// 추상 클래스를 상속받아 describe 메소드를 정의한다.
class Lee extends Jong {
  describe(): void {
    console.log(this.id);
  }
}

// 또 다른 클래스에서 describe메소드를 정의한다.
class LeeJong extends Jong {
  describe(): void {
    console.log("hahahha", this.id);
  }
}

// 각각 다르게 정의한 describe 메소드가 실행되는 모습
const lee = new Lee(12);
lee.describe();
const leejong = new LeeJong(23);
leejong.describe();
```

<br>

### Singleton Pattern

- 어떤 클래스에서 정확히 하나의 인스턴스만을 가지게 될 것임을 보장하는 것이다.

- class의 constructor function 앞에 private를 붙인다.

- private를 붙일 경우, new 연산자를 사용하여 새로운 인스턴스를 만드는 것에 에러가 발생한다.

```js
class Accounting {
  private id: number;
  private name: string;
  private static instance: Accounting;

  private constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }

  static getInstance() {
    if (Accounting.instance) {
      return this.instance;
    }
    this.instance = new Accounting(12, "이종혁");
    return this.instance;
  }
}

const account = Accounting.getInstance();
console.log(account); // {id: 12, name: "이종혁"}
```

instance 자체를 필드로 두고, constructor앞에 private를 붙여서 new로 새로운 인스턴스 만들지 못하도록 하고, getInstance라는 static method를 사용해서 만약 이미 this.instance가 있다면 그것을 return하고 아니라면 자체적으로 new를 사용하여 인스턴스 하나를 생성 후에 그것을 return하여 사용하도록 한다.

여기서 constructor앞에 private사용한 이유는 new 연산자를 통해 외부에서 새로운 인스턴스를 생성하지 못하게 하고, 내부에서는 인스턴스가 있는지 없는지를 체크하여 없다면 new로 새로 하나 만들고 있다면 있는 것을 return하도록 하여 <b>단 하나</b>의 인스턴스만을 가지도록 하는 것이다.

<br>

---

## Interface

- Interface는 class와는 다르게 청사진으로 사용되지 않고 사용자 정의 타입으로 사용된다. (객체의 구조를 정의하기 위함)

- 값을 넣으려하면 initializing에러가 발생한다. (초기값 지정 불가)

- 메소드를 추가할 수 있다.

```js
interface Person {
  name: string;
  age: number;

  greet(phrase: string): void;
}

let user1: Person;

user1 = {
  name: "MAX",
  age: 32,
  greet(phrase: string) {
    console.log(phrase + " " + this.name);
  },
};

user1.greet("Hi there,"); // Hi there, MAX
```

- 왜 사용할까? interface 대신에 Person 앞에 type을 붙여도 똑같이 타입 구조를 정의할 수 있지 않을까? => 인터페이스는 객체의 구조를 설명하기 위해서만 사용되기 때문

- 타입은 유니온 등의 여러가지의 구조를 정의할 때도 사용될 수 있지만 interface의 경우는 분명하게 객체의 구조를 정의할 때 사용되기 때문이다.

- 클래스 선언에도 사용할 수 있다.

```js
interface Greetable {
  name: string;

  greet(phrase: string): void;
}

interface AnotherInterface {
  id: number;
}

// interface를 implement 함, implement는 inheritance와 다르게 여러개의 interface를 implement 가능
class Person implements Greetable, AnotherInterface {
  name: string;
  id: number;

  constructor(n: string, id: number) {
    this.name = n;
    this.id = id;
  }

  greet(phrase: string) {
    console.log(phrase + " " + this.name + " 학번 " + this.id);
  }
}

let user1: Greetable; // Person클래스가 이 인터페이스를 기반으로 생성되었기 때문에 이렇게 지정해도 에러 발생하지 않음
user1 = new Person("이종혁", 2015112218);

user1.greet("안녕~~~");
```

> implements를 사용해서 Person 클래스를 생성하였다. implement한 interface에서 정의된 타입과 구조대로 클래스가 만들어져야 하며 상속과는 다르게 여러개의 interface를 implement할 수 있다. (콤마) <br><br>
> 이것의 의미는 여러 클래스를 미리 정의된 구조 (값이 아닌)대로 생성할 수 있다는 것이다. (모두 값은 다르지만 구조는 interface와 같게 필수적으로 가져야 할 프로퍼티나 메소드를 만들어야한다)

- interface의 프로퍼티에는 private public 등을 사용할 수 없고 readonly만 사용할 수 있다. 이는 이 interface를 기반으로 생성되는 모든 객체의 속성이 한 번만 지정되어야 하며 그 이후에는 읽기 전용으로 설정되는 것이다. (한 번 초기화 후에는 변경 불가능)

<br>

### Interface Extend

```js
interface Named {
  readonly name: string;
}

interface Greetable extends Named {
  greet(phrase: string): void;
}

class Person implements Greetable {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  greet(phrase: string): void {
    console.log(phrase, this.name);
  }
}

let user1: Greetable;

user1 = new Person("이종혁");

user1.greet("ㅎㅇㅎㅇ");
```

인터페이스는 인터페이스를 extend할 수 있다. 위의 Person class에서는 greet 메소드를 생성하지 않으면 에러가 발생한다. Greetable interface는 Named interface를 extend했기 때문이다.

사용 이유? => 어떤 클래스는 Named처럼 name 프로퍼티만이 필요할 수 있고 또 다른 어떤 클래스는 name프로퍼티와 greet 메소드 모두가 필요할 수도 있기 때문에 이렇게 나누어서 확장하는 방식을 사용한다.

또, 콤마를 이용해서 여러개의 interface를 extend하는 것도 가능하다.

<br>

### Function Type Interface

```js
// type AddFn = (a: number, b: number) => number;
interface AddFn {
  (a: number, b: number): number; // 익명함수
}

let add: AddFn;

add = (n1: number, n2: number) => {
  return n1 + n2;
};

console.log(add(2, 4)); //6
```

맨 위 주석과 같이 함수의 타입을 지정할 수 있지만 interface로도 가능하다.

interface AddFn과 같이 익명함수의 괄호 안에 파라미터를 지정하고 마지막에는 콜론 입력 후에 반환값의 타입을 지정한다.

그리고 나서 let add: AddFn과 같이 타입 지정을 해준 후에 이를 정의한다.

<br>

### 선택적 Property & Method

```js
interface Named {
  name?: string;
  outputName?: string; // ? 붙이기

  greet?(phrase: string): void; // ? 붙이기
}

class Person implements Named {
  name?: string; // class에서도 ? 붙여서 선택적 프로퍼티로 만듬

  constructor(name?: string) {
    // 파라미터에도 선택적 가능
    // 선택적 프로퍼티이기 떄문에 여기서 에러발생하지 않음, name이 선택적 아니었다면 어떠한 방법으로든 this.name을 초기화 할 수 있도록 해주어야함
    if (name) {
      this.name = name;
    }
  }
}

let user1: Named;

user1 = new Person("이종");
console.log(user1);
```

인터페이스에서이 프로퍼티나 메소드가 반드시 필요한 것인지 모를 때 프로퍼티나 메소드의 이름 뒤에 ? 를 붙이면 필수적이지 않게 사용할 수 있다. 위의 코드에서도 outputName과 greet를 만들지 않았지만 에러가 발생하지 않는다.

<br>

<br>

---

## Advanced Typing Concepts

<br>

### Intersection Type

- 서로 다른 타입을 결합할 수 있다.

<br>

```js
type Admin = {
  name: String;
  privileges: string[];
};

type Employee = {
  name: String;
  startDate: Date;
};

type ElevatedEmployee = Admin & Employee; // &을 사용 => intersection type

const e1: ElevatedEmployee = {
  name: "Max", // Admin & Employee
  privileges: ["create-server"], //Admin
  startDate: new Date(), // Employee
};

console.log(e1);
```

<br>

### Type Guard

- type guard는 유니언 타입을 돕는다.

```js
type Combinable = string | number;
type Numeric = number | boolean;
type Universal = Combinable & Numeric; // number type => 두 타입에서 intersection type이 number이기 때문에
```

위의 코드는 intersection type덕분에 유연성을 갖지만 런타임 시에 정확히 어떤 타입을 얻게 될지 모를 수 있다.

```js
type Combinable = string | number;
type Numeric = number | boolean;
type Universal = Combinable & Numeric;

// a,b argument가 실제 runtime에서 string일지 number일지 모르기 때문에 에러 발생한다.
// function add(a: Combinable, b: Combinable) {
//   return a+b;
// }

//type guard 사용
function add(a: Combinable, b: Combinable) {
  if (typeof a === "string" || typeof b === "string") {
    // 이 라인이 type guard이다.
    return a.toString() + b.toString();
  }
  return a + b;
}

console.log(add(2, "3")); //23
console.log(add(23, 32)); //55
```

<br>

typeof로 type guard를 작성하지 못하는 경우도 있다. 아래 예시와 같다.

```js
type Admin = {
  name: String;
  privileges: string[];
};

type Employee = {
  name: String;
  startDate: Date;
};

type ElevatedEmployee = Admin & Employee; // &을 사용 => intersection type

const e1: ElevatedEmployee = {
  name: "Max", // Admin & Employee
  privileges: ["create-server"], //Admin
  startDate: new Date(), // Employee
};

console.log(e1);

type UnknownEmployee = Employee | Admin;

function printEmployeeInformation(emp: UnknownEmployee) {
  console.log("Name: " + emp.name);
  console.log("Privileges: " + emp.previleges); //에러 발생 => UnknownEmployee가 Employee타입일 수도 있기 때문에
}

// 위의 경우에는 typeof로 type guard를 작성할 수 없음
// 왜냐하면 emp의 type이 Admin인지 확인을 해야 가능한데 JS에서는 Admin이라는 타입을 알지 못하기 때문에 그렇게 작성할 수 없다.
// (이 부분은 JS에도 컴파일 되는 일반적인 코드이기 때문)

// 아래 코드와 같이 type guard 작성할 수 있다.
function printEmployeeInformation(emp: UnknownEmployee) {
  console.log("Name: " + emp.name);
  if ("privileges" in emp) {
    console.log("Privileges: " + emp.privileges);
  }
}

printEmployeeInformation(e1); // Name: Max / privileges: create-server
```

<br>

또 다른 방식의 type guard도 있다.

```js
class Car {
  drive() {
    console.log("Driving...");
  }
}

class Truck {
  drive() {
    console.log("Driving a truck...");
  }

  loadCargo(amount: number) {
    console.log("Loading cargo ..." + amount);
  }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
  vehicle.drive();
  if (vehicle instanceof Truck) {
    // instanceof은 JS의 내장 연산자, JS는 Truck타입을 모르지만 생성자 함수는 알고 있기 때문에 이것이 가능
    vehicle.loadCargo(1000); // Truck에만 있으므로 에러발생 (Car와 Truck중 어느것일지 모르기 때문)
  }
}

useVehicle(v1);
useVehicle(v2);
```

만약 여기서 class가 아닌 interface였다면 instanceof를 사용할 수 없다. interface는 JS에서 존재하지 않기 때문에 컴파일될 수 없기 때문이다.

<br>

### 구분된 Union

```js
interface Bird {
  type: "bird";
  flyingSpeed: number;
}

interface Horse {
  type: "horse";
  runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
  let speed;
  switch (animal.type) {
    case "bird":
      speed = animal.flyingSpeed;
      break;
    case "horse":
      speed = animal.runningSpeed;
  }
  console.log("Moving with speed: " + speed);
}

moveAnimal({ type: "horse", runningSpeed: 200 });
```

위의 코드에서 animal의 타입에 따라 flyingSpeed 메소드가 있을 지, runningSpeed 메소드가 있을 지 달라지기 때문에 이를 구분하는 방법이 필요하다.

interface이기 때문에 instanceof도 사용할 수 없다 (JS에는 interface가 없기 때문에 이것에 대해 컴파일할 수 없다)

그렇기 때문에 interface들에 type이라는 프로퍼티를 만들어서 이것을 통해 switch로 구분할 수 있도록 하였다. (공통된 프로퍼티 명으로 구분, 모든 객체가 해당 프로퍼티 명을 통해 검사를 할 수 있게 한다)

<br>

### 형 변환

```js
// const userInputElement = document.getElementById("user-input")!; // 느낌표 붙여주어 null이 아니라는 것을 알림

// const userInputElement = <HTMLInputElement>document.getElementById("user-input")!

const userInputElement = document.getElementById(
  "user-input"
)! as HTMLInputElement;

userInputElement.value = "Hi there!";
```

TS는 HTML파일을 읽을 수 없다. 따라서 getElementById의 결과가 DOM element일지 null일지도 모른다. 그렇기 때문에 에러가 발생한다.

일반적인 JS방식으로 코드를 작성하면 userInputElement를 사용했을 때 에러가 발생한다. 왜냐하면 이것이 null일지도 모르기 때문이다. 이 때 맨 뒤에 !를 붙여주어 확실히 null이 아니라는 것을 알려준다.

그래도 에러가 발생한다. 왜냐하면 value라는 프로퍼티는 모든 HTML Element가 갖고있는 프로퍼티가 아니기 때문이다.

이를 해결하기 위해 해당 엘리먼트가 value프로퍼티를 갖는 DOM 요소임을 알려주어야 한다. 이 방법은 두 가지가 있다.

document앞에 <HTMLInputElement>를 붙이거나 !의 뒤에 as HTMLInputElement를 붙여주는 것이다.

DOM 엘리먼트 외에도 as string등을 붙여주면 형변환을 할 수 있다.

<br>

### Index Property

- 인터페이스에서 정확한 속성 이름, 속성의 개수를 모를 때, 정하지 않았을 때 사용

```js
//이 인터페이스를 기반으로 만들어진 class의 모든 속성은 문자열 타입의 속성 이름과 문자열 타입의 속성 값을 가져야 한다는 것을 의미한다.
interface ErrorContainer {
  [prop: string]: string;
}
```

<br>

그 중에서도 필수적으로 있어야 할 프로퍼티들은 따로 지정할 수 있다. 다만 prop에서 지정한 타입과 같아야한다.

```js
interface ErrorContainer {
  id: string; // 키, 값 모두 string이기 때문에 가능
  [prop: string]: string;
}
```

<br>

### Function Overload

- 동일한 함수에 대해 여러 함수 시그니처를 정의할 수 있다.

```js
type Combinable = string | number;
type Numeric = number | boolean;
type Universal = Combinable & Numeric;

function add(a: number, b: number): number; //overload
function add(a: string, b: string): string; //overload
function add(a: Combinable, b: Combinable) {
  if (typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString();
  }
  return a + b;
}

const result = add("max", " schwarz");
console.log(result); // max schwarz
console.log(result.split(" ")); // ["max", "schwarz"]
```

result.split(" "); 원래대로면 에러가 발생한다.<br>
왜냐하면 TS는 result의 타입을 union으로 알고 있기 때문에 이것의 타입이 string일지 number일지 알 지 못한다.

실제로는 result의 파라미터로 둘 모두 string타입을 주었기 때문에 개발자 입장에서는 result의 타입이 string인 것을 알 수 있지만 TS는 그러지 못한다.

그렇기 때문에 TS입장에서는 result가 number타입일지도 모르기 때문에 string 타입의 내장 메소드인 split을 사용하지 못하게 하는 것이다.

이 경우에 위의 코드처럼 함수 오버로드를 사용한다.

function add의 윗 부분처럼 파라미터의 타입에 따라 어떤 타입이 리턴 될지만 정의를 새롭게 해주는 것이다.

만약 a,b가 모두 number타입이면 number타입을 return한다고 알려주고 반대로 모두 string 타입이면 string타입을 return한다고 알려주는 것이다. 이를 사용해서 string타입의 메소드인 split을 컴파일 에러 없이 사용할 수 있다.

<br>

### Optional Chaining

```js
// 백엔드 서버에서 데이터를 가져왔을 경우를 가정한다. 아래의 데이터는 DB에서 가져온 데이터라고 보자
const fetchedUserData = {
  id: "u1",
  name: "Max",
  job: { title: "CEO", description: "My own company" },
};

console.log(fetchedUserData.job.title);

// 여기서 일부 데이터가 누락되어있는 경우가 있을 수 있다. (프로퍼티 유무)
// 예를 들어 fetchedUserData에서 job 프로퍼티가 없는 경우 console.log부분에서 에러 발생한다.
// 이는 프론트에서 제어하는 데이터가 아니기 때문에 문제가 발생한다.

// JS방식의 해결법
console.log(fetchedUserData.job && fetchedUserData.job.title);

// TS에서는 optional chaining operator를 사용하여 더 나은 방법으로 구현이 가능하다. (3.7버전 이상)
console.log(fetchedUserData?.job?.title); // 불확실한 요소 뒤에 ? 붙여준다
```

위의 코드는 job 프로퍼티에 주석처리를 하면 컴파일 에러가 발생한다. 그 이유는 TS가 이미 fetchedUserData에 job프로퍼티가 없다는 것을 알기 때문이다. 그러나 현재 DB에서 데이터를 받아오는 것을 가정하여 해당 데이터가 불확실하다는 것을 전제로 코드를 작성한 것이기 때문에 이 부분은 무시해도 된다.

<br>

### Nullish

- null 데이터 처리에 도움을 준다.

- 어떠한 데이터나 입력값이 있는데 이것이 null인지 undefined인지 유효한 데이터인지 알 수 없을 경우

```js
// 데이터가 user input이나 DB내의 데이터처럼 null인지 아닌지 알 수 없을 경우를 전제로함 (userInput의 값)
const userInput = null;

// 이와 같이 코드작성하면 falsy한 값들에 대해 DEFAULT를 storedData에 저장하겠지만
// 만약 빈 문자열 또는 0을 storedData에 넣고 싶다면? 빈 문자열과 0은 falsy하기 때문에 DEFAULT가 저장되게 됨. 이를 막기위해 nullish 사용한다.
const storedData = userInput || "DEFAULT";

const storedData = userInput ?? "DEFAULT"; // ?? 사용하면 null이나 undefined만 false로 판단한다.
```

<br>

---

## Generics

<br>
 
### What is Generic

- TS에 내장된 타입이며, 타입이 다른 타입과 연결된 것이다.

- 연결될 다른 타입이 어떤 타입인지는 크게 상관하지 않는다.

- 예를 들어, array는 그 자체로 하나의 타입이지만 그 안에 담기는 데이터들의 타입 또한 존재한다.

```js
// Array<T> 제네릭 형식에 1형식 인수가 필요합니다.
const names: Array = ["Max", "Jong"];
```

```js
const names: Array<string> = []; // string[]와 같다
```

위의 코드의 Array와 같은 타입이 generic 타입이다. (array = generic type)

이것을 통해 names array의 값들은 모두 string타입임을 알 수 있으며 그렇기 때문에 names의 어떤 원소들도 string의 method를 사용할 수 있다. (중요)

<br>

Promise type도 generic type이다.

```js
// const promise: Promise<void>
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Done And Doone");
  }, 2000);
});
  
promise.then((result) => console.log(result.split(" "))); //Error
```

위의 promise변수는 Promise 타입이다.

그런데 Promise는 결국 어떠한 값을 return하게 되어있다. (settled value) 그렇기 떄문에 Promise도 generic 타입으로 만들어졌다. (Promise 자체도 타입이지만 이것이 return하는 값에 대한 타입도 지정하는 것)

위의 코드와 같이 Promise로부터 return된 fulfilled value를 통해서 string 타입의 method를 사용하고 싶다면 return될 값이 string타입이라는 것을 알려주어야 한다.

```js
const promise: Promise<string> = new Promise((resolve, reject) => {
  // 생략
});
  
promise.then((result) => console.log(result.split(" "))); //컴파일 가능
```

<br>

### Generic Function 생성하기

```js
function merge(objA: object, objB: object) {
  return Object.assign(objA, objB);
}

const mergedObj = merge({ name: "Max" }, { age: 30 });
console.log(mergedObj.name); // Error
```

위의 코드는 두 object를 입력받아 그것을 병합한 object를 return하는 함수를 작성하고 이를 사용하는 코드이다.

하지만 이 함수의 실행 결과로 만들어진 object에서 name이라는 property에 접근하려 하면 에러가 발생한다.

그 이유는 TS는 이 object가 name이라는 property를 가지는지는 알 수 없기 때문이다.

두 파라미터의 타입이 object이기 때문에 TS는 이 함수의 return value의 타입도 object일 것으로 예상은 한다. 하지만 이 object에 어떤 프로퍼티가 들어있을 지는 알 수 없기 때문에 에러가 발생한다.

이를 해결하기 위해 generic type을 사용한다.

```js
// function merge<T, U>(objA: T, objB: U): T & U
function merge<T, U>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}

const mergedObj = merge({ name: "Max" }, { age: 30 });
console.log(mergedObj.name);
```

위의 코드에서 objA의 타입은 T, objB의 타입은 U로 설정하였고 merge function의 return value의 타입은 T,U의 intersection으로 정의되었다.

이 방식의 의미는 두 매개변수가 다른 타입이 될 수도 있다고 TS에게 알려주는 것, 그리고 무작위의 (미상의) 객체 타입 (T, U 가 아닌 object type)으로 작업하는 것이 아닌 다양한, 구체적인 객체 타입으로 작업하여 데이터를 얻고자 하는 것임을 알려주는 것이다.

TS는 merge function의 return value type이 T와 U의 intersection임을 알게된다. 따라서 두 파라미터의 프로퍼티를 사용할 수 있게 된다.

장점: return value object의 property에 어떤 값이 들어갈 지 일일히 적어주지 않고 저렇게만 작성해도 알아서 어떤 property가 return value에 존재하는 지 알게된다. (함수 실행 시에 동적으로 타입 설정)

<br>

### Generic Type Constraint

```js
function merge<T, U>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}

const mergedObj = merge({ name: "Max" }, 30);
console.log(mergedObj); // {name: "Max"}
```

이 코드에서 objB의 자리에 object가 아닌 30을 넣었다. 에러는 발생하지 않는다.

왜냐하면 objB는 U로만 타입을 지정했을 뿐 이것이 object인지 아닌지는 정하지 않았기 때문이다.

그렇기 때문에 위와 같은 상황에서 에러를 발생시키기 위해서는 type T와 U에 type constraint 작업을 해야한다.

<br>

```js
function merge<T extends object, U extends object>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}

const mergedObj = merge({ name: "Max" }, 30); // Error
```

이렇게 T와 U 타입에 extends를 사용해서 이것이 object타입이어야 한다는 것을 명시한다.

extends의 뒤에는 object가 아닌 다른 타입들, 직접 만든 타입 그리고 유니언 타입 등도 유연하게 사용 가능하다.

<br>

---

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

```js
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

```js
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

```js
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

```js
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

```js
// 아래의 코드는 에러를 발생시키지 않는다.
let inputValue: any;
let inputString: string;

inputValue = 5;
inputString = inputValue;
```

any 타입의 변수 값을 string타입의 변수에 넣는데도 에러가 발생하지 않는다. 그 이유는 any 타입을 사용하는 것은 TS에게 모든 type checking을 하지 않게 만든다. 이는 TS에게 모든 것을 포기하게 만드는 것과 같다.

<br>

### 9. Union

```js
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

```js
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

```js
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

```js
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
