# Mobile Dictionary App

Este é um aplicativo voltado para pessoas que desejam aprender novas palavras em inglês.
Com ele você pode pesquisar por palavras, ver definições e salvar palavras favoritas.
Viu uma palavra mas esqueceu de salvar? O histórico de palavras pesquisadas está disponível para você!

>  This is a challenge by [Coodesh](https://coodesh.com/)

# Layout proposto

Utilizando como base o wireframe fornecido, foi desenvolvido um protótipo utilizando o Figma que pode ser acessado livremente através do link abaixo:

[![Visualizar layout no Figma](https://img.shields.io/badge/Figma-Visualizar%20prot%C3%B3tipo-F24E1E?logo=figma&logoColor=white&style=for-the-badge)](https://www.figma.com/proto/6jJu9wbNM2kxY0xC6hr2q0/Untitled?node-id=1-2&t=5jkEwtcq7yEhYexm-1)

# Tecnologias utilizadas no desenvolvimento do app

- [React Native](https://reactnative.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Firebase](https://firebase.google.com/)
- [React Navigation](https://reactnavigation.org/)
- [Redux](https://redux.js.org/)
- [RTK Query](https://redux-toolkit.js.org/rtk-query/overview)
- [Async Storage](https://react-native-async-storage.github.io/async-storage/)
- [date-fns](https://date-fns.org/)
- [react-native-tts](https://github.com/ak1394/react-native-tts)
## Sobre as tecnologias

O projeto foi desenvolvido utilizando o React Native, pois além de ser versátil e possuir uma comunidade muito ativa, permite a criação de aplicativos nativos para Android e IOS usando uma única base de código.
O uso de Typescript é uma escolha pessoal, pois tenho mesmo usando javascript diariamente, a tipagem do Typescript ajuda muito a evitar erros comuns durante o desenvolvimento como chamadas de métodos inexistentes ou passagem de parâmetros incorretos.

O Firebase foi utilizado para armazenar as palavras favoritas/histórico relacionadas ao usuário, além de fornecer autenticação social para o app que ajuda muito tanto no desenvolvimento quanto na experiência do usuário.

A respeito do uso do Redux,flutua entre pessoal e requisito do projeto. Geralmente preciso de gerenciamento de estados  globais em meus projetos, quando preciso de algo mais simples, opto por utilizar o Context API do React, mas para projetos maiores, o Redux é uma escolha mais robusta. Porém, para este projeto, o Redux também foi utilizado para cachear resposta de requisições à API de dicionário via RTK Query.

O Async Storage foi utilizado para armazenar informações locais do usuário, como o token de autenticação do Firebase, além de armazenar as palavras da lista de palavras do github em chunks de 1000 palavras pra evitar sobrecarga de memória.

O date-fns foi utilizado para formatar datas de acordo com o padrão de data do Brasil, gosto de usar essa biblioteca por ser mais leve e ter uma API mais simples que o Moment.js.

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

#### Inicialização do app localmente

```sh
# Usando npm
npm run ios

# Ou usando yarn
yarn ios
```
#### Execução em dispositivo físico

Vou deixar disponível o link para o apk diretamente no repositório do projeto, caso queira instalar o app em seu dispositivo físico.
Porém, caso deseje gerar o apk por conta própria, execute o comando abaixo:

```sh
cd android && ./gradlew assembleRelease
```

>[!TIP]
> O apk gerado estará disponível em `android/app/build/outputs/apk/release/app-release.apk`

# Testes e2e

Para executar os testes e2e, é necessário que o app esteja rodando em um emulador ou dispositivo físico.
Os testes são executados utilizando o [Maestro](https://maestro.mobile.dev/getting-started/installing-maestro), que é uma ferramenta de automação de testes e2e para aplicações mobile.

Essa ferramente foi escolhida por ser mais simples de configurar e fácil de usar, além de ser open-source.
Usando o Maestro, é possível escrever testes usando linguagem yml, sendo mais acessível para pessoas que não possuem conhecimento em programação.
O tutorial de instalação do Maestro pode ser encontrado [aqui](https://maestro.mobile.dev/getting-started/installing-maestro).
```sh
# Usando npm
npm run e2e

# Ou usando yarn
yarn e2e
```