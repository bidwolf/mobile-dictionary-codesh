import Tts from 'react-native-tts';

/**
 * Função para inicializar os listeners do TTS
 */
export const initializeTtsListeners = async () => {
  Tts.getInitStatus().then(
    (e) => {
      console.log('TTS Configurado✅');
    },
    (err) => {
      if (err.code === 'no_engine') {
        console.log('Nenhuma engine encontrada, requisitando instalação ✅');
        Tts.requestInstallEngine();
      }
    }
  );
  // Velocidade padrão da fala
  Tts.setDefaultRate(0.9, true);

  // Ignorar o botão de silenciar do dispositivo
  Tts.setIgnoreSilentSwitch('ignore');

  // Configuração do volume padrão
  Tts.setDefaultPitch(0.7);

  // Listener para quando o TTS começa a falar
  Tts.addEventListener('tts-start', (event) => {
    console.log('TTS Started: ', event);
  });

  // Listener para quando o TTS está em progresso
  Tts.addEventListener('tts-progress', (event) => {
    // console.log('TTS progress: ', event) // Uncomment to log progress events
  });

  // Listener para quando o TTS termina
  Tts.addEventListener('tts-finish', (event) => {
    console.log('TTS finished: ', event);
  });

  // Listener para quando o TTS é cancelado
  Tts.addEventListener('tts-cancel', (event) => {
    console.log('TTS Cancel: ', event);
  });
};

// Function to play a message using TTS
export const playTTS = async (message: string) => {
  // Ensure TTS is initialized before speaking
  Tts.getInitStatus().then(
    (e) => {
      console.log('ALL OK TTS ✅'); // TTS is initialized successfully
    },
    (err) => {
      // If there is no TTS engine installed, request to install one
      if (err.code === 'no_engine') {
        console.log('NO ENGINE TTS ✅');
        Tts.requestInstallEngine();
      }
    }
  );

  // Use TTS to speak the provided message
  Tts.speak(message);
};

