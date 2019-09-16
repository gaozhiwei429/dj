# 引导页

###  基于uni-app框架的swiper组件打开的时候启动。

> 首次启动展示引导页，之后启动不再展示。那么就意味着，我们需要一个标识来确定，App是否已经启动过。

> 我们可以在本地存储一个key来做为已经启动过App的标识。那么，我们在入口这里，就可以读取这个key，来决定是否展示引导页。

> 因工作繁忙目前该程序金对安卓做了适配，IOS可根据环境自己适配。谢谢

## 目录结构
* index.vue //入口页
* guide.vue //引导页
### 存储key
* 向本地存储中设置launchFlag的值，即启动标识；
### 获取key
* 向本地存储中设置launchFlag的值，即启动标识；
* 获取本地存储中launchFlag的值
* 若存在，说明不是首次启动，直接进入首页；
* 若不存在，说明是首次启动，进入引导页；
```javascript
  try {
        const value = uni.getStorageSync('launchFlag');
        if (value) {
            if (value == true) {
                uni.switchTab({
                    url: '/pages/tabbar/tabbar-1/tabbar-1'
                });
            } else {
                uni.redirectTo({
                    url: '/pages/index/guide'
                });
            }
        } else {
            uni.setStorage({
                key: 'launchFlag',
                data: true
            });
            uni.redirectTo({
                url: '/pages/index/guide'
            });
        }
    } catch(e) { 
        // error 
        uni.setStorage({ key: 'launchFlag', 
            data: true
        }); 
        uni.redirectTo({ 
            url: '/pages/index/guide' 
        }); 
    }
```
### 首页清除key，进行测试
* 清除本地存储中设置launchFlag的值，即启动标识；
* 两秒后重启APP，进行测试
```javascript
	uni.showModal({
        title: '清除launchFlag值',
        content: '确定要清除launchFlag值，进行重启测试？',
        success: function (res) {
            if (res.confirm) {
                console.log('用户点击确定');
                // 清除缓存
                uni.clearStorage();
                uni.showToast({
                    icon: 'none',
                    duration:3000,
                    title: '清除成功2秒后重启'
                });
                // 两秒后重启
                setTimeout(function() {
                    uni.hideToast();
                    plus.runtime.restart();
                }, 2000);
            } else if (res.cancel) {
                console.log('用户点击取消');
            }
        }
    });
```