<template lang="pug">
.shutter
</template>
<script setup>

</script>
<style scoped lang="scss">
.shutter{
  position:fixed;
  top:0;
  left:0;
  right:0;
  bottom:0;
  background-color:#1e1e1e;
  z-index:9999;
  opacity: 1;
  animation: byeShutter 2.6s forwards;
  
  &::before{
    content:'';
    position:absolute;
    top:0;
    left:0;
    right:0;
    margin:auto;
    background-color:#fff1a8;
    width:1px;
    height:0px;
    animation: shutterOpen 2.6s infinite;
  }
}

.content{
  animation: contentScale 2.6s forwards;
}

@keyframes byeShutter{
  0%{
    opacity:1;
  }
  70%{
    opacity:1;
  }
  99%{
    opacity:0;
  }
  100%{
    opacity:0;
    display:none;
    z-index:-1;
  }
}

@keyframes shutterOpen{
  0%{
    width:1px;
    height:0;
    background-color:#fff1a8;

  }
  50%{
    width:1px;
    height:100%;
    background-color:#fff1a8;
  }
  90%{
    width:100%;
    height:100%;
    background-color:#fff;

  }
  100%{
    background-color:#fff;
    width:100%;
    height:100%;
  }
}

@keyframes contentScale{
  70%{
    transform:perspective(800px) scale(0.9) rotateX(15deg);
  }
  100%{
    transform:perspective(800px) scale(1) rotateX(0);
  }
}
</style>