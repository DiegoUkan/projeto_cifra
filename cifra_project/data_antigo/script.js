document.addEventListener('DOMContentLoaded', () => {
    // --- Seletores de Elementos ---
    const app = document.getElementById('app');
    const loginScreen = document.getElementById('login-screen');
    const mainApp = document.getElementById('main-app');
    const readerScreen = document.getElementById('reader-screen');
    const modalOverlay = document.getElementById('modal-overlay');
    const navMenu = document.getElementById('nav-menu');
    const navMenuOverlay = document.getElementById('nav-menu-overlay');
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
    const menuToggleButton = document.querySelector('.menu-toggle');
    const settingsButton = document.getElementById('settings-button');
    const themeToggleButtonHeader = document.getElementById('theme-toggle-button');

    // Navigation Menu
    const closeMenuButton = document.querySelector('.close-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const logoutLink = document.getElementById('logout-link');

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


    // Controles do Leitor (Referência unificada para sidebar e mobile overlay)
    // Usaremos querySelectorAll para encontrar elementos em ambas as seções quando necessário
    // Exemplo: document.querySelectorAll('#scroll-toggle, #scroll-toggle-mobile')


    // Configurações
    const settingsThemeToggle = document.getElementById('settings-theme-toggle');
    const settingWakelock = document.getElementById('setting-wakelock');
    const settingDefaultFontSize = document.getElementById('setting-default-font-size');
    const settingDefaultScrollSpeed = document.getElementById('setting-default-scroll-speed');
    const settingTransposeStyle = document.getElementById('setting-transpose-style');
    const resetSettingsButton = document.getElementById('reset-settings-button');


    // --- Variáveis de Estado ---
    let currentScreen = 'login'; // 'login', 'library', 'events', 'event-detail', 'reader', 'settings'
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
    let wakeLock = null; // Para manter a tela ligada

    // Configurações do Usuário (armazenadas localmente)
    // Preferimos um único objeto no localStorage para organizar melhor
    let userSettings = JSON.parse(localStorage.getItem('cifraReaderSettings')) || {
        theme: 'light',
        defaultFontSize: 16,
        defaultScrollSpeed: 5, // Valor padrão alterado
        transposeStyle: 'sharps', // 'sharps' ou 'flats'
        wakelockEnabled: false // Se o bloqueio de tela está ativado
    };

     // Configurações por Música (armazenadas localmente)
     // Preferimos um único objeto no localStorage
     // songSettings = { songId1: { scrollSpeed: 10, transpose: 2, ... }, songId2: {...} }
     let songSettings = JSON.parse(localStorage.getItem('cifraReaderSongSettings')) || {};


     // --- Constante de Rolagem (Ajustada para ser mais lenta) ---
     // Este valor define quão grande é o passo de rolagem para a velocidade 1.
     // Valores maiores significam rolagem mais rápida para o mesmo valor de velocidade.
     const SCROLL_BASE_STEP = 0.15; // Ajustado de 0.8 para 0.15 (valor menor = mais lento)


     // --- Conteúdo das Cifras (Embutido para Simulação) ---
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
Bm             D9/A    D/F#       G
Digno, em Teus braços achei meu lugar
            D/A       A4(7/9-)  D
Pra sempre irei Te adorar,      Digno!

( D  G/D  D  G/D )

[Segunda Parte]

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
Bm            D9/A    D/F#       G
Digno,em Teus braços achei meu lugar
            D/A       A4(7/9-)  D      G/D
Pra sempre irei Te adorar,      Digno!

[Terceira Parte]

D          A/C#
Cantaremos aleluia
Bm         G
Cantaremos aleluia
D          A/C#
Cantaremos aleluia ( aleluia, aleluia, aleluia, aleluia )
Bm         G
Cantaremos aleluia ( aleluia, aleluia, aleluia, aleluia )
D          A/C#
Cantaremos aleluia ( aleluia, aleluia, aleluia, aleluia )
Bm
Cantaremos aleluia ( aleluia, aleluia )
    B4   A/C#  B/D#
Nós cantare____mos

[Refrão]

E             B/D#
Digno! É o Cordeiro bendito
C#m         E9/B    E/G#     A
Digno, toda honra e glória a Ti
          E/G#    A      B4    A/C#  B/D#
Tanto esperei por este momento
E           B/D#              G#/C
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
        document.querySelectorAll('.fa-sun, .fa-moon').forEach(icon => {
             icon.classList.remove(oldIconClass);
             icon.classList.add(themeIconClass);
        });
         // Atualiza o texto dos botões de tema
         document.querySelectorAll('#theme-toggle-button, #reader-theme-toggle, #reader-theme-toggle-mobile, #settings-theme-toggle').forEach(button => {
             // Assume que o ícone está dentro do botão
             const icon = button.querySelector('i');
              if (icon) {
                  // O ícone já foi atualizado acima, só o texto "Alternar Tema" fica o mesmo
              }
         });

    }

    // Função para mostrar uma tela
    function showScreen(screenId) {
         const screens = document.querySelectorAll('.screen');
         screens.forEach(screen => screen.classList.remove('active'));
         document.getElementById(screenId).classList.add('active');
         currentScreen = screenId.replace('-screen', ''); // Atualiza variável de estado

         // Ajusta a visibilidade do header principal
         if (screenId === 'login-screen') {
             mainApp.style.display = 'none';
         } else {
              mainApp.style.display = 'flex'; // main-app sempre visível após login
             // A visibilidade das páginas dentro de main-app é controlada por showScreenPage
         }

         // Esconde modais e menu ao mudar de tela
         hideModal();
         hideNavMenu();

         // Atualiza o título do header (apenas no main-app screens)
         if (screenId !== 'login-screen' && screenId !== 'reader-screen') {
            switch (currentScreen) {
                case 'library': mainHeaderTitle.textContent = 'Biblioteca'; break;
                case 'events': mainHeaderTitle.textContent = 'Ensaios'; break;
                case 'settings': mainHeaderTitle.textContent = 'Configurações'; break;
            }
         }
         // Atualiza o estado dos links de navegação (classe 'active-link')
         navLinks.forEach(link => {
              link.classList.remove('active-link');
              if (link.dataset.screen === currentScreen) {
                  link.classList.add('active-link');
              }
         });

          // Lógica específica ao entrar/sair de telas
         if (screenId === 'reader-screen') {
            requestWakeLock(); // Tenta manter a tela ligada (se ativado nas settings)
            readerContentArea.scrollTop = 0; // Reinicia a rolagem
            stopScrolling(); // Garante que a rolagem está parada ao entrar
            // Aplica as configurações de velocidade e fonte na UI dos controles visíveis
            updateReaderSpeedUI(currentScrollSpeed); // Atualiza controles de velocidade (sidebar e mobile overlay)
            updateFontSizeIndicator(); // Atualiza indicadores de fonte (sidebar e mobile overlay)
            updateTransposeIndicator(); // Atualiza indicadores de transposição (sidebar e mobile overlay)


            // Adiciona/Remove listeners de controle baseados no tamanho da tela
             // Dispara resize para aplicar layout correto da sidebar/overlay e listeners
             window.dispatchEvent(new Event('resize'));

         } else { // Saindo da tela do reader
            releaseWakeLock(); // Libera o bloqueio de tela
            stopScrolling(); // Garante que a rolagem para ao sair da tela do reader
            hideReaderControlsMobile(); // Garante que o overlay mobile esteja escondido
            currentSong = null; // Limpa a música atual ao sair do leitor

            // Remove o listener de clique na área do texto adicionado para mobile
            // Garante que não tenhamos listeners duplicados ou em telas erradas
             readerContentArea.removeEventListener('click', toggleReaderControlsMobile);

         }
    }

     // Função para mostrar uma "página" dentro da área de conteúdo principal
     function showScreenPage(pageId) {
          document.querySelectorAll('.screen-page').forEach(page => page.classList.remove('active'));
          document.getElementById(pageId).classList.add('active');

          // Oculta FAB dependendo da página
          if (pageId === 'library-screen-content') {
              fabAddSong.style.display = 'flex'; // Usa flex para centralizar o ícone FAB
          } else {
              fabAddSong.style.display = 'none';
          }
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

    // Função para mostrar o menu de navegação
    function showNavMenu() {
         navMenu.classList.add('open');
         navMenuOverlay.classList.add('active');
    }

    // Função para esconder o menu de navegação
    function hideNavMenu() {
         navMenu.classList.remove('open');
         navMenuOverlay.classList.remove('active');
    }

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
        // NOTE: Em um app real, `allSongs` viria de uma API. As settings seriam carregadas separadamente
        // e associadas aos objetos das músicas depois. Aqui, associamos logo.
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
                    // Garante que a estrutura básica exista mesmo se a música já existisse mas sem speed/transpose
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
          // Remove a mensagem de "nenhuma ensaio" se ela existir
         const emptyMessage = eventsList.querySelector('.list-empty-message');
         if (emptyMessage) {
             emptyMessage.remove();
         }

        allEvents.forEach(event => {
            const li = document.createElement('li');
            li.dataset.eventId = event.id;
            const eventDate = new Date(event.date + 'T12:00:00Z'); // Adiciona H/M/S e Z para evitar problemas de fuso horário
            const formattedDate = eventDate.toLocaleDateString('pt-BR', { timeZone: 'UTC' }); // Especifica UTC
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

    // Abre a tela de detalhes de um evento
    function openEventDetail(eventId) {
         currentEvent = allEvents.find(event => event.id === eventId);
         if (!currentEvent) {
              console.error("Evento não encontrado:", eventId);
              showScreen('main-app'); // Volta para a lista de eventos
              showScreenPage('events-screen-content');
              return;
         }

         eventDetailTitle.textContent = currentEvent.name;
         const eventDate = new Date(currentEvent.date + 'T12:00:00Z');
         eventDetailDate.textContent = eventDate.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
         renderEventSongs(currentEvent); // Renderiza as músicas do evento

         showScreen('main-app');
         showScreenPage('event-detail-screen-content');
         mainHeaderTitle.textContent = 'Detalhes do Ensaio';
    }

     // Renderiza a lista de músicas dentro do detalhe do evento
    function renderEventSongs(event) {
         eventSongsList.innerHTML = '';
         if (event.songIds.length === 0) {
              eventSongsList.innerHTML = `<li class="list-empty-message">Nenhuma música adicionada a este ensaio.<br>Toque em "Adicionar Música".</li>`;
              return;
         }

          // Remove a mensagem de "nenhuma música" se ela existir
         const emptyMessage = eventSongsList.querySelector('.list-empty-message');
         if (emptyMessage) {
             emptyMessage.remove();
         }


         event.songIds.forEach(songId => {
              const song = allSongs.find(s => s.id === songId);
              if (!song) return;

              const li = document.createElement('li');
               li.classList.add('list-item-draggable'); // Classe para futuro drag and drop
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
               li.querySelector('.song-info').onclick = () => openReader(song.id, event.id); // Abrir reader no contexto do evento
               li.querySelector('.remove-from-event-button').onclick = (e) => {
                    e.stopPropagation();
                    removeSongFromEvent(event.id, song.id);
               };
              eventSongsList.appendChild(li);
         });
          // TODO: Inicializar SortableJS ou lógica de Drag and Drop aqui
    }


    // Abre a tela do Leitor
    function openReader(songId, eventId = null) {
        const song = allSongs.find(s => s.id === songId);
        if (!song) {
            alert('Cifra não encontrada!');
            return;
        }
        currentSong = song;

         readerSongTitle.textContent = song.title;
         readerSongArtist.textContent = song.artist;

         // TODO: Aplicar transposição salva para esta música/usuário
        // Carrega a transposição salva para esta música ou usa 0
        currentTranspose = getSongSetting(song.id, 'transpose', 0);
        updateTransposeIndicator(); // Atualiza ambos os indicadores


         // Carrega a velocidade de rolagem salva para esta música ou usa o default do usuário
         currentScrollSpeed = getSongSetting(song.id, 'scrollSpeed', userSettings.defaultScrollSpeed);
         // Garante que a velocidade esteja dentro do range válido [1, 20]
         currentScrollSpeed = Math.max(1, Math.min(20, currentScrollSpeed));


         // Carrega o tamanho de fonte padrão do usuário
         currentFontSize = userSettings.defaultFontSize; // Garante que começa com o padrão do usuário
         readerTextArea.style.fontSize = `${currentFontSize}px`;
         updateFontSizeIndicator(); // Atualiza ambos os indicadores


         // Renderiza o texto (com acordes destacados)
         renderCifraWithChords(song.content);

        showScreen('reader-screen');

         // Aplica configurações do leitor aos controles visíveis (sidebar ou mobile overlay)
         applyReaderSettings(); // Aplica fonte, velocidade e estilo de transposição

         // A lógica para mostrar/esconder sidebar/overlay e adicionar o listener de clique na área de texto (para mobile)
         // está no listener de 'resize' que é disparado ao abrir a tela.
    }

     // Função para renderizar a cifra destacando acordes
     function renderCifraWithChords(content) {
         // Regex: Procura por acordes (A-G), #/b, sufixos, números e baixos
         // Melhorada para ser mais precisa e menos propensa a marcar palavras normais.
         // Adiciona \s ou ^ (início de linha) antes e \s ou $ (fim de linha) ou [)/] depois para contexto.
         // Considera também acentos e outros caracteres comuns em letras que não deveriam ser confundidos com acordes
         // A regex agora é mais flexível no separador entre o acorde principal e o baixo (aceita / ou -)
         const chordRegex = /(^|\s|\(|\[)((?:[A-G][#b]?)(?:m|maj|sus|add|dim|aug|alt)?(?:\d*)(?:(?:[\/\-]?)(?:[A-G][#b]?))?)($|\s|\)|\]|,|\.)/g;


         // Usamos uma função de substituição para reconstruir a string com os spans
         const htmlContent = content.replace(chordRegex, (match, p1, p2, p3) => {
              // p1 é o caractere ou espaço antes (ou início de linha)
              // p2 é o acorde reconhecido
              // p3 é o caractere ou espaço depois (ou fim de linha)
              // Envolve apenas o acorde (p2) no span
              return `${p1}<span class="chord" data-original-chord="${p2}">${p2}</span>${p3}`;
         });

         // Usa innerHTML para renderizar o conteúdo com os spans.
         // O <pre> mantém espaços e quebras de linha.
         readerTextArea.innerHTML = htmlContent;

          // Aplica a transposição atual (que foi carregada em openReader)
          // A transposição é aplicada APENAS aos spans recém-criados
           transposeCifra(0); // Aplica a transposição 'currentTranspose' que já está definida
     }

     // Retorna o texto da cifra como string simples, aplicando a transposição atual mas SEM os spans HTML
     function getPlainTransposedCifra() {
         if (!currentSong) return '';

         const originalContent = currentSong.content;
         const semitones = currentTranspose;
         const style = userSettings.transposeStyle;

          // Regex: Procura por acordes (a mesma usada para renderizar)
          const chordRegex = /(^|\s|\(|\[)((?:[A-G][#b]?)(?:m|maj|sus|add|dim|aug|alt)?(?:\d*)(?:(?:[\/\-]?)(?:[A-G][#b]?))?)($|\s|\)|\]|,|\.)/g;


         const plainTransposedContent = originalContent.replace(chordRegex, (match, p1, p2, p3) => {
              // p1 é o caractere ou espaço antes
              // p2 é o acorde reconhecido (original)
              // p3 é o caractere ou espaço depois

              // Transpõe apenas a parte do acorde (p2)
              const transposedChord = transposeChord(p2, semitones, style);

              // Reconstrói a string com o acorde transposto
              return `${p1}${transposedChord}${p3}`;
         });

         return plainTransposedContent;
     }


     // Transpõe a cifra exibida no leitor
     function transposeCifra(semitonesChange) {
          if (!currentSong) return;

          currentTranspose += semitonesChange;

          const transposeStyle = userSettings.transposeStyle;

          // Encontrar todos os spans com a classe 'chord' na *visão atual*
          const chordSpans = readerTextArea.querySelectorAll('.chord');

          chordSpans.forEach(span => {
               const originalChord = span.dataset.originalChord; // Usa o acorde original guardado
               if (originalChord) {
                    // Calcula o novo acorde transpondo o ORIGINAL pelo `currentTranspose` TOTAL
                    // Isso evita erros de acumulação se o usuário clica para cima e para baixo
                    const transposedChord = transposeChord(originalChord, currentTranspose, transposeStyle);
                    span.textContent = transposedChord; // Atualiza o texto visível
               }
          });

          updateTransposeIndicator(); // Atualiza ambos os indicadores

          // Salva a transposição para esta música
          setSongSetting(currentSong.id, 'transpose', currentTranspose);
     }

     // Função Lógica de Transposição de um Acorde (Aprimorada)
     function transposeChord(chord, semitones, style = 'sharps') {
         const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
         const notesFlat = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];

         const getNoteIndex = (note) => {
             let index = notes.indexOf(note);
             if (index === -1) { // Tenta com bemóis
                 index = notesFlat.indexOf(note);
             }
              if (index === -1) { // Nota não reconhecida (ex: 'H' em alemão, ou algo que não é nota)
                   return null; // Retorna null para indicar falha
              }
             return index;
         };

         const getNoteFromIndex = (index, stylePref) => {
             index = (index % 12 + 12) % 12; // Garante que o índice esteja entre 0 e 11

             // Prioriza o estilo do usuário
             if (stylePref === 'sharps') {
                 // Tenta usar o equivalente sustenido, exceto se a nota comum já existir nesse índice (C, D, E, F, G, A, B)
                 // Não, vamos simplificar e APENAS usar o array de sustenidos
                 return notes[index];
             } else { // Flats
                 // Tenta usar o equivalente bemol, exceto se a nota comum já existir nesse índice (C, D, E, F, G, A, B)
                 // Não, vamos simplificar e APENAS usar o array de bemóis
                 return notesFlat[index];
             }
         };

         // Regex para quebrar o acorde: (Raiz)(Sufixo/Tipo)(Baixo)
         // Captura a raiz (nota + opcional #/b), o que vier depois (sufixo), e opcionalmente /nota (baixo)
          // Esta regex é mais robusta para pegar sufixos e baixos que podem incluir #, b, /, -, etc.
         const chordMatch = chord.match(/^([A-G][#b]?)(.*?)(?:[\/\-]?([A-G][#b]?))?$/); // Aceita / ou - antes do baixo
         if (!chordMatch) {
             // console.warn("Formato de acorde não reconhecido para transposição:", chord);
             return chord; // Retorna o original se não conseguir analisar
         }

         let [, root, suffix, bassNote] = chordMatch; // bassNote agora contém apenas a nota do baixo

         // Transpõe a raiz
         let rootIndex = getNoteIndex(root);
         if (rootIndex === null) {
              // console.warn("Raiz do acorde não reconhecida:", root);
              return chord; // Retorna o original se a raiz não for válida
         }
         let newRootIndex = rootIndex + semitones;
         let newRoot = getNoteFromIndex(newRootIndex, style);

         // Transpõe o baixo, se existir
         let newBass = '';
         if (bassNote) {
              let bassIndex = getNoteIndex(bassNote);
               if (bassIndex !== null) {
                   let newBassIndex = bassIndex + semitones;
                   newBass = '/' + getNoteFromIndex(newBassIndex, style); // Usa / para o baixo transposto
               } else {
                    // console.warn("Baixo do acorde não reconhecido:", bassNote);
                    newBass = '/' + bassNote; // Mantém o baixo original se não reconhecido
               }
         }

         // Reconstrói o acorde transposto
         return newRoot + (suffix || '') + newBass;
     }


     // Atualiza o texto dos indicadores de transposição (sidebar e mobile)
     function updateTransposeIndicator() {
          let text;
          if (currentTranspose === 0) {
              text = 'Tom Original';
          } else if (currentTranspose > 0) {
              text = `Tom +${currentTranspose}`;
          } else { // currentTranspose < 0
               text = `Tom ${currentTranspose}`;
          }
          // Encontra e atualiza ambos os elementos (sidebar e mobile overlay)
          document.querySelectorAll('#current-transpose, #current-transpose-mobile').forEach(span => {
               span.textContent = text;
          });
     }

     // Reseta a transposição
     function resetTranspose() {
          if (currentTranspose !== 0) {
              // Transpõe de volta ao original (currentTranspose - currentTranspose)
              transposeCifra(-currentTranspose); // A função transposeCifra recalcula baseado no original + novo total
              // A variável currentTranspose é atualizada dentro de transposeCifra
              // updateTransposeIndicator é chamado dentro de transposeCifra
              // Salva o estado 0 para esta música
              if(currentSong) setSongSetting(currentSong.id, 'transpose', 0);
          }
     }

     // Atualiza o texto dos indicadores de tamanho da fonte (sidebar e mobile)
     function updateFontSizeIndicator() {
         const text = `${currentFontSize}px`;
         // Encontra e atualiza ambos os elementos (sidebar e mobile overlay)
         document.querySelectorAll('#current-font-size, #current-font-size-mobile').forEach(span => {
               span.textContent = text;
         });
     }

     // Função unificada para atualizar todos os inputs/spans de velocidade
     function updateReaderSpeedUI(speed) {
         // Garante que o valor esteja dentro do range válido pelo slider/input numérico
         const min = parseInt(document.querySelector('.slider').min); // Pega min/max de qualquer slider existente
         const max = parseInt(document.querySelector('.slider').max);
         let validatedSpeed = parseInt(speed);

         if (isNaN(validatedSpeed)) {
             validatedSpeed = currentScrollSpeed; // Volta para o último valor válido se for NaN
         } else {
             validatedSpeed = Math.max(min, Math.min(max, validatedSpeed));
         }

         currentScrollSpeed = validatedSpeed; // Atualiza a variável de estado interna

         // Atualiza sliders (sidebar e mobile)
         document.querySelectorAll('.slider').forEach(slider => slider.value = validatedSpeed);
         // Atualiza inputs numéricos (sidebar e mobile)
         document.querySelectorAll('.speed-number-input').forEach(input => input.value = validatedSpeed);
         // Atualiza spans (sidebar e mobile)
         document.querySelectorAll('#scroll-speed-value, #scroll-speed-value-mobile').forEach(span => span.textContent = validatedSpeed);
     }


     // Aplica/carrega configurações do leitor (chamada em openReader e settings change)
     function applyReaderSettings() {
         // Aplica tamanho da fonte (já carregado em openReader)
         readerTextArea.style.fontSize = `${currentFontSize}px`;
         updateFontSizeIndicator(); // Garante que a UI mostre o valor correto

         // Aplica velocidade de rolagem (já carregado em openReader)
         // A função updateReaderSpeedUI já atualiza os inputs/spans visíveis
         updateReaderSpeedUI(currentScrollSpeed);

         // Aplica estilo de transposição (# vs b) - a lógica transposeChord já usa userSettings.transposeStyle
         // A transposição é reaplicada em renderCifraWithChords ou transposeCifra após a mudança de setting

         // TODO: Aplicar cor dos acordes se configurável (via CSS var --chord-color)
     }

     // Atualiza tamanho da fonte no leitor
     function updateFontSize(change) {
          let newSize = currentFontSize + change;
          const minSize = parseInt(settingDefaultFontSize.min) || 10; // Pega min/max das settings, fallback para 10/40
          const maxSize = parseInt(settingDefaultFontSize.max) || 40;

          if (newSize >= minSize && newSize <= maxSize) {
               currentFontSize = newSize;
               readerTextArea.style.fontSize = `${currentFontSize}px`;
               updateFontSizeIndicator(); // Atualiza ambos os indicadores
               // Não salvamos o tamanho da fonte por música/globalmente no local storage neste exemplo,
               // apenas usamos o default das settings e o ajustamos temporariamente na sessão do reader.
               // Se precisar persistir, adicione saveUserSettings() ou setSongSetting() aqui.
          }
     }

     // --- Funções de Rolagem Automática ---

    function startScrolling() {
        if (isScrolling) return;

        isScrolling = true;
        // Atualiza ícones de play/pause em AMBOS os botões (sidebar e mobile)
        document.querySelectorAll('#scroll-toggle i, #scroll-toggle-mobile i').forEach(icon => {
             icon.className = 'fas fa-pause';
        });

        // Calcula o passo de rolagem baseado na velocidade atual e na constante base
        // Velocidades maiores resultam em passos maiores (rolagem mais rápida)
        const scrollStep = currentScrollSpeed * SCROLL_BASE_STEP;

         const scroll = () => {
             // Verifica se a rolagem chegou ao fim (ou muito perto)
             // readerContentArea.scrollHeight: Altura total do conteúdo
             // readerContentArea.clientHeight: Altura visível da área
             // readerContentArea.scrollTop: Posição atual do scroll
             // Se (posição atual + altura visível) >= altura total, estamos no fim.
             // Subtraímos 1 ou 2 para margem de erro em alguns navegadores.
             if (readerContentArea.scrollTop + readerContentArea.clientHeight >= readerContentArea.scrollHeight - 2) {
                 stopScrolling(); // Para ao chegar ao fim
                 return;
             }

             readerContentArea.scrollTop += scrollStep; // Incrementa a rolagem

             // Continua a rolagem no próximo frame de animação
             scrollAnimationFrameId = requestAnimationFrame(scroll);
         };

         scroll(); // Inicia o loop de rolagem
    }

    function stopScrolling() {
        if (!isScrolling) return;

        isScrolling = false;
         // Atualiza ícones de play/pause em AMBOS os botões (sidebar e mobile)
        document.querySelectorAll('#scroll-toggle i, #scroll-toggle-mobile i').forEach(icon => {
            icon.className = 'fas fa-play';
        });
        cancelAnimationFrame(scrollAnimationFrameId); // Cancela o loop de animação
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
         readerContentArea.scrollTop = 0; // Volta ao topo
    }

     // Função para salvar a velocidade de rolagem atual para a música aberta
     function saveCurrentSongSpeed() {
          if (currentSong) {
               setSongSetting(currentSong.id, 'scrollSpeed', currentScrollSpeed);
               alert(`Velocidade ${currentScrollSpeed} salva para "${currentSong.title}".`);
               console.log(`Velocidade ${currentScrollSpeed} salva para música ${currentSong.id}.`, songSettings);
          } else {
               console.warn("Nenhuma música aberta para salvar a velocidade.");
          }
     }


     // --- Função de Download ---
     function downloadCurrentSong() {
         if (!currentSong) {
             alert('Nenhuma cifra aberta para download.');
             return;
         }

         // Obtém o texto da cifra com a transposição aplicada (sem HTML)
         const transposedText = getPlainTransposedCifra();

         // Cria um Blob com o texto
         const blob = new Blob([transposedText], { type: 'text/plain;charset=utf-8' });

         // Cria um link temporário para download
         const link = document.createElement('a');
         link.href = URL.createObjectURL(blob);

         // Define o nome do arquivo
         let filename = `${currentSong.title || 'Cifra'}`;
         if (currentSong.artist && currentSong.artist !== 'Artista Desconhecido') {
              filename = `${currentSong.artist} - ${filename}`;
         }
          // Adiciona o tom transposto ao nome do arquivo, se houver transposição
          if (currentTranspose !== 0) {
               const noteNamesSharps = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
               const noteNamesFlats = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];
               const noteNames = userSettings.transposeStyle === 'sharps' ? noteNamesSharps : noteNamesFlats;

               // Tenta encontrar a primeira nota do acorde original para calcular o tom atual
               const originalRootMatch = currentSong.content.match(/(?:^|\s|\(|\[)([A-G][#b]?)/);
               let originalRoot = originalRootMatch ? originalRootMatch[1] : null;
               let currentRoot = originalRoot ? transposeChord(originalRoot, currentTranspose, userSettings.transposeStyle) : null;

              if (currentRoot) {
                    filename += ` (${currentRoot})`;
              } else {
                    filename += ` (Tom ${currentTranspose > 0 ? '+' : ''}${currentTranspose})`;
              }
          }
         filename += '.txt'; // Extensão
         link.download = filename;

         // Adiciona o link ao DOM, clica nele e remove
         document.body.appendChild(link);
         link.click();
         document.body.removeChild(link);

         // Libera o URL temporário
         URL.revokeObjectURL(link.href);
     }


     // --- API WakeLock (Manter Tela Ligada) ---
    async function requestWakeLock() {
        // Só tenta se a setting estiver ativada E a API for suportada
        if (!userSettings.wakelockEnabled || !('wakeLock' in navigator)) {
             console.log("Wake Lock desativado nas configurações ou não suportado.");
             return;
        }
         // Só tenta se estiver na tela do reader
         if (currentScreen !== 'reader') {
              console.log("Wake Lock só é ativado na tela do leitor.");
              return;
         }

        try {
            wakeLock = await navigator.wakeLock.request('screen');
            console.log('Wake Lock ativo!');
            wakeLock.addEventListener('release', () => {
                console.log('Wake Lock foi liberado');
                 wakeLock = null; // Limpa a referência quando liberado pelo sistema
            });
        } catch (err) {
            console.error('Erro ao ativar Wake Lock:', err);
             // Informar o usuário que pode precisar permitir nas configs do navegador
             // Ou desativar a setting se não for suportado.
        }
    }

    function releaseWakeLock() {
        if (wakeLock) {
            wakeLock.release(); // Libera explicitamente
            // O 'release' event listener acima também setará wakeLock = null
            console.log('Wake Lock liberado explicitamente.');
        }
    }

     // Tenta reativar o wakelock se a tela ficar visível novamente
     // Útil se o usuário troca de app e volta. O SO pode liberar o wakelock em segundo plano.
     document.addEventListener('visibilitychange', async () => {
          if (document.visibilityState === 'visible' && currentScreen === 'reader' && userSettings.wakelockEnabled) {
               await requestWakeLock(); // Tenta re-ativar se estiver no reader e a setting estiver ligada
          } else {
               // Se a tela ficou invisível (ou saímos do reader), garante a liberação
               if (wakeLock) {
                   releaseWakeLock();
               }
          }
     });


    // --- Funções de Modal Específicas ---

    // Função para abrir modal de upload
    function openUploadModal() {
         uploadFileListDiv.innerHTML = ''; // Limpa lista anterior
         uploadFileInput.value = null; // Reseta o input file
         confirmUploadButton.disabled = true; // Desabilita o botão de upload inicialmente

         // Adiciona mensagem padrão
         const initialMessage = document.createElement('p');
         initialMessage.style.textAlign = 'center';
         initialMessage.style.color = 'var(--text-secondary)';
         initialMessage.textContent = 'Selecione arquivos TXT para upload.';
         uploadFileListDiv.appendChild(initialMessage);

         showModal(uploadModal);
    }

     // Lida com seleção de arquivos no input de upload
     function handleFileSelect(event) {
          uploadFileListDiv.innerHTML = ''; // Limpa lista atual
          const files = Array.from(event.target.files); // Converte FileList para Array

          if (files.length === 0) {
               confirmUploadButton.disabled = true;
               const message = document.createElement('p');
               message.style.textAlign = 'center';
               message.style.color = 'var(--text-secondary)';
               message.textContent = 'Selecione arquivos TXT para upload.';
               uploadFileListDiv.appendChild(message);
               return;
          }

          // Filtra apenas arquivos .txt
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

          confirmUploadButton.disabled = false; // Habilita o botão se houver TXTs

           // Adiciona um campo "Selecionados" para dar feedback
           const selectedCountP = document.createElement('p');
           selectedCountP.style.textAlign = 'center';
           selectedCountP.style.color = 'var(--text-secondary)';
           selectedCountP.textContent = `${txtFiles.length} arquivo(s) TXT selecionado(s):`;
           uploadFileListDiv.appendChild(selectedCountP);


          txtFiles.forEach((file, i) => {
               const fileItemDiv = document.createElement('div');
               fileItemDiv.classList.add('upload-file-item');
               // Sugere Título e Artista baseado no nome do arquivo (tenta "Artista - Titulo.txt")
               const suggestedName = file.name.replace(/\.txt$/i, '').split(' - ');
               const suggestedArtist = suggestedName.length > 1 ? suggestedName[0].trim() : '';
               const suggestedTitle = suggestedName.length > 1 ? suggestedName.slice(1).join(' - ').trim() : suggestedName[0].trim(); // Junta o resto

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

     // Simula o processo de upload (NO BACKEND REAL, ISTO FARIA REQUISIÇÕES HTTP)
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


          // Desabilita o botão para evitar cliques múltiplos
          confirmUploadButton.disabled = true;
          confirmUploadButton.textContent = 'Enviando...'; // Feedback visual

          // Use FileReader para ler o conteúdo dos arquivos selecionados no frontend
          let filesReadCount = 0;
          const totalFiles = fileItems.length;
           const uploadedSongsInfo = []; // Para o feedback final

          fileItems.forEach(item => {
               const fileName = item.querySelector('.upload-file-name').value;
               const titleInput = item.querySelector('input[id^="upload-title"]');
               const artistInput = item.querySelector('input[id^="upload-artist"]');

               const title = titleInput.value.trim() || 'Título Desconhecido'; // Garantir que não fique vazio
               const artist = artistInput.value.trim() || 'Artista Desconhecido';

               // Encontra o objeto File real a partir do nome do arquivo no input[type="file"] original
               const file = Array.from(uploadFileInput.files).find(f => f.name === fileName);

               if (file) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                         filesToProcess.push({
                              fileName: fileName,
                              title: title,
                              artist: artist,
                              content: e.target.result // Conteúdo do arquivo lido
                         });
                         filesReadCount++;
                         if (filesReadCount === totalFiles) {
                              // Todos os arquivos foram lidos, agora simula o "upload" para os dados locais
                              console.log("Simulando upload para os dados locais:", filesToProcess);

                              filesToProcess.forEach(fileInfo => {
                                   const newSong = {
                                        id: 's' + (Date.now() + Math.random()).toFixed(0), // ID único simples baseado em timestamp
                                        title: fileInfo.title,
                                        artist: fileInfo.artist,
                                        content: fileInfo.content
                                   };
                                   allSongs.push(newSong);
                                    uploadedSongsInfo.push(`${newSong.title} - ${newSong.artist}`);

                                    // Inicializa settings para a nova música
                                   songSettings[newSong.id] = {
                                        scrollSpeed: null, // Padrão: usar o default do usuário
                                         transpose: 0 // Padrão: tom original
                                   };

                                   console.log(`Cifra "${newSong.title}" adicionada (simulado).`);
                               });

                               saveSongSettings(); // Salva as novas settings das músicas

                              renderLibrary(); // Atualiza a lista da biblioteca
                              hideModal();

                               const successMessage = uploadedSongsInfo.length === totalFiles
                                   ? `${totalFiles} arquivo(s) simuladamente enviados e adicionados!`
                                   : `Upload simulado concluído com alguns erros de leitura. ${uploadedSongsInfo.length} música(s) adicionada(s).`;
                              alert(successMessage);

                              confirmUploadButton.disabled = false;
                              confirmUploadButton.textContent = 'Upload';

                              // TODO: Em um app real, enviar `filesToProcess` (ou o FormData original) para o backend aqui
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
                              renderLibrary(); // Atualiza com o que deu para adicionar
                         }
                    };
                    reader.readAsText(file); // Lê o conteúdo como texto
               } else {
                    console.warn(`Arquivo "${fileName}" não encontrado na lista de arquivos selecionados do input original.`);
                    filesReadCount++;
                    if (filesReadCount === totalFiles) {
                         confirmUploadButton.disabled = false;
                         confirmUploadButton.textContent = 'Upload';
                          hideModal();
                         alert("Ocorreu um erro ao processar alguns arquivos (arquivos não encontrados). Verifique o console.");
                          renderLibrary(); // Atualiza com o que deu para adicionar
                    }
               }
          });
     }


     // Função para abrir modal de adicionar música ao evento
    function openAddSongToEventModal() {
         if (!currentEvent) return; // Precisa ter um evento ativo

         addSongLibraryList.innerHTML = '';
         addSongSearchInput.value = '';
         confirmAddSongButton.disabled = true;

         // Renderiza a biblioteca no modal com checkboxes
         allSongs.forEach(song => {
              // Não adiciona músicas que já estão no evento atual
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
               // Adiciona listener para habilitar/desabilitar botão "Adicionar"
               const checkbox = li.querySelector('input[type="checkbox]');
               checkbox.addEventListener('change', updateAddSongButtonState);
               // Permite clicar em qualquer parte do LI para marcar/desmarcar o checkbox
               li.addEventListener('click', (event) => {
                   // Evita que o clique no próprio checkbox ative o LI também, criando loop
                   if (event.target !== checkbox) {
                       checkbox.checked = !checkbox.checked;
                        // Dispara o evento change manualmente para que o listener do botão seja chamado
                        checkbox.dispatchEvent(new Event('change'));
                   }
               });
              addSongLibraryList.appendChild(li);
         });

         showModal(addSongToEventModal);
    }

     // Atualiza o estado do botão "Adicionar" no modal de adicionar música
     function updateAddSongButtonState() {
          const selectedCount = addSongLibraryList.querySelectorAll('input[type="checkbox"]:checked').length;
          confirmAddSongButton.disabled = selectedCount === 0;
     }

     // Lida com a confirmação no modal de adicionar música
     function confirmAddSongToEvent() {
         if (!currentEvent) return; // Precisa ter um evento ativo

         const selectedSongs = addSongLibraryList.querySelectorAll('input[type="checkbox"]:checked');
         const songIdsToAdd = Array.from(selectedSongs).map(cb => cb.dataset.songId);

         if (songIdsToAdd.length === 0) {
              // O botão Confirmar já estaria desabilitado, mas é bom ter a validação
              alert('Selecione pelo menos uma música.');
              return;
         }

         // TODO: Chamar API do backend para adicionar músicas ao evento
         console.log(`Simulando: Adicionar músicas ${songIdsToAdd} ao evento ${currentEvent.id}`);

         // SIMULAÇÃO: Adicionar ao array local do evento
         currentEvent.songIds = [...currentEvent.songIds, ...songIdsToAdd];
          // Remove duplicados (garante que não adiciona a mesma música duas vezes)
          currentEvent.songIds = [...new Set(currentEvent.songIds)];

         // TODO: Em um app real, salvar o evento modificado no backend (API PUT/PATCH no evento)

         renderEventSongs(currentEvent); // Re-renderiza a lista de músicas do evento
         hideModal();
         alert(`${songIdsToAdd.length} música(s) simuladamente adicionadas ao ensaio.`);
         // TODO: Atualizar a lista de eventos principal também se necessário (para contagem de músicas)
         renderEvents(); // Re-renderiza a lista principal para atualizar a contagem
     }

     // Remove música do evento (simulado)
     function removeSongFromEvent(eventId, songId) {
          const event = allEvents.find(e => e.id === eventId);
          if (event) {
               // Confirmação antes de remover
               const songToRemove = allSongs.find(s => s.id === songId);
               const songTitle = songToRemove ? songToRemove.title : 'esta música';
               if (!confirm(`Tem certeza que deseja remover "${songTitle}" deste ensaio?`)) {
                    return; // Sai se cancelar
               }

               event.songIds = event.songIds.filter(id => id !== songId);
               // TODO: Em um app real, salvar o evento modificado no backend (API PUT/PATCH no evento)
               renderEventSongs(event); // Re-renderiza a lista de músicas do evento
               renderEvents(); // Re-renderiza a lista principal para atualizar a contagem
               alert(`Música removida do ensaio (simulado).`);
          }
     }


     // Função para abrir modal de criar/editar evento
     function openEventFormModal(eventToEdit = null) {
          eventFormTitle.textContent = eventToEdit ? 'Editar Ensaio' : 'Novo Ensaio';
          eventNameInput.value = eventToEdit ? eventToEdit.name : '';
          // Formata a data para YYYY-MM-DD para preencher o input[type="date"]
          eventDateInput.value = eventToEdit ? eventToEdit.date : '';
          saveEventFormButton.dataset.eventId = eventToEdit ? eventToEdit.id : ''; // Guarda o ID para editar

          showModal(eventFormModal);
     }

     // Lida com o salvamento do formulário de evento (simulado)
     function saveEventForm() {
          const eventId = saveEventFormButton.dataset.eventId;
          const name = eventNameInput.value.trim();
          const date = eventDateInput.value; // Formato YYYY-MM-DD

          if (!name || !date) {
               alert('Por favor, preencha o nome e a data do ensaio.');
               return;
          }

          if (eventId) {
               // Editar Evento
               // TODO: Chamar API do backend para editar evento (API PUT/PATCH no evento)
               console.log(`Simulando: Editando evento ${eventId}`);
               const eventIndex = allEvents.findIndex(e => e.id === eventId);
               if (eventIndex !== -1) {
                    allEvents[eventIndex].name = name;
                    allEvents[eventIndex].date = date;
                    console.log(`Evento ${eventId} editado (simulado).`);
               }
                // Se estivermos na tela de detalhes do evento editado, re-renderizar
               if (currentEvent && currentEvent.id === eventId) {
                   // Atualiza currentEvent com os novos dados
                    currentEvent = allEvents[eventIndex];
                    openEventDetail(currentEvent.id); // Reabre o detalhe com dados atualizados
               }

          } else {
               // Novo Evento
               // TODO: Chamar API do backend para criar evento (API POST em /events)
                const newEvent = {
                    id: 'e' + (Date.now() + Math.random()).toFixed(0), // ID único simples
                    name: name,
                    date: date,
                    songIds: [] // Começa vazio
                };
                allEvents.push(newEvent);
                console.log("Novo evento criado (simulado):", newEvent);
          }

          renderEvents(); // Atualiza a lista de ensaios principal
          hideModal();
          alert(`Ensaio ${eventId ? 'editado' : 'criado'} com sucesso (simulado)!`);
     }

     // Lida com a exclusão do evento (simulado)
     function deleteEvent(eventId) {
          const eventToDelete = allEvents.find(e => e.id === eventId);
           const eventName = eventToDelete ? eventToDelete.name : 'este ensaio';
          if (confirm(`Tem certeza que deseja excluir ${eventName}? Esta ação não pode ser desfeita.`)) {
               // TODO: Chamar API do backend para excluir evento (API DELETE em /events/{id})
               console.log(`Simulando: Excluindo evento ${eventId}`);
               allEvents = allEvents.filter(event => event.id !== eventId); // Remove do array local
               console.log(`Evento ${eventId} excluído (simulado).`);
               renderEvents(); // Atualiza a lista de ensaios
               showScreen('main-app'); // Volta para a tela principal
               showScreenPage('events-screen-content'); // Volta para a lista de eventos
               mainHeaderTitle.textContent = 'Ensaios';
               alert('Ensaio excluído (simulado).');
               currentEvent = null; // Garante que não há evento "ativo" excluído
          }
     }


    // --- Inicialização e Event Listeners ---

    function initializeApp() {
        // Carrega as configurações do usuário e das músicas do local storage
        // Já feito na declaração das variáveis userSettings e songSettings

        // Aplica o tema salvo ao carregar
        applyTheme(userSettings.theme); // Já chama saveUserSettings dentro

        // Tenta logar automaticamente (se tiver credenciais salvas? Ou sempre mostra login?)
        // Por enquanto, sempre mostra a tela de login primeiro
        showScreen('login-screen');

        // Carrega os dados simulados (ou reais via API)
        loadAppData(); // Carrega biblioteca e ensaios simulados (e associa settings de músicas)

        // Aplica configurações iniciais do leitor (para os inputs nas settings)
        settingWakelock.checked = userSettings.wakelockEnabled;
        settingDefaultFontSize.value = userSettings.defaultFontSize;
        settingDefaultScrollSpeed.value = userSettings.defaultScrollSpeed;
        settingTransposeStyle.value = userSettings.transposeStyle;

        // Dispara o evento resize uma vez na inicialização
        // Isso garante que o layout responsivo do reader seja aplicado corretamente ao carregar a página
         window.dispatchEvent(new Event('resize'));
    }

    // Listeners de Login
    loginButton.addEventListener('click', () => {
        const user = usernameInput.value;
        const pass = passwordInput.value;

        // TODO: Chamar API do backend para autenticação real
        console.log(`Tentativa de login: User='${user}', Pass='${pass}'`);

        // Simulação de login bem-sucedido com qualquer valor preenchido
        if (user && pass) {
            loggedIn = true;
            loginErrorMessage.textContent = '';
            // TODO: Redirecionar APÓS autenticação bem-sucedida do backend
            showScreen('main-app');
            showScreenPage('library-screen-content'); // Mostra a biblioteca por padrão após login
        } else {
            loginErrorMessage.textContent = 'Por favor, insira usuário e senha.';
        }
    });

    // Permite login com Enter
    passwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            loginButton.click();
        }
    });


    // Listeners do Header Principal
    menuToggleButton.addEventListener('click', showNavMenu);
    settingsButton.addEventListener('click', () => {
         hideNavMenu();
         showScreen('main-app');
         showScreenPage('settings-screen-content');
         mainHeaderTitle.textContent = 'Configurações';
    });
     themeToggleButtonHeader.addEventListener('click', () => {
          const newTheme = userSettings.theme === 'light' ? 'dark' : 'light';
          applyTheme(newTheme); // applyTheme já atualiza userSettings e salva
     });


    // Listeners do Menu de Navegação
    closeMenuButton.addEventListener('click', hideNavMenu);
    navMenuOverlay.addEventListener('click', hideNavMenu);
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetScreen = e.target.dataset.screen;
            if (targetScreen) {
                 showScreen('main-app'); // Navega para a tela principal
                 showScreenPage(`${targetScreen}-screen-content`); // Mostra a página correta dentro dela
                 hideNavMenu(); // Esconde o menu após a navegação
            }
        });
    });
     logoutLink.addEventListener('click', (e) => {
          e.preventDefault();
          if (confirm('Deseja realmente sair?')) {
               // TODO: Chamar API do backend para logout real
               loggedIn = false;
               // Limpar dados sensíveis da sessão (se houver)
               // Redirecionar para a tela de login
               showScreen('login-screen');
               alert('Logout realizado (simulado).'); // Feedback visual
          }
     });


    // Listeners da Biblioteca
    songSearchInput.addEventListener('input', (e) => {
        renderLibrary(e.target.value); // Filtra a biblioteca ao digitar
    });
    fabAddSong.addEventListener('click', openUploadModal); // Abre modal de upload


    // Listeners do Modal de Upload
    cancelUploadButton.addEventListener('click', hideModal); // Fecha modal
    uploadFileInput.addEventListener('change', handleFileSelect); // Processa arquivos selecionados
    confirmUploadButton.addEventListener('click', simulateUpload); // Inicia upload simulado


    // Listeners dos Ensaios
     addEventButton.addEventListener('click', () => openEventFormModal()); // Abre modal para criar novo evento
     backToEventsButton.addEventListener('click', () => { // Botão Voltar do detalhe do evento
         showScreen('main-app');
         showScreenPage('events-screen-content'); // Volta para a lista de eventos
         mainHeaderTitle.textContent = 'Ensaios'; // Atualiza título
     });
     addSongToEventButton.addEventListener('click', openAddSongToEventModal); // Abre modal para adicionar músicas ao evento
      editEventButton.addEventListener('click', () => { // Botão Editar evento (no detalhe)
           if (currentEvent) openEventFormModal(currentEvent); // Abre modal pré-preenchido
      });
      deleteEventButton.addEventListener('click', () => { // Botão Excluir evento (no detalhe)
           if (currentEvent) deleteEvent(currentEvent.id); // Chama função de exclusão
      });


     // Listeners do Modal de Add Song to Event
     cancelAddSongButton.addEventListener('click', hideModal); // Fecha modal
     confirmAddSongButton.addEventListener('click', confirmAddSongToEvent); // Adiciona músicas selecionadas ao evento
     addSongSearchInput.addEventListener('input', (e) => {
          // Implementar filtro na lista do modal add song
          const filter = e.target.value.toLowerCase();
          addSongLibraryList.querySelectorAll('li').forEach(li => {
              const songInfo = li.querySelector('.song-info');
              const songTitle = songInfo.querySelector('h3').textContent.toLowerCase();
              const songArtist = songInfo.querySelector('p').textContent.toLowerCase();
              // Exibe o item se o título ou artista contiver o filtro
              if (songTitle.includes(filter) || songArtist.includes(filter)) {
                  li.style.display = 'flex'; // Usa flex pois o li tem display: flex
              } else {
                  li.style.display = 'none';
              }
          });
     });


     // Listeners do Modal de Event Form
     cancelEventFormButton.addEventListener('click', hideModal); // Fecha modal
     saveEventFormButton.addEventListener('click', saveEventForm); // Salva (cria ou edita) o evento


    // Listeners do Leitor
    readerBackButton.addEventListener('click', () => {
        stopScrolling(); // Garante que a rolagem para ao sair
         releaseWakeLock(); // Libera o wakelock
        // Lógica para voltar para a tela correta (Biblioteca ou Detalhes do Evento)
        // Por simplicidade, volta para a última page ativa dentro de main-app, default Biblioteca
        hideReaderControlsMobile(); // Garante que o overlay mobile esteja fechado ao sair
        showScreen('main-app');
        // Tenta encontrar qual página estava ativa antes de ir para o reader
        // Melhorando a lógica de retorno: Se currentEvent não é null, significa que viemos do detalhe do evento.
         if (currentEvent) {
             openEventDetail(currentEvent.id); // Volta para o detalhe do evento específico
             // Não precisa chamar showScreenPage, openEventDetail já faz isso
         } else {
             // Se currentEvent é null, viemos da biblioteca (ou outra tela que não é detalhe de evento)
            showScreenPage('library-screen-content'); // Volta para a biblioteca
             mainHeaderTitle.textContent = 'Biblioteca'; // Atualiza título
         }
         // Limpa currentEvent ao sair da tela de detalhes do evento (já feito em deleteEvent, mas útil aqui também)
         if (currentEvent && currentScreen !== 'event-detail') {
             currentEvent = null;
         }
    });

     // Listeners do Toggle de Controles Mobile
     readerControlsToggleMobileButton.addEventListener('click', showReaderControlsMobile); // Abre o overlay mobile
     closeReaderControlsMobileButton.addEventListener('click', hideReaderControlsMobile); // Fecha o overlay mobile

     // Listeners dos Controles do Leitor (Sincronizados entre Sidebar e Mobile)

     // Função para atualizar slider, input numérico e span baseada em um valor de velocidade
     function handleSpeedChange(speed) {
         // Garante que o valor é um número inteiro válido dentro do range
         const min = parseInt(document.querySelector('.slider').min); // Pega min/max de qualquer slider existente
         const max = parseInt(document.querySelector('.slider').max);
         let validatedSpeed = parseInt(speed);

         if (isNaN(validatedSpeed)) {
             validatedSpeed = currentScrollSpeed; // Volta para o último valor válido se for NaN
         } else {
             validatedSpeed = Math.max(min, Math.min(max, validatedSpeed));
         }

         currentScrollSpeed = validatedSpeed; // Atualiza a variável de estado interna

         // Atualiza sliders (sidebar e mobile)
         document.querySelectorAll('.slider').forEach(slider => slider.value = validatedSpeed);
         // Atualiza inputs numéricos (sidebar e mobile)
         document.querySelectorAll('.speed-number-input').forEach(input => input.value = validatedSpeed);
         // Atualiza spans (sidebar e mobile)
         document.querySelectorAll('#scroll-speed-value, #scroll-speed-value-mobile').forEach(span => span.textContent = validatedSpeed);
     }


     // Rolagem (Sliders e Input Numérico) - Listeners adicionados a AMBOS os elementos de sidebar e mobile overlay
    document.querySelectorAll('#scroll-toggle, #scroll-toggle-mobile').forEach(btn => btn.addEventListener('click', toggleScrolling));
     document.querySelectorAll('#scroll-speed-slider, #scroll-speed-slider-mobile').forEach(slider => {
         slider.addEventListener('input', (e) => {
             handleSpeedChange(parseInt(e.target.value));
             // Parar rolagem ao ajustar a velocidade com o slider para evitar saltos
             if (isScrolling) stopScrolling();
         });
     });
     document.querySelectorAll('#scroll-speed-number-input, #scroll-speed-number-input-mobile').forEach(input => {
          input.addEventListener('input', (e) => {
               // Permite input em tempo real, mas valida no 'change' para NaN/range
               handleSpeedChange(parseInt(e.target.value));
          });
          input.addEventListener('change', (e) => {
               // Re-valida no change para garantir valor correto e atualizar currentScrollSpeed
               handleSpeedChange(parseInt(e.target.value));
               // Parar rolagem ao ajustar a velocidade com o input number
               if (isScrolling) stopScrolling();
          });
     });

     document.querySelectorAll('#scroll-reset, #scroll-reset-mobile').forEach(btn => btn.addEventListener('click', resetScrolling));

     // Salvar Velocidade por Música - Listeners adicionados a AMBOS os botões
     document.querySelectorAll('#save-song-speed-button, #save-song-speed-button-mobile').forEach(btn => btn.addEventListener('click', saveCurrentSongSpeed));


     // Transposição - Listeners adicionados a AMBOS os botões
     document.querySelectorAll('#transpose-down, #transpose-down-mobile').forEach(btn => btn.addEventListener('click', () => transposeCifra(-1)));
     document.querySelectorAll('#transpose-up, #transpose-up-mobile').forEach(btn => btn.addEventListener('click', () => transposeCifra(1)));
     document.querySelectorAll('#transpose-reset, #transpose-reset-mobile').forEach(btn => btn.addEventListener('click', resetTranspose));

     // Tamanho da Fonte - Listeners adicionados a AMBOS os botões
     document.querySelectorAll('#font-size-down, #font-size-down-mobile').forEach(btn => btn.addEventListener('click', () => updateFontSize(-1)));
     document.querySelectorAll('#font-size-up, #font-size-up-mobile').forEach(btn => btn.addEventListener('click', () => updateFontSize(1)));

     // Toggle Tema no Leitor - Listeners adicionados a AMBOS os botões
     document.querySelectorAll('#reader-theme-toggle, #reader-theme-toggle-mobile').forEach(btn => {
         btn.addEventListener('click', () => {
             const newTheme = userSettings.theme === 'light' ? 'dark' : 'light';
             applyTheme(newTheme); // applyTheme já atualiza userSettings e salva
         });
     });

     // Download - Listeners adicionados a AMBOS os botões
     document.querySelectorAll('#download-song-button, #download-song-button-mobile').forEach(btn => btn.addEventListener('click', downloadCurrentSong));


    // Listeners das Configurações
     settingsThemeToggle.addEventListener('click', () => {
          const newTheme = userSettings.theme === 'light' ? 'dark' : 'light';
          applyTheme(newTheme); // applyTheme já atualiza userSettings e salva
     });
     settingWakelock.addEventListener('change', (e) => {
         userSettings.wakelockEnabled = e.target.checked;
         saveUserSettings(); // Salva a setting imediatamente
          if (userSettings.wakelockEnabled) {
               console.log("Manter Tela Ligada ativado. Pode requerer permissão do navegador.");
               // Se o leitor estiver aberto, tentar ativar agora
                if (currentScreen === 'reader') {
                    requestWakeLock();
                }
          } else {
               console.log("Manter Tela Ligada desativado.");
               // Se o leitor estiver aberto, liberar agora
                if (currentScreen === 'reader') {
                    releaseWakeLock();
                }
          }
     });
     settingDefaultFontSize.addEventListener('change', (e) => {
         const size = parseInt(e.target.value);
          const minSize = parseInt(e.target.min) || 10; // Pega min/max do input, fallback para 10/40
          const maxSize = parseInt(e.target.max) || 40;

          if (!isNaN(size) && size >= minSize && size <= maxSize) {
               userSettings.defaultFontSize = size;
               saveUserSettings(); // Salva a setting imediatamente
               console.log("Tamanho da fonte padrão salvo:", size);
               // Se o leitor estiver aberto E a música atual não tiver um tamanho de fonte salvo (ainda não implementado persistência por música para fonte),
               // atualizar a fonte atual para o novo padrão.
               // Para simplificar, vamos apenas atualizar o reader *visualmente* se ele estiver aberto,
               // mas a próxima vez que o reader abrir, ele pegará o default salvo.
                if (currentScreen === 'reader' && currentSong) {
                    // Note: Não estamos salvando font size por música neste exemplo, apenas o default.
                    // A lógica `updateFontSize` afeta a sessão atual no reader.
                    // Se o usuário muda o DEFAULT nas settings, queremos que isso se reflita no reader atual.
                    currentFontSize = size; // Atualiza a variável de estado do reader
                    readerTextArea.style.fontSize = `${currentFontSize}px`;
                    updateFontSizeIndicator(); // Atualiza a UI do reader
                } else {
                     // Se não estiver no reader, apenas garante que a variável local do script reflete o default
                      currentFontSize = userSettings.defaultFontSize; // Deve ser sempre igual a userSettings.defaultFontSize fora do reader
                }
          } else {
              alert(`Tamanho da fonte deve ser um número entre ${minSize} e ${maxSize}.`);
              e.target.value = userSettings.defaultFontSize; // Reverte para o valor salvo
          }
     });
     settingDefaultScrollSpeed.addEventListener('change', (e) => {
          const speed = parseInt(e.target.value);
          const minSpeed = parseInt(e.target.min) || 1; // Pega min/max do input, fallback para 1/20
          const maxSpeed = parseInt(e.target.max) || 20;

           if (!isNaN(speed) && speed >= minSpeed && speed <= maxSpeed) {
               userSettings.defaultScrollSpeed = speed;
               saveUserSettings(); // Salva a setting imediatamente
               console.log("Velocidade de rolagem padrão salva:", speed);
                // Se o leitor estiver aberto e a música atual não tiver velocidade salva *por música*,
                // atualizar a velocidade atual para o novo padrão.
                // A função `handleSpeedChange` já faz a validação e atualização da UI e da variável `currentScrollSpeed`.
                if (currentScreen === 'reader' && currentSong) {
                    const songSavedSpeed = getSongSetting(currentSong.id, 'scrollSpeed', null);
                     if (songSavedSpeed === null) { // Se a música não tem velocidade salva, usa o novo default
                         handleSpeedChange(speed); // Atualiza UI e currentScrollSpeed
                     }
                } else {
                     // Se não estiver no reader, apenas garante que a variável local do script reflete o default
                      currentScrollSpeed = userSettings.defaultScrollSpeed; // Deve ser sempre igual a userSettings.defaultScrollSpeed fora do reader
                }
           } else {
                alert(`Velocidade da rolagem deve ser um número entre ${minSpeed} e ${maxSpeed}.`);
                e.target.value = userSettings.defaultScrollSpeed; // Reverte para o valor salvo
           }
     });
     settingTransposeStyle.addEventListener('change', (e) => {
         userSettings.transposeStyle = e.target.value;
         saveUserSettings(); // Salva a setting imediatamente
          console.log("Estilo de transposição salvo:", userSettings.transposeStyle);
          // Se estiver no leitor, re-transpor a cifra atual com o novo estilo
          if (currentScreen === 'reader' && currentSong) {
               // Re-renderiza a cifra e aplica a transposição TOTAL atual com o novo estilo
               // A função renderCifraWithChords chamará transposeCifra(0) que aplicará currentTranspose com o novo style
               renderCifraWithChords(currentSong.content); // Re-renderiza o HTML (limpa spans, recria)
               // transposeCifra(0); // Chamado dentro de renderCifraWithChords agora
          }
     });
     resetSettingsButton.addEventListener('click', () => {
          if (confirm('Tem certeza que deseja resetar todas as configurações para o padrão? Isso inclui tema, wakelock, fontes, rolagem e estilo de transposição. Configurações por música também serão removidas.')) {
               // Resetar variáveis de estado para padrões
               userSettings = {
                   theme: 'light',
                   defaultFontSize: 16,
                   defaultScrollSpeed: 5, // Valor padrão alterado
                   transposeStyle: 'sharps',
                   wakelockEnabled: false
               };
                // Resetar configurações das músicas (velocidade, transposição, etc.)
               songSettings = {}; // Objeto vazio

               saveUserSettings(); // Salva user settings padrão
               saveSongSettings(); // Salva song settings vazias

               // Aplicar os padrões visuais (tema)
               applyTheme(userSettings.theme);

               // Aplicar configurações do leitor (se o reader estiver aberto)
               if (currentScreen === 'reader') {
                   // Ao resetar as settings, queremos que o reader volte para os novos padrões default.
                   // A maneira mais fácil é "reabrir" a música, o que carregará os novos defaults (speed=null, transpose=0)
                   if(currentSong) {
                       // openReader já carrega a velocidade salva (que será null) ou o default do usuário,
                       // e a transposição salva (que será 0)
                       openReader(currentSong.id);
                   } else {
                        // Se por algum motivo o reader estiver aberto mas sem música, aplicar defaults na UI
                        currentFontSize = userSettings.defaultFontSize;
                        currentScrollSpeed = userSettings.defaultScrollSpeed;
                         currentTranspose = 0;
                        applyReaderSettings(); // Aplica os defaults aos controles visíveis
                   }
               }
               // Atualizar inputs nas settings para refletir os padrões resetados
               settingWakelock.checked = userSettings.wakelockEnabled;
               settingDefaultFontSize.value = userSettings.defaultFontSize;
               settingDefaultScrollSpeed.value = userSettings.defaultScrollSpeed;
               settingTransposeStyle.value = userSettings.transposeStyle;


               alert('Configurações resetadas para o padrão.');
               console.log("Configurações resetadas.");
          }
     });

     // Listener para redimensionamento da janela (ajusta exibição dos controles do reader)
     // Este listener é crucial para a responsividade dos controles do leitor.
     window.addEventListener('resize', () => {
         // Só executa esta lógica se estivermos na tela do reader
         if (currentScreen === 'reader') {
              if (window.innerWidth <= 768) {
                   // Layout Mobile: Esconde a sidebar de controles, mostra o botão de toggle no header
                   readerControlsToggleMobileButton.style.display = 'flex'; // Use flex para button
                   readerSidebar.style.display = 'none';
                   // Garante que o listener de clique na área do texto (para abrir o overlay mobile) esteja ativo
                    // Remove o listener antes de adicionar para evitar duplicar
                    readerContentArea.removeEventListener('click', toggleReaderControlsMobile);
                    readerContentArea.addEventListener('click', toggleReaderControlsMobile);

              } else {
                   // Layout Desktop/Tablet: Mostra a sidebar de controles, esconde o botão de toggle no header
                   readerControlsToggleMobileButton.style.display = 'none';
                   readerSidebar.style.display = 'block'; // Use block para sidebar
                   hideReaderControlsMobile(); // Garante que o overlay mobile esteja escondido no desktop
                   // Remove o listener de clique na área do texto que é apenas para mobile
                    readerContentArea.removeEventListener('click', toggleReaderControlsMobile);
               }
         }
     });


    // --- Inicializar o app ---
    initializeApp();

    // TODO: Implementar:
    // - Persistência de dados (Backend API: salvar/carregar songs, events) - A simulação com localStorage já cobre parte da persistência de settings.
    // - Lógica completa e robusta de Parsing/Transposição de acordes (Regex atual é básica, mas melhorou)
    // - Excluir cifras (Simulado, precisa de backend)
    // - Editar detalhes da cifra (Simulado, precisa de backend)
    // - Reordenar músicas no ensaio (Drag and Drop - Usar uma lib como SortableJS)
    // - Botões Prev/Next no reader quando vindo de um evento (precisa saber a lista de músicas do evento)
    // - Mais estilos finos para modo escuro (verificar cores de borda, sombras, inputs, selects)
    // - Mensagens de loading/feedback para uploads/operações de rede
    // - Tratamento de erros de API (ex: falha no login, upload)
    // - Segurança (hashes de senha no backend, etc.)

    console.log("Frontend CifraReader iniciado. Rodando em modo de simulação de dados e settings locais.");
});