import { useContext } from 'react';
import { ChallengeContext } from '../contexts/ChallengeContext';
import styles from '../styles/components/Profile.module.css';

export function Profile() {
    const { level } = useContext(ChallengeContext);

    return (<>
        <div className={styles.profileContainer}>
            <img src="https://github.com/devevandro.png" alt="Evandro Carvalho"/>
            <div>
                <strong>Evandro Carvalho</strong>
                <p>
                    <img src="icons/level.svg" alt="level"/>
                    Level {level}
                </p>
            </div>
        </div>
    </>);
};
