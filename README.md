# Mobile Dictionary App

Este é um aplicativo voltado para pessoas que desejam aprender novas palavras em inglês.
Com ele você pode pesquisar por palavras, ver definições e salvar palavras favoritas.
Viu uma palavra mas esqueceu de salvar? O histórico de palavras pesquisadas está disponível para você!

# Layout proposto

Utilizando como base o wireframe fornecido, foi desenvolvido um protótipo utilizando o Figma que pode ser acessado livremente através do link abaixo:

[![Visualizar layout no Figma](https://img.shields.io/badge/Figma-Visualizar%20prot%C3%B3tipo-F24E1E?logo=figma&logoColor=white&style=for-the-badge)](https://www.figma.com/proto/6jJu9wbNM2kxY0xC6hr2q0/Untitled?node-id=1-2&t=5jkEwtcq7yEhYexm-1)

# Inicializando o projeto

>[!NOTE]
Tenha certeza de seguir o passo a passo para efetuar o [setup do ambiente de desenvolvimento para o react native](https://reactnative.dev/docs/set-up-your-environment) antes de começar.

## Passo 1: Instalar dependências do projeto
Para instalar as dependências do projeto, execute o comando abaixo na raiz do projeto:
```sh
# Usando npm
npm install
# OU usando Yarn
yarn start
```
## Passo 2: Inicializar o Metro
Para inicializar o Metro, execute o comando abaixo na raiz do projeto:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Passo 3: Build e execução do app
A depender do sistema operacional, você pode optar por efetuar o build e execução do app em um emulador ou dispositivo físico.


### Android
A opção mais amplamente suportada é o uso do Android Studio para emular um dispositivo Android.

Uma vez que o emulador esteja configurado (de acordo com a seção [Inicializando o projeto](#inicializando-o-projeto)), você pode executar o comando abaixo para iniciar o app no emulador:
```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

Caso esteja executando o projeto em um ambiente MAC OS, você pode optar por utilizar o Xcode para emular um dispositivo IOS.

#### Setup do Cocoapods
Para tal é necessário instalar o Cocoapods, que é um gerenciador de dependências para projetos IOS.
<!-- Seção para instalação do homebrew, watchman, do cocoapods, todos devem ser documentados em seções separadas -->

Lembre de instalar as dependências do Cocoapods sempre que clonar o projeto ou atualizar dependências nativas.

Caso seja a primeira vez que estiver instalando as dependências do projeto, é recomendado que utilize o bundler do ruby para usar versões compatíveis com a versão atual do react native.

```sh
bundle install
```

E então, para cada vez que instalar ou atualizar dependências nativas, execute o comando abaixo:

```sh
bundle exec pod install
```

Para mais informacões [Leia a documentação do cocoapods](https://guides.cocoapods.org/using/getting-started.html).

#### Inicialização do app

```sh
# Usando npm
npm run ios

# Ou usando yarn
yarn ios
```
