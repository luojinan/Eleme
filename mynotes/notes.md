### TO DO LIST
1. 商家公告弹窗怎么首次进入也能滚动啊？
1. 菜单栏怎么垂直居中啊？
2. 商品栏怎么通过伪类选择器使li最后一个不加border啊？

----
### 项目重点知识
- 背景图片半透明样式
- better-scroll首次进入能滚动
- 类型栏与商品栏能做到匹配（与***去哪儿***城市搜索对比）
    - 点击匹配
    - 滚动匹配
- 购物车添加动画效果
----
#### 多使用注释
#### 本MarkDown用于记录遇到的问题，不是详细的项目步骤
----
### 前期准备
- **远程连接github仓库时报错**  
`fatal: remote origin already exists`
    - **解决方法**：清空github仓库，重新连接 
``` 
git remote rm origin    //移除仓库
git remote add origin 仓库地址  //重新连接仓库
```
----
### axios
- **一、配置api路径**
```
proxyTable: {
        '/api/':{
            target:'http://localhost:8088',
            pathRewrite:{
                '^/api':'/static/mock'
            }
        }
    },
```
**不能漏了**`target:'http://localhost:8088',`
- **二、aixos使用方法**
    - 相应组件引入axios
    - 使用生命周期钩子mounted()
    - 使用methods:{}写axios请求get和成功回调函数
    - 回调函数中，赋值给data或传入子组件
----
### CSS样式
- **一、透明背景**
```
z-index: -1;    /*置于底层*/
filter: blur(10px); /*模糊图片样式*/
```
并在**主div**中设置灰色半透明背景颜色`background-color: rgba(7,17,27,0.5);`  
- **二、多余内容隐藏，省略号**
```
white-space: nowrap;    /*省略号*/
overflow: hidden;   /*隐藏内容*/
text-overflow: ellipsis;    /*省略号*/
```
### 公共组件传值

### 公共组件插槽封装

### 字体问题

### 评分组件

### 滚动功能
- 首次进入也米娜better-scroll不生效刷新或切换设备才能生效
    - 问答，要确保Dom把内容撑开，而挂载在mounted上，是肯定已经撑开了的

### 动画效果组件
```
<template>
    <!--vue内置动画-->
    <!--组件内有内容，要加插槽-->
    <transition>
        <slot></slot>
    </transition>
</template>

<script>
export default {
    name:'Fafe',
}
</script>

<style>
    /*自动会有class，不用在template中设置*/
    .v-enter , .v-leave-to{
        opacity:0;
    }
    .v-enter-active, .v-leave-active{
        transition: opacity .5s
    }
</style>
```

----
1. 把**首页商品**滚动功能做好，看看首次进入是否生效，不生效怎么解决，可以尝试在v-show部分直接使用滚动
2. 完成后做详情界面
3. 一定要快啊


### 滚动联动
- 遇到问题：渲染后获取DOM的高度，首次进入不生效，貌似没有DOM，要代码刷新，页面才能有DOM。异步原因？？？
