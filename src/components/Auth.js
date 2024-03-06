import { auth, provider } from '../config/firebase-config';
import { signInWithPopup } from 'firebase/auth';
import './Auth.css';
import authImage from './Auth3.jpg';

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
        /*<div className="auth">
            <p>Sign In With Google To Continue</p>
            <button onClick={signInWithGoogle}>Sign In With Google</button>
        </div>*/
        <div class="container">
            <div class="body d-md-flex align-items-center justify-content-between">
                <div class="box-1 mt-md-0 mt-5">
                    <img src={authImage}
                        class="" alt="auth image" />
                </div>
                <div class=" box-2 d-flex flex-column h-100">
                    <div class="mt-5">
                        <p class="mb-1 h-1">Login</p>
                        <p class="text-muted mb-2">You first need to login to get access to the chats</p>
                        <div class="d-flex flex-column ">
                            <p class="text-muted mb-2">Continue with...</p>
                            <div class="d-flex align-items-center">
                                <a href="#" class="box me-2">
                                    <span class="fab fa-google mb-2"></span>
                                    <p class="mb-0">Google</p>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="mt-auto">
                        <p class="footer text-muted mb-0 mt-md-0 mt-4"><span class="me-1">Made with</span>
                        <span class="fab fa-github"></span>
                        </p>
                    </div>
                </div>
                <span class="fas fa-times"></span>
            </div>
        </div>
    )
}
