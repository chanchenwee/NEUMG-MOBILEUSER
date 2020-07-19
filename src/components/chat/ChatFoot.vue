<template>
  <div class="foot-wrapper">
    <input class="chat-input" type="text" name="" @keyup.enter="send(msg)" v-model="msg">
    <span class="chat-sub" :class="{'primary':!!msg}" @click="send(msg)">发送</span>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        msg: '',
        webSocket: null,
      }
    },
    created() {
      // 页面打开就建立连接，根据业务需要
      this.initSocket()
    },
    destroyed() {
      // 页面销毁关闭连接
      this.webSocket.close()
    },
    methods: {
      // 建立连接
      initSocket() {
        // 有参数的情况下：
        let url = `ws://localhost:8082/chat`
        this.webSocket = new WebSocket(url)
        this.webSocket.onopen = this.webSocketOnOpen
        this.webSocket.onclose = this.webSocketOnClose
        this.webSocket.onmessage = this.webSocketOnMessage
        this.webSocket.onerror = this.webSocketOnError
      },
      // 建立连接成功后的状态
      webSocketOnOpen() {
        console.log('websocket连接成功');
      },
      webSocketOnMessage(res) {
        console.log(res);
        this.webSocket.send("发送数据");
      },
      // 关闭连接
      webSocketOnClose() {
        this.webSocket.close()
        console.log('websocket连接已关闭');
      },
      //连接失败的事件
      webSocketOnError(res) {
        console.log('websocket连接失败');
        // 打印失败的数据
        console.log(res);
      },
      send(msg) {
        this.webSocket.send("发送数据");
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
  .foot-wrapper {
    background-color: #f1f1f1;
    height: 40px;
    flex-shrink: 0;
    display: flex;
    padding: 5px 10px;
    justify-content: space-between;
    border-top: solid 1px rgba(0, 0, 0, 0.1);

    .chat-input {
      height: 100%;
      width: 80%;
      border-radius: 10px;
      outline: none;
      border: none;
      box-sizing: border-box;
      padding: 5px;
    }

    .chat-sub {
      display: flex;
      background-color: rgba(0, 0, 0, 0.1);
      justify-content: center;
      align-items: center;
      height: 100%;
      width: 18%;
      border-radius: 10px;
      outline: none;
    }

    .primary {
      background-color: #3CAF36;
    }
  }
</style>
