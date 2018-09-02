#### 多使用注释
#### 本MarkDown用于记录遇到的问题，不是详细的项目步骤

### 前期准备
- **远程连接github仓库时报错**  
`fatal: remote origin already exists`
    - **解决方法**：清空github仓库，重新连接 
``` 
git remote rm origin	//移除仓库
git remote add origin 仓库地址	//重新连接仓库
```
### axios
- **配置api路径**的时候
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
- **aixos使用方法**
    - 相应组件引入axios
    - 使用生命周期钩子mounted()
    - 使用methods:{}写axios请求get和成功回调函数
    - 回调函数中，赋值给data或传入子组件
    