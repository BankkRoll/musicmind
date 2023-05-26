// pages/api/voices.ts

import { NextApiRequest, NextApiResponse } from 'next';

const Resemble = require('@resemble/node');
Resemble.setApiKey(process.env.RESEMBLE_API_TOKEN);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET':
            try {
                const response = await (Resemble as any).v2.voices.all(1, 10);
                res.status(200).json(response);
            } catch (error) {
                res.status(500).json({ error: error });
            }
            break;
        case 'POST':
            try {
                const { name, dataset_url, callback_uri } = req.body;
                await (Resemble as any).v2.voices.create({ name, dataset_url, callback_uri });
                res.status(200).json({ message: 'Voice created successfully' });
            } catch (error) {
                res.status(500).json({ error: error });
            }
            break;
        // Implement other methods (PUT, DELETE) as needed
    }
}
