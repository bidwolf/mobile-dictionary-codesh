import React, { useState } from 'react';
import { Text, StyleSheet } from 'react-native';
import { DropdownMenu } from '@components/Menu/DropDown'; // Adjust the import path based on your project structure
import { MenuOption } from '@components/Menu/Option';
import Icon from '@react-native-vector-icons/fontawesome6';
import ConfirmFavoriteDeletion from './ConfirmFavoriteDeletion';

type FavoriteActionsMenuProps = {
  trigger: React.ReactNode;
  handleViewWordMeaning: () => void;
  handleRemoveFavorite: () => void;
}
export const FavoriteActionsMenu: React.FC<FavoriteActionsMenuProps> = ({
  trigger,
  handleViewWordMeaning,
  handleRemoveFavorite
}) => {
  const [visible, setVisible] = useState(false);
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const handleViewDetails = () => {
    setVisible(false);
    handleViewWordMeaning()
  }
  const confirmFavoriteDeletion = () => {
    setShowConfirmationDialog(false);
    handleRemoveFavorite()
  }
  return (
    <>
      <ConfirmFavoriteDeletion
        onCancel={() => setShowConfirmationDialog(false)}
        onDelete={confirmFavoriteDeletion}
        visible={showConfirmationDialog}
      />
      <DropdownMenu
        visible={visible}
        dropdownWidth={200}
        handleOpen={() => setVisible(true)}
        handleClose={() => setVisible(false)}
        trigger={
          trigger
        }
      >
        <MenuOption onSelect={handleViewDetails}>
          <Icon name='book-open' size={12} color='#808080' iconStyle='solid' style={{ width: 16 }} />
          <Text style={styles.optionText}>Ver Significado</Text>
        </MenuOption>
        <MenuOption onSelect={() => {
          setShowConfirmationDialog(true);
          setVisible(false);
        }}>
          <Icon name='trash' size={12} color='#808080' iconStyle='solid' style={{ width: 16 }} />
          <Text style={styles.optionText}>Remover dos favoritos</Text>
        </MenuOption>
      </DropdownMenu>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff',
  },
  triggerStyle: {
    height: 40,
    backgroundColor: '#f5fcff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 100,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  optionText: {
    textAlign: "center",
    fontSize: 12,
    margin: 0,
    padding: 0,
    color: '#808080'
  }
});