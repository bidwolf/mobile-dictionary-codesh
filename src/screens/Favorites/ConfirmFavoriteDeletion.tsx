import React from 'react';
import { Modal, View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';

interface ConfirmFavoriteDeletionProps {
  visible: boolean;
  onDelete: () => void;
  onCancel: () => void;
}

const ConfirmFavoriteDeletion: React.FC<ConfirmFavoriteDeletionProps> = ({ visible, onDelete, onCancel }) => {
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onCancel}
    >
      <View style={styles.container}>
        <View style={styles.modalView}>
          <Text style={styles.message}>Tem certeza que deseja excluir este favorito?</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onCancel} style={{
              width: 100,
              borderWidth: 1,
              borderColor: '#007BFF',
              padding: 10,
              borderRadius: 5,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Text style={styles.cancelText}>Voltar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
              <Text style={styles.deleteText}>Excluir</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  cancelText: {
    color: '#007BFF',

  },
  deleteButton: {
    backgroundColor: '#DC3545',
    padding: 10,
    borderRadius: 5,
    width: 100,
    alignItems: 'center',

  },
  deleteText: {
    color: 'white',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  message: {
    marginBottom: 20,
    fontSize: 16,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    width: '100%',
  },
});

export default ConfirmFavoriteDeletion;