const monthSelect = document.getElementById("month-select");
const scheduleTable = document.getElementById("schedule-table").querySelector("tbody");
const saveButton = document.getElementById("save-schedule");
const sectorSelect = document.getElementById("setor");

function loadMembers() {
   const members = JSON.parse(localStorage.getItem('members')) || [];
   return members;
}

function getMembersBySector(sector) {
   const members = loadMembers();
   return members.filter(member => member.sector === sector);
}

function getSundays(year, month) {
   const sundays = [];
   const date = new Date(year, month, 1);
   while (date.getMonth() === month) {
      if (date.getDay() === 0) {
         sundays.push(new Date(date));
      }
      date.setDate(date.getDate() + 1);
   }
   return sundays;
}

function populateTable(year, month, sector) {
   scheduleTable.innerHTML = "";

   const sundays = getSundays(year, month);
   const members = getMembersBySector(sector);

   sundays.forEach((sunday) => {
      const row = document.createElement("tr");

      const dateCell = document.createElement("td");
      dateCell.textContent = sunday.toLocaleDateString("pt-BR");
      row.appendChild(dateCell);

      const morningCell = document.createElement("td");
      const morningSelect = document.createElement("select");
      morningSelect.innerHTML = "<option value='' disabled selected>Selecione</option>";
      members.forEach(member => {
         const option = document.createElement("option");
         option.value = member.name;
         option.textContent = member.name;
         morningSelect.appendChild(option);
      });
      morningCell.appendChild(morningSelect);
      row.appendChild(morningCell);

      const nightCell = document.createElement("td");
      const nightSelect = document.createElement("select");
      nightSelect.innerHTML = "<option value='' disabled selected>Selecione</option>";
      members.forEach(member => {
         const option = document.createElement("option");
         option.value = member.name;
         option.textContent = member.name;
         nightSelect.appendChild(option);
      });
      nightCell.appendChild(nightSelect);
      row.appendChild(nightCell);

      scheduleTable.appendChild(row);
   });
}

function saveSchedule() {
   const month = monthSelect.value;
   const sector = sectorSelect.value;
   if (!month || !sector) {
      alert("Selecione o mês e o setor antes de salvar a escala.");
      return;
   }

   const schedule = [];
   const rows = scheduleTable.querySelectorAll("tr");
   rows.forEach((row) => {
      const date = row.cells[0].textContent;
      const morning = row.cells[1].querySelector("select").value;
      const night = row.cells[2].querySelector("select").value;
      schedule.push({ date, morning, night });
   });

   const storedSchedules = JSON.parse(localStorage.getItem("schedules")) || {};

   const keys = Object.keys(storedSchedules);
   if (keys.length >= 2) {
      const oldestMonth = Math.min(...keys.map((key) => new Date(key).getTime()));
      delete storedSchedules[Object.keys(storedSchedules).find(key => new Date(key).getTime() === oldestMonth)];
   }

   storedSchedules[month] = { [sector]: schedule };
   localStorage.setItem("schedules", JSON.stringify(storedSchedules));

   alert("Escala salva com sucesso!");
}

monthSelect.addEventListener("change", () => {
   const [year, month] = monthSelect.value.split("-");
   populateTable(parseInt(year), parseInt(month) - 1, sectorSelect.value);
});

sectorSelect.addEventListener("change", () => {
   const [year, month] = monthSelect.value.split("-");
   populateTable(parseInt(year), parseInt(month) - 1, sectorSelect.value);
});

saveButton.addEventListener("click", saveSchedule);