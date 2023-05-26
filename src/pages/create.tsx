// pages/createSong.tsx

import { useState } from 'react';

export default function CreateSong() {
    const [text, setText] = useState('');
    const [name, setName] = useState('');
    const [emotion, setEmotion] = useState('');
    const [isActive, setIsActive] = useState(true);
    const [voiceUuid, setVoiceUuid] = useState('');

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        
        try {
            // create a new project
            let response = await fetch('/api/projects', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: 'My Song Project',
                    description: 'My AI song project',
                    is_public: false,
                    is_collaborative: true,
                    is_archived: false
                }),
            });

            let data = await response.json();
            const projectUuid = data.uuid; // store project uuid

            // create a voice
            response = await fetch('/api/voices', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    name: 'My AI Voice', 
                    dataset_url: 'https://../dataset.zip', 
                    callback_uri: 'http://example.com/cb'
                }),
            });

            data = await response.json();
            const voiceUuid = data.uuid; // store voice uuid

            // create a recording
            response = await fetch('/api/recordings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    voiceUuid,
                    emotion,
                    is_active: isActive,
                    name,
                    text
                }),
            });

            data = await response.json();
            console.log(data); // data.message should display 'Recording created successfully'

            // create a clip
            response = await fetch('/api/clips', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    projectUuid,
                    body: text,
                    voice_uuid: voiceUuid
                }),
            });

            data = await response.json();
            console.log(data); // data.message should display 'Clip created successfully'

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl mb-8">Create a new AI Song</h1>
            <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3 mb-6 md:mb-0">
                        <input
                            type="text"
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Text"
                        />
                    </div>
                    <div className="w-full px-3">
                        <input
                            type="text"
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Name"
                        />
                    </div>
                    <div className="w-full px-3 mt-6">
                        <input
                            type="text"
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                            value={emotion}
                            onChange={(e) => setEmotion(e.target.value)}
                            placeholder="Emotion"
                        />
                    </div>
                    <div className="w-full px-3 mt-6 flex items-center">
                        <input
                            type="checkbox"
                            className="mr-2"
                            checked={isActive}
                            onChange={(e) => setIsActive(e.target.checked)}
                        />
                        <label>Active</label>
                    </div>
                    <div className="w-full px-3 mt-6">
                        <button
                            type="submit"
                            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Create
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
