import { NextResponse } from 'next/server';
import axios from 'axios';

const API_SERVER_URL = 'http://localhost:3001'; // Ensure this URL matches your NestJS server

export async function POST(request: Request) {
  try {
    const { email, weight, height, age, work, sleep, target } = await request.json();

    // Log the received data
    console.log('Received data:', { email, weight, height, age, work, sleep, target });

    if (!email || !weight || !height || !age || !work || !sleep || !target) {
      console.log('Missing required parameters');
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
    }

    // Forward the request to the NestJS server
    const response = await axios.post(`${API_SERVER_URL}/users/add-user`, {
      email,
      weight,
      height,
      age,
      work,
      sleep,
      target,
    });

    console.log('Response from NestJS server:', response.data);

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    console.error('Error communicating with server:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
