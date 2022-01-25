# JS 강의 노트

## 헷갈렸던 것 + 몰랐던 것 위주로 정리!

<br>
<br>

---

# 1. Fundamentals

<br>

### strict mode

- 자바스크립트는 에러가 발생해도 그냥 넘어가는 경우가 있다.
  <br>예를 들어, 선언된 적이 없는 변수에 값을 넣은 경우, strict mode가 아니라면 자동으로 선언해주어 값을 넣는다. 하지만 strict mode라면 not defined 에러가 발생한다.

<br>
ㅇ
### 함수 표현식?

- 익명함수를 만들고 이를 변수에 저장하는 것
  (함수 선언식은 기본적인 방식)

```html
const calcAge = function (birthYear) { return 2022 - birthYear; }
```

<br>

### 함수는 value 이다. (type이 아니다.)

- 그렇기 때문에 변수에 저장할 수 있다.

<br>

### 함수 선언식 vs 함수 표현식

<br>

- 함수 선언식은 선언 전에 사용이 가능하다! (hoisting)
  <br>하지만 함수 표현식은 사용이 불가능하며 두 가지 경우로 나뉜다.
  <br>
  <br>1. 변수를 let, const로 선언하였을 때
  <br>- Cannot access "함수이름" before initialization 에러 발생
  <br>발생이유? => let, const로 선언한 변수는 실질적으로 hoisting이 발생하지 않는다고 볼 수 있기 때문에 선언이 되기 전에 접근했다는 에러가 발생한다.
  <br>
  <br>2. 변수를 var로 선언하였을 때
  <br>"함수이름" is not a function 에러 발생
  <br>발생이유? => var로 변수를 선언하였기 때문에 hoisting에 의해 변수가 선언된 상태로 코드가 실행됨
  <br> 하지만 값이 없이 변수 선언만 된 상태이므로 not defined 에러 대신에 not a function 에러가 발생하는 것
  <br>(이 때 변수의 값은 undefined 이다. 변수 선언 후에 값을 지정하지 않은 상태이기 때문이다.)

<br>

---

<br>

# 2. Theory

<br>

## 자바스크립트의 9가지 특징 🐻

<br>

### 1. High-level

- high-level 언어이기 때문에 컴퓨터의 resource를 직접 manage할 필요가 없다. (automatic)

<br>

### 2. Garbage-collected

- 오랫동안 사용되지 않은 object들을 자동적으로 컴퓨터의 메모리에서 삭제시킨다.

<br>

### 3. Interpreted or just-in-time compiled

- 나중에 설명

<br>

### 4. Multi-paradigm

- 다음 3가지 paradigm 모두 사용 가능하다.
- Procedural programming (절차지향 프로그래밍)
- Object-oriented programming (객체지향 프로그래밍)
- Functional programming (함수형 프로그래밍)

<br>

### 5. Prototype-based object-oriented

- JS에서 primitive type을 제외하면 모두 object이다. (array, function 등)

- 자세한건 나중에 설명

<br>

### 6. First-class functions

- 일급 함수라고 하며 함수가 변수처럼 다뤄지는 것을 뜻한다. 예를 들면, 함수의 파라미터로 또 다른 함수가 들어갈 수 있는 점이 있다.

<br>

### 7. Dynamic

- Dynamically-typed language이고 이는 변수를 선언할 때 타입을 지정하지 않고 런타임 때 타입이 정해지게 된다.

<br>

### 8. Single-threaded

- JS는 single-threaded 언어이기 때문에 한 번에 하나의 작업만을 수행할 수 있다. (only do one thing at a time)

<br>

### 9. Non-blocking event loop

- single-threaded는 만약 시간이 오래걸리는 작업을 먼저 수행한다면 뒤의 모든 작업들이 실행되지 못하는 blocking 현상이 발생할 수 있다. 하지만 JS는 event loop를 사용하여 blocking 현상이 일어나지 않도록 한다.

<br>
<br>
<br>

## Compilation 🆚 &nbsp;Interpretation

코드를 실행하기 위해서는 먼저 기계어로 변환되어야 한다. 그 방식에는 compilation과 interpretation 두 가지가 있다.

<br>

<img src="./img/dd.png">

<br>

### Compilation

- 우선, 소스코드가 machine code로 번역된 file로 변환된다.
- 해당 file을 실행하면 프로그램이 실행된다.
- 장점: interpretation보다 빠르다.

<br>

### Interpretation

- 소스코드를 line-by-line으로 실행한다. (느림)

<br>

### Just-in-time compilation (JIT)

- 현재 자바스크립트가 사용하는 방식 (성능 개선을 위함)
- 먼저 전체 코드가 machine code로 변환된 후에 바로 실행된다.

<br>

### JS 엔진의 작동 방식

1. Parsing

- 전체 코드가 abstract syntax tree (AST)로 파싱된다. (트리 형태)
- 의미 있는 조각으로 나눈다 (const, function 등의 키워드로)
- 파싱된 결과는 machine code를 생성하기 위해 사용된다.

<br>

2. Compilation

- 파싱된 결과로 machine code로 변환시키는 과정

<br>

3. Execution

- compilation의 결과를 실행

<br>

4. optimization

- JS 엔진은 처음에 매우 unoptimized한 버전의 machine code를 만들게 된다. 왜냐하면 일단 최대한 빠르게 실행을 해야하기 때문에 최적화를 시키지 않기 때문이다.

- 그 뒤로 background에서 recompiling을 통해 optimization을 수행한다. (실행을 멈추지 않는다)

<br>

<br>

## JS RUNTIME

<br>

### 1. Event Loop

<br>

- runtime => JS를 사용하기 위해 필요한 모든 것들이 담긴 container라고 할 수 있다.

- JS 엔진, WEB APIs, Callback Queue로 이루어져 있다. (크게 볼 때 3개)

- WEB APIs는 브라우저에서 제공되며 window object (전역 객체)로 접근할 수 있다. 그리고 브라우저에서 제공되는 것들이기 때문에 node.js의 runtime에는 이 부분이 빠지게 된다.

- 실행할 준비가 완료된 모든 콜백함수들이 들어있는 queue이다.

<br>

<br>

## 실행 컨텍스트 (Executiion context)

<br>

JIT 방식의 parsing - compilation - execution 의 3가지 단계 중 마지막 execution 단계에 대한 부분이다.

<br>

### 실행 방식

<br>

1. compilation의 결과로 machine code가 생성되어 execution이 시작된다. 이 때 global execution context (for top-level code)가 생성된다. 여기서 top-level code란 어떤 함수 안에 있지 않은 코드를 말한다. (함수 호출 없이도 실행되어야 하는 코드들)

<br>

2. global Execution context가 생성된다. 이것은 단 하나만 존재한다.

<br>

3. 함수를 실행하고 callback을 기다린다.

<br>

function은 모두 자기 자신만의 execution context를 갖는다. 함수가 호출될 때 생성된다. (호출될 때 call stack에 들어감)

<br>

### Execution context 구성

<br>

실행 직전에 만들어진다.

<br>

1. variable environment

- let, const, var 선언
- functions
- arguments object (not in arrow function)

<br>

2. scope chain

<br>

3. this (not in arrow function)

<br>

## Call Stack

<br>

Call stack은 JS엔진에 있으며 코드가 실행될 때 현재 어떤 execution context를 실행중이고 이게 끝나면 어떤 execution context로 돌아가야 하는지 알 수 있게 해준다.

<img src="./img/callstack.png">

<br>

예를들어 위의 사진의 코드를 실행한다고 하면 가장 먼저 global execution context가 call stack에 들어가서 실행된다.

<br>

global execution context는 어떤 함수 안에도 속해있지 않은 코드들만 실행되는 것이기 때문에 두개의 함수 선언식, 표현식은 실행되지 않고 가장 마지막의 first 함수 호출이 실행된다.

<br>

이 때, first 함수가 실행되어야 하기 때문에 first 함수만의 execution context가 생성되어 call stack에 들어가게 된다.

<br>

그리고 first 함수를 실행하던 중에 second 함수를 실행하도록 코드가 작성되어있기 때문에 second 함수의 execution context가 생성되어 call stack에 들어간다.

<br>

그 뒤로 second 함수의 return이 실행되고 second 함수의 execution context는 call stack에서 pop된다.

<br>

그 다음은 call stack의 가장 위에 first 함수가 남게 되기 때문에 first 함수의 남은 부분을 실행한다. 여기서 이게 가능한 이유는 call stack 때문이다. second 함수 실행이 종료된 후에 어디로 갈 지 알 수 있었기 때문이다. 마찬가지로 first 함수 또한 return 되어 종료되고 나면 call stack에서 pop되고 그 뒤에 call stack의 가장 위에 남은 global execution context가 남은 부분을 실행하고 call stack에서 pop되어 실행이 종료된다.

## Scope & Scope Chain

<br>

### 용어 설명

<br>

1. scoping

- scope를 생성하는 과정, 방법 정도로 이해
- 변수들이 어디에 있고, 어디서 접근 가능하고 또는 접근이 불가능한지

<br>

2. lexical scoping

- scoping은 함수 또는 코드블럭이 어디에 위치해있는가 (어디에서 작성되었는가)에 따라 결정된다.

<br>

3. scope

- 함수 또는 변수가 선언된 공간/환경
- scope에는 global scope, function scope, block scope가 있다.

<br>

4. scope of variable

- 어떤 변수에 접근(access)할 수 있는 곳

<br>

### scope의 종류

<br>

1. global scope

- 모든 함수와 코드블럭의 외부에 존재하는 변수들의 scope
- global scope의 변수들은 코드의 어떤 곳에서도 접근이 가능하다.

<br>

2. function scope

- 함수 내부에서 선언된 변수, 함수들의 scope
- 함수 내부에서만 접근이 가능하다
- 다른 말로는 local scope라고 한다.

<br>

3. block scope (ES6+)

- 코드블럭 내부에서 선언된 변수, 함수들의 scope (function, if, for)

- let과 const로 선언된 변수들만 적용되며 var은 이것에 적용되지 않는다 (ES6 이전에 나온 것이기 때문에)

- 함수는 strict mode에서 block scope이다. (strict mode 아니면 function scope)

<br>

### Scope Chain

<br>

모든 스코프는 자신의 바깥에 있는 변수들에 접근이 가능하다. 이것이 스코프 체인이다.

<br>

어떤 변수에 access하려고 할 때, 자기 자신의 scope(current scope)에 찾고있는 변수가 있다면 그것을 사용한다. 하지만 없다면 scope chaining을 통해 변수를 찾게된다.

<br>

우선 자기 자신의 scope에 해당 변수가 없다면 먼저 자신의 바로 위의 스코프로 가서 변수를 찾는다. 여기서 바로 위라는 말은 자기 자신의 가장 가까운 부모의 scope이다.

<br>

<img src="./img/scope.png">

위의 사진에서 second 함수에서 myName 변수와 age 변수에 접근해야 한다.

하지만 second 함수 내부에는 해당 변수들이 존재하지 않는다. 그래서 scope chain을 해서 바로 위의 scope인 first 함수의 scope에서 변수들을 찾는다.

여기서 age 변수는 찾았지만 myName 변수는 찾지 못했다. 그래서 그보다 바로 하나 더 위의 scope인 global scope로 이동해서 찾는다.

여기서 decade 변수는 const로 선언되었기 때문에 if 블럭 안에서만 접근 가능하다.

<br>

주의) scope chain은 코드가 쓰여진 위치에 따라 결정되는 것이고 함수가 호출된 위치는 상관없다.

<br>

### 정리

<br>

<img src="./img/sum.png" />

<br>

<br>

## Hoisting

<br>

변수들이 선언되기 전에 접근 또는 사용이 가능한 경우가 있다. 이것은 hoisting이 일어났기 때문이다.

변수들이 코드의 최상단으로 끌어올려졌다고도 표현한다.

<br>

### 발생하는 이유?

- 코드 실행 전(creation phase)에 먼저 코드를 스캔한다. 이 때 변수 선언이 있다면 execution context의 variable environment의 object의 프로퍼티로 저장되기 때문에 접근, 사용이 가능해지는 것이다.

<br>

### 변수/함수 종류 별 hoisting 여부 정리

<br>

<img src="./img/hoisting.png">

<br>

1. function declaration

- 호이스팅 발생
- 선언 전에 접근+사용 가능
- strict mode에서는 block scope, 아니라면 function scope

<br>

2. var variables

- 호이스팅 발생
- 선언 전에 접근 가능, 값은 undefined
- function scope

<br>

3. let, const variables

- 호이스팅 발생은 하지만 기능적으론 발생하지 않은 것과 같음
- 선언 전에 접근 불가능, 하지만 접근하려 하면 referrence error가 나오지 않고 cannot access before initialization 에러가 발생 (TDZ)
- block scope

<br>

4. function expressions and arrows

- 함수가 담길 변수를 var, let, const 중 어떤 것으로 선언했는지에 따라 hoisting 여부가 결정됨
- 선언 전 접근 여부도 위와 같이 결정됨, var이라면 접근가능, 하지만 함수 사용은 불가능 (undefined) / let, const라면 접근 불가능 (uninitialized)
- scope 또한 var, let, const에 따라 다름

<br>

<br>

## TDZ

<br>

Temporal Dead Zone

+94번,95번 추가작성
