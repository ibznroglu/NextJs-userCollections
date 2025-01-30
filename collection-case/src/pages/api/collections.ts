import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
 
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
 
  try {
    const token = req.headers.authorization;
 
    if (!token) {
      return res.status(401).json({ message: 'Authorization token required' });
    }
 
    const response = await axios.get('https://maestro-api-dev.secil.biz/Collection/GetAll', {
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json',
      },
    });
 
    return res.status(200).json(response.data);
  } catch (error: any) {
    console.error('API Error:', error.response?.data || error.message);
    return res.status(error.response?.status || 500).json({
      message: error.response?.data?.message || 'Internal server error',
    });
  }
}