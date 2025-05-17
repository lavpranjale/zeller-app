/**
 * @format
 */
import 'react-native';
import React from 'react';
import App from '../App';
import { render } from '@testing-library/react-native';
import { MockedProvider } from '@apollo/client/testing';

// Mock the AWS configuration
jest.mock('../src/aws-exports', () => ({
  aws_appsync_graphqlEndpoint: 'http://localhost:4000/graphql',
  aws_appsync_apiKey: 'mock-api-key',
  aws_appsync_region: 'mock-region',
}));

// Simple mock for react-navigation
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  NavigationContainer: ({ children }: { children: React.ReactNode }) => children,
}));

jest.mock('@react-navigation/native-stack', () => ({
  createNativeStackNavigator: () => ({
    Navigator: ({ children }: { children: React.ReactNode }) => children,
    Screen: ({ children }: { children: React.ReactNode }) => children,
  }),
}));

describe('App', () => {
  it('renders without crashing', () => {
    render(
      <MockedProvider>
        <App />
      </MockedProvider>
    );
  });
});