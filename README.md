# [Assignment 7] 카닥

### 원티드x위코드 백엔드 프리온보딩 과제 7
회고록 : https://become-clear.tistory.com/89
<br>

## 📖 과제 내용

### [필수 포함 사항]

- READ.ME 작성
    - 프로젝트 빌드, 자세한 실행 방법 명시
    - 구현 방법과 이유에 대한 간략한 설명
    - **서버 구조 및 디자인 패턴에 대한 개략적인 설명**
    - 완료된 시스템이 배포된 서버의 주소
    - 해당 과제를 진행하면서 회고 내용 블로그 포스팅
- Swagger나 Postman을 이용하여 API 테스트 가능하도록 구현

</br>

## 1. 배경 및 공통 요구사항

<aside>
😁 **카닥에서 실제로 사용하는 프레임워크를 토대로 타이어 API를 설계 및 구현합니다.**

</aside>

- 데이터베이스 환경은 별도로 제공하지 않습니다.
 **RDB중 원하는 방식을 선택**하면 되며, sqlite3 같은 별도의 설치없이 이용 가능한 in-memory DB도 좋으며, 가능하다면 Docker로 준비하셔도 됩니다.
- 단, 결과 제출 시 README.md 파일에 실행 방법을 완벽히 서술하여 DB를 포함하여 전체적인 서버를 구동하는데 문제없도록 해야합니다.
- 데이터베이스 관련처리는 raw query가 아닌 **ORM을 이용하여 구현**합니다.
- Response Codes API를 성공적으로 호출할 경우 200번 코드를 반환하고, 그 외의 경우에는 아래의 코드로 반환합니다.

[Code](https://www.notion.so/44aa1eaa5f9b4e4fa2982a325dae404e)

---

## 2. 사용자 생성 API

🎁 **요구사항**

- ID/Password로 사용자를 생성하는 API.
- 인증 토큰을 발급하고 이후의 API는 인증된 사용자만 호출할 수 있다.

```jsx
/* Request Body 예제 */

 { "id": "candycandy", "password": "ASdfdsf3232@" }
```

---

## 3. 사용자가 소유한 타이어 정보를 저장하는 API

🎁 **요구사항**

- 자동차 차종 ID(trimID)를 이용하여 사용자가 소유한 자동차 정보를 저장한다.
- 한 번에 최대 5명까지의 사용자에 대한 요청을 받을 수 있도록 해야한다. 즉 사용자 정보와 trimId 5쌍을 요청데이터로 하여금 API를 호출할 수 있다는 의미이다.

```jsx
/* Request Body 예제 */
[
  {
    "id": "candycandy",
    "trimId": 5000
  },
  {
    "id": "mylovewolkswagen",
    "trimId": 9000
  },
  {
    "id": "bmwwow",
    "trimId": 11000
  },
  {
    "id": "dreamcar",
    "trimId": 15000
  }
]
```

🔍 **상세구현 가이드**

- 자동차 정보 조회 API의 사용은 아래와 같이 5000, 9000부분에 trimId를 넘겨서 조회할 수 있다.
 **자동차 정보 조회 API 사용 예제 → 
📄** [https://dev.mycar.cardoc.co.kr/v1/trim/5000](https://dev.mycar.cardoc.co.kr/v1/trim/5000)
**📄** [https://dev.mycar.cardoc.co.kr/v1/trim/9000
📄](https://dev.mycar.cardoc.co.kr/v1/trim/9000) [https://dev.mycar.cardoc.co.kr/v1/trim/11000
📄](https://dev.mycar.cardoc.co.kr/v1/trim/11000) [https://dev.mycar.cardoc.co.kr/v1/trim/15000](https://dev.mycar.cardoc.co.kr/v1/trim/15000)
- 조회된 정보에서 타이어 정보는 spec → driving → frontTire/rearTire 에서 찾을 수 있다.
- 타이어 정보는 205/75R18의 포맷이 정상이다. 205는 타이어 폭을 의미하고 75R은 편평비, 그리고 마지막 18은 휠사이즈로써 {폭}/{편평비}R{18}과 같은 구조이다.
 위와 같은 형식의 데이터일 경우만 DB에 항목별로 나누어 서로다른 Column에 저장하도록 한다.

---

## 4. 사용자가 소유한 타이어 정보 조회 API

🎁 **요구사항**

- 사용자 ID를 통해서 2번 API에서 저장한 타이어 정보를 조회할 수 있어야 한다.
</br>



## 🛠 사용 기술 및 Tools

### [Back-End] ![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)

### [Deploy] <img src="https://img.shields.io/badge/AWS_EC2-232F3E?style=for-the-badge&logo=Amazon&logoColor=white"/>

### [Etc.] <img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white"/>&nbsp;<img src="https://img.shields.io/badge/Github-181717?style=for-the-badge&logo=Github&logoColor=white"/>&nbsp;<img src="https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=Postman&logoColor=white"/> <img src="https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white">

<img src="https://user-images.githubusercontent.com/67426853/142720033-26301764-7bbe-4e6b-bc82-e9b19a3dbd3a.png" width=700>

<br>
<br>



## 📌 구현 방법

### 1. 사용자 생성 api
사용자 생성은 일반적인 회원가입으로 구현했고, 중복된 아이디로 시도할 경우 400코드와 메세지를 반환했습니다. <br>
로그인 시 성공했을 경우 jwt토큰을 발급하고, 이후 api는 해당 토큰을 헤더에 보내지 않으면 호출할 수 없도록 조치했습니다.

### 2. 사용자가 소유한 타이어 정보를 저장하는 API
Request Body를 배열 형태로 받고 배열의 길이가 5를 넘으면 400코드와 메세지를 반환했습니다.<br>
배열 길이가 5 이하인 요청에 대해서는 반복문을 돌며 각 요소마다 사용자id가 실존하는지, trimId로 조회한 정보가 유효한지,<br>
타이어 정보가 {폭}/{편평비}R{휠사이즈} 포맷에 부합하는지 유효성 체크를 하고 전부 정상으로 확인되었을 경우에만 db에 저장했습니다.<br>
그리고 api호출에 대한 리턴값으로는 위의 요청에서 정상적으로 저장된 데이터들을 배열로 반환했습니다. 
<br> <br>
그런데 README를 작성하는 시점에서 의문이 드는 지점이 있습니다. <br> 
한 번에 최대 5명의 각기 다른 사용자에 대한 요청을 받을 수 있는데 정작 이 api를 호출하는 주체는 한 명의 일반사용자라는 점입니다. <br> 
본인이 아닌 다른 사용자가 소유한 타이어 정보를 함부로 저장할 권한이 있으면 안 되는데, 현재로써는 다 같은 일반 사용자 개념만 두었기 때문에 추후에 사용자 권한을 나누고 권한에 따라 api접근 범주를 나누는 방식으로 보완이 가능할 것 같습니다.

### 3. 사용자가 소유한 타이어 정보 조회 api
해당 api 역시 호출 시 accessToken이 필요한데, 토큰에 이미 사용자 id정보를 담아두어서 별도의 파라미터를 받지 않고도 소유한 타이어 리스트를 조회하는 것이 가능하지만 다른 사용자의 타이어 정보도 확인할 수 있도록 사용자 id를 받아 리스트를 조회해 반환하도록 했습니다.


## 📖 API Document

[🔗 Postman Document](https://documenter.getpostman.com/view/8136495/UVJckGJu)

### API Test 방법 <br>

1. 다음 링크로 이동합니다. [postman 링크](https://www.postman.com/restless-escape-500858/workspace/cardoc/collection/8136495-0c0a58e0-2465-47cd-a6ed-48c6046ba9ec) <br>
2. 사용자 생성, 로그인 api 호출을 통하여 accessToken을 획득합니다. 
3. 사용자 생성, 로그인을 제외한 모든 api는 헤더에 accessToken을 추가해야 접근 가능합니다. 로그인 시 획득한 accessToken을 입력하면 해당 api를 요청할 수 있습니다.


## 🪄 설치 및 실행 방법

### 설치

1. 레포지토리를 clone 받습니다

```
$ git clone
```

2. clone한 경로에 들어간 후 의존성을 설치하고 환경 셋팅을 진행합니다.

```
$ cd cardoc
$ npm install
```

3. src 폴더에 docker-compose.yml 파일을 만들어 데이터베이스 연결을 설정합니다.

- Docker가 설치되어 있지 않다면 [여기](https://www.docker.com/get-started)에서 설치해 주세요
- [docker-compose.yml 노션 링크]()
- <details><summary><b>링크 접속불가 시 docker-compose 파일 설정 방법</b></summary>

  ```
  version: '3.1'
  services:

  db:
  image: mysql
  command: --default-authentication-plugin=mysql_native_password
  restart: always
  ports: - "3306:3306"
  environment:
  MYSQL_ROOT_PASSWORD: wanted
  MYSQL_DATABASE: wanted
  ```

</details>

4.서버를 구동합니다.

```
$ npm start
```

## 서버 url
[1] 배포: http://52.79.239.123:3000 <br>
[2] 로컬: http://localhost:3000


## Reference

이 프로젝트는 [원티드 프리온보딩 백엔드 코스](https://www.wanted.co.kr/events/pre_onboarding_course_4) 7차 과제 일환으로 카닥에서 출제한 과제를 기반으로 만들었습니다.

```

```
