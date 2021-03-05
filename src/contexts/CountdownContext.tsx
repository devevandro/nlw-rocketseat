import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { ChallengeContext } from './ChallengeContext';

interface CountdownContextData {
    minutes: number;
    seconds: number;
    hasFinished: boolean;
    active: boolean;
    startCountdown: () => void;
    resetCountdown: () => void;
}

interface ChallengesProviderProps {
    children: ReactNode;
}

export const CountdownContext = createContext({} as CountdownContextData);

let countdownTimeout: NodeJS.Timeout;

export function CountdownProvider({children}: ChallengesProviderProps) {
    const { startNewChallenge } = useContext(ChallengeContext);

    const [time, setTime] = useState(25 * 60);
    const [active, setActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    useEffect(() => {
        if(active && time > 0) {
            countdownTimeout = setTimeout(() => {
                setTime(time - 1);
            }, 1000);
        }else if(active && time === 0) {
            setHasFinished(true);
            setActive(false);
            startNewChallenge();
        }
    }, [active, time]);

    function startCountdown() {
        setActive(true);
    }

    function resetCountdown() {
        clearTimeout(countdownTimeout);
        setActive(false);
        setTime(25 * 60);
        setHasFinished(false);
    }

    return (
        <CountdownContext.Provider
            value={{
                minutes,
                seconds,
                hasFinished,
                active,
                startCountdown,
                resetCountdown,
            }}
        >
            {children}
        </CountdownContext.Provider>
    );
}
