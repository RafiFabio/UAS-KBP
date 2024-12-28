let timer;
let isTimerRunning = false;
let remainingTime = 10 * 60;
let studyHour = 0;
let studyTime = 10;
let breakTime = 5;
let isBreakTime = false;

function formatTime(seconds) {
    let hours = Math.floor(seconds / 3600);
    let minutes = Math.floor((seconds % 3600) / 60);
    let secondsLeft = seconds % 60;
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (secondsLeft < 10) {
        secondsLeft = "0" + secondsLeft;
    }
    return hours + ":" + minutes + ":" + secondsLeft;
}

function toggleTimer() {
    if (isTimerRunning) {
        clearInterval(timer);
        document.getElementById("start-stop-btn").textContent = "Mulai";
    } else {
        // Mengatur waktu sesuai dengan sesi yang sedang berlangsung
        if (!isBreakTime) {
            remainingTime = (studyHour * 3600) + (studyTime * 60);
        } else {
            remainingTime = breakTime * 60;
        }

        timer = setInterval(function () {
            if (remainingTime <= 0) {
                if (!isBreakTime) {
                    isBreakTime = true;
                    remainingTime = breakTime * 60;
                    alert("Waktu belajar selesai! Sekarang waktu istirahat.");
                } else {
                    isBreakTime = false;
                    remainingTime = (studyHour * 3600) + (studyTime * 60);
                    alert("Waktu istirahat selesai! Kembali ke waktu belajar.");
                }
                document.getElementById("time-display").textContent = formatTime(remainingTime);
            } else {
                remainingTime--;
                document.getElementById("time-display").textContent = formatTime(remainingTime);
            }
        }, 1000);

        document.getElementById("start-stop-btn").textContent = "Berhenti";
    }
    isTimerRunning = !isTimerRunning;
}

function resetTimer() {
    clearInterval(timer);
    isBreakTime = false;
    remainingTime = (studyHour * 3600) + (studyTime * 60);
    document.getElementById("time-display").textContent = formatTime(remainingTime);
    document.getElementById("start-stop-btn").textContent = "Mulai";
    isTimerRunning = false;
}

document.getElementById("study-hour").addEventListener("input", function () {
    // Hanya mengupdate waktu yang ditetapkan tanpa mempengaruhi timer yang sedang berjalan
    studyHour = parseInt(document.getElementById("study-hour").value) || 0;
    let studyMinuteInput = document.getElementById("study-time");

    if (studyHour > 0) {
        studyMinuteInput.setAttribute("min", 0);
        studyMinuteInput.setAttribute("max", 59);
    } else {
        studyMinuteInput.setAttribute("min", 1);
        studyMinuteInput.setAttribute("max", 59);
    }

    // Jika timer tidak berjalan, set waktu untuk waktu yang ditetapkan
    if (!isTimerRunning) {
        remainingTime = (studyHour * 3600) + (studyTime * 60);
        document.getElementById("time-display").textContent = formatTime(remainingTime);
    }
});

document.getElementById("study-time").addEventListener("input", function () {
    // Hanya mengupdate waktu yang ditetapkan tanpa mempengaruhi timer yang sedang berjalan
    studyTime = parseInt(document.getElementById("study-time").value) || 0;

    // Jika timer tidak berjalan, set waktu untuk waktu yang ditetapkan
    if (!isTimerRunning) {
        remainingTime = (studyHour * 3600) + (studyTime * 60);
        document.getElementById("time-display").textContent = formatTime(remainingTime);
    }
});

document.getElementById("break-time").addEventListener("input", function () {
    // Hanya mengupdate waktu istirahat tanpa mempengaruhi timer yang sedang berjalan
    breakTime = parseInt(document.getElementById("break-time").value) || 0;
});

// Memulai dan menghentikan timer
document.getElementById("start-stop-btn").addEventListener("click", toggleTimer);

// Mereset timer
document.getElementById("reset-btn").addEventListener("click", resetTimer);

// Bagian To-Do List
document.getElementById("add-task-btn").addEventListener("click", function () {
    let taskInput = document.getElementById("new-task");
    let dateInput = document.getElementById("deadline-date");
    let taskList = document.getElementById("task-list");

    let taskText = taskInput.value.trim();
    let deadlineDate = dateInput.value;

    if (taskText !== "") {
        let listItem = document.createElement("li");

        // Membuat elemen teks tugas
        let taskSpan = document.createElement("span");
        taskSpan.className = "task-text";
        taskSpan.innerHTML = `${taskText} - <strong>${deadlineDate}</strong>`;

        // Membuat tombol ✔
        let checkBtn = document.createElement("button");
        checkBtn.className = "check-btn";
        checkBtn.textContent = "✔";

        // Menambahkan event listener untuk tombol ✔
        checkBtn.addEventListener("click", function () {
            taskList.removeChild(listItem); // Menghapus tugas saat selesai
        });

        // Menyusun elemen ke dalam <li>
        listItem.appendChild(taskSpan);
        listItem.appendChild(checkBtn);

        // Menambahkan tugas ke daftar
        taskList.appendChild(listItem);

        // Reset input
        taskInput.value = "";
        dateInput.value = "";
    } else {
        alert("Tugas tidak boleh kosong!");
    }
});