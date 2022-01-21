# JS 강의 노트

## 헷갈렸던 것 + 몰랐던 것 위주로 정리!

<br>
<br>

### strict mode

- 자바스크립트는 에러가 발생해도 그냥 넘어가는 경우가 있다.
  <br>예를 들어, 선언된 적이 없는 변수에 값을 넣은 경우, strict mode가 아니라면 자동으로 선언해주어 값을 넣는다. 하지만 strict mode라면 not defined 에러가 발생한다.

<br>

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
