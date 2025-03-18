import { ApplicationConfig } from '@angular/core';
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';
import { Apollo, APOLLO_OPTIONS } from 'apollo-angular';

// TODO: use environment variable
const GRAPHQL_URL = "https://rjtezqqbmcpujhvadccw.supabase.co/graphql/v1"
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJqdGV6cXFibWNwdWpodmFkY2N3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM0NTYxNjQsImV4cCI6MjA0OTAzMjE2NH0.HnKiGAbAGPF8lcOw7XJcZRndGIpWIqF48E2mSpZHbmE'

export function apolloOptionsFactory(): ApolloClientOptions<any> {
	return {
		uri: GRAPHQL_URL,
		cache: new InMemoryCache(),
		headers: {
			"Content-Type": "application/json",
			apiKey: API_KEY,
		}
	};
}

export const graphqlProvider: ApplicationConfig['providers'] = [
	Apollo,
	{
		provide: APOLLO_OPTIONS,
		useFactory: apolloOptionsFactory,
	},
];