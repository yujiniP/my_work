# 작업 순서


## 작업 시작 시

현재 브랜치 : master

### 현재 상태 확인

`
git status
`
현재 프로젝트 폴더의 변경사항은 있는 지 확인합니다.

### 원격 저장소 내용 업데이트

`
git pull origin master
`
원격 저장소(gitlab)에 변경 내용이 있을 수도 있으니 한번 다운 받아서 확인합니다.
변경된 내용이 있다면 로컬 작업 폴더에 받아지고, 병합됩니다.

### 작업 브랜치(가지) 생성

`
git checkout -b 작업 브랜치명
`
우리는 master에서 작업을 하지 않고 새로운 브랜치를 생성하여 작업합니다.
작업을 할 브랜치를 생성합니다.

작업 브랜치명 규칙 : park-작업시작날짜
ex) 새로운 작업을 시작하는 날짜가 10월 11일 이라면
park-1011 이라는 브랜치명을 사용합니다.

### 걸프 시작 전 준비

걸프를 실행하기 전에 사용할 스프라이트 이미지가 있다면 만들어서 폴더에 넣어놓고
신규 페이지라면 html 페이지도 생성하여 만들어 놓습니다.
-> 걸프를 돌리기 전에 작업해야할 소스들을 준비하는 과정입니다.

### gulp 실행

`
gulp
`
걸프를 실행하여 서버를 띄우고 작업을 시작합니다.

## 작업 완료 시

현재 브랜치 : 위에서 생성한 작업 브랜치

### 현재 상태 확인

`
git status
`
작업한 파일들을 확인합니다.

### 작업 내용을 커밋 하기전 대기상태(인덱스)로 이동시킵니다.

`
git add -A
`
작업 내용을 두번째 단계인 인덱스(Index)로 이동시킵니다.
커밋하기전에 대기시키는 장소라고 보면 됩니다.

### 대기중인 파일을 커밋합니다.( 작업 내용 확정 )

`
git commit
`
대기중인 파일을 커밋합니다. 작업한 내용을 확정하는 단계입니다.
아직 원격저장소(gitlab)에는 반영이 되지는 않습니다.

위 명령어를 입력하면 내용을 입력 하는 곳이 나옵니다.
Insert 키를 누르면 하단에 -- 끼워넣기 -- 하는 텍스트가 나옵니다.
이 텍스트가 나온 경우에만 내용을 입력할 수 있습니다.
첫번째 줄은 제목입니다.
한칸 띄고 다음 줄은 설명글입니다.
아래처럼 설명부분에 상세하게 적으면 됩니다.

ex)
서브 페이지 마크업

- 알립니다 게시판 작업
- 회사소개 페이지 작업

다 적었으면 esc 를 누르면 --끼워넣기-- 텍스트가 사라집니다.
shift 누르고 : 땡떙 누르면 화면에 : <- 표시가 뜹니다.
wq 라고 작성하고 엔터 누르면 커밋이 완료됩니다!

### 원격 저장소에 올리기(push)

이제 원격저장소(gitlab)에 올립니다.
`
git push origin 작업 브랜치
`
자신이 작업한 브랜치 명을 푸시합니다.
그럼 작업이 완료됩니다.

참고할 만한 사이트입니다.
https://rogerdudler.github.io/git-guide/index.ko.html

# gulp default project

### sprite image

#### 이미지 저장

images > sprite 폴더에 카테고리별로 폴더 생성
반응형(x2) 이미지 사용 시 원본 이미지와 사이즈가 2배 큰 이미지 필요

이미지 파일명은 아래처럼 합니다.

원본 이미지 : sample.png
레티나 이미지 : sample@2x.png

'@2x'를 꼭 붙여줘야 합니다.

#### scss 사용 방법

생성된 스프라이트 scss 파일을 사용할 파일의 상단에 import 되있어야 합니다.
`
@import "./sprite/_default-sprite";
.header{
	h1{
		@include sprite( $icon-btn_mob_menu );
	}
}
`

레티나 이미지 사용시 아래 mixin 적용해야합니다.
레티나 이미지명은 그룹 명으로 작성합니다.(스프라이트 scss파일에서 확인할 수 있습니다.)
`
@include retina-sprites($retina-groups);
@include mob{
	.header{
		h1{
			@include retina-sprite( $icon-btn-mob-menu-group );
		}
}
`
