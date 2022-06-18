# MyHome Backend

## 기능

1. 북마크 중 유튜브 채널 링크일 때의 데이터 수집 및 전달
   - 스크랩 허용 범위 : https://www.youtube.com/robots.txt
     - /channel/\*/community 만 제한됨
   - youtube 링크 데이터 get & html 분석 : playwright
   - 채널 대표 이미지 가져오기
     - `#channel-header-container -> img #img 의 src`
     - CSS
       ```
       width: 80px;
       height: 80px;
       border-radius: 50%;
       overflow: hidden;
       background-color: transparent;
       ```
   - 최신 동영상 확인하기 : `#items -> #dismissible`
     - https://www.youtube.com/channel/{CHANNEL_ID["uzu"]}/videos?view=0&sort=dd&shelf_id=0
     - 썸네일 이미지 : `a #thumbnail -> img #img의 src`
     - 링크 id : `a #thumbnail의 href`
     - 시간 : `#details -> # metadata-line -> span 2번째`
   - CORS 이슈 : https://evan-moon.github.io/2020/05/21/about-cors/

## 제한

- https://ny0011.github.io/myhome/ 에서 오는 요청만 받기 가능할까?

## 배포

- heroku

  - https://velog.io/@apjammanbo/Backend-%EB%B0%B0%ED%8F%AC%ED%95%98%EA%B8%B0

- heroku에서 playwright 사용하기
  - https://playwright.tech/blog/running-playwright-on-heroku
    ```
    heroku buildpacks:set https://github.com/mxschmitt/heroku-playwright-buildpack -a <my-app>
    ```
  - 또는 heroku -> settings -> buildpack에 추가
    ```
    https://github.com/mxschmitt/heroku-playwright-buildpack
    heroku/nodejs
    ```
  - heroku -> settings -> config vars에 추가
    ```
    PLAYWRIGHT_BUILDPACK_BROWSERS chromium
    ```

## study

- Controller = router. url을 받고 함수를 리턴
- service = 함수가 정의된 곳
