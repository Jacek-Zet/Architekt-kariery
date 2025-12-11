
import React, { useState, useEffect } from 'react';
import { AppSelection } from './components/AppSelection';
import { CareerArchitectWorkflow } from './components/workflows/CareerArchitectWorkflow';
import { EducationAnalystWorkflow } from './components/workflows/EducationAnalystWorkflow';

export type AppMode = 'career' | 'education';

export default function App(): React.ReactElement {
    const [appMode, setAppMode] = useState<AppMode | null>(() => {
        try {
            const savedMode = localStorage.getItem('appMode');
            const parsedMode = savedMode ? JSON.parse(savedMode) : null;
            if (parsedMode === 'career' || parsedMode === 'education') {
                return parsedMode;
            }
            return null;
        } catch {
            return null;
        }
    });

    useEffect(() => {
        if (appMode) {
            localStorage.setItem('appMode', JSON.stringify(appMode));
        } else {
            localStorage.removeItem('appMode');
        }
    }, [appMode]);

    const handleSwitchMode = () => {
        setAppMode(null);
    }

    if (!appMode) {
        return <AppSelection onSelectMode={setAppMode} />;
    }

    if (appMode === 'career') {
        return <CareerArchitectWorkflow onSwitchMode={handleSwitchMode} />;
    }
    
    if (appMode === 'education') {
        return <EducationAnalystWorkflow onSwitchMode={handleSwitchMode} />;
    }

    // Fallback in case something goes wrong, though it shouldn't be reached.
    return <AppSelection onSelectMode={setAppMode} />;
}
