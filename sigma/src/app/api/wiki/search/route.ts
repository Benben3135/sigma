import { NextResponse } from 'next/server';
import axios from 'axios';

const API_SERVER_URL = 'http://localhost:3001'; // Ensure this URL matches your NestJS server

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const searchText = url.searchParams.get('searchText');

    if (!searchText) {
      console.log('Missing required parameters');
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    // Forward the request to the NestJS server with the searchText parameter
    const response = await axios.get(`${API_SERVER_URL}/wiki/${searchText}`);

    console.log('Response from NestJS server:', response.data);

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    console.error('Error communicating with server:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
