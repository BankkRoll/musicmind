// pages/api/recordings.ts

import { NextApiRequest, NextApiResponse } from 'next';

const Resemble = require('@resemble/node');
Resemble.setApiKey(process.env.RESEMBLE_API_TOKEN);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET':
            try {
                const { voiceUuid } = req.query;
                const response = await (Resemble as any).v2.recordings.all(voiceUuid, 1, 10);
                res.status(200).json(response);
            } catch (error) {
                res.status(500).json({ error: error });
            }
            break;
        case 'POST':
            try {
                const { voiceUuid, emotion, is_active, name, text } = req.body;
                await (Resemble as any).v2.recordings.create(voiceUuid, {
                    emotion,
                    is_active,
                    name,
                    text
                });
                res.status(200).json({ message: 'Recording created successfully' });
            } catch (error) {
                res.status(500).json({ error: error });
            }
            break;
        // Implement other methods (PUT, DELETE) as needed
    }
}