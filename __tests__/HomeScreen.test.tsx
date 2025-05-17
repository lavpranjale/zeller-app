import React from 'react';
import { render, waitFor, screen } from '@testing-library/react-native';
import HomeScreen from '../src/screens/HomeScreen';
import { MockedProvider } from '@apollo/client/testing';
import { gql } from '@apollo/client';

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

const mocks = [
  {
    request: {
      query: LIST_CUSTOMERS,
      variables: { role: null },
    },
    result: {
      data: {
        listZellerCustomers: {
          items: [
            { 
              id: '1', 
              name: 'John Doe', 
              email: 'john@example.com', 
              role: 'Admin' 
            },
          ],
        },
      },
    },
  },
];

// Mock console.log to clean up test output
beforeAll(() => {
  jest.spyOn(console, 'log').mockImplementation(() => {});
});

describe('HomeScreen', () => {
  it('renders loading state initially', () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <HomeScreen />
      </MockedProvider>
    );
    expect(screen.getByText('Loading...')).toBeTruthy();
  });

  it('renders data after loading', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <HomeScreen />
      </MockedProvider>
    );
    
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeTruthy();
    });
  });
});