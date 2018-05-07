### Nodejs 



#### Concept

- var : 전역변수 생성하는 명령어. 변수를 만들 때는 "let", 상수를 만들 때는 "const"

  - > // 변수 사용 방법
    >
    > let a = 10; 
    >
    > let a; a = 10;
    >
    > // 상수 사용 방법
    >
    > const a = 10; /이것 밖에 안된다

- 템플릿 문자열 :  `  로 문자열을 표현

  - > let a = 10;
    >
    > console.log("출력"+(a+a));
    >
    > console.log(` 출력+ ${a+a}`) // 이렇게 ESC 아래 기호로 표시한다.

- 모듈이란 애플리케이션을 구성하는 개벌젹 요소로서 구현된 세부 사항을 캡슐화하고 공개가 필요한 API를 외부에 노출하여 다른 코드에서 로드하고 사용할 수 있도록 작성된 재사용 가능한 코드 조각을 말한다.[참조](http://poiemaweb.com/es6-module)

  - ES6 모듈에선 export, import를 제공하고 export를 통해 참조할 수 있게 하며 import를 통해 갖고 온다.

  - node.js는 module.exports 또는 exports객체를 통해 정의하고 외부로 공개하면 require함수를 사용하여 임포트 한다.[참조](http://poiemaweb.com/nodejs-module)

    - exports 객체는 프로퍼티 또는 메소드를 여러 개 정의할 수 있다. 하지만 module.exports에는 하나의 값(기본자료형, 함수, 객체)을 할당할 수 있다

    - ```
      // square.js
      module.exports = (width) => {
        return {
          area() { return width * width; }
        };
      };
      ```

    - ```
      // app.js
      const square = require('./square.js');
      const mySquare = square(2);
      console.log(`The area of my square is ${mySquare.area()}`);
      // => The area of my square is 4
      ```

    - ```
      // foo.js ,module.exports에 함수를 할당하는 방식
      module.exports = function(a, b) {
        return a + b;
      };
      ```

    - ```
      // app.js
      const add = require('./foo');

      const result = add(1, 2);
      console.log(result); // => 3
      ```

    - ```
      // foo.js
      module.exports = {
        add (v1, v2) { return v1 + v2 },
        minus (v1, v2) { return v1 - v2 }
      };
      ```

    - ```
      // app.js
      const calc = require('./foo');

      const result1 = calc.add(1, 2);
      console.log(result1); // => 3

      const result2 = calc.minus(1, 2);
      console.log(result2); // => -1
      ```

  - require : require 함수의 인수에는 파일뿐만 아니라 디렉터리를 지정할 수도 있다.  아래 디렉터리구조

    - > project/
      > ├── app.js
      > └── module/
      > ​    ├── index.js
      > ​    ├── calc.js
      > ​    └── print.js

    - ``` 
      const myModule = require('./module'); //index.js
      ```

    - ```
      //module/index.js
      module.exports = {
        cala:require('./calc'),
        print:require('./print')
      };// 한번의 require로 calc.js와 print.js의 기능을 사용할 수 있다.
      ```

    - ```
      // module/calc.js
      module.exports = {
        add (v1, v2) { return v1 + v2 },
        minus (v1, v2) { return v1 - v2 }
      };
      ```

    - ```
      // module/print.js
      module.exports = {
        sayHello() { console.log('Hi!') }
      };
      ```

    - ```
      // app.js
      const myModule = require('./module');

      // module/calc.js의 기능
      const result = myModule.calc.add(1, 2);

      console.log(result);

      // module/print.js의 기능
      myModule.print.sayHello();
      ```

    - ​






#### OPEN API

- 미리 데이터베이스에 로드하거나 최초에 서버 구동할 때 데이터베이스에 있는지 확인하고 없으면 table생성



​	**항공기 운항정보 서비스** 

- 공항 코드 정보 API

  - Request

    - > 인증키

  - Response

    - > 도시명(중국어), 도시명(영어), 도시명(일본어), 도시명(한국어)
      >
      > 도시코드(KWJ)

- 국내 운항 목록 변수, 국제 운항 목록 변수(김해 -> 일본, 중국, 캄보디아 등) API

  - Request

    - > 검색일자(필수 X, 안 쓰면 오늘 날짜 반환 하는 듯)
      >
      > 도착 도시 코드(필수 X)
      >
      > 출항 도시 코드(필수 X)
      >
      > 항공편 코드(필수 X)
      >
      > 항공편 넘버(필수 X)
      >
      > 인증키(필수)

  - Reponse

    - > 항공사 홈페이지(www.flyairbusan.com)
      >
      > 항공사(국문) (대한항공)
      >
      > 도착공항(김해)
      >
      > 도착시간(0755)
      >
      > 항공편명(KE1101)
      >
      > 출발시간(0700)
      >
      > 출발공항(김포)
      >
      > 일요일~월요일(Y or N)
      >
      > 열 숫자, 페이지 번호, 데이터 총계

- 실시간 운항정보(국제선 운항 스케줄 확인) API

  - Request

    - > 국내 / 국제(필수 X, 인식도 안하는 듯)
      >
      > 도착 / 출발(필수 X)
      >
      > 공항코드(필수 X)
      >
      > 인증키(필수)
      >
      > 예정시간(필수 X)
      >
      > 변경시간(필수 X)

  - Response

    - > 항공편명(KE1200) 
      > 항공사국문, 항공사영문(Tway Air)
      > 도착공항영문, 도착공항국문(대구)
      > 출발공항영문, 출발공항국문(타이페이)
      > 기준공항코드(TAE)
      > 운항구간코드(TPE)
      > 변경시간(0520), 예정시간(0515)
      > 게이트번호(3)
      > 출/도착코드(I)
      > 국내/국제(국제)
      > 항공편상태영문, 항공편상태국문(도착)

  ​

  ​

  **국내항공운항정보 서비스**  

- 항공운행정보목록 조회 API

  - Request 

    > 한 페이지 결과 수, 페이지 번호(필수 X,default : 한 페이지 결과수 : 10)	
    >
    > 출발 공항ID(필수)
    >
    > 도착 공항ID(필수)
    > 출발일(필수)
    > 항공사ID(필수 X)

  - Response

    > 항공사편명(OZ8141)
    >
    > 항공사명(아시아나항공)
    > 출발시간(201801011040)
    > 도착시간(201801011135)
    > 일반석운임(57900)
    > 비즈니석운임(82900)
    > 출발공항(광주)
    > 도착공항(제주)

  ​

- 공항 목록 조회 API

  - Request : X

  - Response 

    - > 공항 ID
      >
      > 공항명

- 항공사 목록조회 API

  - Request : X

  - Response 

    - > 항공사 ID 
      >
      > 항공사 목록

