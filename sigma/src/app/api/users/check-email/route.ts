import { NextResponse } from 'next/server';
import axios from 'axios';

const API_SERVER_URL = 'http://localhost:3001'; // Ensure this URL matches your NestJS server

export async function GET(request: Request) {
  console.log("GET api function started");
  
  const url = new URL(request.url);
  const email = url.searchParams.get('email');

  if (!email) {
    return NextResponse.json({ error: 'Invalid email parameter' }, { status: 400 });
  }

  try {
    const response = await axios.get(`http://localhost:3001/users/find-one?email=${email}`);

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    console.error('Error fetching data from server:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
