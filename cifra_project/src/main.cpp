#include <WiFi.h>
#include <WebServer.h>
#include <SPIFFS.h> // Inclui a biblioteca SPIFFS
#include <FS.h>    // Necessário para SPIFFS

// Defina suas credenciais de Wi-Fi
const char* ssid = "Ukan";
const char* password = "ukan2024";

// Porta do servidor web
const int webPort = 80;

// Instância do servidor web
WebServer server(webPort);

// Função auxiliar para determinar o tipo de conteúdo (MIME type)
const char* getContentType(const String& filename) {
  if (filename.endsWith(".htm") || filename.endsWith(".html")) return "text/html";
  else if (filename.endsWith(".css")) return "text/css";
  else if (filename.endsWith(".js")) return "application/javascript";
  else if (filename.endsWith(".json")) return "application/json";
  else if (filename.endsWith(".txt")) return "text/plain"; // Adicionado tipo para TXT
  return "text/plain";
}

// Função auxiliar para LER um arquivo
String readFile(File &file) {
    String fileContent = "";
    while (file.available()) {
        fileContent += (char)file.read();
    }
    return fileContent;
}

// Função para lidar com requisições para arquivos estáticos (HTML, CSS, JS)
void handleStaticFile() {
  String path = server.uri();
  if (path.endsWith("/")) {
    path += "index.html";
  }
  if (SPIFFS.exists(path)) {
    File file = SPIFFS.open(path);
  if (!file) {
      server.send(500, "text/plain", "Falha ao abrir o arquivo");
    return;
  }
    String content = readFile(file); // Lendo o arquivo
    server.send(200, getContentType(path), content);
  file.close();
  } else {
    server.send(404, "text/plain", "Arquivo não encontrado");
}
}

// Função para inicializar o Wi-Fi (igual antes)
void initWiFi() {
  Serial.println("Conectando-se ao Wi-Fi...");
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("Conectado ao Wi-Fi!");
  Serial.print("Endereço IP: ");
  Serial.println(WiFi.localIP());
}

// Função para inicializar o SPIFFS
void initSPIFFS() {
  Serial.println("Inicializando SPIFFS...");
  if (!SPIFFS.begin(true)) { // Tenta formatar se a montagem falhar
    Serial.println("Falha ao montar o SPIFFS");
    return;
  }
  Serial.println("SPIFFS inicializado com sucesso!");

  // Opcional: Listar os arquivos no SPIFFS para debug
  Serial.println("Arquivos no SPIFFS:");
  File root = SPIFFS.open("/");
  File file = root.openNextFile();
  while (file) {
    Serial.print("  -> ");
    Serial.println(file.name());
    file = root.openNextFile();
  }
}

// Função para lidar com a criação de um novo ensaio
void handleCreateRehearsal() {
  // TODO: Ler os dados do corpo da requisição (JSON)
  // TODO: Validar os dados
  // TODO: Gerar um ID único para o ensaio
  // TODO: Salvar os dados do ensaio no SPIFFS (em um arquivo JSON)
  // TODO: Enviar uma resposta de sucesso (com o ID do ensaio criado)
  server.send(200, "text/plain", "Ensaio criado com sucesso (simulado)!");
}

// Função para lidar com a listagem de ensaios
void handleListRehearsals() {
  // TODO: Ler os dados dos ensaios do SPIFFS
  // TODO: Formatar os dados como JSON
  // TODO: Enviar a resposta JSON
  server.send(200, "application/json", "[{\"id\":\"1\", \"name\":\"Ensaio 1\"}, {\"id\":\"2\", \"name\":\"Ensaio 2\"}"); // Exemplo
}

// Função para lidar com a edição de um ensaio existente
void handleEditRehearsal() {
  // TODO: Obter o ID do ensaio a partir da URL ou do corpo da requisição
  // TODO: Ler os dados do ensaio do SPIFFS
  // TODO: Atualizar os dados com os novos valores
  // TODO: Salvar os dados atualizados no SPIFFS
  // TODO: Enviar uma resposta de sucesso
  server.send(200, "text/plain", "Ensaio editado com sucesso (simulado)!");
}

// Função para lidar com a remoção de um ensaio
void handleDeleteRehearsal() {
  // TODO: Obter o ID do ensaio a partir da URL
  // TODO: Remover o arquivo do ensaio do SPIFFS
  // TODO: Enviar uma resposta de sucesso
  server.send(200, "text/plain", "Ensaio removido com sucesso (simulado)!");
}

// Função auxiliar para ESCREVER um arquivo no SPIFFS
void writeFile(String path, String message) {
  Serial.printf("Escrevendo arquivo: %s\r\n", path.c_str());
  File file = SPIFFS.open(path.c_str(), FILE_WRITE);
  if (!file) {
    Serial.println("- Falha ao abrir o arquivo para escrita");
    return;
  }
  if (file.print(message)) {
    Serial.println("- Arquivo escrito");
  } else {
    Serial.println("- Falha na escrita do arquivo");
  }
  file.close();
}


void setup() {
  Serial.begin(9600);

  initWiFi();
  initSPIFFS();

  // Handlers para arquivos estáticos
  server.onNotFound(handleStaticFile);

  // Handlers para as rotas da API (exemplo)
  server.on("/api/rehearsals", HTTP_POST, handleCreateRehearsal);
  server.on("/api/rehearsals", HTTP_GET, handleListRehearsals);
  server.on("/api/rehearsals", HTTP_PUT, handleEditRehearsal);    // Talvez precise de ID na URL
  server.on("/api/rehearsals", HTTP_DELETE, handleDeleteRehearsal); // Talvez precise de ID na URL

  // Inicie o servidor
  server.begin();
  Serial.println(WiFi.localIP());
}

void loop() {
  server.handleClient();
}

