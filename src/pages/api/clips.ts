// pages/api/clips.ts

import { NextApiRequest, NextApiResponse } from 'next';

const Resemble = require('@resemble/node');
Resemble.setApiKey(process.env.RESEMBLE_API_TOKEN);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET':
            try {
                const { projectUuid } = req.query;
                const response = await (Resemble as any).v2.clips.all(projectUuid, 1, 10);
                res.status(200).json(response);
            } catch (error) {
                res.status(500).json({ error: error });
            }
            break;
        case 'POST':
            try {
                const { projectUuid, body, voice_uuid } = req.body;
                const response = await (Resemble as any).v2.clips.createSync(projectUuid, {
                    body,
                    voice_uuid,
                });
                res.status(200).json({ message: 'Clip created successfully', data: response });
            } catch (error) {
                res.status(500).json({ error: error });
            }
            break;
        // Implement other methods (PUT, DELETE) as needed
    }
}
