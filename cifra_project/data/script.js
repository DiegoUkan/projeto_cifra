document.addEventListener('DOMContentLoaded', () => {
    // --- Seletores de Elementos ---
    const app = document.getElementById('app');
    const loginScreen = document.getElementById('login-screen');
    const mainApp = document.getElementById('main-app');
    const readerScreen = document.getElementById('reader-screen');
    const modalOverlay = document.getElementById('modal-overlay');
    const mainHeaderTitle = document.getElementById('header-title');

    const libraryScreenContent = document.getElementById('library-screen-content');
    const eventsScreenContent = document.getElementById('events-screen-content');
    const eventDetailScreenContent = document.getElementById('event-detail-screen-content');
    const settingsScreenContent = document.getElementById('settings-screen-content');

    // Login
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const loginButton = document.getElementById('login-button');
    const loginErrorMessage = document.getElementById('login-error');

    // Main Header
    const settingsButton = document.getElementById('settings-button');
    const themeToggleButtonHeader = document.getElementById('theme-toggle-button');

     // Bottom Navigation (Principal)
     const bottomNav = document.getElementById('bottom-nav');
     const bottomNavButtons = document.querySelectorAll('#bottom-nav .nav-btn');

     // Bottom Controls (Reader) - Nova barra de controle inferior fixa
     const readerBottomControls = document.getElementById('reader-bottom-controls');
     const readerScrollToggleBottom = document.getElementById('scroll-toggle-bottom');
     const readerSpeedDownBottom = document.getElementById('scroll-speed-down-bottom');
     const readerSpeedUpBottom = document.getElementById('scroll-speed-up-bottom');
     const readerSpeedValueBottom = document.getElementById('scroll-speed-value-bottom'); // Span que mostra o valor da velocidade
     const readerScrollResetBottom = document.getElementById('scroll-reset-bottom');
     const readerSaveSpeedBottom = document.getElementById('save-song-speed-button-bottom');


    // Biblioteca
    const songSearchInput = document.getElementById('song-search');
    const libraryList = document.getElementById('library-list');
    const fabAddSong = document.getElementById('fab-add-song');

    // Upload Modal
    const uploadModal = document.getElementById('upload-modal');
    const uploadFileInput = document.getElementById('upload-file-input');
    const uploadFileListDiv = document.getElementById('upload-file-list');
    const cancelUploadButton = document.getElementById('cancel-upload');
    const confirmUploadButton = document.getElementById('confirm-upload');

    // Ensaios
    const addEventButton = document.getElementById('add-event-button');
    const eventsList = document.getElementById('events-list');
    const backToEventsButton = document.getElementById('back-to-events');
    const eventDetailTitle = document.getElementById('event-detail-title');
    const eventDetailDate = document.getElementById('event-detail-date');
    const addSongToEventButton = document.getElementById('add-song-to-event-button');
    const editEventButton = document.getElementById('edit-event-button');
    const deleteEventButton = document.getElementById('delete-event-button');
    const eventSongsList = document.getElementById('event-songs-list');

    // Event Form Modal (Criar/Editar Evento)
    const eventFormModal = document.getElementById('event-form-modal');
    const eventFormTitle = document.getElementById('event-form-title');
    const eventNameInput = document.getElementById('event-name');
    const eventDateInput = document.getElementById('event-date');
    const cancelEventFormButton = document.getElementById('cancel-event-form');
    const saveEventFormButton = document.getElementById('save-event-form');

    // Add Song to Event Modal
    const addSongToEventModal = document.getElementById('add-song-to-event-modal');
    const addSongSearchInput = document.getElementById('add-song-search');
    const addSongLibraryList = document.getElementById('add-song-library-list');
    const cancelAddSongButton = document.getElementById('cancel-add-song');
    const confirmAddSongButton = document.getElementById('confirm-add-song');

    // Leitor
    const readerBackButton = document.getElementById('reader-back-button');
    const readerSongTitle = document.getElementById('reader-song-title');
    const readerSongArtist = document.getElementById('reader-song-artist');
    const readerTextArea = document.getElementById('reader-text');
    const readerContentArea = document.getElementById('reader-content-area'); // Área rolável do texto
    const readerSidebar = document.getElementById('reader-sidebar'); // Sidebar de controles (visível em desktop)
    const readerControlsOverlayMobile = document.getElementById('reader-controls-overlay-mobile'); // Overlay de controles (visível em mobile)
    const readerControlsToggleMobileButton = document.getElementById('reader-controls-toggle'); // Botão para mostrar controles (mobile header)
    const closeReaderControlsMobileButton = readerControlsOverlayMobile.querySelector('.close-controls'); // Botão fechar controles (mobile overlay)


    // Controles do Leitor (Selecionando por classes para pegar elementos em diferentes locais)
    // Estes seletores agora pegarão elementos da sidebar, mobile overlay E bottom controls (quando aplicável)
    const readerScrollToggleButtons = document.querySelectorAll('.reader-scroll-toggle'); // Play/Pause buttons
    const readerSpeedSliders = document.querySelectorAll('.reader-speed-slider'); // Range sliders (apenas sidebar/overlay)
    const readerSpeedNumberInputs = document.querySelectorAll('.reader-speed-number-input'); // Number inputs (apenas sidebar/overlay)
    const readerSpeedValueSpans = document.querySelectorAll('.reader-speed-value'); // Speed value spans (sidebar, mobile, bottom)
    const readerScrollResetButtons = document.querySelectorAll('.reader-scroll-reset'); // Reset scroll buttons
    const readerSaveSpeedButtons = document.querySelectorAll('.reader-save-speed'); // Save speed buttons
    const readerTransposeDownButtons = document.querySelectorAll('.reader-transpose-down'); // Transpose -1 buttons
    const readerTransposeUpButtons = document.querySelectorAll('.reader-transpose-up'); // Transpose +1 buttons
    const readerTransposeResetButtons = document.querySelectorAll('.reader-transpose-reset'); // Reset transpose buttons
    const readerTransposeIndicators = document.querySelectorAll('.reader-transpose-indicator'); // Transpose indicators
    const readerFontSizeDownButtons = document.querySelectorAll('.reader-font-size-down'); // Font size -1 buttons
    const readerFontSizeUpButtons = document.querySelectorAll('.reader-font-size-up'); // Font size +1 buttons
    const readerFontSizeIndicators = document.querySelectorAll('.reader-font-size-indicator'); // Font size indicators
    const readerThemeToggleButtons = document.querySelectorAll('.reader-theme-toggle'); // Theme toggle buttons
    const readerDownloadSongButtons = document.querySelectorAll('.reader-download-song'); // Download buttons


    // Configurações
    const settingsThemeToggle = document.getElementById('settings-theme-toggle'); // Mantido na settings page
    const settingWakelock = document.getElementById('setting-wakelock');
    const settingDefaultFontSize = document.getElementById('setting-default-font-size');
    const settingDefaultScrollSpeed = document.getElementById('setting-default-scroll-speed');
    const settingTransposeStyle = document.getElementById('setting-transpose-style');
    const resetSettingsButton = document.getElementById('reset-settings-button');
    const logoutButtonSettings = document.getElementById('logout-button-settings'); // Novo botão Sair na página de Settings


    // --- Variáveis de Estado ---
    // currentScreen agora controla apenas as grandes telas (login, main-app, reader)
    // currentScreenPage será usada para controlar qual página está visível dentro de main-app
    let currentScreen = 'login'; // 'login', 'main-app', 'reader'
    let currentScreenPage = 'library'; // 'library', 'events', 'event-detail', 'settings' - default: 'library'

    let loggedIn = false; // TODO: Gerenciar estado de login real
    let allSongs = []; // Simula a biblioteca carregada do servidor
    let allEvents = []; // Simula os ensaios carregados
    let currentEvent = null; // O evento que está sendo visualizado (Tela de Detalhes)
    let currentSong = null; // A cifra atual sendo lida
    let currentTranspose = 0; // Em semitons (0 = original)
    // Tamanho da fonte inicial baseado nas configurações ou default
    let currentFontSize = parseInt(localStorage.getItem('cifraReaderSettings') ? JSON.parse(localStorage.getItem('cifraReaderSettings')).defaultFontSize : '16');
    // Velocidade de rolagem atual (será carregada por música ou do default do usuário)
    let currentScrollSpeed = parseInt(localStorage.getItem('cifraReaderSettings') ? JSON.parse(localStorage.getItem('cifraReaderSettings')).defaultScrollSpeed : '5');

    let isScrolling = false;
    let scrollAnimationFrameId = null; // Usar requestAnimationFrame para rolagem suave
    let scrollAccumulator = 0; // Acumulador para rolagem sub-pixel
    let wakeLock = null; // Para manter a tela ligada

    // Configurações do Usuário (armazenadas localmente)
    // Preferimos um único objeto no localStorage para organizar melhor
    let userSettings = JSON.parse(localStorage.getItem('cifraReaderSettings')) || {
        theme: 'light',
        defaultFontSize: 16,
        defaultScrollSpeed: 5, // Valor padrão alterado
        transposeStyle: 'sharps', // 'sharps' ou 'flats'
        wakelockEnabled: false
    };

     // Configurações por Música (armazenadas localmente)
     // Preferimos um único objeto no localStorage
     // songSettings = { songId1: { scrollSpeed: 10, transpose: 2, ... }, songId2: {...} }
     let songSettings = JSON.parse(localStorage.getItem('cifraReaderSongSettings')) || {};


     // --- Constante de Rolagem ---
     // Este valor define a quantidade de pixels que a VELOCIDADE 1 irá acumular POR FRAME.
     // Velocidade 1 * 0.05 = 0.05 pixels por frame (muito lento - 1 pixel a cada 20 frames).
     // Velocidade 20 * 0.05 = 1.0 pixels por frame (1 pixel por frame, razoavelmente rápido).
     // Ajuste este valor (0.05) para deixar a rolagem 1 ainda mais lenta. Ex: 0.02, 0.01.
     const SCROLL_BASE_STEP = 0.05;


     // --- Conteúdo das Cifras (Embutido para Simulação) ---
     // ... (cifraIntensamente e cifraDigno permanecem iguais)
     const cifraIntensamente = `Adoradores Novo Tempo - Intensamente

[Intro] D  A/C#  Bm  A/C#

D
Por tanto tempo vivi como escravo
Bm
Dos meus desejos e medos
G                 D/F#
Até que eu entendi, que Cristo é tudo pra mim
Em                      A    G/B   A/C#
Só Nele sou completo e restaurado

D                                   A/C#
Eu fui comprado pelo Sangue do Cordeiro
Bm                               A
Amor tão genuino, amor tão verdadeiro
G                    D/F#               Em
Se entregar levando a culpa que não era Sua
            A    G/B   A/C#
Só por me amar intensamente

D                                   A/C#
Eu fui comprado pelo Rei do Universo
Bm                                   A
Que enviou Seu Filho pra viver mais perto
G                   D/F#             Em
E me mostrar o rumo, o caminho para casa
           A             D
Só por me amar intensamente

( D  A/C#  Bm  A/C#  D )

D
Por tanto tempo vivi dependente
Bm
Da aprovação de pessoas
G                   D/F#
Até que eu entendi, o que Jesus fez por mim
Em                  A    G/B   A/C#
O meu valor foi estimado na cruz

D                                   A/C#
Eu fui comprado pelo Sangue do Cordeiro
Bm                               A
Amor tão genuino, amor tão verdadeiro
G                    D/F#               Em
Se entregar levando a culpa que não era Sua
            A    G/B   A/C#
Só por me amar intensamente

D                                   A/C#
Eu fui comprado pelo Rei do Universo
Bm                                   A
Que enviou Seu Filho pra viver mais perto
G                   D/F#             Em
E me mostrar o rumo, o caminho para casa
           A             G
Só por me amar intensamente

           A/G         Bm
Na cruz entendo o Teu amor
          D/F#         G
Na cruz recebo o meu valor
         A          Bm              A/C#    G
Na cruz encontro o caminho para a eternidade

           A           Bm
Na cruz entendo o Teu amor
          D/F#        G
Na cruz recebo o meu valor
           A          Bm           G/B A/C#
Na cruz encontro o caminho para a eternidade

D                                   A/C#
Eu fui comprado pelo Sangue do Cordeiro
Bm                               A
Amor tão genuino, amor tão verdadeiro
G                    D/F#               Em
Se entregar levando a culpa que não era Sua
            A    G/B   A/C#
Só por me amar intensamente

D                                   A/C#
Eu fui comprado pelo Rei do Universo
Bm                                   A
Que enviou Seu Filho pra viver mais perto
G                   D/F#             Em
E me mostrar o rumo, o caminho para casa
           A
Só por me amar intensamente

( D  A/C#  Bm  A/C#  D )

G                   D/F#             Em
E me mostrar o rumo, o caminho para casa
           A4            D
Só por me amar intensamente`;

     const cifraDigno = `Adoradores Novo Tempo - Digno

[Intro] D  G/D  D  G/D

[Primeira Parte]

D        A/C#              Bm
Logo estaremos num lindo lugar
       D9/A                 G
Com jardins e um rio de cristal
         D/F#                   Em7  A/C#
Onde andaremos na presença do Senhor
D       A/C#            Bm
Logo da terra se levantarão
       D9/A              G
Os que dormem o sono dos justos
        D/F#  G      A4
A eternidade ali começou

[Pré-Refrão]

       G          A/G       D/F#    G
E ao entrar pelas portas do céu O verei
     G           A/G       D/F#     G/B  A/C#
Correrei pra abraçá-Lo e então cantarei

[Refrão]

D             A/C#
Digno! É o Cordeiro bendito
Bm          D9/A             G
Digno, toda honra e glória a Ti
          D/F#    G      A4    G/B  A/C#
Tanto esperei por este momento
D           A/C#              F#/A#
Digno! O conflito encerrado está
C#m            E9/B    E/G#       A
Digno, em Teus braços achei meu lugar
            E/B       B7(4/9-)  E
Pra sempre irei Te adorar,      Digno!

[Final]

E                 A9/E     E
Aleluia, aleluia, aleluia, Digno!
E                 A9/E     E
Aleluia, aleluia, aleluia, Digno!
`;


     // --- Funções de UI/Navegação ---

    // Função para aplicar o tema
    function applyTheme(theme) {
        app.classList.remove('theme-light', 'theme-dark');
        app.classList.add('theme-' + theme);
        userSettings.theme = theme;
        saveUserSettings(); // Salva configurações do usuário
        // Atualiza o ícone dos botões de tema em ambos os headers e no reader
        const themeIconClass = theme === 'dark' ? 'fa-moon' : 'fa-sun';
         const oldIconClass = theme === 'dark' ? 'fa-sun' : 'fa-moon';
         // Seleciona botões de tema no header principal, reader header e settings page
        document.querySelectorAll('#theme-toggle-button i, .reader-theme-toggle i, #settings-theme-toggle i').forEach(icon => {
             icon.classList.remove(oldIconClass);
             icon.classList.add(themeIconClass);
        });
         // O texto dos botões de tema (ex: "Alternar Tema") não muda, apenas o ícone.
    }

    // Função para mostrar uma grande tela (login, main-app, reader)
    function showScreen(screenId) {
         const screens = document.querySelectorAll('.screen');
         screens.forEach(screen => screen.classList.remove('active'));
         document.getElementById(screenId).classList.add('active');
         currentScreen = screenId.replace('-screen', ''); // Atualiza variável de estado

         // Ajusta a visibilidade do header principal, footer principal e barra de controles do reader
         if (screenId === 'login-screen') {
             mainApp.style.display = 'none';
              bottomNav.style.display = 'none'; // Esconde footer no login
              readerBottomControls.style.display = 'none'; // Garante que controles do reader estejam escondidos
         } else if (screenId === 'reader-screen') {
              mainApp.style.display = 'flex'; // main-app continua flex para ocupar espaço (embora reader o sobreponha)
              bottomNav.style.display = 'none'; // Esconde footer principal no reader
              // A visibilidade de readerBottomControls é gerenciada no listener de resize/openReader
              // Já definido como 'flex' dentro de openReader
         }
         else { // main-app screens
              mainApp.style.display = 'flex'; // main-app sempre visível após login
              bottomNav.style.display = 'flex'; // Mostra footer após login
              readerBottomControls.style.display = 'none'; // Garante que controles do reader estejam escondidos
         }

         // Esconde modais ao mudar de tela grande
         hideModal();
         // Removido: hideNavMenu();

         // Lógica específica ao entrar/sair de telas
         if (screenId === 'reader-screen') {
            requestWakeLock(); // Tenta manter a tela ligada (se ativado nas settings)
            readerContentArea.scrollTop = 0; // Reinicia a rolagem
            scrollAccumulator = 0; // Zera o acumulador de rolagem ao entrar
            stopScrolling(); // Garante que a rolagem está parada ao entrar
            // Aplica as configurações de velocidade e fonte na UI dos controles visíveis
            updateReaderSpeedUI(currentScrollSpeed); // Atualiza controles de velocidade (sidebar, mobile overlay E bottom controls)
            updateFontSizeIndicator(); // Atualiza indicadores de fonte (sidebar e mobile overlay)
            updateTransposeIndicator(); // Atualiza indicadores de transposição (sidebar e mobile overlay)


            // Adiciona/Remove listeners de controle baseados no tamanho da tela
             // Dispara resize para aplicar layout correto da sidebar/overlay e listeners
             window.dispatchEvent(new Event('resize'));

             // Garante que a barra de controles inferior do reader esteja visível
             readerBottomControls.style.display = 'flex'; // Mostra a barra fixa inferior do reader


         } else { // Saindo da tela do reader (voltando para main-app ou login)
            releaseWakeLock(); // Libera o bloqueio de tela
            stopScrolling(); // Garante que a rolagem para ao sair da tela do reader
             scrollAccumulator = 0; // Zera o acumulador de rolagem ao sair
            hideReaderControlsMobile(); // Garante que o overlay mobile esteja escondido
            currentSong = null; // Limpa a música atual ao sair do leitor

            // Remove o listener de clique na área do texto adicionado para mobile
            // Garante que não tenhamos listeners duplicados ou em telas erradas
             readerContentArea.removeEventListener('click', toggleReaderControlsMobile);

             // Garante que a barra de controles inferior do reader esteja escondida
             readerBottomControls.style.display = 'none'; // Esconde a barra fixa inferior do reader
         }
    }

     // Função para mostrar uma "página" dentro da área de conteúdo principal (#screen-content)
     function showScreenPage(pageId) {
          document.querySelectorAll('.screen-page').forEach(page => page.classList.remove('active'));
          document.getElementById(`${pageId}-screen-content`).classList.add('active');
          currentScreenPage = pageId; // Atualiza variável de estado da página

          // Oculta FAB dependendo da página
          // O FAB aparece apenas na página da biblioteca
          if (pageId === 'library') {
              fabAddSong.style.display = 'flex'; // Usa flex para centralizar o ícone FAB
          } else {
              fabAddSong.style.display = 'none';
          }

           // Atualiza o título do header
           switch (currentScreenPage) {
               case 'library': mainHeaderTitle.textContent = 'Biblioteca'; break;
               case 'events': mainHeaderTitle.textContent = 'Ensaios'; break;
               case 'event-detail': mainHeaderTitle.textContent = 'Detalhes do Ensaio'; break;
               case 'settings': mainHeaderTitle.textContent = 'Configurações'; break;
           }

          // Atualiza o estado dos botões de navegação inferior (classe 'active')
          bottomNavButtons.forEach(button => {
               button.classList.remove('active');
               // Verifica se o target do botão corresponde à página atual
               // ou se o target é 'library-search' e a página atual é 'library'
               if (button.dataset.targetPage === currentScreenPage ||
                   (button.dataset.targetPage === 'library-search' && currentScreenPage === 'library')
                ) {
                    button.classList.add('active');
               }
          });
     }


    // Função para mostrar um modal
    function showModal(modalElement) {
        modalOverlay.style.display = 'block';
        modalElement.style.display = 'block';
    }

    // Função para esconder todos os modais
    function hideModal() {
        modalOverlay.style.display = 'none';
        document.querySelectorAll('.modal').forEach(modal => modal.style.display = 'none');
    }

    // Removido: showNavMenu e hideNavMenu


     // Função para mostrar o overlay de controles do leitor (mobile)
     function showReaderControlsMobile() {
         // Só mostra se a tela for pequena o suficiente para a sidebar estar escondida
          if (window.innerWidth <= 768) {
             readerControlsOverlayMobile.style.display = 'block';
             // Os valores dos controles mobile já devem estar sincronizados pelos listeners globals
          }
     }

     // Função para esconder o overlay de controles do leitor (mobile)
     function hideReaderControlsMobile() {
         readerControlsOverlayMobile.style.display = 'none';
     }

     // Função para alternar a visibilidade dos controles do leitor (mobile - ao clicar no texto)
     function toggleReaderControlsMobile() {
          // Só mostra/esconde se a rolagem automática não estiver ativa E se estiver no layout mobile
          if (!isScrolling && window.innerWidth <= 768) {
             if (readerControlsOverlayMobile.style.display === 'block') {
                 hideReaderControlsMobile();
             } else {
                 showReaderControlsMobile();
             }
          }
     }


    // --- Funções de Persistência (Simuladas com localStorage) ---

     function saveUserSettings() {
         localStorage.setItem('cifraReaderSettings', JSON.stringify(userSettings));
     }

     function saveSongSettings() {
         localStorage.setItem('cifraReaderSongSettings', JSON.stringify(songSettings));
     }

     // Esta função recupera as settings de uma música específica
     function getSongSetting(songId, settingKey, defaultValue) {
          if (songSettings[songId] && songSettings[songId][settingKey] !== undefined) {
              return songSettings[songId][settingKey];
          }
          return defaultValue;
     }

     // Esta função salva uma setting para uma música específica
     function setSongSetting(songId, settingKey, value) {
          if (!songSettings[songId]) {
              songSettings[songId] = {};
          }
          songSettings[songId][settingKey] = value;
          saveSongSettings();
     }


    // --- Funções de Dados (Simuladas/Frontend) ---

    // Carrega dados iniciais (simula buscar do servidor e carregar settings locais)
    function loadAppData() {
        console.log("Carregando dados simulados...");

        // Dados de Exemplo (usando as cifras fornecidas)
        const initialSongs = [
            { id: 's1', title: 'Intensamente', artist: 'Adoradores Novo Tempo', content: cifraIntensamente },
            { id: 's2', title: 'Digno', artist: 'Adoradores Novo Tempo', content: cifraDigno }
        ];

         // Tenta extrair Título e Artista da primeira linha se não foi definido
         initialSongs.forEach(song => {
              if (!song.title || !song.artist) {
                  const firstLine = song.content.split('\n')[0];
                   if (firstLine) {
                       const parts = firstLine.split(' - ');
                       if (parts.length >= 2) {
                            song.artist = parts[0].trim();
                            song.title = parts.slice(1).join(' - ').trim(); // Junta o resto para o título
                       } else {
                            song.title = firstLine.trim();
                       }
                   }
              }
              // Fallback para título/artista se ainda estiverem vazios
              song.title = song.title || 'Título Desconhecido';
              song.artist = song.artist || 'Artista Desconhecido';

               // Inicializa settings para a música se não existir no local storage
               // Ou carrega settings existentes
               if (!songSettings[song.id]) {
                    songSettings[song.id] = {
                        scrollSpeed: null, // Usar null significa que deve usar o default do usuário
                         transpose: 0 // Padrão: tom original
                    };
               } else {
                    // Garante que a estrutura básica exista mesmo if the song already existed but without speed/transpose
                     if (songSettings[song.id].scrollSpeed === undefined) songSettings[song.id].scrollSpeed = null;
                      if (songSettings[song.id].transpose === undefined) songSettings[song.id].transpose = 0;
               }
         });

        allSongs = initialSongs;


        // Eventos de Exemplo (usando os IDs das novas cifras)
        allEvents = [
            { id: 'e1', name: 'Culto Domingo', date: '2023-10-29', songIds: ['s1', 's2'] },
            { id: 'e2', name: 'Ensaio Banda', date: '2023-10-27', songIds: ['s2', 's1'] }
        ];

        // Salva as settings iniciais (se não existirem) ou atualiza o local storage
         saveSongSettings();

        renderLibrary();
        renderEvents();
        console.log("Dados simulados carregados:", allSongs, allEvents);
         console.log("Song Settings carregadas:", songSettings);
    }

     // Renderiza a lista da biblioteca
    function renderLibrary(filter = '') {
        libraryList.innerHTML = '';
        const filteredSongs = allSongs.filter(song =>
             song.title.toLowerCase().includes(filter.toLowerCase()) ||
             song.artist.toLowerCase().includes(filter.toLowerCase())
        );

        if (filteredSongs.length === 0 && !filter) {
             libraryList.innerHTML = `<li class="list-empty-message">Nenhuma cifra encontrada.<br>Toque no botão '+' para fazer upload da sua primeira cifra!</li>`;
             return;
        }
        if (filteredSongs.length === 0 && filter) {
              libraryList.innerHTML = `<li class="list-empty-message">Nenhuma cifra encontrada com este filtro.</li>`;
              return;
        }

         // Remove a mensagem de "nenhuma cifra" se ela existir
         const emptyMessage = libraryList.querySelector('.list-empty-message');
         if (emptyMessage) {
             emptyMessage.remove();
         }

        filteredSongs.forEach(song => {
            const li = document.createElement('li');
            li.dataset.songId = song.id;
            li.innerHTML = `
                <div class="song-info">
                    <h3>${song.title}</h3>
                    <p>${song.artist}</p>
                </div>
                <div class="item-actions">
                    <button class="add-to-event-button button icon-button" title="Adicionar ao Ensaio"><i class="fas fa-calendar-plus"></i></button>
                </div>
            `;
             // Listener no info para abrir reader
             li.querySelector('.song-info').onclick = (e) => {
                  e.stopPropagation(); // Evita que o clique no info "suba" para o LI inteiro se tiver outro listener
                  openReader(song.id);
             };
              // Listener no botão específico para adicionar ao evento
             li.querySelector('.add-to-event-button').onclick = (e) => {
                 e.stopPropagation(); // Evita que o clique no botão "suba" para o LI inteiro
                 // TODO: Lógica real para adicionar música a um evento (talvez mostrar modal de seleção de evento)
                 alert(`Simulando: Adicionar "${song.title}" a um evento.`);
             };
            libraryList.appendChild(li);
        });
    }

    // Renderiza a lista de ensaios
    function renderEvents() {
        eventsList.innerHTML = '';
         if (allEvents.length === 0) {
              eventsList.innerHTML = `<li class="list-empty-message">Nenhum ensaio criado.<br>Toque em "Novo Ensaio" para organizar seu primeiro evento!</li>`;
              return;
         }
          // Remove a mensagem de "nenhuma ensaio" if it exists
         const emptyMessage = eventsList.querySelector('.list-empty-message');
         if (emptyMessage) {
             emptyMessage.remove();
         }

        allEvents.forEach(event => {
            const li = document.createElement('li');
            li.dataset.eventId = event.id;
            const eventDate = new Date(event.date + 'T12:00:00Z'); // Adds H/M/S and Z to avoid timezone issues
            const formattedDate = eventDate.toLocaleDateString('pt-BR', { timeZone: 'UTC' }); // Specify UTC
            li.innerHTML = `
                <div class="song-info">
                    <h3>${event.name}</h3>
                    <p>${formattedDate} | ${event.songIds.length} música(s)</p>
                </div>
            `;
            li.onclick = () => openEventDetail(event.id);
            eventsList.appendChild(li);
        });
    }

    // Opens the event detail screen
    function openEventDetail(eventId) {
         currentEvent = allEvents.find(event => event.id === eventId);
         if (!currentEvent) {
              console.error("Evento não encontrado:", eventId);
              showScreenPage('events'); // Go back to the events list
              return;
         }

         eventDetailTitle.textContent = currentEvent.name;
         const eventDate = new Date(currentEvent.date + 'T12:00:00Z');
         eventDetailDate.textContent = eventDate.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
         renderEventSongs(currentEvent); // Render the event's songs

         // Stay on the main screen, but change the internal "page"
         showScreenPage('event-detail'); // Now use showScreenPage
         // Title already updated in showScreenPage
         // mainHeaderTitle.textContent = 'Detalhes do Ensaio'; // Already in showScreenPage
         // No need to update bottom nav active state, as 'event-detail' is not a button in the footer
    }

     // Renders the list of songs within the event detail
    function renderEventSongs(event) {
         eventSongsList.innerHTML = '';
         if (event.songIds.length === 0) {
              eventSongsList.innerHTML = `<li class="list-empty-message">Nenhuma música adicionada a este ensaio.<br>Tocar em "Adicionar Música".</li>`;
              return;
         }

          // Remove the "no songs" message if it exists
         const emptyMessage = eventSongsList.querySelector('.list-empty-message');
         if (emptyMessage) {
             emptyMessage.remove();
         }


         event.songIds.forEach(songId => {
              const song = allSongs.find(s => s.id === songId);
              if (!song) return;

              const li = document.createElement('li');
               li.classList.add('list-item-draggable'); // Class for future drag and drop
              li.dataset.songId = song.id;
              li.innerHTML = `
                  <div class="song-info">
                      <h3>${song.title}</h3>
                      <p>${song.artist}</p>
                  </div>
                  <div class="item-actions">
                       <!-- <button class="drag-handle button icon-button"><i class="fas fa-grip-vertical"></i></button> -->
                       <button class="remove-from-event-button button icon-button danger" title="Remover do Ensaio"><i class="fas fa-times"></i></button>
                  </div>
              `;
               li.querySelector('.song-info').onclick = () => openReader(song.id, event.id); // Open reader in the context of the event
               li.querySelector('.remove-from-event-button').onclick = (e) => {
                    e.stopPropagation();
                    removeSongFromEvent(event.id, song.id);
               };
              eventSongsList.appendChild(li);
         });
          // TODO: Initialize SortableJS or Drag and Drop logic here
    }


    // Opens the Reader screen
    function openReader(songId, eventId = null) {
        const song = allSongs.find(s => s.id === songId);
        if (!song) {
            alert('Cifra não encontrada!');
            return;
        }
        currentSong = song;

         readerSongTitle.textContent = song.title;
         readerSongArtist.textContent = song.artist;

        // Load the saved transpose for this song or use 0
        currentTranspose = getSongSetting(song.id, 'transpose', 0);
        updateTransposeIndicator(); // Update all indicators (sidebar, mobile, bottom)


         // Load the saved scroll speed for this song or use the user's default
         currentScrollSpeed = getSongSetting(song.id, 'scrollSpeed', userSettings.defaultScrollSpeed);
         // Ensure the speed is within the valid range [1, 20]
         currentScrollSpeed = Math.max(1, Math.min(20, currentScrollSpeed));


         // Load the user's default font size
         currentFontSize = userSettings.defaultFontSize; // Ensure it starts with the user's default
         readerTextArea.style.fontSize = `${currentFontSize}px`;
         updateFontSizeIndicator(); // Update all indicators


         // Render the text (with highlighted chords)
         renderCifraWithChords(song.content);

        showScreen('reader-screen'); // Navigate to the main reader screen

         // Apply reader settings to the visible controls (sidebar, mobile overlay AND bottom controls)
         applyReaderSettings(); // Apply font, speed, and transpose style

         // The logic to show/hide sidebar/overlay/bottom controls and add the click listener to the text area (for mobile)
         // is in the 'resize' listener which is triggered when opening the screen.
         window.dispatchEvent(new Event('resize')); // Trigger resize when opening the reader
    }

     // Function to render the chord chart highlighting chords
     function renderCifraWithChords(content) {
         // Regex: Searches for chords (A-G), #/b, suffixes, numbers, and bases
         // Improved to be more precise and less likely to mark normal words.
         // Adds \s or ^ (start of line) before and \s or $ (end of line) or [)/] after for context.
         // Also considers accents and other common characters in lyrics that shouldn't be confused with chords
         // The regex is now more flexible with the separator between the main chord and the base (accepts / or -)
         const chordRegex = /(^|\s|\(|\[)((?:[A-G][#b]?)(?:m|maj|sus|add|dim|aug|alt)?(?:\d*)(?:(?:[\/\-]?)(?:[A-G][#b]?))?)($|\s|\)|\]|,|\.)/g;


         // We use a replacement function to reconstruct the string with the spans
         const htmlContent = content.replace(chordRegex, (match, p1, p2, p3) => {
              // p1 is the character or space before (or start of line)
              // p2 is the recognized chord
              // p3 is the character or space after (or end of line)
              // Wrap only the chord (p2) in the span
              return `${p1}<span class="chord" data-original-chord="${p2}">${p2}</span>${p3}`;
         });

         // Use innerHTML to render the content with the spans.
         // The <pre> maintains spaces and line breaks.
         readerTextArea.innerHTML = htmlContent;

          // Apply the current transpose (which was loaded in openReader)
          // Transposing is applied ONLY to the newly created spans
           transposeCifra(0); // Applies the 'currentTranspose' which is already set
     }

     // Returns the chord chart text as a simple string, applying the current transpose but WITHOUT the HTML spans
     function getPlainTransposedCifra() {
         if (!currentSong) return '';

         const originalContent = currentSong.content;
         const semitones = currentTranspose;
         const style = userSettings.transposeStyle;

          // Regex: Searches for chords (the same one used for rendering)
          const chordRegex = /(^|\s|\(|\[)((?:[A-G][#b]?)(?:m|maj|sus|add|dim|aug|alt)?(?:\d*)(?:(?:[\/\-]?)(?:[A-G][#b]?))?)($|\s|\)|\]|,|\.)/g;


         const plainTransposedContent = originalContent.replace(chordRegex, (match, p1, p2, p3) => {
              // p1 is the character or space before
              // p2 is the recognized chord (original)
              // p3 is the character or space after

              // Transpose only the chord part (p2)
              const transposedChord = transposeChord(p2, semitones, style);

              // Reconstruct the string with the transposed chord
              return `${p1}${transposedChord}${p3}`;
         });

         return plainTransposedContent;
     }


     // Transposes the displayed chord chart in the reader
     function transposeCifra(semitonesChange) {
          if (!currentSong) return;

          currentTranspose += semitonesChange;

          const transposeStyle = userSettings.transposeStyle;

          // Find all spans with the class 'chord' in the *current view*
          const chordSpans = readerTextArea.querySelectorAll('.chord');

          chordSpans.forEach(span => {
               const originalChord = span.dataset.originalChord; // Use the saved original chord
               if (originalChord) {
                    // Calculate the new chord by transposing the ORIGINAL by the TOTAL `currentTranspose`
                    // This prevents accumulation errors if the user clicks up and down
                    const transposedChord = transposeChord(originalChord, currentTranspose, transposeStyle);
                    span.textContent = transposedChord; // Update the visible text
               }
          });

          updateTransposeIndicator(); // Update all indicators

          // Save the transpose for this song
          setSongSetting(currentSong.id, 'transpose', currentTranspose);
     }

     // Logic Function for Transposing a Chord (Improved)
     function transposeChord(chord, semitones, style = 'sharps') {
         const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
         const notesFlat = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];

         const getNoteIndex = (note) => {
             let index = notes.indexOf(note);
             if (index === -1) { // Try with flats
                 index = notesFlat.indexOf(note);
             }
              if (index === -1) { // Unrecognized note (e.g., 'H' in German, or something that's not a note)
                   return null; // Return null to indicate failure
              }
             return index;
         };

         const getNoteFromIndex = (index, stylePref) => {
             index = (index % 12 + 12) % 12; // Ensure the index is between 0 and 11

             // Prioritize the user's style
             if (stylePref === 'sharps') {
                 // Simply use the sharps array
                 return notes[index];
             } else { // Flats
                 // Simply use the flats array
                 return notesFlat[index];
             }
         };

         // Regex to break down the chord: (Root)(Suffix/Type)(Base)
         // Captures the root (note + optional #/b), whatever comes after (suffix), and optionally /note (base)
          // This regex is more robust at capturing suffixes and bases that can include #, b, /, -, etc.
         const chordMatch = chord.match(/^([A-G][#b]?)(.*?)(?:[\/\-]?([A-G][#b]?))?$/); // Accepts / or - before the base
         if (!chordMatch) {
             // console.warn("Formato de acorde não reconhecido para transposição:", chord);
             return chord; // Return original if unable to parse
         }

         let [, root, suffix, bassNote] = chordMatch; // bassNote now contains only the base note

         // Transpose the root
         let rootIndex = getNoteIndex(root);
         if (rootIndex === null) {
              // console.warn("Raiz do acorde não reconhecida:", root);
              return chord; // Return original if root is not valid
         }
         let newRootIndex = rootIndex + semitones;
         let newRoot = getNoteFromIndex(newRootIndex, style);

         // Transpose the base, if it exists
         let newBass = '';
         if (bassNote) {
              let bassIndex = getNoteIndex(bassNote);
               if (bassIndex !== null) {
                   let newBassIndex = bassIndex + semitones;
                   newBass = '/' + getNoteFromIndex(newBassIndex, style); // Use / for the transposed base
               } else {
                    // console.warn("Baixo do acorde não reconhecido:", bassNote);
                    newBass = '/' + bassNote; // Keep original base if unrecognized
               }
         }

         // Reconstruct the transposed chord
         return newRoot + (suffix || '') + newBass;
     }


     // Updates the text of the transpose indicators (sidebar and mobile overlay)
     function updateTransposeIndicator() {
          let text;
          if (currentTranspose === 0) {
              text = 'Tom Original';
          } else if (currentTranspose > 0) {
              text = `Tom +${currentTranspose}`;
          } else { // currentTranspose < 0
               text = `Tom ${currentTranspose}`;
          }
          // Find and update ALL transpose elements
          readerTransposeIndicators.forEach(span => {
               span.textContent = text;
          });
     }

     // Resets the transpose
     function resetTranspose() {
          if (currentTranspose !== 0) {
              // Transpose back to the original (currentTranspose - currentTranspose)
              transposeCifra(-currentTranspose); // The transposeCifra function recalculates based on original + new total
              // The currentTranspose variable is updated inside transposeCifra
              // updateTransposeIndicator is called inside transposeCifra
              // Save the 0 state for this song
              if(currentSong) setSongSetting(currentSong.id, 'transpose', 0);
          }
     }

     // Updates the text of the font size indicators (sidebar and mobile overlay)
     function updateFontSizeIndicator() {
         const text = `${currentFontSize}px`;
         // Find and update ALL font size elements
         readerFontSizeIndicators.forEach(span => {
               span.textContent = text;
         });
     }

     // Function unified to update all speed inputs/spans
     function updateReaderSpeedUI(speed) {
         // Ensure the value is within the valid range for the slider/number input
         const min = 1; // Minimum speed is 1
         const max = 20; // Maximum speed is 20
         let validatedSpeed = parseInt(speed);

         if (isNaN(validatedSpeed)) {
             validatedSpeed = currentScrollSpeed; // Fall back to the last valid value if NaN
         } else {
             validatedSpeed = Math.max(min, Math.min(max, validatedSpeed));
         }

         currentScrollSpeed = validatedSpeed; // Update the internal state variable

         // Update sliders (sidebar and mobile)
         readerSpeedSliders.forEach(slider => slider.value = validatedSpeed);
         // Update number inputs (sidebar and mobile)
         readerSpeedNumberInputs.forEach(input => input.value = validatedSpeed);
         // Update spans (sidebar, mobile AND bottom controls)
         readerSpeedValueSpans.forEach(span => span.textContent = validatedSpeed);
     }


     // Applies/loads reader settings (called in openReader and settings change)
     function applyReaderSettings() {
         // Apply font size (already loaded in openReader)
         readerTextArea.style.fontSize = `${currentFontSize}px`;
         updateFontSizeIndicator(); // Ensure the UI shows the correct value

         // Apply scroll speed (already loaded in openReader)
         // The updateReaderSpeedUI function already updates the visible inputs/spans
         updateReaderSpeedUI(currentScrollSpeed);

         // Apply transpose style (# vs b) - the transposeChord logic already uses userSettings.transposeStyle
         // Transposing is reapplied in renderCifraWithChords or transposeCifra after the setting changes

         // TODO: Apply chord color if configurable (via CSS var --chord-color)
     }

     // Updates font size in the reader
     function updateFontSize(change) {
          let newSize = currentFontSize + change;
          const minSize = parseInt(settingDefaultFontSize.min) || 10; // Get min/max from settings, fallback to 10/40
          const maxSize = parseInt(settingDefaultFontSize.max) || 40;

          if (newSize >= minSize && newSize <= maxSize) {
               currentFontSize = newSize;
               readerTextArea.style.fontSize = `${currentFontSize}px`;
               updateFontSizeIndicator(); // Update all indicators
               // We don't save font size per song/globally in local storage in this example,
               // we just use the settings default and adjust it temporarily in the reader session.
               // If persistence is needed, add saveUserSettings() or setSongSetting() here.
          }
     }

     // Updates scroll speed by +/- 1
     function adjustScrollSpeed(change) {
         let newSpeed = currentScrollSpeed + change;
         // Ensure the value is within the valid range (1 to 20)
         newSpeed = Math.max(1, Math.min(20, newSpeed));
         updateReaderSpeedUI(newSpeed); // Update UI and state variable
          // Optional: stop scrolling when changing speed to avoid abrupt jumps
          // if (isScrolling) stopScrolling(); // Decided to keep scrolling active when adjusting +/-
     }


     // --- Automatic Scrolling Functions (COM ACUMULADOR) ---

    function startScrolling() {
        if (isScrolling) return;

        isScrolling = true;
        // Update play/pause icons on ALL buttons
        readerScrollToggleButtons.forEach(btn => {
             btn.querySelector('i').className = 'fas fa-pause';
        });

        // Calcula o passo de rolagem que será *acumulado* a cada frame
        const stepPerFrame = currentScrollSpeed * SCROLL_BASE_STEP;

         const scroll = () => {
             // Verifica se a rolagem chegou ao fim (ou muito perto)
             // readerContentArea.scrollHeight: Total height of the content
             // readerContentArea.clientHeight: Visible height of the area
             // readerContentArea.scrollTop: Current scroll position
             // If (current position + visible height) >= total height, we are at the end.
             // Subtract 1 or 2 for margin of error in some browsers.
             // It's important to check *before* adding the step, to avoid scrolling past the end.
             if (readerContentArea.scrollTop + readerContentArea.clientHeight >= readerContentArea.scrollHeight - 2) {
                 stopScrolling(); // Stop when reaching the end
                 return;
             }

             // Adiciona o passo calculado ao acumulador
             scrollAccumulator += stepPerFrame;

             // Calcula quantos pixels inteiros podem ser rolados com o valor atual do acumulador
             const pixelsToScroll = Math.floor(scrollAccumulator);

             // If there are integer pixels to scroll (accumulator >= 1)
             if (pixelsToScroll > 0) {
                 readerContentArea.scrollTop += pixelsToScroll; // Scroll the integer pixels
                 scrollAccumulator -= pixelsToScroll; // Remove scrolled pixels from the accumulator, keeping the fractional remainder
             }


             // Continue scrolling on the next animation frame
             scrollAnimationFrameId = requestAnimationFrame(scroll);
         };

         scroll(); // Start the scrolling loop
    }

    function stopScrolling() {
        if (!isScrolling) return;

        isScrolling = false;
         // Update play/pause icons on ALL buttons
        readerScrollToggleButtons.forEach(btn => {
            btn.querySelector('i').className = 'fas fa-play';
        });
        cancelAnimationFrame(scrollAnimationFrameId); // Cancel the animation loop
        scrollAnimationFrameId = null;
    }

    function toggleScrolling() {
        if (isScrolling) {
            stopScrolling();
        } else {
            startScrolling();
        }
    }

    function resetScrolling() {
         stopScrolling();
         readerContentArea.scrollTop = 0; // Go back to the top
         scrollAccumulator = 0; // Reset the accumulator as well when resetting
    }

     // Function to save the current scroll speed for the open song
     function saveCurrentSongSpeed() {
          if (currentSong) {
               setSongSetting(currentSong.id, 'scrollSpeed', currentScrollSpeed);
               alert(`Velocidade ${currentScrollSpeed} salva para "${currentSong.title}".`);
               console.log(`Velocidade ${currentScrollSpeed} salva para música ${currentSong.id}.`, songSettings);
          } else {
               console.warn("Nenhuma música aberta para salvar a velocidade.");
          }
     }


     // --- Download Function ---
     function downloadCurrentSong() {
         if (!currentSong) {
             alert('Nenhuma cifra aberta para download.');
             return;
         }

         // Get the chord chart text with the transpose applied (without HTML)
         const transposedText = getPlainTransposedCifra();

         // Create a Blob with the text
         const blob = new Blob([transposedText], { type: 'text/plain;charset=utf-8' });

         // Create a temporary link for download
         const link = document.createElement('a');
         link.href = URL.createObjectURL(blob);

         // Define the filename
         let filename = `${currentSong.title || 'Cifra'}`;
         if (currentSong.artist && currentSong.artist !== 'Artista Desconhecido') {
              filename = `${currentSong.artist} - ${filename}`;
         }
          // Add the transposed key to the filename, if transposed
          if (currentTranspose !== 0) {
               const noteNamesSharps = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
               const noteNamesFlats = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];
               const noteNames = userSettings.transposeStyle === 'sharps' ? noteNamesSharps : notesFlat; // Corrected to use notesFlat

               // Try to find the first chord's root note to calculate the current key
               const originalRootMatch = currentSong.content.match(/(?:^|\s|\(|\[)([A-G][#b]?)/);
               let originalRoot = originalRootMatch ? originalRootMatch[1] : null;
               let currentRoot = originalRoot ? transposeChord(originalRoot, currentTranspose, userSettings.transposeStyle) : null;

              if (currentRoot) {
                    filename += ` (${currentRoot})`;
              } else {
                    filename += ` (Tom ${currentTranspose > 0 ? '+' : ''}${currentTranspose})`;
              }
          }
         filename += '.txt'; // Extension
         link.download = filename;

         // Add the link to the DOM, click it, and remove
         document.body.appendChild(link);
         link.click();
         document.body.removeChild(link);

         // Revoke the temporary URL
         URL.revokeObjectURL(link.href);
     }


     // --- WakeLock API (Keep Screen On) ---
    async function requestWakeLock() {
        // Only try if the setting is enabled AND the API is supported
        if (!userSettings.wakelockEnabled || !('wakeLock' in navigator)) {
             console.log("Wake Lock desativado nas configurações ou não suportado.");
             return;
        }
         // Only try if on the reader screen
         if (currentScreen !== 'reader') {
              console.log("Wake Lock só é ativado na tela do leitor.");
              return;
         }

        try {
            wakeLock = await navigator.wakeLock.request('screen');
            console.log('Wake Lock ativo!');
            wakeLock.addEventListener('release', () => {
                console.log('Wake Lock foi liberado');
                 wakeLock = null; // Clear the reference when released by the system
            });
        } catch (err) {
            console.error('Erro ao ativar Wake Lock:', err);
             // Inform the user that they might need to allow it in browser settings
             // Or disable the setting if not supported.
        }
    }

    function releaseWakeLock() {
        if (wakeLock) {
            wakeLock.release(); // Explicitly release
            // The 'release' event listener above will also set wakeLock = null
            console.log('Wake Lock liberado explicitamente.');
        }
    }

     // Try to reactivate wakelock if the screen becomes visible again
     // Useful if the user switches apps and comes back. The OS might release the wakelock in the background.
     document.addEventListener('visibilitychange', async () => {
          if (document.visibilityState === 'visible' && currentScreen === 'reader' && userSettings.wakelockEnabled) {
               await requestWakeLock(); // Try to re-activate if on the reader and the setting is on
          } else {
               // If the screen became invisible (or we left the reader), ensure release
               if (wakeLock) {
                   releaseWakeLock();
               }
          }
     });


    // --- Specific Modal Functions ---

    // Function to open the upload modal
    function openUploadModal() {
         uploadFileListDiv.innerHTML = ''; // Clear previous list
         uploadFileInput.value = null; // Reset the file input
         confirmUploadButton.disabled = true; // Disable the upload button initially

         // Add default message
         const initialMessage = document.createElement('p');
         initialMessage.style.textAlign = 'center';
         initialMessage.style.color = 'var(--text-secondary)';
         initialMessage.textContent = 'Selecione arquivos TXT para upload.';
         uploadFileListDiv.appendChild(initialMessage);

         showModal(uploadModal);
    }

     // Handles file selection in the upload input
     function handleFileSelect(event) {
          uploadFileListDiv.innerHTML = ''; // Clear current list
          const files = Array.from(event.target.files); // Convert FileList to Array

          if (files.length === 0) {
               confirmUploadButton.disabled = true;
               const message = document.createElement('p');
               message.style.textAlign = 'center';
               message.style.color = 'var(--text-secondary)';
               message.textContent = 'Selecione arquivos TXT para upload.';
               uploadFileListDiv.appendChild(message);
               return;
          }

          // Filter only .txt files
          const txtFiles = files.filter(file => file.type === 'text/plain' || file.name.toLowerCase().endsWith('.txt'));

           if (txtFiles.length === 0) {
               const message = document.createElement('p');
               message.style.textAlign = 'center';
               message.style.color = 'var(--text-secondary)';
               message.textContent = 'Nenhum arquivo TXT válido selecionado.';
               uploadFileListDiv.appendChild(message);
               confirmUploadButton.disabled = true;
               return;
           }

          confirmUploadButton.disabled = false; // Enable the button if there are TXTs

           // Add a "Selected" field for feedback
           const selectedCountP = document.createElement('p');
           selectedCountP.style.textAlign = 'center';
           selectedCountP.style.color = 'var(--text-secondary)';
           selectedCountP.textContent = `${txtFiles.length} arquivo(s) TXT selecionado(s):`;
           uploadFileListDiv.appendChild(selectedCountP);


          txtFiles.forEach((file, i) => {
               const fileItemDiv = document.createElement('div');
               fileItemDiv.classList.add('upload-file-item');
               // Suggest Title and Artist based on filename (try "Artist - Title.txt")
               const suggestedName = file.name.replace(/\.txt$/i, '').split(' - ');
               const suggestedArtist = suggestedName.length > 1 ? suggestedName[0].trim() : '';
               const suggestedTitle = suggestedName.length > 1 ? suggestedName.slice(1).join(' - ').trim() : suggestedName[0].trim(); // Join the rest

               fileItemDiv.innerHTML = `
                   <p>Arquivo: <strong>${file.name}</strong></p>
                   <label for="upload-title-${i}">Título:</label>
                   <input type="text" id="upload-title-${i}" value="${suggestedTitle}" placeholder="Título da Música" required>
                   <label for="upload-artist-${i}">Artista:</label>
                   <input type="text" id="upload-artist-${i}" value="${suggestedArtist}" placeholder="Nome do Artista">
                    <input type="hidden" class="upload-file-name" value="${file.name}">
               `;
               uploadFileListDiv.appendChild(fileItemDiv);
          });
     }

     // Simulates the upload process (IN A REAL BACKEND, THIS WOULD MAKE HTTP REQUESTS)
     function simulateUpload() {
          const fileItems = uploadFileListDiv.querySelectorAll('.upload-file-item');
          const filesToProcess = [];

          if (fileItems.length === 0) {
               alert('Nenhum arquivo válido para upload.');
               return;
          }

           let allFieldsFilled = true;
           fileItems.forEach(item => {
               const titleInput = item.querySelector('input[id^="upload-title"]');
               if (!titleInput.value.trim()) {
                   allFieldsFilled = false;
               }
           });

           if (!allFieldsFilled) {
                alert('Por favor, preencha pelo menos o título para todos os arquivos.');
                return;
           }


          // Disable the button to prevent multiple clicks
          confirmUploadButton.disabled = true;
          confirmUploadButton.textContent = 'Enviando...'; // Visual feedback

          // Use FileReader to read the content of the selected files on the frontend
          let filesReadCount = 0;
          const totalFiles = fileItems.length;
           const uploadedSongsInfo = []; // For final feedback

          fileItems.forEach(item => {
               const fileName = item.querySelector('.upload-file-name').value;
               const titleInput = item.querySelector('input[id^="upload-title"]');
               const artistInput = item.querySelector('input[id^="upload-artist"]');

               const title = titleInput.value.trim() || 'Título Desconhecido'; // Ensure it's not empty
               const artist = artistInput.value.trim() || 'Artista Desconhecido';

               // Find the actual File object from the filename in the original input[type="file"]
               const file = Array.from(uploadFileInput.files).find(f => f.name === fileName);

               if (file) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                         filesToProcess.push({
                              fileName: fileName,
                              title: title,
                              artist: artist,
                              content: e.target.result // Read file content
                         });
                         filesReadCount++;
                         if (filesReadCount === totalFiles) {
                              // All files have been read, now simulate the "upload" to local data
                              console.log("Simulando upload para os dados locais:", filesToProcess);

                              filesToProcess.forEach(fileInfo => {
                                   const newSong = {
                                        id: 's' + (Date.now() + Math.random()).toFixed(0), // Simple unique ID based on timestamp
                                        title: fileInfo.title,
                                        artist: fileInfo.artist,
                                        content: fileInfo.content
                                   };
                                   allSongs.push(newSong);
                                    uploadedSongsInfo.push(`${newSong.title} - ${newSong.artist}`);

                                    // Initialize settings for the new song
                                   songSettings[newSong.id] = {
                                        scrollSpeed: null, // Default: use user's default
                                         transpose: 0 // Default: original key
                                   };

                                   console.log(`Cifra "${newSong.title}" adicionada (simulado).`);
                               });

                               saveSongSettings(); // Save the new song settings

                              renderLibrary(); // Update the library list
                              hideModal();

                               const successMessage = uploadedSongsInfo.length === totalFiles
                                   ? `${totalFiles} arquivo(s) simuladamente enviados e adicionados!`
                                   : `Upload simulado concluído com alguns erros de leitura. ${uploadedSongsInfo.length} música(s) adicionada(s).`;
                              alert(successMessage);

                              confirmUploadButton.disabled = false;
                              confirmUploadButton.textContent = 'Upload';

                              // TODO: In a real app, send `filesToProcess` (or the original FormData) to the backend here
                         }
                    };
                    reader.onerror = () => {
                         console.error("Erro ao ler arquivo para simulação:", fileName);
                         filesReadCount++;
                         if (filesReadCount === totalFiles) {
                             confirmUploadButton.disabled = false;
                             confirmUploadButton.textContent = 'Upload';
                              hideModal();
                             alert("Ocorreu um erro ao ler alguns arquivos para simulação. Verifique o console para detalhes.");
                              renderLibrary(); // Update with what could be added
                         }
                    };
                    reader.readAsText(file); // Read content as text
               } else {
                    console.warn(`Arquivo "${fileName}" não encontrado na lista de arquivos selecionados do input original.`);
                    filesReadCount++;
                    if (filesReadCount === totalFiles) {
                         confirmUploadButton.disabled = false;
                         confirmUploadButton.textContent = 'Upload';
                          hideModal();
                         alert("Ocorreu um erro ao processar alguns arquivos (arquivos não encontrados). Verifique o console.");
                          renderLibrary(); // Update with what could be added
                    }
               }
          });
     }


     // Function to open the add song to event modal
    function openAddSongToEventModal() {
         if (!currentEvent) return; // Need an active event

         addSongLibraryList.innerHTML = '';
         addSongSearchInput.value = '';
         confirmAddSongButton.disabled = true;

         // Render the library in the modal with checkboxes
         allSongs.forEach(song => {
              // Don't add songs that are already in the current event
              if (currentEvent.songIds.includes(song.id)) {
                   return;
              }

              const li = document.createElement('li');
              li.innerHTML = `
                  <div class="song-info">
                      <h3>${song.title}</h3>
                      <p>${song.artist}</p>
                  </div>
                  <input type="checkbox" data-song-id="${song.id}">
              `;
               // Add listener to enable/disable the "Add" button
               const checkbox = li.querySelector('input[type="checkbox"]'); // Corrected selector
               checkbox.addEventListener('change', updateAddSongButtonState);
               // Allow clicking anywhere on the LI to check/uncheck the checkbox
               li.addEventListener('click', (event) => {
                   // Prevent clicking on the checkbox itself from also activating the LI, creating a loop
                   if (event.target !== checkbox) {
                       checkbox.checked = !checkbox.checked;
                        // Manually trigger the change event so the button listener is called
                        checkbox.dispatchEvent(new Event('change'));
                   }
               });
              addSongLibraryList.appendChild(li);
         });

         showModal(addSongToEventModal);
    }

     // Updates the state of the "Add" button in the add song modal
     function updateAddSongButtonState() {
          const selectedCount = addSongLibraryList.querySelectorAll('input[type="checkbox"]:checked').length;
          confirmAddSongButton.disabled = selectedCount === 0;
     }

     // Handles the confirmation in the add song modal
     function confirmAddSongToEvent() {
         if (!currentEvent) return; // Need an active event

         const selectedSongs = addSongLibraryList.querySelectorAll('input[type="checkbox"]:checked');
         const songIdsToAdd = Array.from(selectedSongs).map(cb => cb.dataset.songId);

         if (songIdsToAdd.length === 0) {
              // The Confirm button would already be disabled, but validation is good
              alert('Selecione pelo menos uma música.');
              return;
         }

         // TODO: Call backend API to add songs to the event
         console.log(`Simulando: Adicionar músicas ${songIdsToAdd} ao evento ${currentEvent.id}`);

         // SIMULATION: Add to the local event array
         currentEvent.songIds = [...currentEvent.songIds, ...songIdsToAdd];
          // Remove duplicates (ensure the same song isn't added twice)
          currentEvent.songIds = [...new Set(currentEvent.songIds)];

         // TODO: In a real app, save the modified event to the backend (API PUT/PATCH on event)

         renderEventSongs(currentEvent); // Re-render the event's song list
         hideModal();
         alert(`${songIdsToAdd.length} música(s) simuladamente adicionadas ao ensaio.`);
         // TODO: Update the main events list as well if needed (for song count)
         renderEvents(); // Re-render the main list to update the count
     }

     // Removes song from event (simulated)
     function removeSongFromEvent(eventId, songId) {
          const event = allEvents.find(e => e.id === eventId);
          if (event) {
               // Confirmation before removing
               const songToRemove = allSongs.find(s => s.id === songId);
               const songTitle = songToRemove ? songToRemove.title : 'esta música';
               if (!confirm(`Tem certeza que deseja remover "${songTitle}" deste ensaio?`)) {
                    return; // Exit if canceled
               }

               event.songIds = event.songIds.filter(id => id !== songId);
               // TODO: In a real app, save the modified event to the backend (API PUT/PATCH on event)
               renderEventSongs(event); // Re-render the event's song list
               renderEvents(); // Re-render the main list to update the count
               alert(`Música removida do ensaio (simulado).`);
          }
     }


     // Function to open create/edit event modal
     function openEventFormModal(eventToEdit = null) {
          eventFormTitle.textContent = eventToEdit ? 'Editar Ensaio' : 'Novo Ensaio';
          eventNameInput.value = eventToEdit ? eventToEdit.name : '';
          // Format date to YYYY-MM-DD to fill the input[type="date"]
          eventDateInput.value = eventToEdit ? eventToEdit.date : '';
          saveEventFormButton.dataset.eventId = eventToEdit ? eventToEdit.id : ''; // Store the ID for editing

          showModal(eventFormModal);
     }

     // Handles saving the event form (simulated)
     function saveEventForm() {
          const eventId = saveEventFormButton.dataset.eventId;
          const name = eventNameInput.value.trim();
          const date = eventDateInput.value; // YYYY-MM-DD format

          if (!name || !date) {
               alert('Por favor, preencha o nome e a data do ensaio.');
               return;
          }

          if (eventId) {
               // Edit Event
               // TODO: Call backend API to edit event (API PUT/PATCH on event)
               console.log(`Simulando: Editando evento ${eventId}`);
               const eventIndex = allEvents.findIndex(e => e.id === eventId);
               if (eventIndex !== -1) {
                    allEvents[eventIndex].name = name;
                    allEvents[eventIndex].date = date;
                    console.log(`Evento ${eventId} editado (simulado).`);
               }
                // If we are on the detail screen of the edited event, re-render
               if (currentEvent && currentEvent.id === eventId) {
                   // Update currentEvent with the new data
                    currentEvent = allEvents[eventIndex];
                    openEventDetail(currentEvent.id); // Reopen detail with updated data
               }

          } else {
               // New Event
               // TODO: Call backend API to create event (API POST to /events)
                const newEvent = {
                    id: 'e' + (Date.now() + Math.random()).toFixed(0), // Simple unique ID
                    name: name,
                    date: date,
                    songIds: [] // Start empty
                };
                allEvents.push(newEvent);
                console.log("Novo evento criado (simulado):", newEvent);
          }

          renderEvents(); // Update the main event list
          hideModal();
          alert(`Ensaio ${eventId ? 'editado' : 'criado'} com sucesso (simulado)!`);
     }

     // Handles event deletion (simulated)
     function deleteEvent(eventId) {
          const eventToDelete = allEvents.find(e => e.id === eventId);
           const eventName = eventToDelete ? eventToDelete.name : 'este ensaio';
          if (confirm(`Tem certeza que deseja excluir ${eventName}? Esta ação não pode ser desfeita.`)) {
               // TODO: Call backend API to delete event (API DELETE to /events/{id})
               console.log(`Simulando: Excluir evento ${eventId}`);
               allEvents = allEvents.filter(event => event.id !== eventId); // Remove from local array
               console.log(`Evento ${eventId} excluído (simulado).`);
               renderEvents(); // Update the event list
               // Go back to the events list (not the deleted detail page)
               showScreenPage('events');
               currentEvent = null; // Ensure no deleted event is "active"
               alert('Ensaio excluído (simulado).');
          }
     }


    // --- Initialization and Event Listeners ---

    function initializeApp() {
        // Load user and song settings from local storage
        // Already done in the declaration of userSettings and songSettings variables

        // Apply the saved theme on load
        applyTheme(userSettings.theme); // Already calls saveUserSettings inside

        // Attempt automatic login (if saved credentials? Or always show login?)
        // For now, always show the login screen first
        showScreen('login-screen'); // Start on the login screen

        // Load simulated (or real via API) data
        loadAppData(); // Load simulated library and events (and associate song settings)

        // Apply initial reader settings (for the inputs in settings)
        settingWakelock.checked = userSettings.wakelockEnabled;
        settingDefaultFontSize.value = userSettings.defaultFontSize;
        settingDefaultScrollSpeed.value = userSettings.defaultScrollSpeed;
        settingTransposeStyle.value = userSettings.transposeStyle;

        // Trigger the resize event once on initialization
        // This ensures the responsive layout of the reader is applied correctly on page load
         window.dispatchEvent(new Event('resize'));
    }

    // Login Listeners
    loginButton.addEventListener('click', () => {
        const user = usernameInput.value;
        const pass = passwordInput.value;

        // TODO: Call backend API for real authentication
        console.log(`Tentativa de login: User='${user}', Pass='${pass}'`);

        // Simulate successful login with any filled values
        if (user && pass) {
            loggedIn = true;
            loginErrorMessage.textContent = '';
            // TODO: Redirect AFTER successful backend authentication
            showScreen('main-app'); // Go to the main-app screen
            showScreenPage('library'); // Show the library page by default
            // The showScreenPage function now manages the 'active' class on footer buttons.
        } else {
            loginErrorMessage.textContent = 'Por favor, insira usuário e senha.';
        }
    });

    // Allow login with Enter
    passwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            loginButton.click();
        }
    });


    // Main Header Listeners (settings and theme toggle remain here)
    settingsButton.addEventListener('click', () => {
         // No longer need to hide menu, go directly to the settings page
         showScreenPage('settings');
    });
     themeToggleButtonHeader.addEventListener('click', () => {
          const newTheme = userSettings.theme === 'light' ? 'dark' : 'light';
          applyTheme(newTheme); // applyTheme already updates userSettings and saves
     });


    // Removed: Side Navigation Menu Listeners


    // New Bottom Navigation Listeners (Main)
    bottomNavButtons.forEach(button => {
         button.addEventListener('click', (e) => {
              const targetPage = e.currentTarget.dataset.targetPage; // Use currentTarget to ensure the button is captured
              if (targetPage) {
                   // If the target is 'library-search', just navigate to 'library'
                   const pageToShow = targetPage === 'library-search' ? 'library' : targetPage;
                   showScreenPage(pageToShow);
                   // TODO: For 'library-search', maybe focus the search input here?
                    if (targetPage === 'library-search') {
                         // Small delay to ensure the input is visible before focusing
                         setTimeout(() => {
                              songSearchInput.focus();
                         }, 100); // Adjust delay if needed
                    }
              }
         });
    });


    // Library Listeners
    songSearchInput.addEventListener('input', (e) => {
        renderLibrary(e.target.value); // Filter the library on typing
    });
    fabAddSong.addEventListener('click', openUploadModal); // Open upload modal


    // Upload Modal Listeners
    cancelUploadButton.addEventListener('click', hideModal); // Close modal
    uploadFileInput.addEventListener('change', handleFileSelect); // Process selected files
    confirmUploadButton.addEventListener('click', simulateUpload); // Start simulated upload


    // Events Listeners
     addEventButton.addEventListener('click', () => openEventFormModal()); // Open modal to create a new event
     backToEventsButton.addEventListener('click', () => { // Back button on event detail
         showScreenPage('events'); // Go back to the events list
         // Title and active button already updated in showScreenPage
     });
     addSongToEventButton.addEventListener('click', openAddSongToEventModal); // Open modal to add songs to the event
      editEventButton.addEventListener('click', () => { // Edit event button (on detail)
           if (currentEvent) openEventFormModal(currentEvent); // Open pre-filled modal
      });
      deleteEventButton.addEventListener('click', () => { // Delete event button (on detail)
           if (currentEvent) deleteEvent(currentEvent.id); // Call deletion function
      });


     // Add Song to Event Modal Listeners
     cancelAddSongButton.addEventListener('click', hideModal); // Close modal
     confirmAddSongButton.addEventListener('click', confirmAddSongToEvent); // Add selected songs to the event
     addSongSearchInput.addEventListener('input', (e) => {
          // Implement filter in the add song modal list
          const filter = e.target.value.toLowerCase();
          addSongLibraryList.querySelectorAll('li').forEach(li => {
              const songInfo = li.querySelector('.song-info');
              const songTitle = songInfo.querySelector('h3').textContent.toLowerCase();
              const songArtist = songInfo.querySelector('p').textContent.toLowerCase();
              // Display the item if the title or artist contains the filter
              if (songTitle.includes(filter) || songArtist.includes(filter)) {
                  li.style.display = 'flex'; // Use flex as the li has display: flex
              } else {
                  li.style.display = 'none';
              }
          });
     });


     // Event Form Modal Listeners
     cancelEventFormButton.addEventListener('click', hideModal); // Close modal
     saveEventFormButton.addEventListener('click', saveEventForm); // Save (create or edit) the event


    // Reader Listeners
    readerBackButton.addEventListener('click', () => {
        stopScrolling(); // Ensure scrolling stops when exiting
         releaseWakeLock(); // Release wakelock
        // Logic to return to the correct screen (Library or Event Detail)
        hideReaderControlsMobile(); // Ensure mobile overlay is closed on exit
        showScreen('main-app'); // Go back to the main screen

        // Try to find which page was active before going to the reader
        // If currentEvent is not null, it means we came from the event detail.
         if (currentEvent) {
             openEventDetail(currentEvent.id); // Return to the specific event detail
             // No need to call showScreenPage, openEventDetail already does it
         } else {
             // If currentEvent is null, we came from the library (or another screen that isn't event detail)
            showScreenPage('library'); // Return to the library
            // Title and active button already updated in showScreenPage
         }
         // Clear currentEvent when leaving the event detail screen (already done in deleteEvent, but useful here also)
         // Don't clear if returning *to* the detail screen
         if (currentScreenPage !== 'event-detail') {
             currentEvent = null;
         }
    });


     // Reader Bottom Controls Bar Listeners
     readerScrollToggleBottom.addEventListener('click', toggleScrolling); // Play/Pause
     readerSpeedDownBottom.addEventListener('click', () => adjustScrollSpeed(-1)); // Speed -1
     readerSpeedUpBottom.addEventListener('click', () => adjustScrollSpeed(1)); // Speed +1
     readerScrollResetBottom.addEventListener('click', resetScrolling); // Reset Scroll
     readerSaveSpeedBottom.addEventListener('click', saveCurrentSongSpeed); // Save Speed

     // Mobile Controls Toggle Button Listener - This button opens the OVERLAY, not the fixed bottom bar.
     readerControlsToggleMobileButton.addEventListener('click', showReaderControlsMobile); // Open mobile overlay
     closeReaderControlsMobileButton.addEventListener('click', hideReaderControlsMobile); // Close mobile overlay


     // Reader Controls Listeners (Synchronized between Sidebar and Mobile Overlay)
     // Play/Pause Buttons (Sidebar and Mobile Overlay) - The bottom bar has its own listener above
     readerScrollToggleButtons.forEach(btn => {
         if (btn.id !== 'scroll-toggle-bottom') {
              btn.addEventListener('click', toggleScrolling);
         }
     });

     // Speed Sliders (Sidebar and Mobile Overlay)
     readerSpeedSliders.forEach(slider => {
         slider.addEventListener('input', (e) => {
             // handleSpeedChange is not defined! This might be the cause of your syntax error or a subsequent error.
             // Let's remove the calls to handleSpeedChange for now, as adjustScrollSpeed already updates the UI.
             // handleSpeedChange(parseInt(e.target.value)); // REMOVED
             updateReaderSpeedUI(parseInt(e.target.value)); // Use existing update UI logic
             // Optional: stop scrolling when adjusting speed with the slider to avoid jumps
             if (isScrolling) stopScrolling();
         });
     });

     // Number Inputs for Speed (Sidebar and Mobile Overlay)
     readerSpeedNumberInputs.forEach(input => {
          input.addEventListener('input', (e) => {
               // handleSpeedChange is not defined!
               // handleSpeedChange(parseInt(e.target.value)); // REMOVED
                updateReaderSpeedUI(parseInt(e.target.value)); // Use existing update UI logic
          });
          input.addEventListener('change', (e) => {
               // handleSpeedChange is not defined!
               // handleSpeedChange(parseInt(e.target.value)); // REMOVED
                updateReaderSpeedUI(parseInt(e.target.value)); // Use existing update UI logic
               if (isScrolling) stopScrolling();
          });
     });

     // Scroll Reset Buttons (Sidebar and Mobile Overlay) - The bottom bar has its own listener above
     readerScrollResetButtons.forEach(btn => {
          if (btn.id !== 'scroll-reset-bottom') {
              btn.addEventListener('click', resetScrolling);
          }
     });

     // Save Speed Buttons (Sidebar and Mobile Overlay) - The bottom bar has its own listener above
     readerSaveSpeedButtons.forEach(btn => {
          if (btn.id !== 'save-song-speed-button-bottom') {
              btn.addEventListener('click', saveCurrentSongSpeed);
          }
     });


     // Transpose - Listeners added to ALL buttons (sidebar and mobile overlay)
     readerTransposeDownButtons.forEach(btn => btn.addEventListener('click', () => transposeCifra(-1)));
     readerTransposeUpButtons.forEach(btn => btn.addEventListener('click', () => transposeCifra(1)));
     readerTransposeResetButtons.forEach(btn => btn.addEventListener('click', resetTranspose));

     // Font Size - Listeners added to ALL buttons (sidebar and mobile overlay)
     readerFontSizeDownButtons.forEach(btn => btn.addEventListener('click', () => updateFontSize(-1)));
     readerFontSizeUpButtons.forEach(btn => btn.addEventListener('click', () => updateFontSize(1)));

     // Theme Toggle in Reader - Listeners added to ALL buttons (sidebar and mobile overlay)
     readerThemeToggleButtons.forEach(btn => {
         btn.addEventListener('click', () => {
             const newTheme = userSettings.theme === 'light' ? 'dark' : 'light';
             applyTheme(newTheme); // applyTheme already updates userSettings and saves
         });
     });

     // Download - Listeners added to ALL buttons (sidebar and mobile overlay)
     readerDownloadSongButtons.forEach(btn => btn.addEventListener('click', downloadCurrentSong));


     // Listener for window resize (adjusts reader controls display)
     // This listener is crucial for the responsiveness of the reader controls.
     window.addEventListener('resize', () => {
         // Only execute this logic if we are on the reader screen
         if (currentScreen === 'reader') {
              if (window.innerWidth <= 768) {
                   // Mobile Layout: Hide sidebar controls, show the OVERLAY toggle button in the header
                   readerControlsToggleMobileButton.style.display = 'flex'; // Use flex for button
                   readerSidebar.style.display = 'none';
                   // Ensure the click listener on the text area (to open the mobile overlay) is active
                    // Remove the listener before adding to avoid duplication
                    readerContentArea.removeEventListener('click', toggleReaderControlsMobile);
                    readerContentArea.addEventListener('click', toggleReaderControlsMobile);

                    // The fixed bottom controls bar (readerBottomControls) is already configured for display: flex in @media max-width 768px in CSS

              } else {
                   // Desktop/Tablet Layout: Show sidebar controls, hide the OVERLAY toggle button
                   readerControlsToggleMobileButton.style.display = 'none';
                   readerSidebar.style.display = 'block'; // Use block for sidebar
                   hideReaderControlsMobile(); // Ensure mobile overlay is hidden on desktop
                   // Remove the click listener on the text area which is only for mobile
                    readerContentArea.removeEventListener('click', toggleReaderControlsMobile); // Corrected the function name here

                     // The fixed bottom controls bar (readerBottomControls) is already configured for display: none in @media min-width 769px in CSS
               }
         }
     });


    // --- Initialize the app ---
    initializeApp();

    // TODO: Implement:
    // - Data Persistence (Backend API: save/load songs, events) - The simulation with localStorage already covers part of settings persistence.
    // - Complete and robust Chord Parsing/Transpose Logic (Current Regex is basic, but improved)
    // - Delete chord charts (Simulated, needs backend)
    // - Edit chord chart details (Simulated, needs backend)
    // - Reorder songs in an event (Drag and Drop - Use a library like SortableJS)
    // - Prev/Next buttons in the reader when coming from an event (needs to know the event's song list)
    // - More fine-grained styles for dark mode (check border colors, shadows, inputs, selects)
    // - Messages for loading/feedback on uploads/network operations
    // - API error handling (e.g., login failure, upload)
    // - Security (password hashes on backend, etc.)

    console.log("Frontend CifraReader iniciado. Rodando em modo de simulação de dados e settings locais.");
});