### Nodejs project



#### 진행 상황(순서대로 진행)

1. install (nodejs, npm)

2. 브라우저로 확인 , http://127.0.0.1:3000

3. curl 로 request 보내기 e.g. curl -X '127.0.0.1:3000' -v

4. express(Nodejs framework) install

  - Application
    - 하나의 express객체 생성, express 객체는 하나의 서버 역할을 함. 
  - Request
  - Response
  - Routing
    - Router() 클래스를 이용해서 라우팅 로직을 만든다.

5. REST API(GET, POST, PUT, DELETE)

  - /users, /user:id 이런식으로 사용자가 접속할 때 URL을 간편화 한다.
    - GET /users , GET /users/:id , POST /users , DELETE /users/:id , PUT /users/:id

6. 라우팅 로직 작성(특정 id값 데이터 얻기)

  - ~~~~ 
    app.get('/users',(req,res)=>{

    	const id = parseInt(req.params.id,10);

    	if(!id){

    		return res.status(400).json({error:'Incorrect Id'});

    	}

    	let user = users.filter(user=>user.id==id)[0];

    	if(!user){

    		return res.status(404).json({error:'Unknown Error'});

    	}

    	return res.json(user);

    });

    ~~~~

    ​

7. HTTP 요청 두가지 방법 : Query String, Body   

  - Query String은 URL이 노출되기 때문에 GET

  - Body는 암호화 되기 때문에 POST 

    - express에선 POST를 하기 위한 body 데이터 접근을 위해 body-parser 패키지 추가

      - > npm -i body-parser --save

      - ~~~~
        //코드 부분
        var bodyParser = require('body-parser');
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended:true}));

        ~~~~

8. Express의 framework에 맞게 app.js(코드가 다 들어있는 파일) 쪼개기 (준 mvc구조)

  - index.js(라우팅 모듈)

    - ~~~~
      const express = require('express');

      const router = express.Router();

      ...

      ~~~~

  - user.controller.js(라우팅 컨트롤러 : 실제 코드가 존재)

    - ~~~~
      exports.index = (req,res)=>{

      ...

      }

      exports.show = (req,res) =>{

      ...

      }

      ...
      ~~~~

    - ​

      ​

9. 테스트 [참조](http://webframeworks.kr/tutorials/nodejs/api-server-by-nodejs-04/)

   1. 노드에서 가장 유명한 테스트 툴 모카, 테스트 코드를 구동시켜주는 테스트 러너(Test runner)

      1. ```
         npm i mocha --save-dev
         ```

      - devDependencies가 package.json에 설치, 이것은 순전히 개발자를 위한 정보. **npm install** 로 필요한 노드를 설치할 때 devDependencies에 있는 패키지들도 추가로 설치

   2. 서버에 코드를 배포한뒤 서버에서 production 패키지 이용하면 package.json파일의 dependencies속성을 참고해서 여기에 있는 것들을 설치

      1. ```
         npm install --production
         ```

   3. 테스트 코드 : 테스트 수트(suite), 테스트(test)로 구분, suite는 테스트들을 모아놓은 하나의 환경, 테스트는 실제 테스트를 수행하는 코드.

      1. **describe()** : 테스트 수트 / **it()** : 테스트

      ``` 
      // api/users/user.spec.js가 테스트 코드 파일!! 
      describe('GET /users', () => {
        it('should return 200 status code', () => { //실제 테스트 코드!
          console.log('test 1');
        });
      });
      ```

   4. ```
      //package.json에 추가!
      {
        "scripts": {
          "test": "node_modules/.bin/mocha api/user/user.spec.js"
        }
      }
      ```

   5. __assert__ :  assert.equal() 실행결과 에러를 던지면서 모카에서 성공, 실패 메세지를 보여준다.

   6. **should**  : 서술식의 검증을 코드로 작성할 수 있게 해주는 패키지

      1. ```
         npm i should --save-dev 
         ```

   7. **supertest** : API 테스트를 가능하게 해주는 노드 패키지, 익스프레스 서버를 구동한 뒤 HTTP요청을 보내고 응답받는 구조 

10. 데이터베이스 연동 MySQL [참조](http://webframeworks.kr/tutorials/nodejs/api-server-by-nodejs-05/)

  1. 알아서 MySQL설치하고 프로젝트용 DB만들고 table만듭시다

  2. **Sequelize** : ORM(Object Relational Mapping), 쿼리문 귀찮게 안쓰고 프로그래밍 언어로 데이터베이스에 명령을 내릴 수 있는 라이브러리!

     1. ```
        npm install -save sequelize
        //Sequelize는 node패키지로 node-mysql을 포함하고 있지 않으므로 이것도 설치
        npm install mysql 
        ```

  3. **Model** : 모델은 데이터베이스의 테이블과 1:1매칭. 

     1. ```
        // models.js, DB 연동 코드
        const Sequelize = require('sequelize');
        const sequelize = new Sequelize(
          'practice', // 데이터베이스 이름
          'username', // 유저 명
          'password', // 비밀번호 
          {
            'host': 'localhost', // 데이터베이스 호스트
            'dialect': 'mysql' // 사용할 데이터베이스 종류
          }
        );
        /*Users('s' 알아서 붙여줌)라는 테이블을 만들어주며 변수는 name이 생긴다. 그외에도 자동 증가 된 id와 createdAt, updatedAt 변수가 자동으로 생긴다.
        */
        const User = sequelize.define('user', {
          name: Sequelize.STRING
        });

        //다른 파일에서 써야즤
        module.exports={
          sequelize:sequelize,
          User:user
        }
        ```

  4. **DB sync** :  sequelize의 sync() 메소드. sequelize객체에 연결된 데이터베이스에 정의한 모델들을 테이블로 생성하는 기능, 서버가 구동될 때 딱 한번만 호출되면 되고 실제 DB가 만들어진 서버 환경이라면 쓸 필요가 없다. 

     1. ```
        //app.js
        app.listen(3000, () => {
          console.log('Example app listening on port 3000!');
        /*force:true면 서버 켜질 때 이미 테이블이 있어도 다시 삭제하고 새로 만든다. 
        즉, 미리 만들어 놨다면 저거 false로 바꿔야 한다. 멍청하게 계속 내비두지 말자*/
          require('./models').sequelize.sync({force: true})
              .then(() => {
                console.log('Databases sync');
              });
        });
        ```

  5. 컨트롤러에 데이터베이스 연동 : CRUD. **api/users/user.controller.js** 에서 확인!

     1. index() : 모든 사용자 목록 조회 
     2. show() : 특정 사용자를 id로 조회
     3. destroy() : id 기준으로 삭제
     4. update() : id 기준으로 변경

  6. 환경 분리 

     - development : 개발

     - test : 테스트

     - production : 서버 배포

     - ```
       // config/environment.js , 테스트 환경과 개발환경을 분리하기 위한 설정 파일
       const environments = {
         development: {
           mysql: {
             username: 'root',
             password: 'root',
             database: 'node_api_codelab_dev'
           }
         },

         test: {
           mysql: {
             username: 'root',
             password: 'root',
             database: 'node_api_codelab_test'
           }
         },

         production: {

         }
       }

       const nodeEnv = process.env.NODE_ENV || 'development';

       module.exports = environments[nodeEnv];
       ```

  7. 테스트에 데이터베이스 연동하기

     1. ```
        // 위의 환경을 설정해준 파일을 import해서 데이터 베이스 연동!
        const config = require('./config/environments');
        const sequelize = new sequelize(
          config.mysql.database,
          config.mysql.username,
          config.mysql.password
        )
        ```

  8. sync-database 모듈 : app.js에서 sync() 함수를 사용하고 있는걸 따로 떼어낸다.

     1. ```
        // bin/sync-database.js 파일 생성
        const models = require('../models');

        module.exports = () => {
          return models.sequelize.sync({force: true});
        };
        ```

  9. **www.js** : 서버만 구동하는 모듈을 별도로 만든다.

     1. ```nodejs
        // bin/www.js 파일 생성
        const app = require('../app');
        const port = 3000;
        const syncDatabase = require('./sync-database');

        app.listen(port, () => {
          console.log('Example app listening on port 3000');

          syncDatabase.().then(() => {
            console.log('Database sync');
          })
        })

        ```

     2. ```
        // app.js 서버 구동 로직 제거
        const express = require('express');
        const bodyParser = require('body-parser');
        const app = express();

        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));

        app.use('/users', require('./api/user'));

        moduele.exports = app;
        ```

     3. ```
        // package.json 파일 수정
        "start": "node bin/www"
        ```

  10. **폴더 정리** 

    - ```
      /app : 서버 기능
      	/api : api 로직을 담당
      	/config : 서버가 구동하기 위한 환경 변수 정의(상수)
      	/models : 데이터베이스 모델링
      /bin : 서버 구동을 위한 코드
      	/www.js : 서버 구동
      	/sync-database : 디비 싱크
      ```

      ​

  11. Nodejs 템플릿 엔진 **JADE** -> **PUG**

      1. Nodejs로 request 또는 response하기 위해 사용하는 템플릿 엔진. nodejs에서 response한 데이터는 #{} 으로 사용하며 html을 include 하여 복합적으로 같이 사용할 수 있다. 다만 아직까지 Jquery, Ajax 해결하지 못함. 

      2. > npm install jade -> npm install pug --save

  12. MaterialCSS [공식 사이트](http://materializecss.com/)

      1. Material 디자인 기반의 최신 반응형 Front-End프레임 워크로 직접 구현하기 힘든 많은 components와 css를 제공해준다. 

      2. > npm install materiall-css

      3. ```
         //사용하기 위해선 이 script를 넣어준다.
         <!-- Compiled and minified CSS -->
           <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/css/materialize.min.css">

           <!-- Compiled and minified JavaScript -->
           <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/js/materialize.min.js"></script>
                   
         ```

         ​

  13. 진행 상황

      1. OPEN API day by day 로 Batch (자정 지나거나 서버 켜질 때 데이터 확인 후 데이터베이스에 넣어주기) / 현재 상태는 실시간 국내 항공 서비스 데이터만 Batch 상태
      2. express로 프로젝트 구조 변경(e.g. public 구조 등, 완전히 변경 X)
      3. Jade 페이지 분할
      4. use.controller.js와 index.js 분할 X 기능 구현 후 세분화 예정
      5. 여기까지...

  14. nodejs 동기화(nodejs는 기본적으로 비동기 언어) 

      1. **동기와 비동기** (Synchronous vs Asynchronous)

      2. nodejs에서 함수에 sync라는 말이 붙어 있으면 동기 방식!

         1. ```nodejs
            fs.readFileSync(file,[options]) //동기화 방식
            fs.readFile(file,[options],callback) //비동기 방식
            ```

      3. 대표적인 함수 동기화 방법 3가지 [callback patter, async](http://bcho.tistory.com/1083) , [promise](http://bcho.tistory.com/1086?category=513811) 

         1. 함수의 callback 패턴 사용

            1. ```
               //callback
               function(~,callback함수);
               ```

            2. ```
               /*함수의 구조를 잘 봐라!! 이게 callback함수를 이용해서 하는 것! 
               함수 안에 함수를 또 부르고 그 안에서 새로운 함수를 다시 호출 하는 구조!
               */
               fs.readFile(src,'utf-8',function(err,data){
               	console.log(data);
               	if(err){
               		console.log("Read File Error");
               	}else{
               		console.log("Read file is success");
               		fs.writeFile(des,data,function(err){
               			if(err){
               				console.log("writeFile error");
               			}else{
               				console.log("writeFile is success");
               			}
               		});
               	}
               });
               ```

            3. 이렇게 하면 동기화가 길어질 경우 콜백함수 중첩 구조가 계속 늘어나기 때문에 가독성이 매우 떨어지고 코드가 매우 복잡해진다!

         2. **Async** 

            1. waterfall : 흐름제어에 있어서 여러개의 비동기 함수를 순차적으로 실행하되, 앞의 비동기 함수의 결과 값을 뒤의 비동기 함수에 인자로 전달하는 흐름! 여러개의 비동기 함수가 실행되고 마지막에 *callback(err,result마지막비동기함수값)* 함수가 실행된다!(수행 도중 에러가 발생하면 바로 err로 넘어간다!)

               1. > waterfall(tasks,[callback(err,[result])])

               2. ```
                  var async = require('async');
                  async.waterfall([
                                function(callback){
                                   asyncfunctionA(param,callback);
                                   //callback함수의 값을 반환할 예정!
                                },
                                //resultA는 위의 asyncfunctionA함수의 결과!
                                function(resultA,callback){
                                   asyncfunctionB(resultA,callback);
                                },
                                function(resultB,callback){
                                   asyncfunctionC(resultB,callback);
                                }
                               ], //task가 배열 형식, 즉 비동기 함수 여러개!
                               function(err,resultC){
                               //마지막 함수의 결과와 tasks들 중 err나면 여기서 바로 처리!
                                         if(err) errorHandler(err);
                                               // handle resultC
                                    }
                  );

                  ```

            2. series : waterfall과 거의 유사하나 각 비동기 함수들의 결과가 마지막 callback에 배열 형태로 넘겨준다! **서로 데이터에 대한 의존성은 없지만 순차적으로 실행이 되어야 하는 경우 등에 활용!** 

               1. > series(tasks,[callback]) 

               2. ```
                  var async = require('async');
                  async.series([
                    function(callback){
                      callback(null,'resultA');
                    },
                    function(callback){
                      callback(null,'resultB');
                    },
                    function(callback){
                      callback(null,'resultC');
                    }
                  ],
                  	function(err,results){
                        if(err)console.log(err);
                        console.log(results);
                  	}
                  );
                  ```

            3. parallel : 동시에 여러개의 task를 실행하는 방법으로 마치 멀티 Thread와 같은 효과를 낼 수 있어서 실행 시간을 단축시킬 수 있다. 에러 처리는 parallel로 수행중이던 task중에 에러가 발생하면 바로 최종 callback에 에러를 넘기는데 에러가 발생하지 않은 task들은 수행을 멈추지 않고 끝까지 수행한다. 효과적으로 사용될 수 있는 곳은 IO, 원격으로 여러개의 REST API를 동시 호출하거나, 또는 동시에 여러개의 쿼리를 조회하는 것들에 효과적으로 사용할 수 있다.

               1. > parallel(tasks,[callback])

               2. ```
                  var async = require('async');
                  ```


                  async.parallel([
                                function(callback){
                                   callback(null,'resultA');
                                },
                                function(callback){
                                   callback(null,'resultB');
                                },
                                function(callback){
                                   callback(null,'resultC');
                                }
                               ],
                               function(err,results){
    
                                         if(err) console.log(err);
    
                                         console.log(results)
    
                                               // handle resultC
                                    }
                  );
                  ```
    
         3. **promise** 
    
            1. 프로그래밍 패턴 중의 하나로 지연 응답을 통해서 동시성을 제어 하기 위한 목적으로 만들어졌다. promise패턴에서는 비동기 함수를 호출하면 promise라는 것을 리턴한다(미래 결과에 대한 약속). promise에 의해 정의된 로직에 따라 결과값을 처리한다. 
    
            2. e.g. 
    
               > var promise = asyncfunction(param1,param2);
    
               ```nodejs
               //비동기 함수 호출 뒤 결과 값에 상관 없이 promise라는 객체를 반환!
               var promise = asyncfuncion(param1,param2);
               //promise.then(결과처리함수(결과값),에러처리함수)
               promise.then(function(result)){ //해당 promise객체가 그 값을 여기서 처리!
                 //결과 처리 
               },function(err){
                 //에러 처리
               }
    
               ```
    
            3. promise를 리턴하는 비동기 함수의 형태, **resolved** 와 reject 인자, 성공적으로 실행될 때 resolved함수를 호출, 이때 인자로 결과값을 넣어서 넘긴다. 반대로 실패했을때는 rejected함수!
    
               ```
               function asyncfunction(param1,param2){
                 return new Promise(resolved,rejected){
                   if(성공) resolved(results)
                   else rejected(err)
                 }
               }
               ```
    
            4. promise tasks chaining : .then을 이용해서 비동기 함수 연쇄적으로 동기화처리
    
               ```
               var Promise = require('promise');
               var fs = require('fs');
               var src = '/tmp/myfile.txt';
               var des = '/tmp/myfile_promise2.txt';
                
                /*
                nodej의 비동기 함수들은 promise pattern을 지원하지 않는 경우가 많다. 
                지원하지 않는 일반 함수는 promise를 지원할 수 있게 변경해줘야 하고 
                방법은 Promise.denodeify(일반 함수)
                */
               var fread = Promise.denodeify(fs.readFile);
               var fwrite = Promise.denodeify(fs.writeFile);
                
               fread(src,'utf-8')
               .then(function(text){
                          console.log('Read done');
                          console.log(text);
                          return fwrite(des,text); // 체이닝을 하려면 return을 해줘야 함.
                     })
               .then(function(){           
                          console.log('Write done');
                     })
               //에러처리는 이렇게 then(1,2번째 인자), 2번째 인자가 error였는데 이걸 따로 빼놓은 것
               .catch(function(reason){   
                          console.log('Read or Write file error');
                          console.log(reason);
               });
    
               ```
    
            5. promise Error 처리
    
               1. ```nodejs
                  var Promise = require('promise');
                  var asyncfunction1 = function(param){
                        return new Promise(function(resolved,rejected){
                             setTimeout(
                                   function(){
                                         console.log('func1');
                                         resolved('func 1 success:'+param+'\n');
                                   },500);
                        });
                  }
                  var asyncfunction2 = function(param){
                        return new Promise(function(resolved,rejected){
                             setTimeout(
                                   function(){
                                         console.log('func2');
                                         rejected(new Error('func 2 error:'+param+'\n'));//error만 반환함으로 여기서 무조건 error가 터진다!
                                   },500);
                        });
                  }
                  var asyncfunction3 = function(param){
                        return new Promise(function(resolved,rejected){
                             setTimeout(
                                   function(){
                                         console.log('func3');
                                         resolved('func 3 success:'+param+'\n');
                                   },500);
                        });
                  }
                  var asyncfunction4 = function(param){
                        return new Promise(function(resolved,rejected){
                             setTimeout(
                                   function(){
                                         console.log('func4');
                                         rejected(Error('func 4 error:'+param+'\n'));
                                   },500);
                        });
                  }
                  var asyncfunction5 = function(param){
                        return new Promise(function(resolved,rejected){
                             setTimeout(
                                   function(){
                                         console.log('func5');
                                         resolved('func 5 success:'+param+'\n');
                                   },500);
                        });
                  }
                  var promise = asyncfunction1(' terry ');
                  promise
                  .then(asyncfunction2)
                  .then(asyncfunction3)
                  .catch(console.error) // errorhandler1
                  .then(asyncfunction4)
                  .then(asyncfunction5)
                  .catch(console.error)  // errorhandler2
                  .then(console.log);
    
                  ```
    
                  1. > //위의 코드 해석
                     >
                     > asyncfunction이 순서대로 되 있고 3, 4번에서 error를 일으킴.
                     >
                     > promise.then~ 부분을 잘보면 error잡는 errorhandler, catch 2개를 각각 3번,4번 함수 실행 후 잡는 것을 볼 수 있는데 이는 1,2,3번을 수행하던 중 에러가 발생하면 첫번째 errorhandler에서 에러처리되고 흐름을 끝내지 않고 다음 errorhandler에서 통제되는 4,5번을 수행한다. 4번에서 또 error가 발생함으로 5번은 실행되지 않고 4번의 에러가 잡힌다.
                     >
                     > 결과값
                     >
                     > func1
                     >
                     > func2
                     >
                     > [Error: func 2 error:func 1 success: terry]
                     >
                     > func4
                     >
                     > [Error: func 4 error:undefined]
                     >
                     > undefined
    
                  2. 즉, catch문은 전체를 잡는 것이 아닌 앞서 있는 then안의 함수까지만 error를 잡고 그 다음의 then이 수행하는 것을 막지 못한다. errorHadler를 부분적으로 잡아줘서 부분적으로 수행을 시킬 수도 있겠다.


동기화 문제 

- request하는 함수 용 파일, DataBase에 데이터 넣는 파일, 두 개의 파일에서 모듈화된 함수를 부르는 파일이 다 다르기 때문에 비동기에선 절대 해결이 안된다. 이유는 데이터의 흐름 : url -> totalcount -> data -> DB에 넣기 이렇게 진행하는데 각 모듈에서 나오는 함수이기 때문에 흐름이 제대로 진행이 안된다. 따라서 request 파일 안에서 동기화를 따로 진행하고 (async.waterfall로 진행 함) ->restmodel안에서 따로 동기화를 진행하고(async.waterfall로 진행 예정) -> 이 전체를 app.js에서 server 켜질 때 바로 진행할 예정

  - ```javascript
    // 동기화 해결 sample code

    //forrequest.js
    exports.getDataFromAPI = function(url,callback){
        var tasks = [
            function(callback){
                request({
                        url:url,
                        method:'GET'
                    },function(error,response,body) {
                        console.log('Status', response.statusCode);
                        var xml2 = body;
                        parseString(xml2, function (error, result) {
                            if (error) {
                                console.log("ERROR : " + error);
                                return;
                            }
                            var temp = result.response.body[0].totalCount;
                            console.log("temp :"+temp);
                            if(temp==null){
                                return -1;
                            }
                            var totalCount = parseInt(temp)
                            callback(null,url+'&numOfRows='+totalCount);
                        })
                    }
                );
            },

            function(data,callback){
                console.log("여기 값 나온다 : "+data);
                request({
                        url:data,
                        method:'GET'
                    },function(error,response,body) {
                        console.log('Status', response.statusCode);
                        var xml2 = body;
                        parseString(xml2, function (error, result) {
                            if (error) {
                                console.log("ERROR : " + error);
                                return;
                            }
                            var apidata = result.response.body[0].items[0];
                            console.log("Get API Data : "+apidata.item[0].airlineNm);

                            callback(null,apidata);
                        })
                    }
                );

            }
        ];
        async.waterfall(tasks,function(err,result){
            if(err)
                console.log(err);
            else
                console.log('성공!!'+result.item[0].airlineNm);
            callback(result);
        });
    }

    //app.js
    function func1(url,callback){
        rest_request.getDataFromAPI(url,callback);
        console.log("URL의 값 :"+url);
    }

    function allD(url) {
        console.log("allD에서 URL 값 : "+url);
        func1(url,function(result){
            console.log("여기가 나와야 되는데 : "+result.item[0].airlineNm);
        })
    }

    allD(url_temp);

    ```



### Airport API Project

- 사용 API 

  - > [인천공항] 여객편 주간 운항 현황 - 도착 / [인천공항] 여객편 주간 운항 현황 - 출발
    >
    > [항공기 운항 정보] 공항코드 / 국내선 운항 스케줄 / 실시간 운항정보 / 국제선 운항 스케줄
    >
    > [국내항공운항정보 서비스] 항공운행정보목록조회 / 공항목록조회 / 항공사 목록 조회

  - Streaming - Domestic : [국내항공운항정보 서비스 API] 항공운행 정보목록조회 API를 통해서 실시간으로 국내선 항공 운행 데이터 Request 요청, (왕복 가정) 4번의 Traffic((TotalCount + Data) *2) **수행 일일 Traffic 1000건 제한으로 일일 250번의 요청 밖에 할 수 없다** .

  - Batch 

    - International : [항공기 운항 정보] 실시간 운항정보 목록 API를 day by day 로 호출(2번의 Traffic임으로 일일 Traffic 제한 문제 없음) , 실시간 운항정보 목록인 만큼 결항 등의 사유 문제로 데이터가 변화할 수 있다. 가장 큰 문제점은 **당일 데이터 밖에 받아 오지 못함으로 이미 지난 날짜의 비행기 또는 당일 국제선 비행기 밖에 검색하지 못한다** .  
    - Airport Schedules : [인천공항] 여객편 주간 운항 현황 - 도착, 출발 API를 호출(호출 당일로부터 6일 후 까지 데이터), day by day로 호출해서 당일 날짜가 없으면 Request해서 데이터 저장. **인천공항 API 밖에 존재하지 않아 다른 공항 Airport Schedules은 못 갖고 온다** (이 문제는 [항공기 운항 정보] 국내선 운항 스케줄 API를 통해서 구현 가능, 해결 못함).

  - 프로젝트 구조

    - express-generator 사용, 프로젝트 구조화
    - Backend는 router 디렉토리에서 모든 기능 수행

- 구현 하지 못한 부분

  - Airport Schedules : 국내선 , 국제선 운항 스케줄 API를 분석해서 공항 별 운항 스케줄 구현 못함(인천공항만)
  - 검색 자동완성 기능 : 국제선 예약 시 공항 검색 자동완성 기능 구현 못함
  - unirest 오픈소스 라이브러리 사용 : 매우 가벼운 HTTP request 오픈소스 라이브러리 사용 못함