# CSS 강의 필기

## 1. css 속성

- clip-path: 요소의 보여지는 부분과 보여지지 않는 부분을 구분할 수 있다.

- linear-gradient: 그라데이션 사용 가능, 첫 번째 인자로 그라데이션 방향을 지정 (to right, to right bottom 등), 그 뒤로는 그라데이션에 사용할 색상들을 지정한다.

- backface-visibility: hidden을 사용하면 animation이 종료될 때 생기는 미세한 움직임을 없앨 수 있다.

- letter-spacing: 문장의 자간을 설정할 수 있다.

- text-transform: uppercase를 사용하면 해당 요소 내부의 글자들이 모두 대문자로 변경된다.

- animation-fill-mode: backwards로 설정 시, animation이 시작되기 전에 0%상태가 적용된 상태가 됨(delay있을 시에 유용)

---

## 2. 가상 요소

- link, visited, hover, active
  > link, visited는 href를 가진 a 태그에서 사용, link는 클릭(방문) 전의 a태그에 적용, visited는 클릭(방문) 후의 a태그에 적용 (클릭 전에 파란색, 클릭 후에 보라색이 되는 원래의 a태그 특성과 같음)
