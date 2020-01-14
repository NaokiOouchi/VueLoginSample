<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Login form</v-toolbar-title>
                <v-spacer />
              </v-toolbar>
              <v-card-text>
                <v-form ref="loginForm">
                  <v-text-field
                    name="login"
                    label="ユーザーID"
                    type="text"
                    v-model="model.userID"
                    :counter="10"
                    :rules="userIDRules"
                    required
                  />
                  <v-text-field
                    name="password"
                    label="パスワード"
                    id="password"
                    type="password"
                    v-model="model.password"
                    :counter="32"
                    :rules="passwordRules"
                    required
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn color="primary" @click="login" :loading="loading"
                  >Login</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Axios from "axios";
export default {
  data: () => ({
    loading: false,
    userIDRules: [
      v => !!v || "ユーザーIDは必須項目です。",
      v => (v && v.length <= 10) || "ユーザーIDは10文字以内で入力してください。"
    ],
    passwordRules: [
      v => !!v || "パスワードは必須項目です。",
      v => (v && v.length <= 32) || "パスワードは32文字以内で入力してください。"
    ],
    model: {
      userID: "",
      password: ""
    }
  }),

  methods: {
    login() {
      // バリデーションが通った場合
      if (this.$refs.loginForm.validate()) {
        // ぐるぐる表示にしてボタンを二度押しできなくする
        this.loading = true;
        // APIでログイン認証を行う
        Axios.post("http://localhost:8080/api/auth/login", this.model)
          .then(res => {
            // 成功した場合
            if (res.data.result) {
              // ログイン情報を store に保存
              this.$store.dispatch("setLoginInfo", res.data);
              // 元の画面に戻る
              this.$router.push({
                path:
                  "backuri" in this.$route.query &&
                  this.$route.query.backuri.match(/^\//)
                    ? this.$route.query.backuri
                    : "/"
              });
              // メールアドレスとパスワードが正しくない組み合わせだった場合
            } else {
              this.loading = false;
              alert(Object.values(res.data.errors).join("\n"));
            }
          })
          .catch(error => {
            alert(
              "処理が正しく行えませんでした。時間をおいてやり直してください。"
            );
            this.loading = false;
          });
      }
    }
  }
};
</script>
