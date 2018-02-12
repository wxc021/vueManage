<template>

	<div class="page error-page" style="background:#fff;">
        <img src="http://img1.vued.vanthink.cn/vuedfc93e699c2726c2fafa0ed056cba100d.jpg" alt="未找到页面"/>
        <p class="error-text">未找到相关页面！</p>
        <p class="error-text2">The Service Is Not Found.</p>
        <p class="ft">
            <a href="/" class="btn btn-info">返回首页</a>
        </p>
        <p>
            <a href="">联系我们</a>
        </p>
	</div>

</template>
<script>
    export default {
      data () {
        return {
        }
      },
      create() {
        console.log(this);
      }

    }

</script>
<style scope>
        .error-page{
            text-align: center;
            font-size: .75rem;
            height: 100%;
        }
        .error-page img{
            width: 12rem;
            margin-top: 1rem;
        }
        .error-text{
            font-size: 1.4rem;
            padding-bottom: .5rem;
            margin-bottom: 0;
            margin-top: -15px;
        }
        .error-text2{
            margin-top: 0;
            padding-top: .25rem;
            font-size:.8rem;
            color:#666;
        }
        .btn{
            display: inline-block;
            width: 150px;
            height: 35px;
            line-height: 35px;
            border-radius: 20px;
            background: #1ba1e2;
            color:#fff;
            text-decoration: none;
            font-size: .75rem;
        }
        a{
            color:#888;
            font-size: .75rem;
        }
</style>