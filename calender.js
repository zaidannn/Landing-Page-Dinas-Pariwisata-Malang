document.addEventListener("DOMContentLoaded", function () {
  const daysContainer = document.getElementById("days");
  const monthYearDisplay = document.getElementById("month-year");
  const eventInfo = document.getElementById("event-info");

  const today = new Date();
  let currentMonth = today.getMonth();
  let currentYear = today.getFullYear();

  // Objek untuk menyimpan event berdasarkan tanggal
  const events = {
    "2024-09-05": "Event penting pada 5 September 2024",
    // Tambahkan event lainnya dengan format 'YYYY-MM-DD': 'Deskripsi Event'
  };

  function renderCalendar(month, year) {
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    daysContainer.innerHTML = "";
    monthYearDisplay.textContent = today.toLocaleString("id-ID", {
      month: "long",
      year: "numeric",
    });

    // Padding awal untuk tanggal yang tidak masuk dalam bulan ini
    for (let i = 0; i < firstDay; i++) {
      daysContainer.innerHTML += "<div></div>";
    }

    // Tampilkan tanggal-tanggal dalam bulan ini
    for (let date = 1; date <= lastDate; date++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(
        date
      ).padStart(2, "0")}`;
      const dayElement = document.createElement("div");
      dayElement.textContent = date;

      // Tandai tanggal yang memiliki event
      if (events[dateStr]) {
        dayElement.classList.add("event");
      }

      // Tandai tanggal hari ini
      if (
        date === today.getDate() &&
        month === today.getMonth() &&
        year === today.getFullYear()
      ) {
        dayElement.classList.add("today");
      }

      // Event listener untuk klik pada tanggal
      dayElement.addEventListener("click", function () {
        if (events[dateStr]) {
          eventInfo.textContent = events[dateStr];
        } else {
          // Update teks keterangan sesuai tanggal yang diklik
          eventInfo.textContent = `Tidak ada kegiatan pada ${date} ${today.toLocaleString(
            "id-ID",
            { month: "long", year: "numeric" }
          )}`;
        }
      });

      daysContainer.appendChild(dayElement);
    }
  }

  // Navigasi ke bulan sebelumnya
  document.getElementById("prev-month").addEventListener("click", function () {
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
    renderCalendar(currentMonth, currentYear);
  });

  // Navigasi ke bulan berikutnya
  document.getElementById("next-month").addEventListener("click", function () {
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
    renderCalendar(currentMonth, currentYear);
  });

  // Render kalender pertama kali
  renderCalendar(currentMonth, currentYear);
});
