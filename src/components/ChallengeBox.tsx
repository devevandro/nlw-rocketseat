import { useContext } from 'react';
import { ChallengeContext } from '../contexts/ChallengeContext';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/ChallengeBox.module.css';

export function ChallengeBox() {
    const {
        activeChalenge,
        resetChallenge,
        completeChallenge
    } = useContext(ChallengeContext);
    const { resetCountdown } = useContext(CountdownContext);
 
    function handleChallengeSucceeded() {
        completeChallenge();
        resetCountdown();
    }

    function handleChallengeFailed() {
        resetChallenge();
        resetCountdown();
    }

    return (<>
    <div className={styles.challengeBoxContainer}>
        {activeChalenge ? (
            <div className={styles.challengeActive}>
                <header>Ganhe {activeChalenge.amount} cp</header>

                <main>
                    <img src={`icons/${activeChalenge.type}.svg`}/>
                    <strong>Novo desafio</strong>
                    <p>{activeChalenge.description}</p>
                </main>

                <footer>
                    <button type="button" className={styles.challengeFailedButton} onClick={handleChallengeFailed}>Falhei</button>
                    <button type="button" className={styles.challengeSucceedButton} onClick={handleChallengeSucceeded}>Completei</button>
                </footer>
            </div>
        ) : (
            
            <div className={styles.challengeNotActive}>
                <strong>Finalize um ciclo para receber um desafio</strong>
                <p>
                    <img src="icons/level-up.svg" alt="level up"/>
                    Avance de level completando desafios.
                </p>
        </div>)}
        </div>
    </>);
};
