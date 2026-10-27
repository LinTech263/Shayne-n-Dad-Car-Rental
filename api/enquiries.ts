import { initialSettings } from '../src/data/settings';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { fullName, phone, email, carSlug, carName, startDate, endDate, chauffeurNeeded, offerPrice, message } = req.body || {};
  
  if (!fullName || !phone) {
    return res.status(400).json({ error: 'Full name and phone or WhatsApp number are required.' });
  }

  const newEnquiry = {
    id: `lead-${Date.now()}`,
    fullName,
    phone,
    email: email || '',
    carSlug: carSlug || 'general',
    carName: carName || 'General Enquiry',
    startDate: startDate || '',
    endDate: endDate || '',
    chauffeurNeeded: Boolean(chauffeurNeeded),
    offerPrice: offerPrice ? parseFloat(offerPrice) : null,
    message: message || '',
    status: 'New',
    createdAt: new Date().toISOString()
  };

  res.status(200).json({ success: true, lead: newEnquiry, message: initialSettings.callbackPromiseText });
}

