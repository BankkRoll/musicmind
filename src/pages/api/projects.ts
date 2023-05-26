// pages/api/projects.ts

import { NextApiRequest, NextApiResponse } from 'next';

const Resemble = require('@resemble/node');
Resemble.setApiKey(process.env.RESEMBLE_API_TOKEN);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET':
            try {
                const response = await (Resemble as any).v2.projects.all(1, 10);
                res.status(200).json(response);
            } catch (error) {
                res.status(500).json({ error: error });
            }
            break;
        case 'POST':
            try {
                const { name, description, is_public, is_collaborative, is_archived } = req.body;
                await (Resemble as any).v2.projects.create({
                    name,
                    description,
                    is_public,
                    is_collaborative,
                    is_archived
                });
                res.status(200).json({ message: 'Project created successfully' });
            } catch (error) {
                res.status(500).json({ error: error });
            }
            break;
        // Implement other methods (PUT, DELETE) as needed
    }
}
