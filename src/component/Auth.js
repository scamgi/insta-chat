import { auth, provider } from '../config/firebase-config';
import { signInWithPopup } from 'firebase/auth';

export const Auth = () => {
    const signInWithGoogle = async () => {
        try {
            signInWithGoogle(auth, provider);
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="auth">
            <p>Sign In With Google To Continue</p>
            <button onClick={signInWithGoogle}>Sign In With Google</button>
        </div>
    )
}