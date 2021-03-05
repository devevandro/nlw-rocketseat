import { createContext, useState, ReactNode, useEffect } from 'react';
import challenges from '../../challenges.json';
import Cookies from "js-cookie";
import { LevelUpModal } from '../components/LevelUpModal';

interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface ChallengesContextData {
    level: number;
    currentExperience: number;
    challengesCompleted: number;
    experienceToNextLevel: number;
    activeChalenge: Challenge;
    levelUp: () => void;
    resetChallenge: () => void;
    closeLevelUpModal: () => void;
    completeChallenge: () => void;
    startNewChallenge: () => void;
}

interface ChallengesProviderProps {
    children: ReactNode;
    level: number;
    currentExperience: number;
    challengesCompleted: number;

}

export const ChallengeContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children, ...rest }: ChallengesProviderProps) {
    const [level, setLevel] = useState(rest.level ?? 1);
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
    const [challengesCompleted, setChallengesCompleted] = useState(rest.currentExperience ?? 0);
    const [activeChalenge, setActiveChallenge] = useState(null);
    const [levelUpModalOpen, setLevelModalUpOpen] = useState(false);
    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

    useEffect(() => {
        Notification.requestPermission();
    }, []);

    useEffect(() => {
        Cookies.set('level', String(level));
        Cookies.set('currentExperience', String(currentExperience));
        Cookies.set('challengesCompleted', String(challengesCompleted));
    }, [level, currentExperience, challengesCompleted]);

    function levelUp() {
        setLevel(level + 1);
        setLevelModalUpOpen(true);
    }

    function closeLevelUpModal() {
        setLevelModalUpOpen(false);
    }

    function startNewChallenge() {
        const randomChallengesIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengesIndex];
        setActiveChallenge(challenge);

        new Audio('/notification.mp3').play;

        if(Notification.permission === 'granted') {
            new Notification('Novo desafio', {
                body: `Valendo ${challenge.amount}xp!`
            })
        }
    }

    function resetChallenge() {
        setActiveChallenge(null)
    }

    function completeChallenge() {
        if(!activeChalenge) {
            return;
        }

        const { amount } = activeChalenge;
        let finalExperience = currentExperience + amount;

        if(finalExperience >= experienceToNextLevel) {
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp();
        }

        setCurrentExperience(finalExperience);
        setActiveChallenge(null);
        setChallengesCompleted(challengesCompleted + 1);
    }

    return (
        <ChallengeContext.Provider 
            value={{
                level,
                currentExperience,
                challengesCompleted,
                levelUp,
                startNewChallenge,
                activeChalenge,
                resetChallenge,
                experienceToNextLevel,
                completeChallenge,
                closeLevelUpModal,
            }}
        >
            {children}
            {levelUpModalOpen && <LevelUpModal />}
        </ChallengeContext.Provider>
    );
}
