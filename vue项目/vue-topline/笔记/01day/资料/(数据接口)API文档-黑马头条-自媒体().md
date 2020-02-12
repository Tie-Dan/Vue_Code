 黑马头条-自媒体



# 门户

## 查询所有已实现接口
<a id=查询所有已实现接口> </a>
### 基本信息

**Path：** /mp/

**Method：** GET

**接口描述：**
<p>线上接口地址&nbsp;<a href="http://ttapi.research.itcast.cn/app/">http://ttapi.research.itcast.cn/mp/</a><br>
返回已上线接口地址，形如：</p>
<pre><code data-language="json" class="lang-json">{
&nbsp;&nbsp;&nbsp; "user.Authorization": "/v1_0/authorizations",
&nbsp;&nbsp;&nbsp; "user.Captcha": "/v1_0/captchas/&lt;mobile:mobile&gt;",
&nbsp;&nbsp;&nbsp; "user.SMSVerificationCode": "/v1_0/sms/codes/&lt;mobile:mobile&gt;"
}

</code></pre>
<p>键为接口名称<br>
值为接口路径</p>


### 请求参数

### 返回数据

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key=name>名称</th><th key=type>类型</th><th key=required>是否必须</th><th key=default>默认值</th><th key=desc>备注</th><th key=sub>其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody">
               </tbody>
              </table>

# 用户

## 刷新用户token
<a id=刷新用户token> </a>
### 基本信息

**Path：** /mp/v1_0/authorizations

**Method：** PUT

**接口描述：**
<h4>1. 线上地址</h4>
<pre><code data-language="http" class="lang-http">http://ttapi.research.itcast.cn/mp/v1_0/authorizations

</code></pre>
<h3>2.&nbsp; 返回HTTP状态码</h3>
<p><strong>1. 201 OK</strong><br>
2. 400 请求参数错误<br>
3.&nbsp; 403 refresh_token<span class="colour" style="color:rgb(85, 85, 85)">未携带或已</span>过期<br>
4. 507 服务器数据库异常</p>
<h3>3. token说明</h3>
<p><strong>在Authorization 请求头中携带的token，格式为"Bearer "拼接上token，注意Bearer后有一个空格</strong></p>


### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Content-Type  |  application/json | 是  |   |   |
| Authorization  |   | 是  |  Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NDMyODQzNjYsInVzZXJfaWQiOjF9.mLYitrKsn4E4KdQd0CNPugKrH8uQmXEQTlG_JutC8jU |  refresh_token |
**Body**

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key=name>名称</th><th key=type>类型</th><th key=required>是否必须</th><th key=default>默认值</th><th key=desc>备注</th><th key=sub>其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody">
               </tbody>
              </table>

### 返回数据

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key=name>名称</th><th key=type>类型</th><th key=required>是否必须</th><th key=default>默认值</th><th key=desc>备注</th><th key=sub>其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key=0-0><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> message</span></td><td key=1><span>string</span></td><td key=2>必须</td><td key=3></td><td key=4><span>消息提示</span></td><td key=5></td></tr><tr key=0-1><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> data</span></td><td key=1><span>object</span></td><td key=2>非必须</td><td key=3></td><td key=4><span>数据</span></td><td key=5></td></tr><tr key=0-1-0><td key=0><span style="padding-left: 20px"><span style="color: #8c8a8a">├─</span> token</span></td><td key=1><span>string</span></td><td key=2>必须</td><td key=3></td><td key=4><span>用户token令牌</span></td><td key=5></td></tr>
               </tbody>
              </table>

## 用户认证（登录）
<a id=用户认证（登录）> </a>
### 基本信息

**Path：** /mp/v1_0/authorizations

**Method：** POST

**接口描述：**
<h4>1. 线上地址</h4>
<pre><code data-language="http" class="lang-http">http://ttapi.research.itcast.cn/mp/v1_0/authorizations
</code></pre>

<h3>2.&nbsp; 返回HTTP状态码</h3>
<p><strong>1. 201 OK</strong><br>
2. 400 请求参数错误<br>
&nbsp; &nbsp; &nbsp; &nbsp; 包括：参数缺失、手机号格式不正确、验证码失效等<br>
3.&nbsp; 403 用户非实名认证用户，无权限登录<br>
4. 507 服务器数据库异常</p>
<h3>3. token说明</h3>
<ol>
<li><code data-backticks="1">token</code>用于访问需要身份认证的普通接口，有效期2小时</li>
<li><code data-backticks="1">refresh_token</code>&nbsp;用于在token过期后，获取新的用户token，有效期14天</li>
</ol>


### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Content-Type  |  application/json | 是  |   |   |
**Body**

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key=name>名称</th><th key=type>类型</th><th key=required>是否必须</th><th key=default>默认值</th><th key=desc>备注</th><th key=sub>其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key=0-0><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> mobile</span></td><td key=1><span>string</span></td><td key=2>必须</td><td key=3></td><td key=4><span>手机号</span></td><td key=5></td></tr><tr key=0-1><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> code</span></td><td key=1><span>string</span></td><td key=2>必须</td><td key=3></td><td key=4><span>验证码</span></td><td key=5></td></tr>
               </tbody>
              </table>

### 返回数据

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key=name>名称</th><th key=type>类型</th><th key=required>是否必须</th><th key=default>默认值</th><th key=desc>备注</th><th key=sub>其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key=0-0><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> message</span></td><td key=1><span>string</span></td><td key=2>必须</td><td key=3></td><td key=4><span>消息提示</span></td><td key=5></td></tr><tr key=0-1><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> data</span></td><td key=1><span>object</span></td><td key=2>非必须</td><td key=3></td><td key=4><span>数据</span></td><td key=5></td></tr><tr key=0-1-0><td key=0><span style="padding-left: 20px"><span style="color: #8c8a8a">├─</span> token</span></td><td key=1><span>string</span></td><td key=2>必须</td><td key=3></td><td key=4><span>用户token令牌</span></td><td key=5></td></tr><tr key=0-1-1><td key=0><span style="padding-left: 20px"><span style="color: #8c8a8a">├─</span> refresh_token</span></td><td key=1><span>string</span></td><td key=2>必须</td><td key=3></td><td key=4><span>用于刷新token的令牌</span></td><td key=5></td></tr><tr key=0-1-2><td key=0><span style="padding-left: 20px"><span style="color: #8c8a8a">├─</span> id</span></td><td key=1><span>integer</span></td><td key=2>必须</td><td key=3></td><td key=4><span>用户id</span></td><td key=5></td></tr><tr key=0-1-3><td key=0><span style="padding-left: 20px"><span style="color: #8c8a8a">├─</span> name</span></td><td key=1><span>string</span></td><td key=2>必须</td><td key=3></td><td key=4><span>用户昵称</span></td><td key=5></td></tr><tr key=0-1-4><td key=0><span style="padding-left: 20px"><span style="color: #8c8a8a">├─</span> photo</span></td><td key=1><span>string</span></td><td key=2>必须</td><td key=3></td><td key=4><span>用户头像</span></td><td key=5></td></tr>
               </tbody>
              </table>

## 编辑用户头像
<a id=编辑用户头像> </a>

### 基本信息

**Path：** /mp/v1_0/user/photo

**Method：** PATCH

**接口描述：**

<h4>1. 线上地址</h4>
<pre><code data-language="http" class="lang-http">http://ttapi.research.itcast.cn/mp/v1_0/user/photo
</code></pre>

<h3>2.&nbsp; 返回HTTP状态码</h3>
<p><strong>1. 200 OK</strong><br>
3. 401 token过期或未传<br>
4. 507 服务器数据库异常</p>
<h3>3. token说明</h3>
<p><strong>在Authorization 请求头中携带的token，格式为"Bearer "拼接上token，注意Bearer后有一个空格</strong></p>


### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Content-Type  |  multipart/form-data | 是  |   |   |
| Authorization  |   | 是  |  Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NDMyODQzNjYsInVzZXJfaWQiOjF9.mLYitrKsn4E4KdQd0CNPugKrH8uQmXEQTlG_JutC8jU |  refresh_token |
**Body**

| 参数名称  | 参数类型  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| photo | file  |  否 |    |  头像图片 |



### 返回数据

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key=name>名称</th><th key=type>类型</th><th key=required>是否必须</th><th key=default>默认值</th><th key=desc>备注</th><th key=sub>其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key=0-0><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> message</span></td><td key=1><span>string</span></td><td key=2>必须</td><td key=3></td><td key=4><span>消息提示</span></td><td key=5></td></tr><tr key=0-1><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> data</span></td><td key=1><span>object</span></td><td key=2>非必须</td><td key=3></td><td key=4><span>数据</span></td><td key=5></td></tr><tr key=0-1-0><td key=0><span style="padding-left: 20px"><span style="color: #8c8a8a">├─</span> id</span></td><td key=1><span>integer</span></td><td key=2>必须</td><td key=3></td><td key=4><span>用户id</span></td><td key=5></td></tr><tr key=0-1-1><td key=0><span style="padding-left: 20px"><span style="color: #8c8a8a">├─</span> photo</span></td><td key=1><span>string</span></td><td key=2>非必须</td><td key=3></td><td key=4><span>头像url地址</span></td><td key=5></td></tr>
               </tbody>
              </table>

## 编辑用户资料
<a id=编辑用户资料> </a>
### 基本信息

**Path：** /mp/v1_0/user/profile

**Method：** PATCH

**接口描述：**
<h4>1. 线上地址</h4>
<pre><code data-language="http" class="lang-http">http://ttapi.research.itcast.cn/mp/v1_0/user/profile
</code></pre>

<h3>2.&nbsp; 返回HTTP状态码</h3>
<p><strong>1. 201 OK</strong><br>
3. 401 token过期或未传<br>
4. 507 服务器数据库异常</p>
<h3>3. token说明</h3>
<p><strong>在Authorization 请求头中携带的token，格式为"Bearer "拼接上token，注意Bearer后有一个空格</strong></p>


### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Content-Type  |  application/json | 是  |   |   |
| Authorization  |   | 是  |  Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NDMyODQzNjYsInVzZXJfaWQiOjF9.mLYitrKsn4E4KdQd0CNPugKrH8uQmXEQTlG_JutC8jU |  refresh_token |
**Body**

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key=name>名称</th><th key=type>类型</th><th key=required>是否必须</th><th key=default>默认值</th><th key=desc>备注</th><th key=sub>其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key=0-0><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> name</span></td><td key=1><span>string</span></td><td key=2>非必须</td><td key=3></td><td key=4><span>用户名</span></td><td key=5></td></tr><tr key=0-1><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> intro</span></td><td key=1><span>string</span></td><td key=2>非必须</td><td key=3></td><td key=4><span>头条号简介</span></td><td key=5></td></tr><tr key=0-2><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> email</span></td><td key=1><span>string</span></td><td key=2>非必须</td><td key=3></td><td key=4><span>邮箱</span></td><td key=5></td></tr>
               </tbody>
              </table>

### 返回数据

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key=name>名称</th><th key=type>类型</th><th key=required>是否必须</th><th key=default>默认值</th><th key=desc>备注</th><th key=sub>其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key=0-0><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> message</span></td><td key=1><span>string</span></td><td key=2>必须</td><td key=3></td><td key=4><span>消息提示</span></td><td key=5></td></tr><tr key=0-1><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> data</span></td><td key=1><span>object</span></td><td key=2>非必须</td><td key=3></td><td key=4><span>数据</span></td><td key=5></td></tr><tr key=0-1-0><td key=0><span style="padding-left: 20px"><span style="color: #8c8a8a">├─</span> id</span></td><td key=1><span>integer</span></td><td key=2>必须</td><td key=3></td><td key=4><span>用户id</span></td><td key=5></td></tr><tr key=0-1-1><td key=0><span style="padding-left: 20px"><span style="color: #8c8a8a">├─</span> name</span></td><td key=1><span>string</span></td><td key=2>非必须</td><td key=3></td><td key=4><span>用户名</span></td><td key=5></td></tr><tr key=0-1-2><td key=0><span style="padding-left: 20px"><span style="color: #8c8a8a">├─</span> intro</span></td><td key=1><span>string</span></td><td key=2>非必须</td><td key=3></td><td key=4><span>头条号简介</span></td><td key=5></td></tr><tr key=0-1-3><td key=0><span style="padding-left: 20px"><span style="color: #8c8a8a">├─</span> email</span></td><td key=1><span>string</span></td><td key=2>非必须</td><td key=3></td><td key=4><span>邮箱</span></td><td key=5></td></tr>
               </tbody>
              </table>

## 获取人机验证码（极验 API1）
<a id=获取人机验证码（极验 API1）> </a>
### 基本信息

**Path：** /mp/v1_0/captchas/:mobile

**Method：** GET

**接口描述：**

<h4>1 线上接口路径</h4>
<pre><code data-language="http" class="lang-http">http://ttapi.research.itcast.cn/mp/v1_0/captchas/:mobile
</code></pre>
<h4>2 返回HTTP状态码</h4>
<ol>
<li>200 OK</li>
<li>404 手机号不正确</li>
<li>507 服务器数据库异常</li>
</ol>
<h4>3 返回值</h4>
<pre><code data-language="json" class="lang-json">{
    "message": "OK",
    "data": {
        "success": 1,
        "gt": "f00de9ed073bd781c94509932a309159",
        "challenge": "e902f4f9b8b4e63dda3db1ae12ad018c",
        "new_captcha": true
    }
}
</code></pre>


### 请求参数
**路径参数**
| 参数名称 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| mobile |   |  手机号 |

### 返回数据

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key=name>名称</th><th key=type>类型</th><th key=required>是否必须</th><th key=default>默认值</th><th key=desc>备注</th><th key=sub>其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key=0-0><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> message</span></td><td key=1><span>string</span></td><td key=2>必须</td><td key=3></td><td key=4><span>消息提示</span></td><td key=5></td></tr><tr key=0-1><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> data</span></td><td key=1><span>object</span></td><td key=2>必须</td><td key=3></td><td key=4><span></span></td><td key=5></td></tr><tr key=0-1-0><td key=0><span style="padding-left: 20px"><span style="color: #8c8a8a">├─</span> success</span></td><td key=1><span>integer</span></td><td key=2>必须</td><td key=3></td><td key=4><span>GeeTest返回值</span></td><td key=5></td></tr><tr key=0-1-1><td key=0><span style="padding-left: 20px"><span style="color: #8c8a8a">├─</span> gt</span></td><td key=1><span>string</span></td><td key=2>必须</td><td key=3></td><td key=4><span>GeeTest返回值</span></td><td key=5></td></tr><tr key=0-1-2><td key=0><span style="padding-left: 20px"><span style="color: #8c8a8a">├─</span> challenge</span></td><td key=1><span>string</span></td><td key=2>必须</td><td key=3></td><td key=4><span>GeeTest返回值</span></td><td key=5></td></tr><tr key=0-1-3><td key=0><span style="padding-left: 20px"><span style="color: #8c8a8a">├─</span> new_captcha</span></td><td key=1><span>boolean</span></td><td key=2>必须</td><td key=3></td><td key=4><span>GeeTest返回值</span></td><td key=5></td></tr>
               </tbody>
              </table>

## 获取用户个人资料
<a id=获取用户个人资料> </a>
### 基本信息

**Path：** /mp/v1_0/user/profile

**Method：** GET

**接口描述：**
<h4>1. 线上地址</h4>
<pre><code data-language="http" class="lang-http">http://ttapi.research.itcast.cn/mp/v1_0/user/profile

</code></pre>
<h3>2.&nbsp; 返回HTTP状态码</h3>
<p><strong>1. 201 OK</strong><br>
3. 401 token过期或未传<br>
4. 507 服务器数据库异常</p>
<h3>3. token说明</h3>
<p><strong>在Authorization 请求头中携带的token，格式为"Bearer "拼接上token，注意Bearer后有一个空格</strong></p>


### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Content-Type  |  application/json | 是  |   |   |
| Authorization  |   | 是  |  Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NDMyODQzNjYsInVzZXJfaWQiOjF9.mLYitrKsn4E4KdQd0CNPugKrH8uQmXEQTlG_JutC8jU |  refresh_token |
**Body**

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key=name>名称</th><th key=type>类型</th><th key=required>是否必须</th><th key=default>默认值</th><th key=desc>备注</th><th key=sub>其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody">
               </tbody>
              </table>

### 返回数据

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key=name>名称</th><th key=type>类型</th><th key=required>是否必须</th><th key=default>默认值</th><th key=desc>备注</th><th key=sub>其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key=0-0><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> message</span></td><td key=1><span>string</span></td><td key=2>必须</td><td key=3></td><td key=4><span>消息提示</span></td><td key=5></td></tr><tr key=0-1><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> data</span></td><td key=1><span>object</span></td><td key=2>非必须</td><td key=3></td><td key=4><span>数据</span></td><td key=5></td></tr><tr key=0-1-0><td key=0><span style="padding-left: 20px"><span style="color: #8c8a8a">├─</span> id</span></td><td key=1><span>integer</span></td><td key=2>必须</td><td key=3></td><td key=4><span>用户id</span></td><td key=5></td></tr><tr key=0-1-1><td key=0><span style="padding-left: 20px"><span style="color: #8c8a8a">├─</span> name</span></td><td key=1><span>string</span></td><td key=2>必须</td><td key=3></td><td key=4><span>用户名</span></td><td key=5></td></tr><tr key=0-1-2><td key=0><span style="padding-left: 20px"><span style="color: #8c8a8a">├─</span> intro</span></td><td key=1><span>string</span></td><td key=2>必须</td><td key=3></td><td key=4><span>头条号简介</span></td><td key=5></td></tr><tr key=0-1-3><td key=0><span style="padding-left: 20px"><span style="color: #8c8a8a">├─</span> photo</span></td><td key=1><span>string</span></td><td key=2>必须</td><td key=3></td><td key=4><span>用户头像</span></td><td key=5></td></tr><tr key=0-1-4><td key=0><span style="padding-left: 20px"><span style="color: #8c8a8a">├─</span> email</span></td><td key=1><span>string</span></td><td key=2>必须</td><td key=3></td><td key=4><span>邮箱</span></td><td key=5></td></tr><tr key=0-1-5><td key=0><span style="padding-left: 20px"><span style="color: #8c8a8a">├─</span> mobile</span></td><td key=1><span>string</span></td><td key=2>必须</td><td key=3></td><td key=4><span>手机号</span></td><td key=5></td></tr>
               </tbody>
              </table>

## 获取短信验证码 (极验 API2）
<a id=获取短信验证码 (极验 API2）> </a>
### 基本信息

**Path：** /mp/v1_0/sms/codes/:mobile

**Method：** GET

**接口描述：**
<h4>1 线上接口路径</h4>
<pre><code data-language="http" class="lang-http">http://ttapi.research.itcast.cn/mp/v1_0/sms/codes/:mobile
</code></pre>
<h4>2 返回HTTP状态码</h4>
<ol>
<li>200 OK</li>
<li>404 手机号不正确</li>
<li>400  本次验证极验GeeTest 已失效</li>
<li>403  极验验证失败</li>
<li>507 服务器数据库异常</li>
</ol>


### 请求参数
**路径参数**
| 参数名称 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| mobile |   |  手机号 |
**Query**

| 参数名称  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ |
| challenge | 是  |   |  GeeTest API2 参数 |
| validate | 是  |   |  GeeTest API2 参数 |
| seccode | 是  |   |  GeeTest API2 参数 |

### 返回数据

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key=name>名称</th><th key=type>类型</th><th key=required>是否必须</th><th key=default>默认值</th><th key=desc>备注</th><th key=sub>其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key=0-0><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> message</span></td><td key=1><span>string</span></td><td key=2>必须</td><td key=3></td><td key=4><span>消息提示</span></td><td key=5></td></tr><tr key=0-1><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> data</span></td><td key=1><span>object</span></td><td key=2>非必须</td><td key=3></td><td key=4><span>数据</span></td><td key=5></td></tr><tr key=0-1-0><td key=0><span style="padding-left: 20px"><span style="color: #8c8a8a">├─</span> mobile</span></td><td key=1><span>string</span></td><td key=2>必须</td><td key=3></td><td key=4><span>发送短信的手机号</span></td><td key=5></td></tr>
               </tbody>
              </table>

## 获取粉丝列表
<a id=获取粉丝列表> </a>
### 基本信息

**Path：** /mp/v1_0/followers

**Method：** GET

**接口描述：**
<h4>1. 线上地址</h4>
<pre><code data-language="http" class="lang-http">http://ttapi.research.itcast.cn/mp/v1_0/followers

</code></pre>
<h3>2.&nbsp; 返回HTTP状态码</h3>
<p><strong>1. 200 OK</strong><br>
3. 401 token过期或未传<br>
4. 507 服务器数据库异常</p>
<h3>3. token说明</h3>
<p><strong>在Authorization 请求头中携带的token，格式为"Bearer "拼接上token，注意Bearer后有一个空格</strong></p>


### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Content-Type  |  application/json | 是  |   |   |
| Authorization  |   | 是  |  Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NDMyODQzNjYsInVzZXJfaWQiOjF9.mLYitrKsn4E4KdQd0CNPugKrH8uQmXEQTlG_JutC8jU |  refresh_token |
**Query**

| 参数名称  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ |
| page | 否  |   |  页数 |
| per_page | 否  |   |  每页数量 |
**Body**

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key=name>名称</th><th key=type>类型</th><th key=required>是否必须</th><th key=default>默认值</th><th key=desc>备注</th><th key=sub>其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody">
               </tbody>
              </table>

### 返回数据

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key=name>名称</th><th key=type>类型</th><th key=required>是否必须</th><th key=default>默认值</th><th key=desc>备注</th><th key=sub>其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key=0-0><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> message</span></td><td key=1><span>string</span></td><td key=2>必须</td><td key=3></td><td key=4><span>消息提示</span></td><td key=5></td></tr><tr key=0-1><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> data</span></td><td key=1><span>object</span></td><td key=2>非必须</td><td key=3></td><td key=4><span>数据</span></td><td key=5></td></tr><tr key=0-1-0><td key=0><span style="padding-left: 20px"><span style="color: #8c8a8a">├─</span> total_count</span></td><td key=1><span>integer</span></td><td key=2>非必须</td><td key=3></td><td key=4><span>粉丝总数</span></td><td key=5></td></tr><tr key=0-1-1><td key=0><span style="padding-left: 20px"><span style="color: #8c8a8a">├─</span> page</span></td><td key=1><span>integer</span></td><td key=2>非必须</td><td key=3></td><td key=4><span>当前页数</span></td><td key=5></td></tr><tr key=0-1-2><td key=0><span style="padding-left: 20px"><span style="color: #8c8a8a">├─</span> per_page</span></td><td key=1><span>integer</span></td><td key=2>非必须</td><td key=3></td><td key=4><span>每页数量</span></td><td key=5></td></tr><tr key=0-1-3><td key=0><span style="padding-left: 20px"><span style="color: #8c8a8a">├─</span> results</span></td><td key=1><span>object []</span></td><td key=2>非必须</td><td key=3></td><td key=4><span></span></td><td key=5><p key=3><span style="font-weight: '700'">item 类型: </span><span>object</span></p></td></tr><tr key=0-1-3-0><td key=0><span style="padding-left: 40px"><span style="color: #8c8a8a">├─</span> id</span></td><td key=1><span>integer</span></td><td key=2>必须</td><td key=3></td><td key=4><span>粉丝id</span></td><td key=5></td></tr><tr key=0-1-3-1><td key=0><span style="padding-left: 40px"><span style="color: #8c8a8a">├─</span> name</span></td><td key=1><span>string</span></td><td key=2>必须</td><td key=3></td><td key=4><span>粉丝用户名</span></td><td key=5></td></tr><tr key=0-1-3-2><td key=0><span style="padding-left: 40px"><span style="color: #8c8a8a">├─</span> photo</span></td><td key=1><span>string</span></td><td key=2>必须</td><td key=3></td><td key=4><span>头像url</span></td><td key=5></td></tr>
               </tbody>
              </table>

# 新闻

## 收藏图片素材
<a id=收藏图片素材> </a>
### 基本信息

**Path：** /mp/v1_0/user/images/:target

**Method：** PUT

**接口描述：**
<h4>1. 线上地址</h4>
<pre><code data-language="http" class="lang-http">http://ttapi.research.itcast.cn/mp/v1_0/user/images/:target

</code></pre>
<h3>2.&nbsp; 返回HTTP状态码</h3>
<p><strong>1. 201 OK</strong><br>
2. 400 请求参数错误<br>
3.&nbsp; 401 token过期或未传~~~~<br>
4. 507 服务器数据库异常</p>
<h3>3. token说明</h3>
<p><strong>在Authorization 请求头中携带的token，格式为"Bearer "拼接上token，注意Bearer后有一个空格</strong></p>


### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Content-Type  |  application/json | 是  |   |   |
| Authorization  |   | 是  |  Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NDMyODQzNjYsInVzZXJfaWQiOjF9.mLYitrKsn4E4KdQd0CNPugKrH8uQmXEQTlG_JutC8jU |  用户token |
**路径参数**
| 参数名称 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| target |   |  收藏的图片id |
**Body**

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key=name>名称</th><th key=type>类型</th><th key=required>是否必须</th><th key=default>默认值</th><th key=desc>备注</th><th key=sub>其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key=0-0><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> collect</span></td><td key=1><span>boolean</span></td><td key=2>必须</td><td key=3></td><td key=4><span>是否收藏，false-取消收藏，true-添加收藏</span></td><td key=5></td></tr>
               </tbody>
              </table>

### 返回数据

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key=name>名称</th><th key=type>类型</th><th key=required>是否必须</th><th key=default>默认值</th><th key=desc>备注</th><th key=sub>其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key=0-0><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> message</span></td><td key=1><span>string</span></td><td key=2>必须</td><td key=3></td><td key=4><span>消息提示</span></td><td key=5></td></tr><tr key=0-1><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> data</span></td><td key=1><span>object</span></td><td key=2>非必须</td><td key=3></td><td key=4><span>数据</span></td><td key=5></td></tr><tr key=0-1-0><td key=0><span style="padding-left: 20px"><span style="color: #8c8a8a">├─</span> id</span></td><td key=1><span>integer</span></td><td key=2>必须</td><td key=3></td><td key=4><span>图片id</span></td><td key=5></td></tr><tr key=0-1-1><td key=0><span style="padding-left: 20px"><span style="color: #8c8a8a">├─</span> collect</span></td><td key=1><span>boolean</span></td><td key=2>必须</td><td key=3></td><td key=4><span>是否收藏</span></td><td key=5></td></tr>
               </tbody>
              </table>

## 上传用户图片素材
<a id=上传用户图片素材> </a>
### 基本信息

**Path：** /mp/v1_0/user/images

**Method：** POST

**接口描述：**
<h4>1. 线上地址</h4>
<pre><code data-language="http" class="lang-http">http://ttapi.research.itcast.cn/mp/v1_0/user/images

</code></pre>
<h3>2.&nbsp; 返回HTTP状态码</h3>
<p><strong>1. 201 OK</strong><br>
2. 400 请求参数错误<br>
3.&nbsp; 401 token过期或未传~~~~<br>
4. 507 服务器数据库异常</p>
<h3>3. token说明</h3>
<p><strong>在Authorization 请求头中携带的token，格式为"Bearer "拼接上token，注意Bearer后有一个空格</strong></p>


### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Content-Type  |  multipart/form-data | 是  |   |   |
| Authorization  |   | 是  |  Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NDMyODQzNjYsInVzZXJfaWQiOjF9.mLYitrKsn4E4KdQd0CNPugKrH8uQmXEQTlG_JutC8jU |  用户token |
**Body**

| 参数名称  | 参数类型  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| image | file  |  是 |    |  图片 |



### 返回数据

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key=name>名称</th><th key=type>类型</th><th key=required>是否必须</th><th key=default>默认值</th><th key=desc>备注</th><th key=sub>其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key=0-0><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> message</span></td><td key=1><span>string</span></td><td key=2>必须</td><td key=3></td><td key=4><span>消息提示</span></td><td key=5></td></tr><tr key=0-1><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> data</span></td><td key=1><span>object</span></td><td key=2>非必须</td><td key=3></td><td key=4><span>数据</span></td><td key=5></td></tr><tr key=0-1-0><td key=0><span style="padding-left: 20px"><span style="color: #8c8a8a">├─</span> id</span></td><td key=1><span>integer</span></td><td key=2>必须</td><td key=3></td><td key=4><span>图片id</span></td><td key=5></td></tr><tr key=0-1-1><td key=0><span style="padding-left: 20px"><span style="color: #8c8a8a">├─</span> url</span></td><td key=1><span>string</span></td><td key=2>必须</td><td key=3></td><td key=4><span>图片url</span></td><td key=5></td></tr>
               </tbody>
              </table>

## 修改评论置顶
<a id=修改评论置顶> </a>
### 基本信息

**Path：** /mp/v1_0/comments/:target/sticky

**Method：** PUT

**接口描述：**
<h4>1. 线上地址</h4>
<pre><code data-language="http" class="lang-http">http://ttapi.research.itcast.cn/mp/v1_0/comments/:target/sticky

</code></pre>
<h3>2.&nbsp; 返回HTTP状态码</h3>
<p><strong>1. 201 OK</strong><br>
2. 400 请求参数错误<br>
3.&nbsp; 401 token过期或未传~~~~<br>
4. 403 没有设置这条评论的权限<br>
5. 507 服务器数据库异常</p>
<h3>3. token说明</h3>
<p><strong>在Authorization 请求头中携带的token，格式为"Bearer "拼接上token，注意Bearer后有一个空格</strong></p>


### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Content-Type  |  application/json | 是  |   |   |
| Authorization  |   | 是  |  Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NDMyODQzNjYsInVzZXJfaWQiOjF9.mLYitrKsn4E4KdQd0CNPugKrH8uQmXEQTlG_JutC8jU |  用户token |
**路径参数**
| 参数名称 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| target |   |  评论或回复id |
**Body**

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key=name>名称</th><th key=type>类型</th><th key=required>是否必须</th><th key=default>默认值</th><th key=desc>备注</th><th key=sub>其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key=0-0><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> sticky</span></td><td key=1><span>boolean</span></td><td key=2>必须</td><td key=3></td><td key=4><span>是否置顶</span></td><td key=5></td></tr>
               </tbody>
              </table>

### 返回数据

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key=name>名称</th><th key=type>类型</th><th key=required>是否必须</th><th key=default>默认值</th><th key=desc>备注</th><th key=sub>其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key=0-0><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> message</span></td><td key=1><span>string</span></td><td key=2>必须</td><td key=3></td><td key=4><span>消息提示</span></td><td key=5></td></tr><tr key=0-1><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> data</span></td><td key=1><span>object</span></td><td key=2>非必须</td><td key=3></td><td key=4><span>数据</span></td><td key=5></td></tr><tr key=0-1-0><td key=0><span style="padding-left: 20px"><span style="color: #8c8a8a">├─</span> target</span></td><td key=1><span>integer</span></td><td key=2>必须</td><td key=3></td><td key=4><span>评论id</span></td><td key=5></td></tr><tr key=0-1-1><td key=0><span style="padding-left: 20px"><span style="color: #8c8a8a">├─</span> sticky</span></td><td key=1><span>boolean</span></td><td key=2>必须</td><td key=3></td><td key=4><span>是否置顶</span></td><td key=5></td></tr>
               </tbody>
              </table>

## 删除图片素材
<a id=删除图片素材> </a>
### 基本信息

**Path：** /mp/v1_0/user/images/:target

**Method：** DELETE

**接口描述：**
<h4>1. 线上地址</h4>
<pre><code data-language="http" class="lang-http">http://ttapi.research.itcast.cn/mp/v1_0/user/images/:target

</code></pre>
<h3>2.&nbsp; 返回HTTP状态码</h3>
<p><strong>1. 204&nbsp; 删除成功，没有message消息体数据</strong><br>
2.&nbsp; 401 token过期或未传<br>
3. 507 服务器数据库异常</p>
<h3>3. token说明</h3>
<p><strong>在Authorization 请求头中携带的token，格式为"Bearer "拼接上token，注意Bearer后有一个空格</strong></p>


### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Content-Type  |  application/json | 是  |   |   |
| Authorization  |   | 是  |  Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NDMyODQzNjYsInVzZXJfaWQiOjF9.mLYitrKsn4E4KdQd0CNPugKrH8uQmXEQTlG_JutC8jU |  用户token |
**路径参数**
| 参数名称 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| target |   |  图片id |
**Body**

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key=name>名称</th><th key=type>类型</th><th key=required>是否必须</th><th key=default>默认值</th><th key=desc>备注</th><th key=sub>其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody">
               </tbody>
              </table>

### 返回数据

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key=name>名称</th><th key=type>类型</th><th key=required>是否必须</th><th key=default>默认值</th><th key=desc>备注</th><th key=sub>其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key=0-0><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> message</span></td><td key=1><span>string</span></td><td key=2>非必须</td><td key=3></td><td key=4><span>消息提示</span></td><td key=5></td></tr>
               </tbody>
              </table>

## 删除文章
<a id=删除文章> </a>
### 基本信息

**Path：** /mp/v1_0/articles/:target

**Method：** DELETE

**接口描述：**
<h4>1. 线上地址</h4>
<pre><code data-language="http" class="lang-http">http://ttapi.research.itcast.cn/mp/v1_0/articles/:target
</code></pre>

<h3>2.&nbsp; 返回HTTP状态码</h3>
<p><strong>1. 204&nbsp; 删除成功，没有message消息体数据</strong><br>
<strong>2.</strong> 400 指定文章有误<br>
3.&nbsp; 401 token过期或未传<br>
4. 507 服务器数据库异常</p>
<h3>3. token说明</h3>
<p><strong>在Authorization 请求头中携带的token，格式为"Bearer "拼接上token，注意Bearer后有一个空格</strong></p>


### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Content-Type  |  application/json | 是  |   |   |
| Authorization  |   | 是  |  Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NDMyODQzNjYsInVzZXJfaWQiOjF9.mLYitrKsn4E4KdQd0CNPugKrH8uQmXEQTlG_JutC8jU |  用户token |
**路径参数**
| 参数名称 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| target |   |  文章id |
**Body**

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key=name>名称</th><th key=type>类型</th><th key=required>是否必须</th><th key=default>默认值</th><th key=desc>备注</th><th key=sub>其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody">
               </tbody>
              </table>

### 返回数据

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key=name>名称</th><th key=type>类型</th><th key=required>是否必须</th><th key=default>默认值</th><th key=desc>备注</th><th key=sub>其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key=0-0><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> message</span></td><td key=1><span>string</span></td><td key=2>非必须</td><td key=3></td><td key=4><span>消息提示</span></td><td key=5></td></tr>
               </tbody>
              </table>

## 删除评论或回复
<a id=删除评论或回复> </a>
### 基本信息

**Path：** /mp/v1_0/comments/:target

**Method：** DELETE

**接口描述：**
<h4>1. 线上地址</h4>
<pre><code data-language="http" class="lang-http">http://ttapi.research.itcast.cn/mp/v1_0/comments/:target

</code></pre>
<h3>2.&nbsp; 返回HTTP状态码</h3>
<p><strong>1. 204 OK</strong><br>
2. 403 没有删除这条评论的权限<br>
3.&nbsp; 401 token过期或未传~~~~<br>
4. 507 服务器数据库异常</p>
<h3>3. token说明</h3>
<p><strong>在Authorization 请求头中携带的token，格式为"Bearer "拼接上token，注意Bearer后有一个空格</strong></p>


### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Content-Type  |  application/json | 是  |   |   |
| Authorization  |   | 是  |  Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NDMyODQzNjYsInVzZXJfaWQiOjF9.mLYitrKsn4E4KdQd0CNPugKrH8uQmXEQTlG_JutC8jU |  用户token |
**路径参数**
| 参数名称 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| target |   |  评论或回复id |
**Body**

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key=name>名称</th><th key=type>类型</th><th key=required>是否必须</th><th key=default>默认值</th><th key=desc>备注</th><th key=sub>其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody">
               </tbody>
              </table>

### 返回数据

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key=name>名称</th><th key=type>类型</th><th key=required>是否必须</th><th key=default>默认值</th><th key=desc>备注</th><th key=sub>其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key=0-0><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> message</span></td><td key=1><span>string</span></td><td key=2>非必须</td><td key=3></td><td key=4><span>消息提示</span></td><td key=5></td></tr>
               </tbody>
              </table>

## 发表文章（新建）
<a id=发表文章（新建）> </a>
### 基本信息

**Path：** /mp/v1_0/articles

**Method：** POST

**接口描述：**
<h4>1. 线上地址</h4>
<pre><code data-language="http" class="lang-http">http://ttapi.research.itcast.cn/mp/v1_0/articles

</code></pre>
<h3>2.&nbsp; 返回HTTP状态码</h3>
<p><strong>1. 201 OK</strong><br>
2. 400 请求参数错误<br>
3.&nbsp; 401 token过期或未传~~~~<br>
4. 507 服务器数据库异常</p>
<h3>3. token说明</h3>
<p><strong>在Authorization 请求头中携带的token，格式为"Bearer "拼接上token，注意Bearer后有一个空格</strong></p>


### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Content-Type  |  application/json | 是  |   |   |
| Authorization  |   | 是  |  Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NDMyODQzNjYsInVzZXJfaWQiOjF9.mLYitrKsn4E4KdQd0CNPugKrH8uQmXEQTlG_JutC8jU |  用户token |
**Query**

| 参数名称  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ |
| draft | 否  |  true 或 false |  是否存为草稿（true 为草稿） |
**Body**

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key=name>名称</th><th key=type>类型</th><th key=required>是否必须</th><th key=default>默认值</th><th key=desc>备注</th><th key=sub>其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key=0-0><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> title</span></td><td key=1><span>string</span></td><td key=2>必须</td><td key=3></td><td key=4><span>文章标题</span></td><td key=5></td></tr><tr key=0-1><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> content</span></td><td key=1><span>string</span></td><td key=2>必须</td><td key=3></td><td key=4><span>文章内容</span></td><td key=5></td></tr><tr key=0-2><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> cover</span></td><td key=1><span>object</span></td><td key=2>必须</td><td key=3></td><td key=4><span>封面</span></td><td key=5></td></tr><tr key=0-2-0><td key=0><span style="padding-left: 20px"><span style="color: #8c8a8a">├─</span> type</span></td><td key=1><span>integer</span></td><td key=2>必须</td><td key=3></td><td key=4><span>封面类型 -1:自动，0-无图，1-1张，3-3张</span></td><td key=5></td></tr><tr key=0-2-1><td key=0><span style="padding-left: 20px"><span style="color: #8c8a8a">├─</span> images</span></td><td key=1><span>string []</span></td><td key=2>必须</td><td key=3></td><td key=4><span></span></td><td key=5><p key=3><span style="font-weight: '700'">item 类型: </span><span>string</span></p></td></tr><tr key=0-3><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> channel_id</span></td><td key=1><span>integer</span></td><td key=2>必须</td><td key=3></td><td key=4><span>文章所属频道id</span></td><td key=5></td></tr>
               </tbody>
              </table>

### 返回数据

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key=name>名称</th><th key=type>类型</th><th key=required>是否必须</th><th key=default>默认值</th><th key=desc>备注</th><th key=sub>其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key=0-0><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> message</span></td><td key=1><span>string</span></td><td key=2>必须</td><td key=3></td><td key=4><span>消息提示</span></td><td key=5></td></tr><tr key=0-1><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> data</span></td><td key=1><span>object</span></td><td key=2>非必须</td><td key=3></td><td key=4><span>数据</span></td><td key=5></td></tr><tr key=0-1-0><td key=0><span style="padding-left: 20px"><span style="color: #8c8a8a">├─</span> id</span></td><td key=1><span>integer</span></td><td key=2>必须</td><td key=3></td><td key=4><span>文章id</span></td><td key=5></td></tr>
               </tbody>
              </table>

## 取消对评论或评论回复点赞
<a id=取消对评论或评论回复点赞> </a>
### 基本信息

**Path：** /mp/v1_0/comment/likings/:target

**Method：** DELETE

**接口描述：**
<h4>1. 线上地址</h4>
<pre><code data-language="http" class="lang-http">http://ttapi.research.itcast.cn/mp/v1_0/comment/likings/:target

</code></pre>
<h3>2.&nbsp; 返回HTTP状态码</h3>
<p><strong>1. 204 OK</strong><br>
2.&nbsp; 401 token过期或未传~~~~<br>
3. 507 服务器数据库异常</p>
<h3>3. token说明</h3>
<p><strong>在Authorization 请求头中携带的token，格式为"Bearer "拼接上token，注意Bearer后有一个空格</strong></p>


### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Content-Type  |  application/json | 是  |   |   |
| Authorization  |   | 是  |  Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NDMyODQzNjYsInVzZXJfaWQiOjF9.mLYitrKsn4E4KdQd0CNPugKrH8uQmXEQTlG_JutC8jU |  用户token |
**路径参数**
| 参数名称 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| target |   |   |
**Body**

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key=name>名称</th><th key=type>类型</th><th key=required>是否必须</th><th key=default>默认值</th><th key=desc>备注</th><th key=sub>其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key=0-0><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> target</span></td><td key=1><span>string</span></td><td key=2>非必须</td><td key=3></td><td key=4><span>要取消点赞的评论id或评论回复id</span></td><td key=5></td></tr>
               </tbody>
              </table>

### 返回数据

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key=name>名称</th><th key=type>类型</th><th key=required>是否必须</th><th key=default>默认值</th><th key=desc>备注</th><th key=sub>其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key=0-0><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> message</span></td><td key=1><span>string</span></td><td key=2>非必须</td><td key=3></td><td key=4><span>消息提示</span></td><td key=5></td></tr>
               </tbody>
              </table>

## 对评论或回复点赞
<a id=对评论或回复点赞> </a>
### 基本信息

**Path：** /mp/v1_0/comment/likings

**Method：** POST

**接口描述：**
<h4>1. 线上地址</h4>
<pre><code data-language="http" class="lang-http">http://ttapi.research.itcast.cn/mp/v1_0/comment/likings

</code></pre>
<h3>2.&nbsp; 返回HTTP状态码</h3>
<p><strong>1. 201 OK</strong><br>
2. 400 请求参数错误<br>
3.&nbsp; 401 token过期或未传~~~~<br>
4. 507 服务器数据库异常</p>
<h3>3. token说明</h3>
<p><strong>在Authorization 请求头中携带的token，格式为"Bearer "拼接上token，注意Bearer后有一个空格</strong></p>


### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Content-Type  |  application/json | 是  |   |   |
| Authorization  |   | 是  |  Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NDMyODQzNjYsInVzZXJfaWQiOjF9.mLYitrKsn4E4KdQd0CNPugKrH8uQmXEQTlG_JutC8jU |  用户token |
**Body**

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key=name>名称</th><th key=type>类型</th><th key=required>是否必须</th><th key=default>默认值</th><th key=desc>备注</th><th key=sub>其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key=0-0><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> target</span></td><td key=1><span>integer</span></td><td key=2>必须</td><td key=3></td><td key=4><span>点赞的评论id</span></td><td key=5></td></tr>
               </tbody>
              </table>

### 返回数据

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key=name>名称</th><th key=type>类型</th><th key=required>是否必须</th><th key=default>默认值</th><th key=desc>备注</th><th key=sub>其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key=0-0><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> message</span></td><td key=1><span>string</span></td><td key=2>必须</td><td key=3></td><td key=4><span>消息提示</span></td><td key=5></td></tr><tr key=0-1><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> data</span></td><td key=1><span>object</span></td><td key=2>非必须</td><td key=3></td><td key=4><span>数据</span></td><td key=5></td></tr><tr key=0-1-0><td key=0><span style="padding-left: 20px"><span style="color: #8c8a8a">├─</span> target</span></td><td key=1><span>integer</span></td><td key=2>必须</td><td key=3></td><td key=4><span>评论id</span></td><td key=5></td></tr>
               </tbody>
              </table>

## 修改文章评论状态
<a id=修改文章评论状态> </a>
### 基本信息

**Path：** /mp/v1_0/comments/status

**Method：** PUT

**接口描述：**
<h4>1. 线上地址</h4>
<pre><code data-language="http" class="lang-http">http://ttapi.research.itcast.cn/mp/v1_0/comments/status?article_id=xxx

</code></pre>
<h3>2.&nbsp; 返回HTTP状态码</h3>
<p><strong>1. 201 OK</strong><br>
2. 400 请求参数错误<br>
3.&nbsp; 401 token过期或未传~~~~<br>
4. 507 服务器数据库异常</p>
<h3>3. token说明</h3>
<p><strong>在Authorization 请求头中携带的token，格式为"Bearer "拼接上token，注意Bearer后有一个空格</strong></p>


### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Content-Type  |  application/json | 是  |   |   |
| Authorization  |   | 是  |  Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NDMyODQzNjYsInVzZXJfaWQiOjF9.mLYitrKsn4E4KdQd0CNPugKrH8uQmXEQTlG_JutC8jU |  用户token |
**Query**

| 参数名称  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ |
| article_id | 是  |   |  文章id |
**Body**

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key=name>名称</th><th key=type>类型</th><th key=required>是否必须</th><th key=default>默认值</th><th key=desc>备注</th><th key=sub>其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key=0-0><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> allow_comment</span></td><td key=1><span>boolean</span></td><td key=2>必须</td><td key=3></td><td key=4><span>是否允许评论</span></td><td key=5></td></tr>
               </tbody>
              </table>

### 返回数据

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key=name>名称</th><th key=type>类型</th><th key=required>是否必须</th><th key=default>默认值</th><th key=desc>备注</th><th key=sub>其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key=0-0><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> message</span></td><td key=1><span>string</span></td><td key=2>必须</td><td key=3></td><td key=4><span>消息提示</span></td><td key=5></td></tr><tr key=0-1><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> data</span></td><td key=1><span>object</span></td><td key=2>非必须</td><td key=3></td><td key=4><span>数据</span></td><td key=5></td></tr><tr key=0-1-0><td key=0><span style="padding-left: 20px"><span style="color: #8c8a8a">├─</span> article_id</span></td><td key=1><span>integer</span></td><td key=2>必须</td><td key=3></td><td key=4><span>文章id</span></td><td key=5></td></tr><tr key=0-1-1><td key=0><span style="padding-left: 20px"><span style="color: #8c8a8a">├─</span> allow_comment</span></td><td key=1><span>boolean</span></td><td key=2>必须</td><td key=3></td><td key=4><span>是否允许评论</span></td><td key=5></td></tr>
               </tbody>
              </table>

## 文章搜索
<a id=文章搜索> </a>
### 基本信息

**Path：** /mp/v1_0/search

**Method：** GET

**接口描述：**
<h4>1. 线上地址</h4>
<pre><code data-language="http" class="lang-http">http://ttapi.research.itcast.cn/mp/v1_0/search

</code></pre>
<h3>2.&nbsp; 返回HTTP状态码</h3>
<p><strong>1. 200 OK</strong><br>
2. 400 请求参数错误<br>
3. 401&nbsp;<span class="colour" style="color:rgb(85, 85, 85)">token过期或未传~~~~</span><br>
4. 507 服务器数据库异常</p>


### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Content-Type  |  application/json | 是  |   |   |
| Authorization  |   | 是  |  Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NDMyODQzNjYsInVzZXJfaWQiOjF9.mLYitrKsn4E4KdQd0CNPugKrH8uQmXEQTlG_JutC8jU |  用户token |
**Query**

| 参数名称  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ |
| q | 是  |   |  检索关键词 |
| page | 否  |   |  页数 |
| per_page | 否  |   |  每页数量 |
**Body**

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key=name>名称</th><th key=type>类型</th><th key=required>是否必须</th><th key=default>默认值</th><th key=desc>备注</th><th key=sub>其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key=0-0><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> mobile</span></td><td key=1><span>string</span></td><td key=2>必须</td><td key=3></td><td key=4><span>手机号</span></td><td key=5></td></tr><tr key=0-1><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> code</span></td><td key=1><span>string</span></td><td key=2>必须</td><td key=3></td><td key=4><span>验证码</span></td><td key=5></td></tr>
               </tbody>
              </table>

### 返回数据

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key=name>名称</th><th key=type>类型</th><th key=required>是否必须</th><th key=default>默认值</th><th key=desc>备注</th><th key=sub>其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key=0-0><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> message</span></td><td key=1><span>string</span></td><td key=2>必须</td><td key=3></td><td key=4><span>消息提示</span></td><td key=5></td></tr><tr key=0-1><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> data</span></td><td key=1><span>object</span></td><td key=2>非必须</td><td key=3></td><td key=4><span>数据</span></td><td key=5></td></tr><tr key=0-1-0><td key=0><span style="padding-left: 20px"><span style="color: #8c8a8a">├─</span> total_count</span></td><td key=1><span>integer</span></td><td key=2>必须</td><td key=3></td><td key=4><span>文章总数</span></td><td key=5></td></tr><tr key=0-1-1><td key=0><span style="padding-left: 20px"><span style="color: #8c8a8a">├─</span> page</span></td><td key=1><span>integer</span></td><td key=2>必须</td><td key=3></td><td key=4><span>当前页数</span></td><td key=5></td></tr><tr key=0-1-2><td key=0><span style="padding-left: 20px"><span style="color: #8c8a8a">├─</span> per_page</span></td><td key=1><span>integer</span></td><td key=2>必须</td><td key=3></td><td key=4><span>每页数量</span></td><td key=5></td></tr><tr key=0-1-3><td key=0><span style="padding-left: 20px"><span style="color: #8c8a8a">├─</span> results</span></td><td key=1><span>object []</span></td><td key=2>必须</td><td key=3></td><td key=4><span>文章列表</span></td><td key=5><p key=3><span style="font-weight: '700'">item 类型: </span><span>object</span></p></td></tr><tr key=0-1-3-0><td key=0><span style="padding-left: 40px"><span style="color: #8c8a8a">├─</span> id</span></td><td key=1><span>integer</span></td><td key=2>必须</td><td key=3></td><td key=4><span>文章id</span></td><td key=5></td></tr><tr key=0-1-3-1><td key=0><span style="padding-left: 40px"><span style="color: #8c8a8a">├─</span> title</span></td><td key=1><span>string</span></td><td key=2>必须</td><td key=3></td><td key=4><span>标题</span></td><td key=5></td></tr><tr key=0-1-3-2><td key=0><span style="padding-left: 40px"><span style="color: #8c8a8a">├─</span> status</span></td><td key=1><span>integer</span></td><td key=2>必须</td><td key=3></td><td key=4><span>文章状态 0-草稿，1-待审核，2-审核通过，3-审核失败，4-已删除</span></td><td key=5></td></tr><tr key=0-1-3-3><td key=0><span style="padding-left: 40px"><span style="color: #8c8a8a">├─</span> pubdate</span></td><td key=1><span>string</span></td><td key=2>必须</td><td key=3></td><td key=4><span>发布日期</span></td><td key=5></td></tr><tr key=0-1-3-4><td key=0><span style="padding-left: 40px"><span style="color: #8c8a8a">├─</span> cover</span></td><td key=1><span>object</span></td><td key=2>必须</td><td key=3></td><td key=4><span>封面</span></td><td key=5></td></tr><tr key=0-1-3-4-0><td key=0><span style="padding-left: 60px"><span style="color: #8c8a8a">├─</span> type</span></td><td key=1><span>integer</span></td><td key=2>必须</td><td key=3></td><td key=4><span>封面类型</span></td><td key=5></td></tr><tr key=0-1-3-4-1><td key=0><span style="padding-left: 60px"><span style="color: #8c8a8a">├─</span> images</span></td><td key=1><span>string []</span></td><td key=2>必须</td><td key=3></td><td key=4><span>封面图片</span></td><td key=5><p key=3><span style="font-weight: '700'">item 类型: </span><span>string</span></p></td></tr>
               </tbody>
              </table>

## 添加评论或评论回复
<a id=添加评论或评论回复> </a>
### 基本信息

**Path：** /mp/v1_0/comments

**Method：** POST

**接口描述：**
<h4>1. 线上地址</h4>
<pre><code data-language="http" class="lang-http">http://ttapi.research.itcast.cn/mp/v1_0/comments

</code></pre>
<h3>2.&nbsp; 返回HTTP状态码</h3>
<p><strong>1. 201 OK</strong><br>
2. 400 请求参数错误<br>
3.&nbsp; 401 token过期或未传~~~~<br>
4. 403 文章已关闭评论<br>
5. 507 服务器数据库异常</p>
<h3>3. token说明</h3>
<p><strong>在Authorization 请求头中携带的token，格式为"Bearer "拼接上token，注意Bearer后有一个空格</strong></p>


### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Content-Type  |  application/json | 是  |   |   |
| Authorization  |   | 是  |  Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NDMyODQzNjYsInVzZXJfaWQiOjF9.mLYitrKsn4E4KdQd0CNPugKrH8uQmXEQTlG_JutC8jU |  用户token |
**Body**

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key=name>名称</th><th key=type>类型</th><th key=required>是否必须</th><th key=default>默认值</th><th key=desc>备注</th><th key=sub>其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key=0-0><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> target</span></td><td key=1><span>integer</span></td><td key=2>必须</td><td key=3></td><td key=4><span>评论id</span></td><td key=5></td></tr><tr key=0-1><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> content</span></td><td key=1><span>string</span></td><td key=2>必须</td><td key=3></td><td key=4><span>评论回复内容</span></td><td key=5></td></tr><tr key=0-2><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> art_id</span></td><td key=1><span>integer</span></td><td key=2>必须</td><td key=3></td><td key=4><span>文章id</span></td><td key=5></td></tr>
               </tbody>
              </table>

### 返回数据

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key=name>名称</th><th key=type>类型</th><th key=required>是否必须</th><th key=default>默认值</th><th key=desc>备注</th><th key=sub>其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key=0-0><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> message</span></td><td key=1><span>string</span></td><td key=2>必须</td><td key=3></td><td key=4><span>消息提示</span></td><td key=5></td></tr><tr key=0-1><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> data</span></td><td key=1><span>object</span></td><td key=2>非必须</td><td key=3></td><td key=4><span>数据</span></td><td key=5></td></tr><tr key=0-1-0><td key=0><span style="padding-left: 20px"><span style="color: #8c8a8a">├─</span> com_id</span></td><td key=1><span>integer</span></td><td key=2>必须</td><td key=3></td><td key=4><span>评论回复id</span></td><td key=5></td></tr><tr key=0-1-1><td key=0><span style="padding-left: 20px"><span style="color: #8c8a8a">├─</span> target</span></td><td key=1><span>integer</span></td><td key=2>必须</td><td key=3></td><td key=4><span>评论所属的目标id</span></td><td key=5></td></tr><tr key=0-1-2><td key=0><span style="padding-left: 20px"><span style="color: #8c8a8a">├─</span> art_id</span></td><td key=1><span>integer</span></td><td key=2>必须</td><td key=3></td><td key=4><span>评论所属的文章id</span></td><td key=5></td></tr>
               </tbody>
              </table>

## 编辑文章（修改）
<a id=编辑文章（修改）> </a>
### 基本信息

**Path：** /mp/v1_0/articles/:target

**Method：** PUT

**接口描述：**
<h4>1. 线上地址</h4>
<pre><code data-language="http" class="lang-http">http://ttapi.research.itcast.cn/mp/v1_0/articles

</code></pre>
<h3>2.&nbsp; 返回HTTP状态码</h3>
<p><strong>1. 201 OK</strong><br>
2. 400 请求参数错误<br>
3.&nbsp; 401 token过期或未传~~~~<br>
4. 507 服务器数据库异常</p>
<h3>3. token说明</h3>
<p><strong>在Authorization 请求头中携带的token，格式为"Bearer "拼接上token，注意Bearer后有一个空格</strong></p>


### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Content-Type  |  application/json | 是  |   |   |
| Authorization  |   | 是  |  Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NDMyODQzNjYsInVzZXJfaWQiOjF9.mLYitrKsn4E4KdQd0CNPugKrH8uQmXEQTlG_JutC8jU |  用户token |
**路径参数**
| 参数名称 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| target |   |  文章id |
**Query**

| 参数名称  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ |
| draft | 否  |  true 或 false |  是否存为草稿（true 为草稿） |
**Body**

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key=name>名称</th><th key=type>类型</th><th key=required>是否必须</th><th key=default>默认值</th><th key=desc>备注</th><th key=sub>其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key=0-0><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> title</span></td><td key=1><span>string</span></td><td key=2>必须</td><td key=3></td><td key=4><span>文章标题</span></td><td key=5></td></tr><tr key=0-1><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> content</span></td><td key=1><span>string</span></td><td key=2>必须</td><td key=3></td><td key=4><span>文章内容</span></td><td key=5></td></tr><tr key=0-2><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> cover</span></td><td key=1><span>object</span></td><td key=2>必须</td><td key=3></td><td key=4><span>封面</span></td><td key=5></td></tr><tr key=0-2-0><td key=0><span style="padding-left: 20px"><span style="color: #8c8a8a">├─</span> type</span></td><td key=1><span>integer</span></td><td key=2>必须</td><td key=3></td><td key=4><span>封面类型 -1:自动，0-无图，1-1张，3-3张</span></td><td key=5></td></tr><tr key=0-2-1><td key=0><span style="padding-left: 20px"><span style="color: #8c8a8a">├─</span> images</span></td><td key=1><span>string []</span></td><td key=2>必须</td><td key=3></td><td key=4><span></span></td><td key=5><p key=3><span style="font-weight: '700'">item 类型: </span><span>string</span></p></td></tr><tr key=0-3><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> channel_id</span></td><td key=1><span>integer</span></td><td key=2>必须</td><td key=3></td><td key=4><span>文章所属频道id</span></td><td key=5></td></tr>
               </tbody>
              </table>

### 返回数据

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key=name>名称</th><th key=type>类型</th><th key=required>是否必须</th><th key=default>默认值</th><th key=desc>备注</th><th key=sub>其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key=0-0><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> message</span></td><td key=1><span>string</span></td><td key=2>必须</td><td key=3></td><td key=4><span>消息提示</span></td><td key=5></td></tr><tr key=0-1><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> data</span></td><td key=1><span>object</span></td><td key=2>非必须</td><td key=3></td><td key=4><span>数据</span></td><td key=5></td></tr><tr key=0-1-0><td key=0><span style="padding-left: 20px"><span style="color: #8c8a8a">├─</span> id</span></td><td key=1><span>integer</span></td><td key=2>必须</td><td key=3></td><td key=4><span>文章id</span></td><td key=5></td></tr>
               </tbody>
              </table>

## 获取指定文章
<a id=获取指定文章> </a>
### 基本信息

**Path：** /mp/v1_0/articles/:target

**Method：** GET

**接口描述：**
<h4>1. 线上地址</h4>
<pre><code data-language="http" class="lang-http">http://ttapi.research.itcast.cn/mp/v1_0/articles

</code></pre>
<h3>2.&nbsp; 返回HTTP状态码</h3>
<p><strong>1. 200 OK</strong><br>
2. 401&nbsp;<span class="colour" style="color:rgb(85, 85, 85)">token过期或未传~~~~</span><br>
3. 507 服务器数据库异常</p>


### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Content-Type  |  application/json | 是  |   |   |
| Authorization  |   | 是  |  Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NDMyODQzNjYsInVzZXJfaWQiOjF9.mLYitrKsn4E4KdQd0CNPugKrH8uQmXEQTlG_JutC8jU |  用户token |
**路径参数**
| 参数名称 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| target |   |  文章id |
**Body**

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key=name>名称</th><th key=type>类型</th><th key=required>是否必须</th><th key=default>默认值</th><th key=desc>备注</th><th key=sub>其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key=0-0><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> mobile</span></td><td key=1><span>string</span></td><td key=2>必须</td><td key=3></td><td key=4><span>手机号</span></td><td key=5></td></tr><tr key=0-1><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> code</span></td><td key=1><span>string</span></td><td key=2>必须</td><td key=3></td><td key=4><span>验证码</span></td><td key=5></td></tr>
               </tbody>
              </table>

### 返回数据

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key=name>名称</th><th key=type>类型</th><th key=required>是否必须</th><th key=default>默认值</th><th key=desc>备注</th><th key=sub>其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key=0-0><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> message</span></td><td key=1><span>string</span></td><td key=2>必须</td><td key=3></td><td key=4><span>消息提示</span></td><td key=5></td></tr><tr key=0-1><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> data</span></td><td key=1><span>object</span></td><td key=2>非必须</td><td key=3></td><td key=4><span></span></td><td key=5></td></tr><tr key=0-1-0><td key=0><span style="padding-left: 20px"><span style="color: #8c8a8a">├─</span> id</span></td><td key=1><span>integer</span></td><td key=2>必须</td><td key=3></td><td key=4><span>文章id</span></td><td key=5></td></tr><tr key=0-1-1><td key=0><span style="padding-left: 20px"><span style="color: #8c8a8a">├─</span> title</span></td><td key=1><span>string</span></td><td key=2>必须</td><td key=3></td><td key=4><span>标题</span></td><td key=5></td></tr><tr key=0-1-2><td key=0><span style="padding-left: 20px"><span style="color: #8c8a8a">├─</span> channel_id</span></td><td key=1><span>integer</span></td><td key=2>必须</td><td key=3></td><td key=4><span>频道id</span></td><td key=5></td></tr><tr key=0-1-3><td key=0><span style="padding-left: 20px"><span style="color: #8c8a8a">├─</span> content</span></td><td key=1><span>string</span></td><td key=2>必须</td><td key=3></td><td key=4><span>文章内容</span></td><td key=5></td></tr><tr key=0-1-4><td key=0><span style="padding-left: 20px"><span style="color: #8c8a8a">├─</span> cover</span></td><td key=1><span>object</span></td><td key=2>必须</td><td key=3></td><td key=4><span>封面</span></td><td key=5></td></tr><tr key=0-1-4-0><td key=0><span style="padding-left: 40px"><span style="color: #8c8a8a">├─</span> type</span></td><td key=1><span>integer</span></td><td key=2>必须</td><td key=3></td><td key=4><span>封面类型</span></td><td key=5></td></tr><tr key=0-1-4-1><td key=0><span style="padding-left: 40px"><span style="color: #8c8a8a">├─</span> images</span></td><td key=1><span>string []</span></td><td key=2>必须</td><td key=3></td><td key=4><span>封面图片</span></td><td key=5><p key=3><span style="font-weight: '700'">item 类型: </span><span>string</span></p></td></tr>
               </tbody>
              </table>

## 获取文章列表（适用内容管理、评论管理、图文数据）
<a id=获取文章列表（适用内容管理、评论管理、图文数据）> </a>
### 基本信息

**Path：** /mp/v1_0/articles

**Method：** GET

**接口描述：**

<h4>1. 线上地址</h4>
<pre><code data-language="http" class="lang-http">http://ttapi.research.itcast.cn/mp/v1_0/articles

</code></pre>
<h3>2.&nbsp; 返回HTTP状态码</h3>
<p><strong>1. 200 OK</strong><br>
2. 400 请求参数错误<br>
3. 401&nbsp;<span class="colour" style="color:rgb(85, 85, 85)">token过期或未传~~~~</span><br>
4. 507 服务器数据库异常</p>


### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Content-Type  |  application/json | 是  |   |   |
**Query**

| 参数名称  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ |
| status | 否  |   |  文章状态，0-草稿，1-待审核，2-审核通过，3-审核失败，4-已删除，不传为全部 |
| channel_id | 否  |   |  频道id，不传为全部 |
| begin_pubdate | 否  |  2019-01-01 |  起始时间 |
| end_pubdate | 否  |  2019-01-02 |  截止时间 |
| page | 否  |   | 页码 |
| per_page | 否  |   | 每页数量，介于10-50之间 |
| response_type | 否  |   | 返回数据的字段，不传返回用于文章内容管理的字段，传comment 返回用于评论管理的字段，传statistic 返回用于图文数据的字段 |
**Body**

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key=name>名称</th><th key=type>类型</th><th key=required>是否必须</th><th key=default>默认值</th><th key=desc>备注</th><th key=sub>其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key=0-0><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> mobile</span></td><td key=1><span>string</span></td><td key=2>必须</td><td key=3></td><td key=4><span>手机号</span></td><td key=5></td></tr><tr key=0-1><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> code</span></td><td key=1><span>string</span></td><td key=2>必须</td><td key=3></td><td key=4><span>验证码</span></td><td key=5></td></tr>
               </tbody>
              </table>

### 返回数据

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key=name>名称</th><th key=type>类型</th><th key=required>是否必须</th><th key=default>默认值</th><th key=desc>备注</th><th key=sub>其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key=0-0><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> message</span></td><td key=1><span>string</span></td><td key=2>必须</td><td key=3></td><td key=4><span>消息提示</span></td><td key=5></td></tr><tr key=0-1><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> data</span></td><td key=1><span>object</span></td><td key=2>非必须</td><td key=3></td><td key=4><span>数据</span></td><td key=5></td></tr><tr key=0-1-0><td key=0><span style="padding-left: 20px"><span style="color: #8c8a8a">├─</span> total_count</span></td><td key=1><span>integer</span></td><td key=2>必须</td><td key=3></td><td key=4><span>文章总数</span></td><td key=5></td></tr><tr key=0-1-1><td key=0><span style="padding-left: 20px"><span style="color: #8c8a8a">├─</span> page</span></td><td key=1><span>integer</span></td><td key=2>必须</td><td key=3></td><td key=4><span>当前页数</span></td><td key=5></td></tr><tr key=0-1-2><td key=0><span style="padding-left: 20px"><span style="color: #8c8a8a">├─</span> per_page</span></td><td key=1><span>integer</span></td><td key=2>必须</td><td key=3></td><td key=4><span>每页数量</span></td><td key=5></td></tr><tr key=0-1-3><td key=0><span style="padding-left: 20px"><span style="color: #8c8a8a">├─</span> results</span></td><td key=1><span>object []</span></td><td key=2>必须</td><td key=3></td><td key=4><span>文章列表</span></td><td key=5><p key=3><span style="font-weight: '700'">item 类型: </span><span>object</span></p></td></tr><tr key=0-1-3-0><td key=0><span style="padding-left: 40px"><span style="color: #8c8a8a">├─</span> id</span></td><td key=1><span>integer</span></td><td key=2>必须</td><td key=3></td><td key=4><span>文章id</span></td><td key=5></td></tr><tr key=0-1-3-1><td key=0><span style="padding-left: 40px"><span style="color: #8c8a8a">├─</span> title</span></td><td key=1><span>string</span></td><td key=2>必须</td><td key=3></td><td key=4><span>标题</span></td><td key=5></td></tr><tr key=0-1-3-2><td key=0><span style="padding-left: 40px"><span style="color: #8c8a8a">├─</span> status</span></td><td key=1><span>integer</span></td><td key=2>非必须</td><td key=3></td><td key=4><span>文章状态 0-草稿，1-待审核，2-审核通过，3-审核失败，4-已删除</span></td><td key=5></td></tr><tr key=0-1-3-3><td key=0><span style="padding-left: 40px"><span style="color: #8c8a8a">├─</span> pubdate</span></td><td key=1><span>string</span></td><td key=2>非必须</td><td key=3></td><td key=4><span>发布日期</span></td><td key=5></td></tr><tr key=0-1-3-4><td key=0><span style="padding-left: 40px"><span style="color: #8c8a8a">├─</span> cover</span></td><td key=1><span>object</span></td><td key=2>非必须</td><td key=3></td><td key=4><span>封面</span></td><td key=5></td></tr><tr key=0-1-3-4-0><td key=0><span style="padding-left: 60px"><span style="color: #8c8a8a">├─</span> type</span></td><td key=1><span>integer</span></td><td key=2>必须</td><td key=3></td><td key=4><span>封面类型</span></td><td key=5></td></tr><tr key=0-1-3-4-1><td key=0><span style="padding-left: 60px"><span style="color: #8c8a8a">├─</span> images</span></td><td key=1><span>string []</span></td><td key=2>必须</td><td key=3></td><td key=4><span>封面图片</span></td><td key=5><p key=3><span style="font-weight: '700'">item 类型: </span><span>string</span></p></td></tr><tr key=0-1-3-5><td key=0><span style="padding-left: 40px"><span style="color: #8c8a8a">├─</span> comment_status</span></td><td key=1><span>boolean</span></td><td key=2>非必须</td><td key=3></td><td key=4><span>评论状态，response_type=comment时返回</span></td><td key=5></td></tr><tr key=0-1-3-6><td key=0><span style="padding-left: 40px"><span style="color: #8c8a8a">├─</span> total_comment_count</span></td><td key=1><span>integer</span></td><td key=2>非必须</td><td key=3></td><td key=4><span>总评论数，response_type=comment时返回</span></td><td key=5></td></tr><tr key=0-1-3-7><td key=0><span style="padding-left: 40px"><span style="color: #8c8a8a">├─</span> fans_comment_count</span></td><td key=1><span>integer</span></td><td key=2>非必须</td><td key=3></td><td key=4><span>粉丝评论数，response_type=comment时返回</span></td><td key=5></td></tr><tr key=0-1-3-8><td key=0><span style="padding-left: 40px"><span style="color: #8c8a8a">├─</span> comment_count</span></td><td key=1><span>integer</span></td><td key=2>非必须</td><td key=3></td><td key=4><span>评论数，response_type=statistic时返回</span></td><td key=5></td></tr><tr key=0-1-3-9><td key=0><span style="padding-left: 40px"><span style="color: #8c8a8a">├─</span> read_count</span></td><td key=1><span>integer</span></td><td key=2>非必须</td><td key=3></td><td key=4><span>阅读数，response_type=statistic时返回</span></td><td key=5></td></tr><tr key=0-1-3-10><td key=0><span style="padding-left: 40px"><span style="color: #8c8a8a">├─</span> like_count</span></td><td key=1><span>integer</span></td><td key=2>非必须</td><td key=3></td><td key=4><span>点赞数，response_type=statistic时返回</span></td><td key=5></td></tr><tr key=0-1-3-11><td key=0><span style="padding-left: 40px"><span style="color: #8c8a8a">├─</span> repost_count</span></td><td key=1><span>integer</span></td><td key=2>非必须</td><td key=3></td><td key=4><span>转发数，response_type=statistic时返回</span></td><td key=5></td></tr><tr key=0-1-3-12><td key=0><span style="padding-left: 40px"><span style="color: #8c8a8a">├─</span> collect_count</span></td><td key=1><span>integer</span></td><td key=2>非必须</td><td key=3></td><td key=4><span>收藏数，response_type=statistic时返回</span></td><td key=5></td></tr>
               </tbody>
              </table>

## 获取文章频道
<a id=获取文章频道> </a>
### 基本信息

**Path：** /mp/v1_0/channels

**Method：** GET

**接口描述：**
<h4>1. 线上地址</h4>
<pre><code data-language="http" class="lang-http">http://ttapi.research.itcast.cn/mp/v1_0/channels

</code></pre>
<h3>2.&nbsp; 返回HTTP状态码</h3>
<p><strong>1. 200 OK</strong><br>
2. 507 服务器数据库异常</p>


### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Content-Type  |  application/json | 是  |   |   |
**Body**

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key=name>名称</th><th key=type>类型</th><th key=required>是否必须</th><th key=default>默认值</th><th key=desc>备注</th><th key=sub>其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key=0-0><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> mobile</span></td><td key=1><span>string</span></td><td key=2>必须</td><td key=3></td><td key=4><span>手机号</span></td><td key=5></td></tr><tr key=0-1><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> code</span></td><td key=1><span>string</span></td><td key=2>必须</td><td key=3></td><td key=4><span>验证码</span></td><td key=5></td></tr>
               </tbody>
              </table>

### 返回数据

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key=name>名称</th><th key=type>类型</th><th key=required>是否必须</th><th key=default>默认值</th><th key=desc>备注</th><th key=sub>其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key=0-0><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> message</span></td><td key=1><span>string</span></td><td key=2>必须</td><td key=3></td><td key=4><span>消息提示</span></td><td key=5></td></tr><tr key=0-1><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> data</span></td><td key=1><span>object</span></td><td key=2>非必须</td><td key=3></td><td key=4><span>数据</span></td><td key=5></td></tr><tr key=0-1-0><td key=0><span style="padding-left: 20px"><span style="color: #8c8a8a">├─</span> channels</span></td><td key=1><span>object []</span></td><td key=2>非必须</td><td key=3></td><td key=4><span>频道</span></td><td key=5><p key=3><span style="font-weight: '700'">item 类型: </span><span>object</span></p></td></tr><tr key=0-1-0-0><td key=0><span style="padding-left: 40px"><span style="color: #8c8a8a">├─</span> id</span></td><td key=1><span>integer</span></td><td key=2>必须</td><td key=3></td><td key=4><span>频道id</span></td><td key=5></td></tr><tr key=0-1-0-1><td key=0><span style="padding-left: 40px"><span style="color: #8c8a8a">├─</span> name</span></td><td key=1><span>string</span></td><td key=2>必须</td><td key=3></td><td key=4><span>频道名称</span></td><td key=5></td></tr>
               </tbody>
              </table>

## 获取用户图片素材
<a id=获取用户图片素材> </a>
### 基本信息

**Path：** /mp/v1_0/user/images

**Method：** GET

**接口描述：**

<h4>1. 线上地址</h4>
<pre><code data-language="http" class="lang-http">http://ttapi.research.itcast.cn/mp/v1_0/user/images

</code></pre>
<h3>2.&nbsp; 返回HTTP状态码</h3>
<p><strong>1. 200 OK</strong><br>
2. 400 请求参数错误<br>
3.&nbsp; 401 token过期或未传~~~~<br>
4. 507 服务器数据库异常</p>
<h3>3. token说明</h3>
<p><strong>在Authorization 请求头中携带的token，格式为"Bearer "拼接上token，注意Bearer后有一个空格</strong></p>


### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Content-Type  |  application/json | 是  |   |   |
| Authorization  |   | 是  |  Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NDMyODQzNjYsInVzZXJfaWQiOjF9.mLYitrKsn4E4KdQd0CNPugKrH8uQmXEQTlG_JutC8jU |  用户token |
**Query**

| 参数名称  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ |
| collect | 否  |  true 或 false |  是否是收藏的图片 |
| page | 否  |   |  页数 |
| per_page | 否  |   |  每页数量 |
**Body**

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key=name>名称</th><th key=type>类型</th><th key=required>是否必须</th><th key=default>默认值</th><th key=desc>备注</th><th key=sub>其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key=0-0><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> mobile</span></td><td key=1><span>string</span></td><td key=2>必须</td><td key=3></td><td key=4><span>手机号</span></td><td key=5></td></tr><tr key=0-1><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> code</span></td><td key=1><span>string</span></td><td key=2>必须</td><td key=3></td><td key=4><span>验证码</span></td><td key=5></td></tr>
               </tbody>
              </table>

### 返回数据

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key=name>名称</th><th key=type>类型</th><th key=required>是否必须</th><th key=default>默认值</th><th key=desc>备注</th><th key=sub>其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key=0-0><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> message</span></td><td key=1><span>string</span></td><td key=2>必须</td><td key=3></td><td key=4><span>消息提示</span></td><td key=5></td></tr><tr key=0-1><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> data</span></td><td key=1><span>object</span></td><td key=2>非必须</td><td key=3></td><td key=4><span>数据</span></td><td key=5></td></tr><tr key=0-1-0><td key=0><span style="padding-left: 20px"><span style="color: #8c8a8a">├─</span> total_count</span></td><td key=1><span>integer</span></td><td key=2>必须</td><td key=3></td><td key=4><span>图片总数</span></td><td key=5></td></tr><tr key=0-1-1><td key=0><span style="padding-left: 20px"><span style="color: #8c8a8a">├─</span> page</span></td><td key=1><span>integer</span></td><td key=2>必须</td><td key=3></td><td key=4><span>当前页数</span></td><td key=5></td></tr><tr key=0-1-2><td key=0><span style="padding-left: 20px"><span style="color: #8c8a8a">├─</span> per_page</span></td><td key=1><span>integer</span></td><td key=2>必须</td><td key=3></td><td key=4><span>每页数量</span></td><td key=5></td></tr><tr key=0-1-3><td key=0><span style="padding-left: 20px"><span style="color: #8c8a8a">├─</span> results</span></td><td key=1><span>object []</span></td><td key=2>必须</td><td key=3></td><td key=4><span></span></td><td key=5><p key=3><span style="font-weight: '700'">item 类型: </span><span>object</span></p></td></tr><tr key=0-1-3-0><td key=0><span style="padding-left: 40px"><span style="color: #8c8a8a">├─</span> id</span></td><td key=1><span>integer</span></td><td key=2>必须</td><td key=3></td><td key=4><span>图片id</span></td><td key=5></td></tr><tr key=0-1-3-1><td key=0><span style="padding-left: 40px"><span style="color: #8c8a8a">├─</span> url</span></td><td key=1><span>string</span></td><td key=2>必须</td><td key=3></td><td key=4><span>图片url</span></td><td key=5></td></tr><tr key=0-1-3-2><td key=0><span style="padding-left: 40px"><span style="color: #8c8a8a">├─</span> is_collected</span></td><td key=1><span>boolean</span></td><td key=2>必须</td><td key=3></td><td key=4><span>是否收藏</span></td><td key=5></td></tr>
               </tbody>
              </table>

## 获取评论或评论回复
<a id=获取评论或评论回复> </a>
### 基本信息

**Path：** /mp/v1_0/comments

**Method：** GET

**接口描述：**
<h4>1. 线上地址</h4>
<pre><code data-language="http" class="lang-http">http://ttapi.research.itcast.cn/mp/v1_0/comments

</code></pre>
<h3>2.&nbsp; 返回HTTP状态码</h3>
<p><strong>1. 200 OK</strong><br>
2. 400 请求参数错误<br>
3.&nbsp; 401 token过期或未传~~~~<br>
4. 507 服务器数据库异常</p>
<h3>3. token说明</h3>
<p><strong>在Authorization 请求头中携带的token，格式为"Bearer "拼接上token，注意Bearer后有一个空格</strong></p>


### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Content-Type  |  application/json | 是  |   |   |
| Authorization  |   | 是  |  Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NDMyODQzNjYsInVzZXJfaWQiOjF9.mLYitrKsn4E4KdQd0CNPugKrH8uQmXEQTlG_JutC8jU |  用户token |
**Query**

| 参数名称  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ |
| type | 是  |  a或c |  评论类型，a-对文章(article)的评论，c-对评论(comment)的回复 |
| source | 是  |   |  文章id 或 评论id |
| offset | 否  |   |  获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据 |
| limit | 否  |   |  获取的评论数据个数，不传表示采用后端服务设定的默认每页数据量 |
**Body**

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key=name>名称</th><th key=type>类型</th><th key=required>是否必须</th><th key=default>默认值</th><th key=desc>备注</th><th key=sub>其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key=0-0><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> allow_comment</span></td><td key=1><span>boolean</span></td><td key=2>必须</td><td key=3></td><td key=4><span>是否允许评论</span></td><td key=5></td></tr>
               </tbody>
              </table>

### 返回数据

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key=name>名称</th><th key=type>类型</th><th key=required>是否必须</th><th key=default>默认值</th><th key=desc>备注</th><th key=sub>其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key=0-0><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> message</span></td><td key=1><span>string</span></td><td key=2>必须</td><td key=3></td><td key=4><span>消息提示</span></td><td key=5></td></tr><tr key=0-1><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> data</span></td><td key=1><span>object</span></td><td key=2>非必须</td><td key=3></td><td key=4><span>数据</span></td><td key=5></td></tr><tr key=0-1-0><td key=0><span style="padding-left: 20px"><span style="color: #8c8a8a">├─</span> total_count</span></td><td key=1><span>integer</span></td><td key=2>必须</td><td key=3></td><td key=4><span>文章的评论总数 或 评论的总回复数</span></td><td key=5></td></tr><tr key=0-1-1><td key=0><span style="padding-left: 20px"><span style="color: #8c8a8a">├─</span> art_id</span></td><td key=1><span>integer</span></td><td key=2>非必须</td><td key=3></td><td key=4><span>文章id，只在type=a时返回</span></td><td key=5></td></tr><tr key=0-1-2><td key=0><span style="padding-left: 20px"><span style="color: #8c8a8a">├─</span> art_title</span></td><td key=1><span>string</span></td><td key=2>非必须</td><td key=3></td><td key=4><span>文章标题，只在type=a时返回</span></td><td key=5></td></tr><tr key=0-1-3><td key=0><span style="padding-left: 20px"><span style="color: #8c8a8a">├─</span> art_pubdate</span></td><td key=1><span>string</span></td><td key=2>非必须</td><td key=3></td><td key=4><span>文章发布日期，只在type=a时返回</span></td><td key=5></td></tr><tr key=0-1-4><td key=0><span style="padding-left: 20px"><span style="color: #8c8a8a">├─</span> end_id</span></td><td key=1><span>integer</span></td><td key=2>必须</td><td key=3></td><td key=4><span>所有评论或回复的最后一个id（截止offset值，小于此值的offset可以不用发送请求获取评论数据，已经没有数据），若无评论或回复数据，则值为NULL</span></td><td key=5></td></tr><tr key=0-1-5><td key=0><span style="padding-left: 20px"><span style="color: #8c8a8a">├─</span> last_id</span></td><td key=1><span>integer</span></td><td key=2>必须</td><td key=3></td><td key=4><span>本次返回结果的最后一个评论id，作为请求下一页数据的offset参数，若本次无具体数据，则值为NULL</span></td><td key=5></td></tr><tr key=0-1-6><td key=0><span style="padding-left: 20px"><span style="color: #8c8a8a">├─</span> results</span></td><td key=1><span>object []</span></td><td key=2>必须</td><td key=3></td><td key=4><span>评论或回复的内容</span></td><td key=5><p key=3><span style="font-weight: '700'">item 类型: </span><span>object</span></p></td></tr><tr key=0-1-6-0><td key=0><span style="padding-left: 40px"><span style="color: #8c8a8a">├─</span> com_id</span></td><td key=1><span>integer</span></td><td key=2>必须</td><td key=3></td><td key=4><span>评论或回复id</span></td><td key=5></td></tr><tr key=0-1-6-1><td key=0><span style="padding-left: 40px"><span style="color: #8c8a8a">├─</span> aut_id</span></td><td key=1><span>integer</span></td><td key=2>必须</td><td key=3></td><td key=4><span>评论或回复的用户id</span></td><td key=5></td></tr><tr key=0-1-6-2><td key=0><span style="padding-left: 40px"><span style="color: #8c8a8a">├─</span> aut_name</span></td><td key=1><span>string</span></td><td key=2>必须</td><td key=3></td><td key=4><span>用户名称</span></td><td key=5></td></tr><tr key=0-1-6-3><td key=0><span style="padding-left: 40px"><span style="color: #8c8a8a">├─</span> aut_photo</span></td><td key=1><span>string</span></td><td key=2>必须</td><td key=3></td><td key=4><span>用户头像url</span></td><td key=5></td></tr><tr key=0-1-6-4><td key=0><span style="padding-left: 40px"><span style="color: #8c8a8a">├─</span> like_count</span></td><td key=1><span>integer</span></td><td key=2>必须</td><td key=3></td><td key=4><span>点赞数量</span></td><td key=5></td></tr><tr key=0-1-6-5><td key=0><span style="padding-left: 40px"><span style="color: #8c8a8a">├─</span> reply_count</span></td><td key=1><span>integer</span></td><td key=2>必须</td><td key=3></td><td key=4><span>回复数量</span></td><td key=5></td></tr><tr key=0-1-6-6><td key=0><span style="padding-left: 40px"><span style="color: #8c8a8a">├─</span> pubdate</span></td><td key=1><span>string</span></td><td key=2>必须</td><td key=3></td><td key=4><span>创建日期</span></td><td key=5></td></tr><tr key=0-1-6-7><td key=0><span style="padding-left: 40px"><span style="color: #8c8a8a">├─</span> content</span></td><td key=1><span>string</span></td><td key=2>必须</td><td key=3></td><td key=4><span>评论或回复内容</span></td><td key=5></td></tr><tr key=0-1-6-8><td key=0><span style="padding-left: 40px"><span style="color: #8c8a8a">├─</span> is_top</span></td><td key=1><span>integer</span></td><td key=2>必须</td><td key=3></td><td key=4><span>是否置顶，0-不置顶，1-置顶</span></td><td key=5></td></tr><tr key=0-1-6-9><td key=0><span style="padding-left: 40px"><span style="color: #8c8a8a">├─</span> is_liking</span></td><td key=1><span>integer</span></td><td key=2>必须</td><td key=3></td><td key=4><span>是否点赞，0-未点赞，1-已点赞</span></td><td key=5></td></tr>
               </tbody>
              </table>

# 统计

## 获取指定文章详细统计数据
<a id=获取指定文章详细统计数据> </a>
### 基本信息

**Path：** /mp/v1_0/statistics/articles/:article_id

**Method：** GET

**接口描述：**
<h4>1. 线上地址</h4>
<pre><code data-language="http" class="lang-http">http://ttapi.research.itcast.cn/mp/v1_0/statistics/articles/:article_id

</code></pre>
<h3>2.&nbsp; 返回HTTP状态码</h3>
<p><strong>1. 200 OK</strong><br>
2. 400 请求参数错误<br>
3. 401&nbsp;<span class="colour" style="color:rgb(85, 85, 85)">token过期或未传~~~~</span><br>
4. 507 服务器数据库异常</p>


### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Content-Type  |  application/json | 是  |   |   |
| Authorization  |   | 是  |  Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NDMyODQzNjYsInVzZXJfaWQiOjF9.mLYitrKsn4E4KdQd0CNPugKrH8uQmXEQTlG_JutC8jU |  用户token |
**路径参数**
| 参数名称 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| article_id |   |  文章id |
**Query**

| 参数名称  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ |
| begin_pubdate | 否  |  2019-01-01 |  起始时间 |
| end_pubdate | 否  |  2019-01-02 |  截止时间 |
**Body**

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key=name>名称</th><th key=type>类型</th><th key=required>是否必须</th><th key=default>默认值</th><th key=desc>备注</th><th key=sub>其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key=0-0><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> mobile</span></td><td key=1><span>string</span></td><td key=2>必须</td><td key=3></td><td key=4><span>手机号</span></td><td key=5></td></tr><tr key=0-1><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> code</span></td><td key=1><span>string</span></td><td key=2>必须</td><td key=3></td><td key=4><span>验证码</span></td><td key=5></td></tr>
               </tbody>
              </table>

### 返回数据

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key=name>名称</th><th key=type>类型</th><th key=required>是否必须</th><th key=default>默认值</th><th key=desc>备注</th><th key=sub>其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key=0-0><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> message</span></td><td key=1><span>string</span></td><td key=2>必须</td><td key=3>OK</td><td key=4><span>消息提示</span></td><td key=5><p key=2><span style="font-weight: '700'">枚举: </span><span>OK</span></p></td></tr><tr key=0-1><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> data</span></td><td key=1><span>object</span></td><td key=2>必须</td><td key=3></td><td key=4><span>数据</span></td><td key=5></td></tr><tr key=0-1-0><td key=0><span style="padding-left: 20px"><span style="color: #8c8a8a">├─</span> avg_read_proc</span></td><td key=1><span>number</span></td><td key=2>必须</td><td key=3></td><td key=4><span>平均阅读进度</span></td><td key=5><p key=0><span style="font-weight: '700'">最大值: </span><span>1</span></p><p key=1><span style="font-weight: '700'">最小值: </span><span>0</span></p></td></tr><tr key=0-1-1><td key=0><span style="padding-left: 20px"><span style="color: #8c8a8a">├─</span> bounce_rate</span></td><td key=1><span>number</span></td><td key=2>必须</td><td key=3></td><td key=4><span>跳出率</span></td><td key=5><p key=0><span style="font-weight: '700'">最大值: </span><span>1</span></p><p key=1><span style="font-weight: '700'">最小值: </span><span>0</span></p></td></tr><tr key=0-1-2><td key=0><span style="padding-left: 20px"><span style="color: #8c8a8a">├─</span> time_spent</span></td><td key=1><span>integer</span></td><td key=2>必须</td><td key=3></td><td key=4><span>阅读时间，单位秒</span></td><td key=5><p key=0><span style="font-weight: '700'">最大值: </span><span>1000</span></p><p key=1><span style="font-weight: '700'">最小值: </span><span>1</span></p></td></tr><tr key=0-1-3><td key=0><span style="padding-left: 20px"><span style="color: #8c8a8a">├─</span> conversion</span></td><td key=1><span>object</span></td><td key=2>必须</td><td key=3></td><td key=4><span>转化</span></td><td key=5></td></tr><tr key=0-1-3-0><td key=0><span style="padding-left: 40px"><span style="color: #8c8a8a">├─</span> reco_count</span></td><td key=1><span>integer</span></td><td key=2>必须</td><td key=3></td><td key=4><span>推荐量</span></td><td key=5><p key=0><span style="font-weight: '700'">最大值: </span><span>10000</span></p><p key=1><span style="font-weight: '700'">最小值: </span><span>0</span></p></td></tr><tr key=0-1-3-1><td key=0><span style="padding-left: 40px"><span style="color: #8c8a8a">├─</span> read_count</span></td><td key=1><span>integer</span></td><td key=2>必须</td><td key=3></td><td key=4><span>阅读量</span></td><td key=5><p key=0><span style="font-weight: '700'">最大值: </span><span>8000</span></p><p key=1><span style="font-weight: '700'">最小值: </span><span>0</span></p></td></tr><tr key=0-1-3-2><td key=0><span style="padding-left: 40px"><span style="color: #8c8a8a">├─</span> fans_read_count</span></td><td key=1><span>integer</span></td><td key=2>必须</td><td key=3></td><td key=4><span>粉丝阅读量</span></td><td key=5><p key=0><span style="font-weight: '700'">最大值: </span><span>6000</span></p><p key=1><span style="font-weight: '700'">最小值: </span><span>0</span></p></td></tr><tr key=0-1-3-3><td key=0><span style="padding-left: 40px"><span style="color: #8c8a8a">├─</span> comment_count</span></td><td key=1><span>integer</span></td><td key=2>必须</td><td key=3></td><td key=4><span>评论量</span></td><td key=5><p key=0><span style="font-weight: '700'">最大值: </span><span>7000</span></p><p key=1><span style="font-weight: '700'">最小值: </span><span>0</span></p></td></tr><tr key=0-1-4><td key=0><span style="padding-left: 20px"><span style="color: #8c8a8a">├─</span> origin</span></td><td key=1><span>object</span></td><td key=2>必须</td><td key=3></td><td key=4><span>来源</span></td><td key=5></td></tr><tr key=0-1-4-0><td key=0><span style="padding-left: 40px"><span style="color: #8c8a8a">├─</span> recommend</span></td><td key=1><span>integer</span></td><td key=2>必须</td><td key=3></td><td key=4><span>推荐</span></td><td key=5><p key=0><span style="font-weight: '700'">最大值: </span><span>10000</span></p><p key=1><span style="font-weight: '700'">最小值: </span><span>0</span></p></td></tr><tr key=0-1-4-1><td key=0><span style="padding-left: 40px"><span style="color: #8c8a8a">├─</span> channel</span></td><td key=1><span>integer</span></td><td key=2>必须</td><td key=3></td><td key=4><span>频道</span></td><td key=5><p key=0><span style="font-weight: '700'">最大值: </span><span>10000</span></p><p key=1><span style="font-weight: '700'">最小值: </span><span>0</span></p></td></tr><tr key=0-1-4-2><td key=0><span style="padding-left: 40px"><span style="color: #8c8a8a">├─</span> relation</span></td><td key=1><span>integer</span></td><td key=2>必须</td><td key=3></td><td key=4><span>相关</span></td><td key=5><p key=0><span style="font-weight: '700'">最大值: </span><span>10000</span></p><p key=1><span style="font-weight: '700'">最小值: </span><span>0</span></p></td></tr><tr key=0-1-4-3><td key=0><span style="padding-left: 40px"><span style="color: #8c8a8a">├─</span> outter</span></td><td key=1><span>integer</span></td><td key=2>必须</td><td key=3></td><td key=4><span>应用外</span></td><td key=5><p key=0><span style="font-weight: '700'">最大值: </span><span>10000</span></p><p key=1><span style="font-weight: '700'">最小值: </span><span>0</span></p></td></tr><tr key=0-1-4-4><td key=0><span style="padding-left: 40px"><span style="color: #8c8a8a">├─</span> other</span></td><td key=1><span>integer</span></td><td key=2>必须</td><td key=3></td><td key=4><span>其他</span></td><td key=5><p key=0><span style="font-weight: '700'">最大值: </span><span>10000</span></p><p key=1><span style="font-weight: '700'">最小值: </span><span>0</span></p></td></tr><tr key=0-1-5><td key=0><span style="padding-left: 20px"><span style="color: #8c8a8a">├─</span> completed</span></td><td key=1><span>object</span></td><td key=2>必须</td><td key=3></td><td key=4><span>完成度</span></td><td key=5></td></tr><tr key=0-1-5-0><td key=0><span style="padding-left: 40px"><span style="color: #8c8a8a">├─</span> gt80</span></td><td key=1><span>integer</span></td><td key=2>必须</td><td key=3></td><td key=4><span>超过80%</span></td><td key=5><p key=0><span style="font-weight: '700'">最大值: </span><span>10000</span></p><p key=1><span style="font-weight: '700'">最小值: </span><span>0</span></p></td></tr><tr key=0-1-5-1><td key=0><span style="padding-left: 40px"><span style="color: #8c8a8a">├─</span> lt80</span></td><td key=1><span>integer</span></td><td key=2>必须</td><td key=3></td><td key=4><span>低于80%</span></td><td key=5><p key=0><span style="font-weight: '700'">最大值: </span><span>10000</span></p><p key=1><span style="font-weight: '700'">最小值: </span><span>0</span></p></td></tr><tr key=0-1-5-2><td key=0><span style="padding-left: 40px"><span style="color: #8c8a8a">├─</span> lt20</span></td><td key=1><span>integer</span></td><td key=2>必须</td><td key=3></td><td key=4><span>低于20%</span></td><td key=5><p key=0><span style="font-weight: '700'">最大值: </span><span>10000</span></p><p key=1><span style="font-weight: '700'">最小值: </span><span>0</span></p></td></tr>
               </tbody>
              </table>

## 获取文章统计数据（总量）
<a id=获取文章统计数据（总量）> </a>
### 基本信息

**Path：** /mp/v1_0/statistics/articles

**Method：** GET

**接口描述：**
<h4>1. 线上地址</h4>
<pre><code data-language="http" class="lang-http">http://ttapi.research.itcast.cn/mp/v1_0/statistics/articles

</code></pre>
<h3>2.&nbsp; 返回HTTP状态码</h3>
<p><strong>1. 200 OK</strong><br>
2. 400 请求参数错误<br>
3. 401&nbsp;<span class="colour" style="color:rgb(85, 85, 85)">token过期或未传~~~~</span><br>
4. 507 服务器数据库异常</p>


### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Content-Type  |  application/json | 是  |   |   |
| Authorization  |   | 是  |  Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NDMyODQzNjYsInVzZXJfaWQiOjF9.mLYitrKsn4E4KdQd0CNPugKrH8uQmXEQTlG_JutC8jU |  用户token |
**Query**

| 参数名称  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ |
| channel_id | 否  |   |  频道id，不传为全部 |
| begin_pubdate | 否  |  2019-01-01 |  起始时间 |
| end_pubdate | 否  |  2019-01-02 |  截止时间 |
**Body**

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key=name>名称</th><th key=type>类型</th><th key=required>是否必须</th><th key=default>默认值</th><th key=desc>备注</th><th key=sub>其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key=0-0><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> mobile</span></td><td key=1><span>string</span></td><td key=2>必须</td><td key=3></td><td key=4><span>手机号</span></td><td key=5></td></tr><tr key=0-1><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> code</span></td><td key=1><span>string</span></td><td key=2>必须</td><td key=3></td><td key=4><span>验证码</span></td><td key=5></td></tr>
               </tbody>
              </table>

### 返回数据

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key=name>名称</th><th key=type>类型</th><th key=required>是否必须</th><th key=default>默认值</th><th key=desc>备注</th><th key=sub>其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key=0-0><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> message</span></td><td key=1><span>string</span></td><td key=2>必须</td><td key=3>OK</td><td key=4><span>消息提示</span></td><td key=5><p key=2><span style="font-weight: '700'">枚举: </span><span>OK</span></p></td></tr><tr key=0-1><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> data</span></td><td key=1><span>object</span></td><td key=2>必须</td><td key=3></td><td key=4><span>数据</span></td><td key=5></td></tr><tr key=0-1-0><td key=0><span style="padding-left: 20px"><span style="color: #8c8a8a">├─</span> read_count</span></td><td key=1><span>integer</span></td><td key=2>必须</td><td key=3></td><td key=4><span>阅读量</span></td><td key=5><p key=0><span style="font-weight: '700'">最大值: </span><span>10000</span></p><p key=1><span style="font-weight: '700'">最小值: </span><span>0</span></p></td></tr><tr key=0-1-1><td key=0><span style="padding-left: 20px"><span style="color: #8c8a8a">├─</span> comment_count</span></td><td key=1><span>integer</span></td><td key=2>必须</td><td key=3></td><td key=4><span>评论量</span></td><td key=5><p key=0><span style="font-weight: '700'">最大值: </span><span>10000</span></p><p key=1><span style="font-weight: '700'">最小值: </span><span>0</span></p></td></tr><tr key=0-1-2><td key=0><span style="padding-left: 20px"><span style="color: #8c8a8a">├─</span> collect_count</span></td><td key=1><span>integer</span></td><td key=2>必须</td><td key=3></td><td key=4><span>收藏量</span></td><td key=5><p key=0><span style="font-weight: '700'">最大值: </span><span>10000</span></p><p key=1><span style="font-weight: '700'">最小值: </span><span>0</span></p></td></tr><tr key=0-1-3><td key=0><span style="padding-left: 20px"><span style="color: #8c8a8a">├─</span> repost_count</span></td><td key=1><span>integer</span></td><td key=2>必须</td><td key=3></td><td key=4><span>转发量</span></td><td key=5><p key=0><span style="font-weight: '700'">最大值: </span><span>10000</span></p><p key=1><span style="font-weight: '700'">最小值: </span><span>0</span></p></td></tr>
               </tbody>
              </table>

## 获取粉丝统计数据
<a id=获取粉丝统计数据> </a>
### 基本信息

**Path：** /mp/v1_0/statistics/followers

**Method：** GET

**接口描述：**
<h4>1. 线上地址</h4>
<pre><code data-language="http" class="lang-http">http://ttapi.research.itcast.cn/mp/v1_0/statistics/followers

</code></pre>
<h3>2.&nbsp; 返回HTTP状态码</h3>
<p><strong>1. 200 OK</strong><br>
3. 401 token过期或未传<br>
4. 507 服务器数据库异常</p>
<h3>3. token说明</h3>
<p><strong>在Authorization 请求头中携带的token，格式为"Bearer "拼接上token，注意Bearer后有一个空格</strong></p>


### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Content-Type  |  application/json | 是  |   |   |
| Authorization  |   | 是  |  Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NDMyODQzNjYsInVzZXJfaWQiOjF9.mLYitrKsn4E4KdQd0CNPugKrH8uQmXEQTlG_JutC8jU |  refresh_token |
**Body**

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key=name>名称</th><th key=type>类型</th><th key=required>是否必须</th><th key=default>默认值</th><th key=desc>备注</th><th key=sub>其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody">
               </tbody>
              </table>

### 返回数据

<table>
  <thead class="ant-table-thead">
    <tr>
      <th key=name>名称</th><th key=type>类型</th><th key=required>是否必须</th><th key=default>默认值</th><th key=desc>备注</th><th key=sub>其他信息</th>
    </tr>
  </thead><tbody className="ant-table-tbody"><tr key=0-0><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> message</span></td><td key=1><span>string</span></td><td key=2>必须</td><td key=3></td><td key=4><span>消息提示</span></td><td key=5><p key=2><span style="font-weight: '700'">枚举: </span><span>OK</span></p></td></tr><tr key=0-1><td key=0><span style="padding-left: 0px"><span style="color: #8c8a8a"></span> data</span></td><td key=1><span>object</span></td><td key=2>必须</td><td key=3></td><td key=4><span>数据</span></td><td key=5></td></tr><tr key=0-1-0><td key=0><span style="padding-left: 20px"><span style="color: #8c8a8a">├─</span> gender</span></td><td key=1><span>object</span></td><td key=2>必须</td><td key=3></td><td key=4><span></span></td><td key=5></td></tr><tr key=0-1-0-0><td key=0><span style="padding-left: 40px"><span style="color: #8c8a8a">├─</span> male</span></td><td key=1><span>integer</span></td><td key=2>必须</td><td key=3></td><td key=4><span>男粉丝数量</span></td><td key=5><p key=0><span style="font-weight: '700'">最大值: </span><span>1000</span></p><p key=1><span style="font-weight: '700'">最小值: </span><span>0</span></p></td></tr><tr key=0-1-0-1><td key=0><span style="padding-left: 40px"><span style="color: #8c8a8a">├─</span> female</span></td><td key=1><span>integer</span></td><td key=2>必须</td><td key=3></td><td key=4><span>女粉丝数量</span></td><td key=5><p key=0><span style="font-weight: '700'">最大值: </span><span>1000</span></p><p key=1><span style="font-weight: '700'">最小值: </span><span>0</span></p></td></tr><tr key=0-1-1><td key=0><span style="padding-left: 20px"><span style="color: #8c8a8a">├─</span> age</span></td><td key=1><span>object</span></td><td key=2>必须</td><td key=3></td><td key=4><span></span></td><td key=5></td></tr><tr key=0-1-1-0><td key=0><span style="padding-left: 40px"><span style="color: #8c8a8a">├─</span> le18</span></td><td key=1><span>integer</span></td><td key=2>必须</td><td key=3></td><td key=4><span>0-18</span></td><td key=5><p key=0><span style="font-weight: '700'">最大值: </span><span>300</span></p><p key=1><span style="font-weight: '700'">最小值: </span><span>0</span></p></td></tr><tr key=0-1-1-1><td key=0><span style="padding-left: 40px"><span style="color: #8c8a8a">├─</span> le23</span></td><td key=1><span>integer</span></td><td key=2>必须</td><td key=3></td><td key=4><span>19-23</span></td><td key=5><p key=0><span style="font-weight: '700'">最大值: </span><span>300</span></p><p key=1><span style="font-weight: '700'">最小值: </span><span>0</span></p></td></tr><tr key=0-1-1-2><td key=0><span style="padding-left: 40px"><span style="color: #8c8a8a">├─</span> le30</span></td><td key=1><span>integer</span></td><td key=2>必须</td><td key=3></td><td key=4><span>24-30</span></td><td key=5><p key=0><span style="font-weight: '700'">最大值: </span><span>300</span></p><p key=1><span style="font-weight: '700'">最小值: </span><span>0</span></p></td></tr><tr key=0-1-1-3><td key=0><span style="padding-left: 40px"><span style="color: #8c8a8a">├─</span> le40</span></td><td key=1><span>integer</span></td><td key=2>必须</td><td key=3></td><td key=4><span>31-40</span></td><td key=5><p key=0><span style="font-weight: '700'">最大值: </span><span>300</span></p><p key=1><span style="font-weight: '700'">最小值: </span><span>0</span></p></td></tr><tr key=0-1-1-4><td key=0><span style="padding-left: 40px"><span style="color: #8c8a8a">├─</span> le50</span></td><td key=1><span>integer</span></td><td key=2>必须</td><td key=3></td><td key=4><span>41-50</span></td><td key=5><p key=0><span style="font-weight: '700'">最大值: </span><span>300</span></p><p key=1><span style="font-weight: '700'">最小值: </span><span>0</span></p></td></tr><tr key=0-1-1-5><td key=0><span style="padding-left: 40px"><span style="color: #8c8a8a">├─</span> gt50</span></td><td key=1><span>integer</span></td><td key=2>必须</td><td key=3></td><td key=4><span>50+</span></td><td key=5><p key=0><span style="font-weight: '700'">最大值: </span><span>300</span></p><p key=1><span style="font-weight: '700'">最小值: </span><span>0</span></p></td></tr><tr key=0-1-2><td key=0><span style="padding-left: 20px"><span style="color: #8c8a8a">├─</span> device</span></td><td key=1><span>object</span></td><td key=2>必须</td><td key=3></td><td key=4><span></span></td><td key=5></td></tr><tr key=0-1-2-0><td key=0><span style="padding-left: 40px"><span style="color: #8c8a8a">├─</span> ios</span></td><td key=1><span>integer</span></td><td key=2>必须</td><td key=3></td><td key=4><span></span></td><td key=5><p key=0><span style="font-weight: '700'">最大值: </span><span>1000</span></p><p key=1><span style="font-weight: '700'">最小值: </span><span>0</span></p></td></tr><tr key=0-1-2-1><td key=0><span style="padding-left: 40px"><span style="color: #8c8a8a">├─</span> android</span></td><td key=1><span>integer</span></td><td key=2>必须</td><td key=3></td><td key=4><span></span></td><td key=5><p key=0><span style="font-weight: '700'">最大值: </span><span>1000</span></p><p key=1><span style="font-weight: '700'">最小值: </span><span>0</span></p></td></tr>
               </tbody>
              </table>
​            