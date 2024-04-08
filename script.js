const syncPointer = ({ x: pointerX, y: pointerY }) => {
    const x = pointerX.toFixed(2)
    const y = pointerY.toFixed(2)
    const xp = (pointerX / window.innerWidth).toFixed(2)
    const yp = (pointerY / window.innerHeight).toFixed(2)
    document.documentElement.style.setProperty('--x', x)
    document.documentElement.style.setProperty('--xp', xp)
    document.documentElement.style.setProperty('--y', y)
    document.documentElement.style.setProperty('--yp', yp)
}
document.body.addEventListener('pointermove', syncPointer)

// Constants
const apiURL = 'https://bright-fly-undershirt.cyclic.app/clist.by/api/v2/contest/';
const apiKey = '32b0dc3d2ed2ee0e8ad5eb7dfe37c47e4da8abb4';
const username = 'karanarjunjr';

// Variables
const todayStart = new Date();
todayStart.setHours(0, 0, 0, 0); // Set time to 00:00:00 today
const nowString = new Date().toISOString();
const todayStartString = todayStart.toISOString();
var table = document.getElementById('leetcodeTable');
var all = true;

// Object for mapping platform URLs to names
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

// Object for filtering contests by platform
const filterObject = {
    "LeetCode": true,
    "Georgia State University": true,
    "Yandex": true,
    "Coding Ninjas": true,
    "Project Euler": true,
    "AtCoder": true,
    "GeeksforGeeks": true,
    "Codeforces": true,
    "CodeChef": true,
    "RoboContest": true,
    "CTFtime": true,
    "Yukicoder": true,
    "CUPS": true,
    "ICPC": true,
    "Huawei": true,
    "TopCoder": true,
    "ACM": true,
    "TechGig": true,
    "ICFP Conference": true
};


// object for Images
const platformImages = {
    "LeetCode": 'assets/leetcode.png',
    "Georgia State University": 'assets/gsu.jpeg',
    "Yandex": 'assets/yendex.png',
    "Coding Ninjas": 'assets/coding.jpeg',
    "Project Euler": 'assets/project.png',
    "AtCoder": 'assets/atcoder.png',
    "GeeksforGeeks": 'assets/gfg.jpeg',
    "Codeforces": 'assets/codeforces.png',
    "CodeChef": 'assets/codechef.jpeg',
    "RoboContest": 'assets/robbi.jpeg',
    "CTFtime": 'assets/cfrt.png',
    "Yukicoder": 'assets/yuki.png',
    "CUPS": 'assets/cups.png',
    "ICPC": 'assets/icpc.png',
    "Huawei": 'assets/huawai.jpeg',
    "TopCoder": 'assets/topcpder.jpeg',
    "ACM": 'assets/acm.jpeg',
    "TechGig": 'assets/tech.png',
    "ICFP Conference": 'assets/icpcc.png'
};

// Event listener for window load
window.addEventListener('DOMContentLoaded', async () => {
    try{
        const data = await fetchAndStoreData();
        window.localStorage.saveData = data;
        displayData(data);
    }catch(error){
        console.error('Error fetching data:', error);
    }
});

// Function for refresh
async function refresh(){
    try {
        const data = await fetchAndStoreData();
        window.localStorage.saveData = data;
        displayData(data);

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Function to fetch and store data
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

// Function to get platform name from URL
function getPlatformName(url) {
    return platformNames[url];
}

// Function to display contest data
function displayData(data) {
    const container = document.createElement('div');
    container.classList.add('contest-container');
    document.querySelector('.main').innerHTML = "";
    if (data.objects && data.objects.length > 0) {
        data.objects.forEach((contest) => {
            const platformName = getPlatformName(contest.host);
            if (filterObject[platformName]) {
                const imagePath = platformImages[platformName];

                const card = document.createElement("div");
                card.classList.add("card");
                const startDate = new Date(contest.start);
                const endDate = new Date(contest.end);
                const startTime = startDate.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
                const duration = (endDate - startDate);
                const hoursDifference = Math.floor(duration / (1000 * 60 * 60));
                const minutesDifference = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
                if (duration > 0){
                    card.innerHTML = `
                    <div class="image">
                        <img src="${imagePath}" alt="${platformName}">
                    </div>
                    <div class="name">${platformName}</div>
                    <div class="level">${contest.event}</div>
                    <div class="contest-details">
                        <div class="date">Date: ${startDate.toLocaleDateString()}</div>
                        <div class="time">Time: ${startTime}</div>
                        <div class="duration">Duration: ${hoursDifference} hours ${minutesDifference} minutes</div>
                    </div>
                    <div class="buttons">
                        <button onclick="notification()"><span>Notify Me</span></button>
                    </div>`
                    card.querySelector('.level').addEventListener('click', function() {
                        window.location.href = contest.href;
                    });
                    document.querySelector('.main').appendChild(card);
                }
            }
        });
    }
}

// Function for showing Notifications
function notification() {
    const h2value = document.querySelector('.name').textContent;
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

// Define a function to handle button click events
function handleButtonClick(buttonId, filterProperty) {
    const button = document.getElementById(buttonId);
    if (filterObject[filterProperty]) {
        filterObject[filterProperty] = false;
        button.classList.remove('clicked');
    } else {
        filterObject[filterProperty] = true;
        button.classList.add('clicked');
    }
    checkAll();
    refresh();
}

function checkAll(){
    let count = 0;
    for (const key in filterObject) {
        if (filterObject[key] == true){
            count++;
        }
    }
    if (count == 19){
        document.querySelector('#all').classList.add('clicked');
        all = true;
    }else{
        all = false;
        document.querySelector('#all').classList.remove('clicked');
    }

}
// Attach the function to each button
document.querySelector('#all').addEventListener('click', function() {
    if(all == true){
        document.querySelector('#all').classList.remove('clicked');
        all = false;
        const idsToRemoveOrAdd = [
            'leetcode', 'gsu', 'yandex', 'codingninjas', 'projecteuler', 'atcoder',
            'geeksforgeeks', 'codeforces', 'codechef', 'robocontest', 'cfttime',
            'yukicoder', 'cups', 'icpc', 'huawei', 'topcoder', 'acm', 'techgig',
            'icpcc'
        ];
        function addClickedClass() {
            idsToRemoveOrAdd.forEach(id => {
                document.getElementById(id).classList.remove('clicked');
            });
        }
        addClickedClass();
        for (const key in filterObject) {
            filterObject[key] = false;
        }
        refresh();
    } else {
        document.querySelector('#all').classList.add('clicked');
        all = true;
        const idsToRemoveOrAdd = [
            'leetcode', 'gsu', 'yandex', 'codingninjas', 'projecteuler', 'atcoder',
            'geeksforgeeks', 'codeforces', 'codechef', 'robocontest', 'cfttime',
            'yukicoder', 'cups', 'icpc', 'huawei', 'topcoder', 'acm', 'techgig',
            'icpcc'
        ];
        function addClickedClass() {
            idsToRemoveOrAdd.forEach(id => {
                document.getElementById(id).classList.add('clicked');
            });
        }
        addClickedClass();
        for (const key in filterObject) {
            filterObject[key] = true;
        }
        refresh();
    }
});

document.getElementById('leetcode').addEventListener('click', function () {
    handleButtonClick('leetcode', 'LeetCode');
});

document.getElementById('gsu').addEventListener('click', function () {
    handleButtonClick('gsu', 'Georgia State University');
});

document.getElementById('yandex').addEventListener('click', function () {
    handleButtonClick('yandex', 'Yandex');
});

document.getElementById('codingninjas').addEventListener('click', function () {
    handleButtonClick('codingninjas', 'Coding Ninjas');
});

document.getElementById('projecteuler').addEventListener('click', function () {
    handleButtonClick('projecteuler', 'Project Euler');
});

document.getElementById('atcoder').addEventListener('click', function () {
    handleButtonClick('atcoder', 'AtCoder');
});

document.getElementById('geeksforgeeks').addEventListener('click', function () {
    handleButtonClick('geeksforgeeks', 'GeeksforGeeks');
});

document.getElementById('codeforces').addEventListener('click', function () {
    handleButtonClick('codeforces', 'Codeforces');
});

document.getElementById('codechef').addEventListener('click', function () {
    handleButtonClick('codechef', 'CodeChef');
});

document.getElementById('robocontest').addEventListener('click', function () {
    handleButtonClick('robocontest', 'RoboContest');
});

document.getElementById('cfttime').addEventListener('click', function () {
    handleButtonClick('cfttime', 'CTFtime');
});

document.getElementById('yukicoder').addEventListener('click', function () {
    handleButtonClick('yukicoder', 'Yukicoder');
});

document.getElementById('cups').addEventListener('click', function () {
    handleButtonClick('cups', 'CUPS');
});

document.getElementById('icpc').addEventListener('click', function () {
    handleButtonClick('icpc', 'ICPC');
});

document.getElementById('huawei').addEventListener('click', function () {
    handleButtonClick('huawei', 'Huawei');
});

document.getElementById('topcoder').addEventListener('click', function () {
    handleButtonClick('topcoder', 'TopCoder');
});

document.getElementById('acm').addEventListener('click', function () {
    handleButtonClick('acm', 'ACM');
});

document.getElementById('techgig').addEventListener('click', function () {
    handleButtonClick('techgig', 'TechGig');
});

document.getElementById('icpcc').addEventListener('click', function () {
    handleButtonClick('icpcc', 'ICFP Conference');
});