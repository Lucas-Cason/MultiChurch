document.addEventListener('DOMContentLoaded', function() {
   const fotografiaList = document.getElementById('to-do-list-fotografia');
   const transmissaoList = document.getElementById('to-do-list-transmissao');
   const projecaoList = document.getElementById('to-do-list-projecao');

   const tasks = {
      'to-do-list-fotografia': [
         'Câmera Fotográfica',
         'Lente 75 - 300mm',
         'Lente 18 - 55mm',
         'Lente 75 - 300mm Limpa?',
         'Lente 18 - 55mm Limpa?',
         'Bateria 1',
         'Bateria 2',
         'Bateria 3',
         'Bateria 4',
         'Cartão de Memória',
         'Realizado Teste?',
         'Preparação do Culto',
         'Pessoas Chegando',
         'Pessoas Sorrindo',
         'Pessoas se Cumprimentando',
         'Famílias - Crianças',
         'Equipe de Louvor',
         'Pessoas Louvando',
         'Pregador / Ministro',
         'Pastores',
         'Pessoas ouvindo a palavra',
         'Ângulo que mostre a igreja cheia',
         'Ministério Infantil',
         'Descarregar Fotos',
         'Desmonstar a Câmera',
         'Tampar as lentes',
         'Retirar Bateria e Grip',
         'Carregar Baterias',
         'Retirar Cartão de Memória',
         'Acondicionar Equipamentos',
         'Guardar a Bolsa'
      ],
      'to-do-list-transmissao': [
         'Ambiente Limpo e Organizado',
         'Cadeira Transmissão',
         'Computador Ligado',
         'Controller PTZ',
         'Câmera PTZ',
         'Controle (câmera) com Pilhas',
         'Placa Captura SDI/HDMI',
         'Cabos - Rede/SDI/HDMI/USB',
         'OBS',
         'Sinal da Câmera Chegando',
         'REAPER',
         'Audio Chegando',
         'Descrição do Youtube',
         'Descrição do Facebook',
         'Letra do Holyrics (músicas)',
         'Tela Abertura',
         'Tela Avisos',
         'Tela Dízimos',
         'Tela Pregador',
         'Tela Adicional',
         'Tela Palavra Profética',
         'Tela Final',
         'Desligar Computador',
         'Desligar Controller PTZ',
         'Desligar Câmera',
         'Cobrir Equipamentos'
      ],
      'to-do-list-projecao': [
         'Ambiente Limpo',
         'Computador Ligando',
         'Projetor Ligando',
         'Controle com Pilhas',
         'Cadeira Projeção',
         'Holyrics (programa)',
         'Tela Abertura',
         'Letra 1',
         'Letra 2',
         'Letra 3',
         'Letra 4',
         'Tela Avisos',
         'Tela Dízimos',
         'Arte do Pix',
         'Tela Pregador',
         'Versículos',
         'Tela Adicional',
         'Letra Adicional Ceia',
         'Tela Palavra Profética',
         'Tela Final',
         'Desligar Computador',
         'Desligar Projetor',
         'Cobrir Equipamentos'
      ]
   }

   const options = ['-', 'OK', 'N/A', 'N/T', 'N', 'P']

   function generateTasks(listElement, tasksArray) {
      if (!listElement) return;

      tasksArray.forEach(task => {
         const li = document.createElement('li');
         li.innerHTML = `${task}`;

         const select = document.createElement('select');
         options.forEach(options => {
            const opt = document.createElement('option');
            opt.value = options;
            opt.textContent = options;
            select.appendChild(opt);
         })

         li.appendChild(select);
         listElement.appendChild(li);
      })
   }

   generateTasks(fotografiaList, tasks['to-do-list-fotografia']);
   generateTasks(transmissaoList, tasks['to-do-list-transmissao']);
   generateTasks(projecaoList, tasks['to-do-list-projecao']);
})