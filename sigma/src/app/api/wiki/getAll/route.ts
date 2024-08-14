import { NextResponse } from 'next/server';
import axios from 'axios';

const API_SERVER_URL = 'http://localhost:3001'; // Ensure this URL matches your NestJS server

export async function GET(request: Request) {
  try {



    const response = await axios.get(`${API_SERVER_URL}/wiki`);

    console.log('Response from NestJS server:', response.data);

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    console.error('Error communicating with server:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
