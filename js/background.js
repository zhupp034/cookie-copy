let cacheCookieList = []

let inputCache = 'leke.cn'

function copyCookies({domain}) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        var tabID = tabs[0].id;
        chrome.tabs.get(tabID, function(tab) {
          if (tab.url) {
            var url = new URL(tab.url);
            let defaultConfig = {
                domain: domain || url.host
            }
            chrome.cookies.getAll(defaultConfig, function(cookiesList) {
                cacheCookieList = cookiesList
                chrome.notifications.create(null, {
                    type: 'basic',
                    iconUrl: 'img/tip.png',
                    title: 'cookie插件通知',
                    message: '复制成功'
                });
                chrome.browserAction.setBadgeText({text: 'new'});
                chrome.browserAction.setBadgeBackgroundColor({color: [255, 0, 0, 255]});
            })
        }
        })
	});
}

function setCookies() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        var tabID = tabs[0].id;
        chrome.tabs.get(tabID, function(tab) {
          if (tab.url) {
            var url = new URL(tab.url);
            cacheCookieList.forEach(({name, value, expirationDate}) => {
                chrome.cookies.set(
                    {
                        name,
                        value,
                        url: url.origin,
                        expirationDate: expirationDate
                    },
                    (ck) => {
                        console.log(ck);
                    }
                )
            })
            chrome.notifications.create(null, {
                type: 'basic',
                iconUrl: 'img/tip.png',
                title: 'cookie插件通知',
                message: '粘贴成功'
            });
        }
        })
	});
    
    
}