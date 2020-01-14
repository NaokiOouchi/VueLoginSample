VueLoginSample
# VuejsNodejsSample
## Vue.js + Node.js Vuetify Login Sample
## 概要
Node.js Vue.js + Vuetifyを使用して、
ログイン　→　データ取得までを確認できるサンプルプロジェクトです。
## 構築
### frontend
```
cd ./VueLoginSample
```
```
cd frontend
npm install
npm run serve
```
access to http://localhost:8000/ or http://localIPAddress:8000/
### backend
```
cd backend/
npm install
npm start
```

## 概要
frontend  
```
src/router
ルーティング処理、storeの状態によるログインページリダイレクト処理を記載しています。

store/module/auth.js
状態保持モデル、状態保持処理を記載しています。

store/index.js
store設定を記載しています。

views/Login.vue
ログインフォーム、認証APIへのリクエスト処理を記載しています。

Home.vue
データ取得APIへのリクエスト処理、レスポンスの出力処理を記載しています。

```

backend  
```
index.js
簡易認証処理、データ返却処理を記載しています。
```

参考サイト

[Vue.js + Vuetify でログインしないと閲覧できないSPAサイトを作成する](https://qiita.com/trustbank_kei/items/3739002c3bcaa88aaab8#srcviewshogevue)

[(初学者向け)Vue CLI + Vuetify.jsで爆速モックアップ](https://qiita.com/kakakikiup1/items/dd6e96e79343cfb26c69)