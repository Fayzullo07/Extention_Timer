chrome.alarms.create("fayzulloTimer", {
    periodInMinutes: 1/60
});

chrome.alarms.onAlarm.addListener((alarm) => {
    if(alarm.name = "fayzulloTimer"){
        chrome.storage.local.get(["timer", "isRunning", "timeOption"], (result) => {
            if(!result.isRunning){
                let timer = result.timer + 1;
                let isRunning = false
                if(timer === 60 * result.timeOption) {
                    this.registration.showNotification("fayzulloTimer", {
                        body: `${result.timeOption} minutes has passed`,
                        icon: "icon.png"
                    })
                    timer = 0;
                    isRunning = true
                }
                chrome.storage.local.set({timer, isRunning})
            }
        })
    }
});

chrome.storage.local.get(["timer", "isRunning", "timeOption"], (result) => {
    chrome.storage.local.set({
        timer: "timer" in result ? result.timer : 0,
        timeOption: "timeOption" in result ? result.timeOption : 25,
        isRunning: "isRunning" in result ? result.isRunning : true
    })
})