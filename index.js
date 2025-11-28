const contents = document.getElementsByClassName("content");

const dateBtn = document.querySelector("#date");

let data;
let timeType;

const defaultBtn = dateBtn.querySelector(".date-text[data-key='btn2']");

// 时间类型对应的前一个时期的标签
const timeLabels = {
    daily: "Yesterday",
    weekly: "Last Week",
    monthly: "Last Month"
};


function fetchData() {
    fetch("data.json")
        .then(response => response.json())
        .then(json => {
            data = json;
            if (defaultBtn) {
                defaultBtn.classList.add("active");

                timeType = "weekly";
                updateDateItem();
            }
        })
        .catch(error => console.error("Failed to fetch data:", error));
}


function updateDateItem() {
    if (!data) return;

    const results = data.map((item) => {
        return {
            title: item.title,
            [timeType]: item.timeframes[timeType]
        }
    })

    for (let i of results) {
        if (i[timeType]) {
            for (let j of contents) {
                if (i.title === j.querySelector("p").textContent) {
                    j.querySelector("h1").textContent = `${i[timeType].current}hrs`;
                    const previousLabel = timeLabels[timeType] || "Previous";
                    j.getElementsByClassName("week")[0].textContent = `${previousLabel} - ${i[timeType].previous}hrs`;
                }
            }
        }

    }
}

function clickData(e) {
    if (e.target.classList.contains("date-text")) {
        // 移除所有按钮的 active 类
        document.querySelectorAll(".date-text").forEach(btn => {
            btn.classList.remove("active");
        });
        // 添加 active 类到被点击的按钮
        e.target.classList.add("active");

        timeType = e.target.textContent.toLowerCase();
        updateDateItem();
    }
}


dateBtn.addEventListener("click", clickData);


fetchData()

