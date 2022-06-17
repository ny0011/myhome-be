# MyHome Backend

## 기능

1. 북마크 중 유튜브 채널 링크일 때의 데이터 수집 및 전달
   - youtube 링크 데이터 get : fetch
   - html 분석 : node-html-parser
   - 채널 대표 이미지 삽입
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
