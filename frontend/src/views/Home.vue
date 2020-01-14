<template>
  <div>
    {{model}}
  </div>
</template>

<script>
import Axios from "axios";
import Vue from "vue";
import store from "@/store/index.js";
export default {
  data: () => ({
    model: {
      title: "", // ここでは API から title, description を取得するものとします
      description: ""
    }
  }),
  methods: {
    loadData() {
      // APIにアクセスして情報を取得
      Axios.post("http://localhost:8080/api/data/get", {
        headers: {
          Authorization: "Bearer " + store.state.auth.login.token
        }
      })
        .then(res => {
          // 成功時、取得した情報を格納
          this.model = res.data;
        })
        .catch(error => {
          // トークンが正しくなければログイン画面にリダイレクト
          if (error.response.status == 401) {
            this.$router.push({
              path: "/login",
              query: { backuri: this.$route.fullPath }
            });
          } else {
            alert(
              "情報を取得できませんでした。時間をおいてやり直してください。"
            );
          }
        });
    }
  },
  created: function() {
    // 画面アクセス時にAPIにアクセスするようにする
    this.loadData();
  }
};
</script>
