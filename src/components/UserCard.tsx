
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Props = {
  name: string;
  email: string;
  role: string;
};

const UserCard = ({ name, email, role }: Props) => (
  <View style={styles.card}>
    <Text style={styles.name}>{name}</Text>
    <Text>{email}</Text>
    <Text>{role}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#eee',
    marginBottom: 8,
    borderRadius: 4,
  },
  name: {
    fontWeight: 'bold',
  },
});

export default UserCard;
