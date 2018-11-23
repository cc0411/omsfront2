<template>
  <d2-container>
    <div>
      <div class="wrapper wrapper-content">
        <el-row>
          <el-col>
            <div class="text-center ">
              <br>
              <br>
              <h3 class="font-bold">欢迎您，{{userInfo.name}}</h3>
              <div class="">
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <div style="position:relative">
                  <div style="position:absolute;width:100%;height:100%;left:0px;top:0px;background:#000;filter:alpha(opacity=0);opacity:0"></div>
                  <iframe allowtransparency="true" scrolling="no" src="//tianqi.2345.com/plugin/widget/index.htm?s=2&amp;z=3&amp;t=0&amp;v=0&amp;d=3&amp;bd=0&amp;k=&amp;f=&amp;q=1&amp;e=0&amp;a=0&amp;c=54511&amp;w=385&amp;h=96&amp;align=left" width="385" height="96" frameborder="0"></iframe>
                </div>

              </div>
            </div>
          </el-col>
        </el-row>
      </div>

    </div>
  </d2-container>

</template>

<script>

export default {
    props:{
        userInfo:{
            required:true,
            type:Object
        }
    },
}
</script>

<style  scoped>
  .text-center {
    text-align: center;
  }
</style>
