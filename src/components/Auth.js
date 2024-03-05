import { auth, provider } from '../config/firebase-config';
import { signInWithPopup } from 'firebase/auth';

import Coockies from 'universal-cookie';
const cookies = new Coockies();

export const Auth = (props) => {
    const { setIsAuth } = props;

    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            cookies.set('auth-token', result.user.refreshToken);
            // we set setIsAuth = true here because I don't need 
            // to refresh in order to go from the starting page to the other one
            setIsAuth(true);
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
