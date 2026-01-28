import { initApplicant } from '../../store/applicant';
import mainPage from '../pages/main';

const button = document.querySelector('#login-button') as HTMLButtonElement;
const form = document.getElementById('login-wrapper') as HTMLFormElement;

export default () => {
  if (!button || !form) throw new Error('No Button or Form');
  button.classList.remove('d-none');

  // Step 2: User fills out the applicant form and clicks "Create applicant".
  // Validate form here, then call initApplicant() to create the applicant via the store.
  
  button.addEventListener('click', async (e) => {
    e.preventDefault();
    button.disabled = true;
    try {
    // Step 2 -> Step 3 transition: call into the store to create the applicant (applicant.ts)
  const applicantId = await initApplicant();
    // Step 6: When applicantId returns, continue UI flow and call mainPage(applicantId) in main.ts

  mainPage(applicantId);
  button.classList.add('d-none');
    } catch (err) {
      alert('Failed to create applicant.');
      button.disabled = false;
    }
  });//end event listener
  
};//end export default
