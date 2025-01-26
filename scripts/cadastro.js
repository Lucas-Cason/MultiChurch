document.addEventListener("DOMContentLoaded", function () {
   const sectorSelect = document.getElementById('sector');
   const membersList = document.getElementById('members-list');
   const addMemberForm = document.getElementById('add-member-form');
   const nameInput = document.getElementById('name');
   const memberSectorSelector = document.getElementById('member-sector');

   function loadMember() {
      const storedMembers = JSON.parse(localStorage.getItem('members')) || [];
      return storedMembers;
   }

   function saveMembers(members) {
      localStorage.setItem('members', JSON.stringify(members));
   }

   function filterMembers(sector) {
      const members = loadMember();
      membersList.innerHTML = '';

      const filteredMembers = members.filter(member => member.sector === sector);

      filteredMembers.forEach(member => {
         const li = document.createElement('li');
         li.innerHTML = `${member.name} (${member.sector.charAt(0).toUpperCase() + member.sector.slice(1)}) 
            <button class="remove-member" data-name="${member.name}">Remover</button>`;
         membersList.appendChild(li);

         const removeBtn = li.querySelector('.remove-member');
         removeBtn.addEventListener('click', function () {
            deleteMember(member.name);
         });
      });
   }

   function addMember(name, sector) {
      const members = loadMember();
      members.push({ name, sector });
      saveMembers(members);
   }

   function deleteMember(name) {
      let members = loadMember();
      members = members.filter(member => member.name !== name);
      saveMembers(members);
      loadMembersForSelectedSector();
   }

   function loadMembersForSelectedSector() {
      const selectedSector = sectorSelect.value;

      if (selectedSector) {
         filterMembers(selectedSector);
      } else {
         membersList.innerHTML = '';
      }
   }

   sectorSelect.addEventListener('change', loadMembersForSelectedSector);

   addMemberForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = nameInput.value.trim();
      const sector = memberSectorSelector.value;

      if (name) {
         addMember(name, sector);
         loadMembersForSelectedSector();
         nameInput.value = '';
      }
   });

   loadMembersForSelectedSector();
});