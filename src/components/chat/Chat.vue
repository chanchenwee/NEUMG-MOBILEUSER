<template>
  <div class="chat">
    <!-- <chat-head></chat-head> -->
    <chat-body></chat-body>
    <!-- <chat-foot></chat-foot> -->
  </div>
  <!-- <group-info></group-info> -->
</template>

<script>
import ChatHead from './ChatHead'
import ChatBody from './ChatBody'
import ChatFoot from './ChatFoot'
// import GroupInfo from './GroupInfo'

export default {
  components: {
    ChatHead,
    ChatBody,
    ChatFoot
    // GroupInfo
  }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
html {
  height: 100%;
}

body {
  height: 100%;
}
.chat{
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
}

</style>
