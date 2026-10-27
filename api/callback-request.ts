import { initialSettings } from '../src/data/settings';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, phone, preferredTime } = req.body || {};
  
  if (!phone) {
    return res.status(400).json({ error: 'Phone number is required.' });
  }

  res.status(200).json({ success: true, message: initialSettings.callbackPromiseText });
}

