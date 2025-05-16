
import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import awsconfig from './src/aws-exports';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';

const Stack = createNativeStackNavigator();

const client = new ApolloClient({
  uri: awsconfig.aws_appsync_graphqlEndpoint,
  cache: new InMemoryCache(),
  headers: {
    'x-api-key': awsconfig.aws_appsync_apiKey,
  },
});

const App = () => (
  <ApolloProvider client={client}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  </ApolloProvider>
);

export default App;
