const apiURL = 'https://bright-fly-undershirt.cyclic.app/clist.by/api/v2/contest/';
const apiKey = '32b0dc3d2ed2ee0e8ad5eb7dfe37c47e4da8abb4';
const username = 'karanarjunjr';
const todayStart = new Date();
todayStart.setHours(0, 0, 0, 0); // Set time to 00:00:00 today
const nowString = new Date().toISOString();
const todayStartString = todayStart.toISOString();
var table = document.getElementById('leetcodeTable');
table.classList.toggle('hidden');
var all = false;

const platformNames = {
    "leetcode.com": "LeetCode",
    "dl.gsu.by": "Georgia State University",
    "contest.yandex.ru/CYF": "Yandex",
    "codingninjas.com/codestudio": "Coding Ninjas",
    "projecteuler.net": "Project Euler",
    "atcoder.jp": "AtCoder",
    "atcoder.jp?lang=ja": "AtCoder",
    "geeksforgeeks.org": "GeeksforGeeks",
    "codeforces.com": "Codeforces",
    "codechef.com": "CodeChef",
    "robocontest.uz": "RoboContest",
    "ctftime.org": "CTFtime",
    "yukicoder.me": "Yukicoder",
    "cups.online": "CUPS",
    "icpc.global": "ICPC",
    "huawei.com/minisite/imc-challenge/en": "Huawei",
    "topcoder.com": "TopCoder",
    "acm.bsuir.by": "ACM",
    "acm.bsu.by": "ACM",
    "techgig.com/codegladiators": "TechGig",
    "icfpconference.org": "ICFP Conference"
};

const filterObject = {
    "LeetCode": true,
    "Georgia State University": false,
    "Yandex": false,
    "Coding Ninjas": true,
    "Project Euler": false,
    "AtCoder": true,
    "GeeksforGeeks": true,
    "Codeforces": true,
    "CodeChef": true,
    "RoboContest": false,
    "CTFtime": false,
    "Yukicoder": false,
    "CUPS": false,
    "ICPC": true,
    "Huawei": false,
    "TopCoder": false,
    "ACM": false,
    "TechGig": false,
    "ICFP Conference": false
};

async function refresh(){
        try {
            const data = await fetchAndStoreData();
            window.localStorage.saveData = data;
            displayData(data);
    
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }



window.addEventListener('DOMContentLoaded', async () => {
    try {
        const data = await fetchAndStoreData();
        window.localStorage.saveData = data;
        displayData(data);

    } catch (error) {
        console.error('Error fetching data:', error);
    }
});

async function fetchAndStoreData() {
    const localData = localStorage.getItem('contests');
    const timeStamp = localStorage.getItem('timeStamp');
    if (localData && timeStamp && Date.now() - parseInt(timeStamp) < 86400000) {
        return JSON.parse(localData);
    }
    const queryParams = new URLSearchParams({
        username: username,
        api_key: apiKey,
        format: 'json',
        order_by: 'start',
        end__gt: nowString,
        start__gt: todayStartString
    });
    const response = await fetch(`${apiURL}?${queryParams.toString()}`);
    const data = await response.json();
    localStorage.setItem('contests', JSON.stringify(data));
    localStorage.setItem('timeStamp', Date.now().toString());
    return data;
}

function getPlatformName(url) {
        return platformNames[url];
}


function displayData(data) {
    const container = document.createElement('div');
    container.classList.add('contest-container');
    document.querySelector('.main').innerHTML = "";
    if (data.objects && data.objects.length > 0) {
        data.objects.forEach((contest) => {
            console.log(contest);
            const platformName = getPlatformName(contest.host);
            if (filterObject[platformName]) {
                const card = document.createElement("div");
                card.classList.add("card");

                const startDate = new Date(contest.start);
                const endDate = new Date(contest.end);
                const startTime = startDate.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
                const endTime = endDate.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
                const duration = (endDate - startDate);
            
                const hoursDifference = Math.floor(duration / (1000 * 60 * 60));
                const minutesDifference = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));


                if (duration > 0){
                    card.innerHTML = `<div class="card-header">
                        ${platformName}
                    </div>
                    <div class="card-body" style = "height: max;">
                        <h2 class="card-title">${contest.event}</h2>
                        <p class="card-text">
                            <strong>Start Time:</strong> ${startDate.toLocaleDateString()}<br>
                            <strong>Start Time:</strong> ${startTime}<br>
                            <strong>End Time:</strong> ${endTime}<br>
                            <strong>Duration:</strong> ${hoursDifference} hours and ${minutesDifference} minutes<br>
                        </p>
                        <button class="btn notify-btn" onclick="notification()" style = "position: 'relative'; bottom: '20px';">Notify Me</button>
                    </div>`
    
                    card.querySelector('.card-title').addEventListener('click', function() {
                        window.location.href = contest.href;
                    });
    
                    document.querySelector(".main").appendChild(card)
                }
        }});
    }
}

document.getElementById('leetcode').addEventListener('click', function(){
    if(filterObject.LeetCode == true){
        filterObject.LeetCode = false;
        document.getElementById('leetcode').classList.remove('clicked');
        refresh();
    } else {
        filterObject.LeetCode = true;
        document.getElementById('leetcode').classList.add('clicked')
        refresh();
    }
});

document.getElementById('codeforces').addEventListener('click', function(){
    if(filterObject.Codeforces == true){
        filterObject.Codeforces = false;
        document.getElementById('codeforces').classList.remove('clicked');
        refresh();
    } else {
        filterObject.Codeforces = true;
        document.getElementById('codeforces').classList.add('clicked')
        refresh();
    }
});

document.getElementById('atcoder').addEventListener('click', function(){
    if(filterObject.AtCoder == true){
        filterObject.AtCoder = false;
        document.getElementById('atcoder').classList.remove('clicked');
        refresh();
    } else {
        filterObject.AtCoder = true;
        document.getElementById('atcoder').classList.add('clicked')
        refresh();
    }
});

// CodeChef
document.getElementById('codechef').addEventListener('click', function(){
    if(filterObject.CodeChef == true){
        filterObject.CodeChef = false;
        document.getElementById('codechef').classList.remove('clicked');
        refresh();
    } else {
        filterObject.CodeChef = true;
        document.getElementById('codechef').classList.add('clicked');
        refresh();
    }
});

// Coding Ninjas
document.getElementById('codingninjas').addEventListener('click', function(){
    if(filterObject["Coding Ninjas"] == true){
        filterObject["Coding Ninjas"] = false;
        document.getElementById('codingninjas').classList.remove('clicked');
        refresh();
    } else {
        filterObject["Coding Ninjas"] = true;
        document.getElementById('codingninjas').classList.add('clicked');
        refresh();
    }
});

// HackerEarth
document.getElementById('ICPC').addEventListener('click', function(){
    if(filterObject.ICPC == true){
        filterObject.ICPC = false;
        document.getElementById('ICPC').classList.remove('clicked');
        refresh();
    } else {
        filterObject.ICPC = true;
        document.getElementById('ICPC').classList.add('clicked');
        refresh();
    }
});

// GeeksforGeeks
document.getElementById('geeksforgeeks').addEventListener('click', function(){
    if(filterObject.GeeksforGeeks == true){
        filterObject.GeeksforGeeks = false;
        document.getElementById('geeksforgeeks').classList.remove('clicked');
        refresh();
    } else {
        filterObject.GeeksforGeeks = true;
        document.getElementById('geeksforgeeks').classList.add('clicked');
        refresh();
    }
});

function notification() {
    const h2value = document.querySelector('.card-title').textContent;
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    }
    else if (Notification.permission === "granted") {
      var notification = new Notification(`For ${h2value} you will be notified before 15 mins`);
    }
    else if (Notification.permission !== 'denied') {
      Notification.requestPermission(function (permission) {
        if (permission === "granted") {
          var notification = new Notification(`For ${h2value} you will be notified before 15 mins`);
        }
      });
    }
}

document.querySelector('#all').addEventListener('click', function() {
    if(all == true){
        document.querySelector('#all').classList.remove('clicked');
        all = false;
        document.querySelector('#leetcode').classList.remove('clicked');
        document.querySelector('#codeforces').classList.remove('clicked');
        document.querySelector('#atcoder').classList.remove('clicked');
        document.querySelector('#codechef').classList.remove('clicked');
        document.querySelector('#codingninjas').classList.remove('clicked');
        document.querySelector('#ICPC').classList.remove('clicked');
        document.querySelector('#geeksforgeeks').classList.remove('clicked');
        for (const key in filterObject) {
            filterObject[key] = false;
        }
        refresh();
    } else {
        document.querySelector('#all').classList.add('clicked');
        all = true;
        const idsToRemoveOrAdd = ['#leetcode', '#codeforces', '#atcoder', '#codechef', '#codingninjas', '#ICPC', '#geeksforgeeks'];

        function addClickedClass() {
            idsToRemoveOrAdd.forEach(id => {
                document.querySelector(id).classList.add('clicked');
            });
        }
        addClickedClass();
        for (const key in filterObject) {
            filterObject[key] = true;
        }
        refresh();
    }
});