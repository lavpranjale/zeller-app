
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  RefreshControl,
  StyleSheet
} from 'react-native';
import { gql, useQuery } from '@apollo/client';
import UserCard from '../components/UserCard';

// GraphQL query to get customers by optional role
const LIST_CUSTOMERS = gql`
  query ListZellerCustomers($role: String) {
    listZellerCustomers(role: $role) {
      items {
        id
        name
        email
        role
      }
    }
  }
`;

const HomeScreen = () => {
  const [role, setRole] = useState<string | null>(null); 
  const [search, setSearch] = useState(''); 
  const [refreshing, setRefreshing] = useState(false); 

  // useQuery hook fetches data using Apollo Client
  const { loading, error, data, refetch } = useQuery(LIST_CUSTOMERS, {
    variables: { role },
  });

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const filteredData = data?.listZellerCustomers?.items?.filter((user: { name: string; }) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );


  console.log("Loading:", loading);
  console.log("Error:", error);
  console.log("Data:", data);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Zeller Customers</Text>

      {/* Role filter buttons */}
      <View style={styles.filterContainer}>
        <TouchableOpacity style={styles.button} onPress={() => setRole(null)}>
          <Text>All</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setRole('Admin')}>
          <Text>Admin</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setRole('Manager')}>
          <Text>Manager</Text>
        </TouchableOpacity>
      </View>

      {/* Search input */}
      <TextInput
        style={styles.search}
        placeholder="Search by name"
        value={search}
        onChangeText={setSearch}
      />

      {/* Display results */}
      {loading ? (
        <Text>Loading...</Text>
      ) : error ? (
        <Text>Error loading users: {error.message}</Text>
      ) : (
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          renderItem={({ item }) => (
            <UserCard name={item.name} email={item.email} role={item.role} />
          )}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  search: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  filterContainer: {
    flexDirection: 'row',
    marginBottom: 12,
    justifyContent: 'space-around',
  },
  button: {
    padding: 8,
    backgroundColor: '#ddd',
    borderRadius: 4,
  },
});

export default HomeScreen;
